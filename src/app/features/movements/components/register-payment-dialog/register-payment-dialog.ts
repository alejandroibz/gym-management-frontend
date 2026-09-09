import { PaymentCoverageComponent } from '../../../payments/components/payment-coverage-dialog';
import { isMembershipIncome } from '../../../payments/utils/payment-checkout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, ViewChild, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CashMovementCategory } from '../../../cash-movement-categories/models/cash-movement-category.model';
import { Client, ClientMembership } from '../../../clients/models/client.model';
import { ClientsService } from '../../../clients/services/clients.service';
import { Employee } from '../../../employees/models/employee.model';
import { PaymentMethod } from '../../../payment-methods/models/payment-method.model';
import { Payment, PaymentCreatePayload } from '../../../payments/models/payment.model';
import { employeeEmailValidators, markAndFocusFirstInvalid, paymentDiscountValidator, periodMonthValidators, periodYearValidators, positiveMoneyValidators } from '../../../../core/forms/business-form-validators';
import { ToastService } from '../../../../core/services/toast.service';

export interface RegisterPaymentDialogData {
  clients: Client[];
  employees: Employee[];
  paymentMethods: PaymentMethod[];
  incomeCategories: CashMovementCategory[];
  defaultDate: string;
  defaultMonth: number;
  defaultYear: number;
  defaultEmployeeEmail?: string | null;
  payment?: Payment;
}

