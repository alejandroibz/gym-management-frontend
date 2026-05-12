import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog';
import { CashMovementCategory } from '../../../cash-movement-categories/models/cash-movement-category.model';
import { CashMovementCategoriesService } from '../../../cash-movement-categories/services/cash-movement-categories.service';
import { Employee } from '../../../employees/models/employee.model';
import { EmployeesService } from '../../../employees/services/employees.service';
import { MembershipPlan } from '../../../membership-plans/models/membership-plan.model';
import { MembershipPlansService } from '../../../membership-plans/services/membership-plans.service';
import { RegisterPaymentDialogComponent } from '../../../movements/components/register-payment-dialog/register-payment-dialog';
import { PaymentMethod } from '../../../payment-methods/models/payment-method.model';
import { PaymentMethodsService } from '../../../payment-methods/services/payment-methods.service';
import { Payment, PaymentCreatePayload, PaymentUpdatePayload } from '../../../payments/models/payment.model';
import { PaymentsService } from '../../../payments/services/payments.service';
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
    MatCheckboxModule,
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
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly auth = inject(AuthService);
  private readonly clientsService = inject(ClientsService);
  private readonly employeesService = inject(EmployeesService);
  private readonly membershipPlansService = inject(MembershipPlansService);
  private readonly paymentsService = inject(PaymentsService);
  private readonly paymentMethodsService = inject(PaymentMethodsService);
  private readonly cashMovementCategoriesService = inject(CashMovementCategoriesService);

  readonly client = signal<Client | null>(null);
  readonly membershipPlans = signal<MembershipPlan[]>([]);
  readonly employees = signal<Employee[]>([]);
  readonly paymentMethods = signal<PaymentMethod[]>([]);
  readonly cashMovementCategories = signal<CashMovementCategory[]>([]);
  readonly isLoading = signal(true);
  readonly isSaving = signal(false);
  readonly isEditing = signal(false);
  readonly errorMessage = signal('');
  readonly observacionesMaxLength = 3000;

  readonly form = this.formBuilder.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8), Validators.pattern(/^\d{7,8}$/)]],
    fechaNacimiento: ['', [Validators.required]],
    telefono: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
    direccion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(160)]],
    tieneLesion: [false],
    observaciones: ['', [Validators.maxLength(this.observacionesMaxLength)]],
    hasMembership: [false],
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
  readonly trainerNote = computed(() => this.client()?.healthProfile?.trainerNotes?.[0] ?? null);
  readonly canRegisterPayment = computed(() => !!this.client() && !this.isEditing());
  readonly incomeCategories = computed(() => this.cashMovementCategories().filter(category => category.tipoMovimiento === 1));
  readonly observacionesLength = signal(0);
  readonly observacionesRemaining = computed(() => this.observacionesMaxLength - this.observacionesLength());
  readonly currentUserEmail = signal<string | null>(null);

  constructor() {
    this.form.disable({ emitEvent: false });
    this.form.controls.observaciones.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        this.observacionesLength.set(value.length);
      });
    this.form.controls.hasMembership.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.updateMembershipValidators();
      });
    this.auth.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(user => {
        this.currentUserEmail.set(typeof user?.email === 'string' ? user.email : null);
      });
    this.updateMembershipValidators();
    this.loadMembershipPlans();
    this.loadPaymentLookups();
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

    if (!client) {
      return;
    }

    this.router.navigate(['/movements/payments/new'], {
      queryParams: {
        clientId: client.id,
        from: 'clients'
      }
    });
  }

  confirmPayment(payment: ClientRelationRecord): void {
    const paymentId = this.getPaymentId(payment);
    const cashMovementCategoryId = this.getPaymentCashMovementCategoryId(payment);

    if (!paymentId || !cashMovementCategoryId) {
      this.errorMessage.set('No se pudo identificar la categoria del movimiento para confirmar el cobro.');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        title: 'Confirmar cobro',
        message: 'Se marcara este cobro como confirmado.',
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
          this.errorMessage.set('No se pudo confirmar el cobro.');
        }
      });
    });
  }

  editPayment(paymentRecord: ClientRelationRecord): void {
    const payment = this.toPayment(paymentRecord);
    const client = this.client();

    if (!payment || !client) {
      this.errorMessage.set('No se pudo identificar el pago para editarlo.');
      return;
    }

    if (this.paymentMethods().length === 0 || this.incomeCategories().length === 0) {
      this.errorMessage.set('No se pudieron cargar metodos de pago o categorias para editar el cobro.');
      return;
    }

    const dialogRef = this.dialog.open(RegisterPaymentDialogComponent, {
      width: '760px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      panelClass: 'employee-dialog-panel',
      backdropClass: 'employee-dialog-backdrop',
      data: {
        clients: [client],
        employees: this.employees(),
        paymentMethods: this.paymentMethods(),
        incomeCategories: this.incomeCategories(),
        defaultDate: this.toDateInputValue(payment.fechaPago),
        defaultMonth: payment.periodMonth ?? this.getDateMonth(payment.fechaPago),
        defaultYear: payment.periodYear ?? this.getDateYear(payment.fechaPago),
        defaultEmployeeEmail: this.currentUserEmail(),
        payment
      }
    });

    dialogRef.afterClosed().subscribe((payload?: PaymentCreatePayload) => {
      if (!payload) {
        return;
      }

      this.isSaving.set(true);
      this.errorMessage.set('');

      this.paymentsService.update(payment.id, this.toPaymentUpdatePayload(payment.id, payload)).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.loadClient();
        },
        error: error => {
          this.isSaving.set(false);
          this.errorMessage.set(this.getApiErrorMessage(error, 'No se pudo editar el pago.'));
        }
      });
    });
  }

  deletePayment(payment: ClientRelationRecord): void {
    const paymentId = this.getPaymentId(payment);
    const amount = this.getPaymentAmount(payment);

    if (!paymentId) {
      this.errorMessage.set('No se pudo identificar el pago para eliminarlo.');
      return;
    }

    const amountLabel = amount !== null
      ? new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount)
      : 'el cobro seleccionado';

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        title: 'Eliminar pago',
        message: `Se eliminara ${amountLabel}. Esta accion no se puede deshacer.`,
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
      this.errorMessage.set('');

      this.paymentsService.delete(paymentId).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.loadClient();
        },
        error: () => {
          this.isSaving.set(false);
          this.errorMessage.set('No se pudo eliminar el pago.');
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
    const fields = Object.entries(payment)
      .filter(([key]) => !this.isPaymentHiddenField(key))
      .map(([key, value]) => ({
        label: this.getPaymentFieldLabel(key),
        value: this.formatPaymentFieldValue(key, value)
      }));
    const collector = this.getPaymentCollectorLabel(payment);

    return collector ? [...fields, { label: 'Cobrado por', value: collector }] : fields;
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

    return 'Cobro registrado';
  }

  getPaymentSupportingText(payment: ClientRelationRecord): string {
    const periodMonth = this.getNumericPaymentField(payment, ['periodmonth']);
    const periodYear = this.getNumericPaymentField(payment, ['periodyear']);

    if (periodMonth !== null && periodYear !== null) {
      return `Periodo ${String(periodMonth).padStart(2, '0')}/${periodYear}`;
    }

    const paymentDate = this.getPaymentField(payment, ['fechapago', 'paymentdate']);

    if (typeof paymentDate === 'string' && this.looksLikeDate(paymentDate)) {
      return `Cobro del ${new Intl.DateTimeFormat('es-AR').format(new Date(paymentDate))}`;
    }

    return this.getPaymentStateLabel(payment);
  }

  isPendingPayment(payment: ClientRelationRecord): boolean {
    const normalizedState = this.getPaymentRawState(payment)?.trim().toLowerCase();
    return normalizedState === 'pending' || normalizedState === 'pendiente';
  }

  hasPaymentDiscount(payment: ClientRelationRecord): boolean {
    const hasDiscount = this.getPaymentField(payment, ['tienedescuento', 'hasdiscount']);
    const discountAmount = this.getNumericPaymentField(payment, ['descuentomonto', 'discountamount']);
    return hasDiscount === true || discountAmount !== null && discountAmount > 0;
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

  private getPaymentMethodId(payment: ClientRelationRecord): number | null {
    return this.getNumericPaymentField(payment, ['paymentmethodid', 'paymentmethod']);
  }

  private getPaymentClientMembershipId(payment: ClientRelationRecord): number | null {
    return this.getNumericPaymentField(payment, ['clientmembershipid']);
  }

  private getPaymentPeriodYear(payment: ClientRelationRecord): number | null {
    return this.getNumericPaymentField(payment, ['periodyear']);
  }

  private getPaymentPeriodMonth(payment: ClientRelationRecord): number | null {
    return this.getNumericPaymentField(payment, ['periodmonth']);
  }

  private getPaymentEmployeeEmail(payment: ClientRelationRecord): string | null {
    const email = this.getPaymentField(payment, ['collectedbyemployeeemail']);
    return typeof email === 'string' && email.trim() ? email : null;
  }

  private getPaymentDate(payment: ClientRelationRecord): string | null {
    const rawDate = this.getPaymentField(payment, ['fechapago', 'paymentdate']);
    return typeof rawDate === 'string' && rawDate.trim() ? rawDate : null;
  }

  private isPaymentIdField(key: string): boolean {
    const normalizedKey = key.trim().toLowerCase();
    return normalizedKey === 'id' || normalizedKey.endsWith('id');
  }

  private isPaymentHiddenField(key: string): boolean {
    const normalizedKey = key.trim().toLowerCase();
    return this.isPaymentIdField(key)
      || normalizedKey === 'collectedbyemployeeemail'
      || normalizedKey === 'collectedbyemployeenombre'
      || normalizedKey === 'collectedbyemployeename';
  }

  private getPaymentCollectorLabel(payment: ClientRelationRecord): string | null {
    const name = this.getPaymentField(payment, ['collectedbyemployeenombre', 'collectedbyemployeename']);
    const email = this.getPaymentField(payment, ['collectedbyemployeeemail']);

    if (typeof name === 'string' && name.trim()) {
      return name;
    }

    if (typeof email === 'string' && email.trim()) {
      return email;
    }

    return null;
  }

  private getPaymentFieldLabel(key: string): string {
    const normalizedKey = key.trim().toLowerCase();

    switch (normalizedKey) {
      case 'fechapago':
        return 'Fecha de cobro';
      case 'monto':
        return 'Monto final';
      case 'montooriginal':
      case 'originalamount':
        return 'Monto original';
      case 'descuentomonto':
      case 'discountamount':
        return 'Descuento aplicado';
      case 'descuentoporcentaje':
      case 'discountpercentage':
        return 'Descuento %';
      case 'descuentomotivo':
      case 'discountreason':
        return 'Motivo descuento';
      case 'tienedescuento':
      case 'hasdiscount':
        return 'Descuento';
      case 'estado':
        return 'Estado';
      case 'periodyear':
        return 'Ano';
      case 'periodmonth':
        return 'Mes';
      case 'paymentmethod':
        return 'Metodo de cobro';
      case 'paymentmethodname':
        return 'Metodo de cobro';
      case 'paymentmethodnombre':
        return 'Metodo de cobro';
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
    const normalizedKey = key.trim().toLowerCase();

    if (key.trim().toLowerCase() === 'estado' && typeof value === 'string') {
      return this.getMembershipStateLabel(value);
    }

    if (['monto', 'amount', 'montooriginal', 'originalamount', 'descuentomonto', 'discountamount'].includes(normalizedKey)) {
      const numericValue = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : null;

      if (numericValue !== null && !Number.isNaN(numericValue)) {
        return new Intl.NumberFormat('es-AR', {
          style: 'currency',
          currency: 'ARS',
          maximumFractionDigits: 0
        }).format(numericValue);
      }
    }

    if (['tienedescuento', 'hasdiscount'].includes(normalizedKey) && typeof value === 'boolean') {
      return value ? 'Con descuento' : 'Sin descuento';
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

  private getStringPaymentField(payment: ClientRelationRecord, candidateKeys: string[]): string | null {
    const rawValue = this.getPaymentField(payment, candidateKeys);
    return typeof rawValue === 'string' && rawValue.trim() ? rawValue : null;
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

  private loadPaymentLookups(): void {
    this.employeesService.getPaged(1, 1000).subscribe({
      next: response => this.employees.set(response.items),
      error: () => this.employees.set([])
    });

    this.paymentMethodsService.getPaged(1, 1000).subscribe({
      next: response => this.paymentMethods.set(response.items),
      error: () => this.paymentMethods.set([])
    });

    this.cashMovementCategoriesService.getPaged(1, 1000).subscribe({
      next: response => this.cashMovementCategories.set(response.items),
      error: () => this.cashMovementCategories.set([])
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
      tieneLesion: client.tieneLesion,
      observaciones: client.observaciones ?? '',
      hasMembership: !!membership,
      membershipPlanId: membership?.membershipPlanId ?? null,
      fechaInicio: this.toDateInputValue(membership?.fechaInicio),
      fechaFin: this.toDateInputValue(membership?.fechaFin),
      precioFinal: membership?.precioFinal ?? 0
    });
    this.updateMembershipValidators();
    this.observacionesLength.set((client.observaciones ?? '').length);
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
      tieneLesion: raw.tieneLesion,
      observaciones: raw.observaciones.trim(),
      membership: raw.hasMembership
        ? {
            membershipPlanId: Number(raw.membershipPlanId),
            fechaInicio: new Date(`${raw.fechaInicio}T00:00:00`).toISOString(),
            fechaFin: new Date(`${raw.fechaFin}T00:00:00`).toISOString(),
            precioFinal: Number(raw.precioFinal)
          }
        : null
    };
  }

  private toPayment(payment: ClientRelationRecord): Payment | null {
    const currentClient = this.client();
    const id = this.getPaymentId(payment);
    const fechaPago = this.getPaymentDate(payment);
    const monto = this.getPaymentAmount(payment);
    const paymentMethodId = this.getPaymentMethodId(payment);
    const cashMovementCategoryId = this.getPaymentCashMovementCategoryId(payment);
    const collectedByEmployeeEmail = this.getPaymentEmployeeEmail(payment) ?? this.currentUserEmail();

    if (!currentClient || !id || !fechaPago || monto === null || !paymentMethodId || !cashMovementCategoryId || !collectedByEmployeeEmail) {
      return null;
    }

    return {
      id,
      clientId: currentClient.id,
      clientMembershipId: this.getPaymentClientMembershipId(payment),
      fechaPago,
      monto,
      montoOriginal: this.getNumericPaymentField(payment, ['montooriginal', 'originalamount']),
      descuentoMonto: this.getNumericPaymentField(payment, ['descuentomonto', 'discountamount']) ?? 0,
      descuentoPorcentaje: this.getNumericPaymentField(payment, ['descuentoporcentaje', 'discountpercentage']),
      descuentoMotivo: this.getStringPaymentField(payment, ['descuentomotivo', 'discountreason']),
      tieneDescuento: this.hasPaymentDiscount(payment),
      estado: this.getPaymentRawState(payment) ?? 'Pendiente',
      paymentMethodId,
      paymentMethodNombre: this.getStringPaymentField(payment, ['paymentmethodnombre', 'paymentmethodname']),
      cashMovementCategoryId,
      cashMovementCategoryNombre: this.getStringPaymentField(payment, ['cashmovementcategorynombre', 'cashmovementcategoryname']),
      membershipPlanNombre: this.getStringPaymentField(payment, ['membershipplannombre', 'membershipplanname']),
      periodYear: this.getPaymentPeriodYear(payment) ?? this.getDateYear(fechaPago),
      periodMonth: this.getPaymentPeriodMonth(payment) ?? this.getDateMonth(fechaPago),
      collectedByEmployeeEmail,
      collectedByEmployeeNombre: this.getStringPaymentField(payment, ['collectedbyemployeenombre', 'collectedbyemployeename'])
    };
  }

  private toPaymentUpdatePayload(id: number, payload: PaymentCreatePayload): PaymentUpdatePayload {
    return {
      id,
      clientId: payload.clientId,
      clientMembershipId: payload.clientMembershipId,
      fechaPago: payload.fechaPago,
      monto: payload.monto,
      montoOriginal: payload.montoOriginal,
      descuentoMonto: payload.descuentoMonto,
      descuentoPorcentaje: payload.descuentoPorcentaje,
      descuentoMotivo: payload.descuentoMotivo,
      paymentMethodId: payload.paymentMethodId,
      cashMovementCategoryId: payload.cashMovementCategoryId,
      periodYear: payload.periodYear,
      periodMonth: payload.periodMonth,
      collectedByEmployeeEmail: payload.collectedByEmployeeEmail
    };
  }

  private toDateInputValue(value?: string | null): string {
    return value ? value.slice(0, 10) : '';
  }

  private getDateYear(value: string): number {
    return new Date(value).getFullYear();
  }

  private getDateMonth(value: string): number {
    return new Date(value).getMonth() + 1;
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

  private updateMembershipValidators(): void {
    const hasMembership = this.form.controls.hasMembership.value;
    const membershipPlanControl = this.form.controls.membershipPlanId;
    const fechaInicioControl = this.form.controls.fechaInicio;
    const fechaFinControl = this.form.controls.fechaFin;
    const precioFinalControl = this.form.controls.precioFinal;

    if (hasMembership) {
      membershipPlanControl.setValidators([Validators.required]);
      fechaInicioControl.setValidators([Validators.required]);
      fechaFinControl.setValidators([Validators.required]);
      precioFinalControl.setValidators([Validators.required, Validators.min(0)]);
    } else {
      membershipPlanControl.clearValidators();
      fechaInicioControl.clearValidators();
      fechaFinControl.clearValidators();
      precioFinalControl.clearValidators();
    }

    membershipPlanControl.updateValueAndValidity({ emitEvent: false });
    fechaInicioControl.updateValueAndValidity({ emitEvent: false });
    fechaFinControl.updateValueAndValidity({ emitEvent: false });
    precioFinalControl.updateValueAndValidity({ emitEvent: false });
  }

  private getApiErrorMessage(error: unknown, fallback: string): string {
    const apiError = error as { error?: { error?: unknown; message?: unknown } | string };
    const rawMessage = typeof apiError.error === 'string'
      ? apiError.error
      : typeof apiError.error?.error === 'string'
        ? apiError.error.error
        : typeof apiError.error?.message === 'string'
          ? apiError.error.message
          : '';

    if (rawMessage.toLowerCase().includes('active employee with email') && rawMessage.toLowerCase().includes('not found')) {
      return 'No se encontro un empleado activo con ese email. Revisa el empleado seleccionado.';
    }

    return rawMessage || fallback;
  }
}
