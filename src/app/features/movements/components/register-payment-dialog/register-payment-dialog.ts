import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
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
    ReactiveFormsModule,
    MatDialogModule,
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
  private selectedClientLookupId = 0;
  readonly data = inject<RegisterPaymentDialogData>(MAT_DIALOG_DATA);

  readonly isEditing = !!this.data.payment;
  readonly selectedClient = signal<Client | null>(this.getInitialClient());
  readonly isLoadingSelectedClient = signal(false);

  readonly form = this.formBuilder.group(
    {
      clientId: [this.data.payment?.clientId ?? (null as number | null), [Validators.required]],
      clientMembershipId: [this.data.payment?.clientMembershipId ?? 0, [Validators.required, Validators.min(1)]],
      fechaPago: [this.toDateInputValue(this.data.payment?.fechaPago ?? this.data.defaultDate), [Validators.required]],
      monto: [this.data.payment?.monto ?? 0, [Validators.required, Validators.min(0)]],
      aplicarDescuento: [this.hasInitialDiscount()],
      montoOriginal: [this.data.payment?.montoOriginal ?? (null as number | null), [Validators.min(0)]],
      descuentoMonto: [this.data.payment?.descuentoMonto ?? 0, [Validators.required, Validators.min(0)]],
      descuentoPorcentaje: [this.data.payment?.descuentoPorcentaje ?? (null as number | null), [Validators.min(0), Validators.max(100)]],
      descuentoMotivo: [this.data.payment?.descuentoMotivo ?? '', [Validators.maxLength(160)]],
      paymentMethodId: [this.data.payment?.paymentMethodId ?? (null as number | null), [Validators.required]],
      cashMovementCategoryId: [this.data.payment?.cashMovementCategoryId ?? this.data.incomeCategories[0]?.id ?? null, [Validators.required]],
      periodYear: [this.data.payment?.periodYear ?? this.data.defaultYear, [Validators.required, Validators.min(2000)]],
      periodMonth: [this.data.payment?.periodMonth ?? this.data.defaultMonth, [Validators.required, Validators.min(1), Validators.max(12)]],
      collectedByEmployeeEmail: [this.getInitialEmployeeEmail(), [Validators.required]]
    },
    { validators: [this.discountValidator] }
  );

  readonly title = this.isEditing ? 'Editar cobro de cliente' : 'Registrar cobro de cliente';
  readonly subtitle = this.isEditing
    ? 'Actualiza los datos del cobro seleccionado.'
    : 'Carga un cobro realizado por un alumno o cliente. Esto no crea un movimiento manual de caja.';
  readonly submitLabel = this.isEditing ? 'Guardar cambios' : 'Registrar cobro';

  readonly membershipLabel = computed(() => {
    const membership = this.getEffectiveMembership(this.selectedClient());
    return membership?.plan?.nombre ?? (membership ? `Plan #${membership.membershipPlanId}` : 'Sin membresía activa');
  });

  constructor() {
    this.auth.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(user => {
      if (!this.isEditing && typeof user?.email === 'string') {
        this.applyDefaultEmployeeEmail(user.email);
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  onClientChange(): void {
    const clientId = Number(this.form.controls.clientId.value);
    const client = this.data.clients.find(item => item.id === clientId) ?? null;
    const membership = this.getEffectiveMembership(client);

    this.selectedClient.set(client);

    if (this.applyMembership(membership)) {
      this.cancelSelectedClientLookup();
      return;
    }

    this.clearMembership();

    if (clientId) {
      this.loadSelectedClientDetails(clientId);
      return;
    }

    this.cancelSelectedClientLookup();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    this.dialogRef.close({
      clientId: Number(raw.clientId),
      clientMembershipId: Number(raw.clientMembershipId),
      fechaPago: new Date(`${raw.fechaPago}T00:00:00`).toISOString(),
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
      collectedByEmployeeEmail: raw.collectedByEmployeeEmail ?? ''
    });
  }

  getClientLabel(client: Client): string {
    return `${client.nombre} ${client.apellido}`;
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
    return clientId ? this.data.clients.find(item => item.id === clientId) ?? null : null;
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
        this.applyMembership(this.getEffectiveMembership(client)) || this.clearMembership();
        this.isLoadingSelectedClient.set(false);
      },
      error: () => {
        if (lookupId !== this.selectedClientLookupId) {
          return;
        }

        if (Number(this.form.controls.clientId.value) === clientId) {
          this.clearMembership();
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
    if (!membership?.id) {
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

  private discountValidator(control: AbstractControl): ValidationErrors | null {
    const rawValue = control.value as {
      montoOriginal?: number | string | null;
      descuentoMonto?: number | string | null;
      descuentoPorcentaje?: number | string | null;
      aplicarDescuento?: boolean | null;
    };
    if (rawValue.aplicarDescuento !== true) {
      return null;
    }

    const originalAmount = rawValue.montoOriginal === null || rawValue.montoOriginal === undefined || rawValue.montoOriginal === ''
      ? null
      : Number(rawValue.montoOriginal);
    const discountAmount = Number(rawValue.descuentoMonto ?? 0);
    const discountPercentage = rawValue.descuentoPorcentaje === null || rawValue.descuentoPorcentaje === undefined || rawValue.descuentoPorcentaje === ''
      ? null
      : Number(rawValue.descuentoPorcentaje);

    if (discountAmount < 0) {
      return { discountAmountNegative: true };
    }

    if (originalAmount !== null && discountAmount > originalAmount) {
      return { discountGreaterThanOriginal: true };
    }

    if (discountPercentage !== null && (discountPercentage < 0 || discountPercentage > 100)) {
      return { discountPercentageRange: true };
    }

    return null;
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
      const leftDate = new Date(left.fechaFin ?? left.fechaInicio).getTime();
      const rightDate = new Date(right.fechaFin ?? right.fechaInicio).getTime();
      return rightDate - leftDate;
    })[0] ?? null;
  }

  private toDateInputValue(value: string): string {
    return value.slice(0, 10);
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