@Component({
  selector: 'app-register-payment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    PaymentCoverageComponent,
    ReactiveFormsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './register-payment-dialog.html',
  styleUrl: './register-payment-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPaymentDialogComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<RegisterPaymentDialogComponent, PaymentCreatePayload>);
  private readonly clientsService = inject(ClientsService);
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly toast = inject(ToastService);
  private selectedClientLookupId = 0;
  readonly data = inject<RegisterPaymentDialogData>(MAT_DIALOG_DATA);

  @ViewChild(PaymentCoverageComponent) coverage?: PaymentCoverageComponent;
  isMembershipPayment(): boolean { return isMembershipIncome(this.data.incomeCategories.find(c=>c.id===Number(this.form.controls.cashMovementCategoryId.value))?.nombre ?? ''); }
  onCategoryChange(): void {
    this.form.controls.clientMembershipId.clearValidators();
    this.form.controls.clientMembershipId.updateValueAndValidity();
    if (this.isEditing) return;
    this.form.patchValue({monto:0,aplicarDescuento:false,descuentoMonto:0,descuentoPorcentaje:null,descuentoMotivo:'',montoOriginal:null});
  }
  readonly isEditing = !!this.data.payment;
  readonly selectedClient = signal<Client | null>(this.getInitialClient());
  readonly isLoadingSelectedClient = signal(false);
  readonly clientSearchControl = new FormControl<Client | string>(this.getInitialClient() ?? '', { nonNullable: true });

  readonly form = this.formBuilder.group(
    {
      clientId: [this.data.payment?.clientId ?? this.getInitialClient()?.id ?? (null as number | null), [Validators.required]],
      clientMembershipId: [this.data.payment?.clientMembershipId ?? 0, [Validators.required, Validators.min(1)]],
      fechaPago: [this.toDateInputValue(this.data.payment?.fechaPago ?? this.data.defaultDate), [Validators.required]],
      monto: [this.data.payment?.monto ?? 0, positiveMoneyValidators],
      aplicarDescuento: [this.hasInitialDiscount()],
      montoOriginal: [this.data.payment?.montoOriginal ?? (null as number | null), [Validators.min(0)]],
      descuentoMonto: [this.data.payment?.descuentoMonto ?? 0, [Validators.required, Validators.min(0)]],
      descuentoPorcentaje: [this.data.payment?.descuentoPorcentaje ?? (null as number | null), [Validators.min(0), Validators.max(100)]],
      descuentoMotivo: [this.data.payment?.descuentoMotivo ?? '', [Validators.maxLength(160)]],
      paymentMethodId: [this.data.payment?.paymentMethodId ?? (null as number | null), [Validators.required]],
      cashMovementCategoryId: [this.data.payment?.cashMovementCategoryId ?? this.data.incomeCategories[0]?.id ?? null, [Validators.required]],
      periodYear: [this.data.payment?.periodYear ?? this.data.defaultYear, periodYearValidators],
      periodMonth: [this.data.payment?.periodMonth ?? this.data.defaultMonth, periodMonthValidators],
      collectedByEmployeeEmail: [this.getInitialEmployeeEmail(), employeeEmailValidators]
    },
    { validators: [paymentDiscountValidator] }
  );

  readonly title = this.isEditing ? 'Editar cobro de cliente' : 'Registrar cobro de cliente';
  readonly subtitle = this.isEditing
    ? 'Actualiza los datos del cobro seleccionado.'
    : 'Carga un cobro realizado por un alumno o cliente. Esto no crea un movimiento manual de caja.';
  get submitLabel() { return this.isEditing ? 'Guardar cambios' : this.isMembershipPayment() && this.coverage?.unpaidRenewal ? (this.coverage.total > 0 ? 'Registrar cobro y renovación' : 'Confirmar renovación') : 'Registrar cobro'; }

  readonly membershipLabel = computed(() => {
    const membership = this.getEffectiveMembership(this.selectedClient());
    return membership?.plan?.nombre ?? (membership ? `Plan #${membership.membershipPlanId}` : 'Sin membresía activa');
  });
  readonly displayClient = (value: Client | string): string => typeof value === 'string' ? value : this.getClientLabel(value);

  constructor() {
    this.initializeSelectedClient();
    this.onCategoryChange();

    this.auth.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(user => {
      if (!this.isEditing && typeof user?.email === 'string') {
        this.applyDefaultEmployeeEmail(user.email);
      }
    });
  }

  private initializeSelectedClient(): void {
    const client = this.getInitialClient();
    if (!client) {
      return;
    }

    this.selectedClient.set(client);
    this.clientSearchControl.setValue(client, { emitEvent: false });
    this.form.controls.clientId.setValue(client.id, { emitEvent: false });
    if (!this.isEditing) this.applyMembership(this.getEffectiveMembership(client));
    if (!this.isEditing) this.loadSelectedClientDetails(client.id);
  }
  close(): void {
    this.dialogRef.close();
  }

  onClientChange(): void {
    const clientId = Number(this.form.controls.clientId.value);
    const client = this.data.clients.find(item => item.id === clientId) ?? null;
    const membership = this.getEffectiveMembership(client);

    this.selectedClient.set(client);

    if (clientId) {
      this.applyMembership(membership) || this.clearMembership();
      this.loadSelectedClientDetails(clientId);
      return;
    }

    this.clearMembership();
    this.cancelSelectedClientLookup();
  }

  onClientSearchInput(): void {
    this.selectedClient.set(null);
    this.form.controls.clientId.setValue(null);
    this.clearMembership();
  }

  selectClient(client: Client): void {
    this.form.controls.clientId.setValue(client.id);
    this.clientSearchControl.setValue(client, { emitEvent: false });
    this.onClientChange();
  }

  submit(): void {
    if (!this.isEditing && this.isMembershipPayment()) {
      if (this.isLoadingSelectedClient() || !this.coverage?.valid) { this.toast.warning('Seleccioná los períodos completos a cobrar y revisá las fechas.'); return; }
      this.form.patchValue({monto:this.coverage.total,aplicarDescuento:false,descuentoMonto:0,descuentoPorcentaje:null,descuentoMotivo:'',montoOriginal:null});
    }

    const renewalOnly = !this.isEditing && this.isMembershipPayment() && !!this.coverage?.unpaidRenewal && this.coverage.total === 0;
    if (renewalOnly) {
      this.form.controls.monto.clearValidators();
      this.form.controls.paymentMethodId.clearValidators();
    } else {
      this.form.controls.monto.setValidators(positiveMoneyValidators);
      this.form.controls.paymentMethodId.setValidators([Validators.required]);
    }
    this.form.controls.monto.updateValueAndValidity({ emitEvent: false });
    this.form.controls.paymentMethodId.updateValueAndValidity({ emitEvent: false });

    if (this.form.invalid) {
      markAndFocusFirstInvalid(this.form, this.elementRef.nativeElement);
      this.toast.warning('Revisá los campos marcados antes de guardar el cobro.');
      return;
    }

    const raw = this.form.getRawValue();
    this.dialogRef.close({
      clientId: Number(raw.clientId),
      periods: !this.isEditing && this.isMembershipPayment() ? this.coverage?.periods : undefined,
      unpaidRenewal: !this.isEditing && this.isMembershipPayment() ? this.coverage?.unpaidRenewal : undefined,
      clientMembershipId: this.isMembershipPayment() ? Number(raw.clientMembershipId) : null,
      fechaPago: this.toLocalDateIso(raw.fechaPago),
      monto: Number(raw.monto),
      montoOriginal: raw.aplicarDescuento && raw.montoOriginal !== null && raw.montoOriginal !== undefined
        ? Number(raw.montoOriginal)
        : null,
      descuentoMonto: raw.aplicarDescuento
        ? Number(raw.descuentoMonto ?? 0)
        : 0,
      descuentoPorcentaje: raw.aplicarDescuento && raw.descuentoPorcentaje !== null && raw.descuentoPorcentaje !== undefined
        ? Number(raw.descuentoPorcentaje)
        : null,
      descuentoMotivo: raw.aplicarDescuento ? raw.descuentoMotivo?.trim() || null : null,
      paymentMethodId: Number(raw.paymentMethodId),
      cashMovementCategoryId: Number(raw.cashMovementCategoryId),
      periodYear: Number(raw.periodYear),
      periodMonth: Number(raw.periodMonth),
      collectedByEmployeeEmail: raw.collectedByEmployeeEmail ?? '',
      membershipStartDate: null,
      membershipEndDate: null
    });
  }

  getClientLabel(client: Client): string {
    return `${client.nombre} ${client.apellido}`;
  }

  filteredClients(): Client[] {
    const rawValue = this.clientSearchControl.value;
    const value = typeof rawValue === 'string' ? rawValue.trim().toLowerCase() : this.getClientLabel(rawValue).toLowerCase();
    if (!value) return this.data.clients.slice(0, 25);

    return this.data.clients
      .filter(client => {
        const label = this.getClientLabel(client).toLowerCase();
        return label.includes(value) || client.dni?.toLowerCase().includes(value) || client.telefono?.toLowerCase().includes(value);
      })
      .slice(0, 25);
  }

  getPaymentMethodLabel(method: PaymentMethod): string {
    return method.nombre ?? method.descripcion ?? `Método #${method.id}`;
  }

  getEmployeeLabel(employee: Employee): string {
    return `${employee.nombre} ${employee.apellido} - ${employee.email || 'Sin email'}`;
  }

  canSelectEmployee(employee: Employee): boolean {
    return !!employee.email?.trim();
  }

  hasSelectedClientMembership(): boolean {
    return !!this.getEffectiveMembership(this.selectedClient())?.id;
  }



  hasDiscount(): boolean {
    return this.isDiscountApplied() && Number(this.form.controls.descuentoMonto.value ?? 0) > 0;
  }

  isDiscountApplied(): boolean {
    return this.form.controls.aplicarDescuento.value === true;
  }

  onDiscountToggle(): void {
    if (this.isDiscountApplied()) {
      const currentAmount = Number(this.form.controls.monto.value ?? 0);

      if (!this.form.controls.montoOriginal.value && currentAmount > 0) {
        this.form.controls.montoOriginal.setValue(currentAmount, { emitEvent: false });
      }

      this.form.updateValueAndValidity({ emitEvent: false });
      return;
    }

    const originalAmount = Number(this.form.controls.montoOriginal.value ?? 0);

    this.form.patchValue({
      monto: originalAmount > 0 ? originalAmount : this.form.controls.monto.value,
      montoOriginal: null,
      descuentoMonto: 0,
      descuentoPorcentaje: null,
      descuentoMotivo: ''
    }, { emitEvent: false });
    this.form.updateValueAndValidity({ emitEvent: false });
  }

  onDiscountAmountInput(): void {
    if (!this.isDiscountApplied()) {
      return;
    }

    this.updateFinalAmountFromDiscount();
  }

  onDiscountPercentageInput(): void {
    if (!this.isDiscountApplied()) {
      return;
    }

    const originalAmount = Number(this.form.controls.montoOriginal.value ?? 0);
    const percentage = Number(this.form.controls.descuentoPorcentaje.value ?? 0);

    if (originalAmount <= 0 || percentage < 0 || percentage > 100) {
      return;
    }

    const discountAmount = Math.round((originalAmount * percentage) / 100);
    this.form.controls.descuentoMonto.setValue(discountAmount, { emitEvent: false });
    this.updateFinalAmountFromDiscount();
  }

  onOriginalAmountInput(): void {
    if (!this.isDiscountApplied()) {
      return;
    }

    this.updateFinalAmountFromDiscount();
  }

  private getInitialClient(): Client | null {
    const clientId = this.data.payment?.clientId;

    if (clientId) {
      return this.data.clients.find(item => item.id === clientId) ?? null;
    }

    return this.data.clients.length === 1 ? this.data.clients[0] : null;
  }

  private loadSelectedClientDetails(clientId: number): void {
    const lookupId = ++this.selectedClientLookupId;
    this.isLoadingSelectedClient.set(true);

    this.clientsService.getById(clientId).subscribe({
      next: client => {
        if (lookupId !== this.selectedClientLookupId || Number(this.form.controls.clientId.value) !== clientId) {
          return;
        }

        this.selectedClient.set(client);
        if (this.isMembershipPayment()) this.applyMembership(this.getEffectiveMembership(client)) || this.clearMembership();
        this.isLoadingSelectedClient.set(false);
      },
      error: () => {
        if (lookupId !== this.selectedClientLookupId) {
          return;
        }

        if (Number(this.form.controls.clientId.value) === clientId) {
          this.selectedClient.set(null);
          this.clearMembership();
          this.toast.warning('No se pudieron cargar los períodos. Volvé a seleccionar el cliente.');
        }

        this.isLoadingSelectedClient.set(false);
      }
    });
  }

  private cancelSelectedClientLookup(): void {
    this.selectedClientLookupId++;
    this.isLoadingSelectedClient.set(false);
  }

  private applyMembership(membership: ClientMembership | null): boolean {
    if (this.isEditing || !this.isMembershipPayment() || !membership?.id) {
      return false;
    }

    this.form.patchValue({
      clientMembershipId: membership.id,
      monto: membership.precioFinal,
      montoOriginal: this.data.payment?.montoOriginal ?? membership.precioFinal
    });

    return true;
  }

  private clearMembership(): void {
    this.form.patchValue({
      clientMembershipId: 0,
      monto: 0,
      montoOriginal: null
    });
  }


  private updateFinalAmountFromDiscount(): void {
    if (!this.isDiscountApplied()) {
      return;
    }

    const originalAmount = Number(this.form.controls.montoOriginal.value ?? 0);
    const discountAmount = Number(this.form.controls.descuentoMonto.value ?? 0);

    if (originalAmount <= 0 || discountAmount < 0) {
      return;
    }

    this.form.controls.monto.setValue(Math.max(0, originalAmount - discountAmount), { emitEvent: false });
    this.form.updateValueAndValidity({ emitEvent: false });
  }

  private hasInitialDiscount(): boolean {
    return this.data.payment?.tieneDescuento === true || Number(this.data.payment?.descuentoMonto ?? 0) > 0;
  }

  private getEffectiveMembership(client: Client | null): ClientMembership | null {
    if (!client) {
      return null;
    }

    if (client.membership) {
      return client.membership;
    }

    const history = client.membershipsHistory ?? [];

    if (history.length === 0) {
      return null;
    }

    return [...history].sort((left, right) => {
      return this.getMembershipSortValue(right) - this.getMembershipSortValue(left);
    })[0] ?? null;
  }

  private getMembershipSortValue(membership: ClientMembership): number {
    const periodYear = Number(membership.periodYear ?? 0);
    const periodMonth = Number(membership.periodMonth ?? 0);

    if (periodYear > 0 && periodMonth > 0) {
      return periodYear * 100 + periodMonth;
    }

    return new Date(membership.fechaFin ?? membership.fechaInicio).getTime();
  }
  private toDateInputValue(value: string): string {
    return value.slice(0, 10);
  }

  private toLocalDateIso(value: string | null | undefined): string {
    return (this.getDateFromInput(value) ?? new Date()).toISOString();
  }

  private getDateFromInput(value: string | null | undefined): Date | null {
    if (!value) {
      return null;
    }

    const date = new Date(`${value}T12:00:00`);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  private getInitialEmployeeEmail(): string {
    const paymentEmail = this.data.payment?.collectedByEmployeeEmail?.trim();
    const defaultEmail = this.data.defaultEmployeeEmail?.trim().toLowerCase();
    const matchedDefault = defaultEmail
      ? this.data.employees.find(employee => employee.email?.trim().toLowerCase() === defaultEmail)
      : null;

    return paymentEmail || matchedDefault?.email || this.data.employees.find(employee => employee.email?.trim())?.email || '';
  }

  private applyDefaultEmployeeEmail(email: string): void {
    const control = this.form.controls.collectedByEmployeeEmail;

    if (control.dirty) {
      return;
    }

    const matchedEmployee = this.findEmployeeByEmail(email);

    if (matchedEmployee?.email) {
      control.setValue(matchedEmployee.email);
    }
  }

  private findEmployeeByEmail(email: string): Employee | null {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      return null;
    }

    return this.data.employees.find(employee => employee.email?.trim().toLowerCase() === normalizedEmail) ?? null;
  }
}





