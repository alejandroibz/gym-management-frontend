import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog';
import { MembershipPlan } from '../../../membership-plans/models/membership-plan.model';
import { MembershipPlansService } from '../../../membership-plans/services/membership-plans.service';
import { PaymentCreatePayload } from '../../../payments/models/payment.model';
import { PaymentsService } from '../../../payments/services/payments.service';
import { RegisterClientPaymentDialogComponent } from '../../components/register-client-payment-dialog/register-client-payment-dialog';
import { Client, ClientMembership, ClientRelationRecord, ClientUpdatePayload } from '../../models/client.model';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-client-details-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    DatePipe
  ],
  templateUrl: './client-details-page.html',
  styleUrl: './client-details-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientDetailsPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly clientsService = inject(ClientsService);
  private readonly membershipPlansService = inject(MembershipPlansService);
  private readonly paymentsService = inject(PaymentsService);

  readonly client = signal<Client | null>(null);
  readonly membershipPlans = signal<MembershipPlan[]>([]);
  readonly isLoading = signal(true);
  readonly isSaving = signal(false);
  readonly isEditing = signal(false);
  readonly errorMessage = signal('');

  readonly form = this.formBuilder.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8), Validators.pattern(/^\d{7,8}$/)]],
    fechaNacimiento: ['', [Validators.required]],
    telefono: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
    direccion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(160)]],
    membershipPlanId: [null as number | null, [Validators.required]],
    fechaInicio: ['', [Validators.required]],
    fechaFin: ['', [Validators.required]],
    precioFinal: [0, [Validators.required, Validators.min(0)]]
  });

  readonly clientName = computed(() => {
    const client = this.client();
    return client ? `${client.nombre} ${client.apellido}` : 'Cliente';
  });

  readonly currentMembership = computed(() => this.getEffectiveMembership(this.client()));
  readonly membershipsHistory = computed(() => this.getMembershipsHistory(this.client()));
  readonly payments = computed(() => this.client()?.payments ?? []);
  readonly canRegisterPayment = computed(() => !!this.currentMembership() && !this.isEditing());

  constructor() {
    this.form.disable({ emitEvent: false });
    this.loadMembershipPlans();
    this.loadClient();
  }

  goBack(): void {
    this.router.navigate(['/clients']);
  }

  startEditing(): void {
    this.isEditing.set(true);
    this.form.enable({ emitEvent: false });
  }

  cancelEditing(): void {
    const client = this.client();
    if (!client) {
      return;
    }

    this.populateForm(client);
    this.form.disable({ emitEvent: false });
    this.isEditing.set(false);
  }

  onDniInput(): void {
    const dniControl = this.form.controls.dni;
    const sanitizedValue = dniControl.value.replace(/\D/g, '').slice(0, 8);

    if (dniControl.value !== sanitizedValue) {
      dniControl.setValue(sanitizedValue);
    }
  }

  onMembershipPlanChange(): void {
    const plan = this.getSelectedPlan();

    if (!plan) {
      return;
    }

    const fechaInicio = this.form.controls.fechaInicio.value;

    this.form.patchValue({
      precioFinal: plan.precio,
      fechaFin: this.addDays(fechaInicio, plan.duracionDias)
    });
  }

  onFechaInicioChange(): void {
    const plan = this.getSelectedPlan();
    const fechaInicio = this.form.controls.fechaInicio.value;

    if (!plan || !fechaInicio) {
      return;
    }

    this.form.controls.fechaFin.setValue(this.addDays(fechaInicio, plan.duracionDias));
  }

  confirmSave(): void {
    const client = this.client();

    if (!client) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        title: 'Guardar cambios',
        message: `Se actualizaran los datos de ${client.nombre} ${client.apellido}.`,
        confirmLabel: 'Guardar',
        cancelLabel: 'Cancelar',
        tone: 'primary'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) {
        return;
      }

      this.saveChanges(client.id, client.branchId);
    });
  }

  deleteClient(): void {
    const client = this.client();

    if (!client) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        title: 'Eliminar cliente',
        message: `Se eliminara a ${client.nombre} ${client.apellido}. Esta accion no se puede deshacer.`,
        confirmLabel: 'Eliminar',
        cancelLabel: 'Cancelar',
        tone: 'danger'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) {
        return;
      }

      this.isSaving.set(true);
      this.clientsService.delete(client.id).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.router.navigate(['/clients']);
        },
        error: () => {
          this.isSaving.set(false);
          this.errorMessage.set('No se pudo eliminar el cliente.');
        }
      });
    });
  }

  openRegisterPaymentDialog(): void {
    const client = this.client();
    const membership = this.currentMembership();

    if (!client || !membership?.id) {
      return;
    }

    const dialogRef = this.dialog.open(RegisterClientPaymentDialogComponent, {
      width: '720px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      panelClass: 'employee-dialog-panel',
      backdropClass: 'employee-dialog-backdrop',
      data: {
        clientId: client.id,
        clientMembershipId: membership.id,
        defaultAmount: membership.precioFinal
      }
    });

    dialogRef.afterClosed().subscribe((payload?: PaymentCreatePayload) => {
      if (!payload) {
        return;
      }

      this.isSaving.set(true);
      this.errorMessage.set('');

      this.paymentsService.create(payload).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.loadClient();
        },
        error: () => {
          this.isSaving.set(false);
          this.errorMessage.set('No se pudo registrar el pago.');
        }
      });
    });
  }

  confirmPayment(payment: ClientRelationRecord): void {
    const paymentId = this.getPaymentId(payment);
    const cashMovementCategoryId = this.getPaymentCashMovementCategoryId(payment);

    if (!paymentId || !cashMovementCategoryId) {
      this.errorMessage.set('No se pudo identificar la categoria del movimiento para confirmar el pago.');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        title: 'Confirmar pago',
        message: 'Se marcara este pago como confirmado.',
        confirmLabel: 'Confirmar',
        cancelLabel: 'Cancelar',
        tone: 'primary'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) {
        return;
      }

      this.isSaving.set(true);
      this.errorMessage.set('');

      this.paymentsService.confirm(paymentId, cashMovementCategoryId).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.loadClient();
        },
        error: () => {
          this.isSaving.set(false);
          this.errorMessage.set('No se pudo confirmar el pago.');
        }
      });
    });
  }

  formatValue(value: unknown): string {
    if (value === null || value === undefined || value === '') {
      return 'Sin dato';
    }

    if (typeof value === 'boolean') {
      return value ? 'Si' : 'No';
    }

    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return String(value);
  }

  getVisiblePaymentFields(payment: ClientRelationRecord): Array<{ label: string; value: string }> {
    return Object.entries(payment)
      .filter(([key]) => !this.isPaymentIdField(key))
      .map(([key, value]) => ({
        label: this.getPaymentFieldLabel(key),
        value: this.formatPaymentFieldValue(key, value)
      }));
  }

  getPaymentStateLabel(payment: ClientRelationRecord): string {
    const state = this.getPaymentRawState(payment);
    return this.getMembershipStateLabel(state);
  }

  getPaymentHeadline(payment: ClientRelationRecord): string {
    const amount = this.getPaymentAmount(payment);

    if (amount !== null) {
      return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0
      }).format(amount);
    }

    return 'Pago registrado';
  }

  getPaymentSupportingText(payment: ClientRelationRecord): string {
    const periodMonth = this.getNumericPaymentField(payment, ['periodmonth']);
    const periodYear = this.getNumericPaymentField(payment, ['periodyear']);

    if (periodMonth !== null && periodYear !== null) {
      return `Periodo ${String(periodMonth).padStart(2, '0')}/${periodYear}`;
    }

    const paymentDate = this.getPaymentField(payment, ['fechapago', 'paymentdate']);

    if (typeof paymentDate === 'string' && this.looksLikeDate(paymentDate)) {
      return `Pago del ${new Intl.DateTimeFormat('es-AR').format(new Date(paymentDate))}`;
    }

    return this.getPaymentStateLabel(payment);
  }

  isPendingPayment(payment: ClientRelationRecord): boolean {
    const normalizedState = this.getPaymentRawState(payment)?.trim().toLowerCase();
    return normalizedState === 'pending' || normalizedState === 'pendiente';
  }

  getMembershipLabel(): string {
    const membership = this.currentMembership();
    return membership?.plan?.nombre ?? (membership ? `Plan #${membership.membershipPlanId}` : 'Sin membresia');
  }

  getMembershipStateLabel(state?: string | null): string {
    if (!state) {
      return 'Sin estado';
    }

    const normalizedState = state.trim().toLowerCase();

    switch (normalizedState) {
      case 'active':
        return 'Activo';
      case 'inactive':
        return 'Inactivo';
      case 'pending':
      case 'pendiente':
        return 'Pendiente';
      case 'expired':
        return 'Vencido';
      case 'cancelled':
        return 'Cancelado';
      case 'paid':
        return 'Pagado';
      default:
        return state;
    }
  }

  getMembershipAlertChips(client: Client): Array<{ label: string; tone: 'warning' | 'info' | 'success' }> {
    const chips: Array<{ label: string; tone: 'warning' | 'info' | 'success' }> = [];

    if (client.membresiaProximaAVencer) {
      chips.push({ label: 'Proxima a vencer', tone: 'warning' });

      if (!client.membresiaVencimientoNotificado) {
        chips.push({ label: 'Sin notificar', tone: 'info' });
      }
    }

    if (client.membresiaVencimientoNotificado) {
      chips.push({ label: 'Notificado', tone: 'success' });
    }

    return chips;
  }

  private getPaymentId(payment: ClientRelationRecord): number | null {
    const rawId = this.getPaymentField(payment, ['id', 'paymentid']);

    if (typeof rawId === 'number') {
      return rawId;
    }

    if (typeof rawId === 'string') {
      const parsedId = Number(rawId);
      return Number.isNaN(parsedId) ? null : parsedId;
    }

    return null;
  }

  private getPaymentRawState(payment: ClientRelationRecord): string | null {
    const rawState = this.getPaymentField(payment, ['estado', 'status', 'paymentstatus']);
    return typeof rawState === 'string' ? rawState : null;
  }

  private getPaymentAmount(payment: ClientRelationRecord): number | null {
    return this.getNumericPaymentField(payment, ['monto', 'amount']);
  }

  private getPaymentCashMovementCategoryId(payment: ClientRelationRecord): number | null {
    return this.getNumericPaymentField(payment, ['cashmovementcategoryid', 'movementcategoryid', 'categoryid']);
  }

  private isPaymentIdField(key: string): boolean {
    const normalizedKey = key.trim().toLowerCase();
    return normalizedKey === 'id' || normalizedKey.endsWith('id');
  }

  private getPaymentFieldLabel(key: string): string {
    const normalizedKey = key.trim().toLowerCase();

    switch (normalizedKey) {
      case 'fechapago':
        return 'Fecha de pago';
      case 'monto':
        return 'Monto';
      case 'estado':
        return 'Estado';
      case 'periodyear':
        return 'Ano';
      case 'periodmonth':
        return 'Mes';
      case 'paymentmethod':
        return 'Metodo de pago';
      case 'paymentmethodname':
        return 'Metodo de pago';
      case 'paymentmethodnombre':
        return 'Metodo de pago';
      case 'cashmovementcategorynombre':
      case 'cashmovementcategoryname':
        return 'Categoria movimiento';
      case 'clientmembership':
        return 'Membresia';
      case 'membershipplan':
      case 'membershipplannombre':
      case 'membershipplanname':
        return 'Membresia';
      default:
        return key
          .replace(/([a-z])([A-Z])/g, '$1 $2')
          .replace(/_/g, ' ')
          .replace(/^./, char => char.toUpperCase());
    }
  }

  private formatPaymentFieldValue(key: string, value: unknown): string {
    if (key.trim().toLowerCase() === 'estado' && typeof value === 'string') {
      return this.getMembershipStateLabel(value);
    }

    if (typeof value === 'string' && this.looksLikeDate(value)) {
      return new Intl.DateTimeFormat('es-AR').format(new Date(value));
    }

    return this.formatValue(value);
  }

  private looksLikeDate(value: string): boolean {
    return /^\d{4}-\d{2}-\d{2}t/i.test(value) || /^\d{4}-\d{2}-\d{2}$/.test(value);
  }

  private getPaymentField(payment: ClientRelationRecord, candidateKeys: string[]): unknown {
    const normalizedCandidateKeys = candidateKeys.map(key => key.toLowerCase());

    for (const [key, value] of Object.entries(payment)) {
      if (normalizedCandidateKeys.includes(key.trim().toLowerCase())) {
        return value;
      }
    }

    return undefined;
  }

  private getNumericPaymentField(payment: ClientRelationRecord, candidateKeys: string[]): number | null {
    const rawValue = this.getPaymentField(payment, candidateKeys);

    if (typeof rawValue === 'number') {
      return rawValue;
    }

    if (typeof rawValue === 'string') {
      const parsedValue = Number(rawValue);
      return Number.isNaN(parsedValue) ? null : parsedValue;
    }

    return null;
  }

  private loadClient(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.errorMessage.set('No se encontro el cliente solicitado.');
      this.isLoading.set(false);
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.clientsService.getById(id).subscribe({
      next: client => {
        this.client.set(client);
        this.populateForm(client);
        this.form.disable({ emitEvent: false });
        this.isEditing.set(false);
        this.isLoading.set(false);
      },
      error: () => {
        this.client.set(null);
        this.isLoading.set(false);
        this.errorMessage.set('No se pudo cargar la informacion del cliente.');
      }
    });
  }

  private loadMembershipPlans(): void {
    this.membershipPlansService.getPaged(1, 1000).subscribe({
      next: response => {
        this.membershipPlans.set(response.items);
      },
      error: () => {
        this.membershipPlans.set([]);
      }
    });
  }

  private populateForm(client: Client): void {
    const membership = this.getEffectiveMembership(client);

    this.form.patchValue({
      nombre: client.nombre,
      apellido: client.apellido,
      dni: client.dni,
      fechaNacimiento: this.toDateInputValue(client.fechaNacimiento),
      telefono: client.telefono,
      email: client.email,
      direccion: client.direccion,
      membershipPlanId: membership?.membershipPlanId ?? null,
      fechaInicio: this.toDateInputValue(membership?.fechaInicio),
      fechaFin: this.toDateInputValue(membership?.fechaFin),
      precioFinal: membership?.precioFinal ?? 0
    });
  }

  private saveChanges(id: number, branchId: number): void {
    this.isSaving.set(true);
    this.errorMessage.set('');

    this.clientsService.update(id, this.buildUpdatePayload(id, branchId)).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.loadClient();
      },
      error: () => {
        this.isSaving.set(false);
        this.errorMessage.set('No se pudo actualizar el cliente.');
      }
    });
  }

  private getSelectedPlan(): MembershipPlan | undefined {
    return this.membershipPlans().find(plan => plan.id === Number(this.form.controls.membershipPlanId.value));
  }

  private buildUpdatePayload(id: number, branchId: number): ClientUpdatePayload {
    const raw = this.form.getRawValue();

    return {
      id,
      branchId,
      nombre: raw.nombre.trim(),
      apellido: raw.apellido.trim(),
      dni: raw.dni.trim(),
      fechaNacimiento: new Date(`${raw.fechaNacimiento}T00:00:00`).toISOString(),
      telefono: raw.telefono.trim(),
      email: raw.email.trim(),
      direccion: raw.direccion.trim(),
      membership: {
        membershipPlanId: Number(raw.membershipPlanId),
        fechaInicio: new Date(`${raw.fechaInicio}T00:00:00`).toISOString(),
        fechaFin: new Date(`${raw.fechaFin}T00:00:00`).toISOString(),
        precioFinal: Number(raw.precioFinal)
      }
    };
  }

  private toDateInputValue(value?: string | null): string {
    return value ? value.slice(0, 10) : '';
  }

  private addDays(dateInput: string, days: number): string {
    const date = new Date(`${dateInput}T00:00:00`);
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
  }

  private getEffectiveMembership(client: Client | null): ClientMembership | null {
    if (!client) {
      return null;
    }

    if (client.membership) {
      return client.membership;
    }

    return this.getMembershipsHistory(client)[0] ?? null;
  }

  private getMembershipsHistory(client: Client | null): ClientMembership[] {
    if (!client?.membershipsHistory?.length) {
      return [];
    }

    return [...client.membershipsHistory].sort((left, right) => {
      const leftDate = new Date(left.fechaFin ?? left.fechaInicio).getTime();
      const rightDate = new Date(right.fechaFin ?? right.fechaInicio).getTime();
      return rightDate - leftDate;
    });
  }
}
