import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { take } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { CashMovementCategory } from '../../../cash-movement-categories/models/cash-movement-category.model';
import { CashMovementCategoriesService } from '../../../cash-movement-categories/services/cash-movement-categories.service';
import { PaymentMethod } from '../../../payment-methods/models/payment-method.model';
import { PaymentMethodsService } from '../../../payment-methods/services/payment-methods.service';
import { PaymentCreatePayload } from '../../../payments/models/payment.model';
import { Employee } from '../../../employees/models/employee.model';
import { EmployeesService } from '../../../employees/services/employees.service';

export interface RegisterClientPaymentDialogData {
  clientId: number;
  clientMembershipId?: number | null;
  defaultAmount: number;
}

@Component({
  selector: 'app-register-client-payment-dialog',
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
    MatProgressSpinnerModule,
    MatSelectModule
  ],
  templateUrl: './register-client-payment-dialog.html',
  styleUrl: './register-client-payment-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterClientPaymentDialogComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<RegisterClientPaymentDialogComponent, PaymentCreatePayload>);
  private readonly paymentMethodsService = inject(PaymentMethodsService);
  private readonly cashMovementCategoriesService = inject(CashMovementCategoriesService);
  private readonly employeesService = inject(EmployeesService);
  private readonly auth = inject(AuthService);
  readonly data = inject<RegisterClientPaymentDialogData>(MAT_DIALOG_DATA);

  readonly isLoading = signal(true);
  readonly errorMessage = signal('');
  readonly paymentMethods = signal<PaymentMethod[]>([]);
  readonly cashMovementCategories = signal<CashMovementCategory[]>([]);
  readonly employees = signal<Employee[]>([]);
  readonly currentUserEmail = signal<string | null>(null);
  readonly today = new Date();

  readonly form = this.formBuilder.group(
    {
      paymentMethodId: [null as number | null, [Validators.required]],
      cashMovementCategoryId: [null as number | null, [Validators.required]],
      fechaPago: [this.today.toISOString().slice(0, 10), [Validators.required]],
      monto: [this.data.defaultAmount || 0, [Validators.required, Validators.min(0)]],
      aplicarDescuento: [false],
      montoOriginal: [this.data.defaultAmount || null as number | null, [Validators.min(0)]],
      descuentoMonto: [0, [Validators.required, Validators.min(0)]],
      descuentoPorcentaje: [null as number | null, [Validators.min(0), Validators.max(100)]],
      descuentoMotivo: ['', [Validators.maxLength(160)]],
      periodYear: [this.today.getFullYear(), [Validators.required, Validators.min(2000)]],
      periodMonth: [this.today.getMonth() + 1, [Validators.required, Validators.min(1), Validators.max(12)]],
      collectedByEmployeeEmail: ['', [Validators.required]]
    },
    { validators: [this.discountValidator] }
  );

  readonly incomeCategories = computed(() =>
    this.cashMovementCategories().filter(category => category.tipoMovimiento === 1)
  );

  constructor() {
    this.auth.user$.pipe(take(1)).subscribe(user => {
      const email = typeof user?.email === 'string' ? user.email : null;
      this.currentUserEmail.set(email);
      this.applyDefaultEmployeeEmail();
    });
    this.loadOptions();
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    this.dialogRef.close({
      clientId: this.data.clientId,
      clientMembershipId: this.data.clientMembershipId,
      fechaPago: new Date(`${value.fechaPago}T00:00:00`).toISOString(),
      monto: Number(value.monto),
      montoOriginal: value.aplicarDescuento && value.montoOriginal !== null && value.montoOriginal !== undefined
        ? Number(value.montoOriginal)
        : null,
      descuentoMonto: value.aplicarDescuento
        ? Number(value.descuentoMonto ?? 0)
        : 0,
      descuentoPorcentaje: value.aplicarDescuento && value.descuentoPorcentaje !== null && value.descuentoPorcentaje !== undefined
        ? Number(value.descuentoPorcentaje)
        : null,
      descuentoMotivo: value.aplicarDescuento ? value.descuentoMotivo?.trim() || null : null,
      paymentMethodId: Number(value.paymentMethodId),
      cashMovementCategoryId: Number(value.cashMovementCategoryId),
      periodYear: Number(value.periodYear),
      periodMonth: Number(value.periodMonth),
      collectedByEmployeeEmail: value.collectedByEmployeeEmail
    });
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

  onOriginalAmountInput(): void {
    if (!this.isDiscountApplied()) {
      return;
    }

    this.updateFinalAmountFromDiscount();
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

  private loadOptions(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.paymentMethodsService.getPaged(1, 200).subscribe({
      next: response => {
        this.paymentMethods.set(response.items);
        this.loadCategories();
      },
      error: () => {
        this.paymentMethods.set([]);
        this.cashMovementCategories.set([]);
        this.isLoading.set(false);
        this.errorMessage.set('No se pudieron cargar los metodos de pago.');
      }
    });
  }

  private loadCategories(): void {
    this.cashMovementCategoriesService.getPaged(1, 200).subscribe({
      next: response => {
        this.cashMovementCategories.set(response.items);
        this.loadEmployees();
      },
      error: () => {
        this.cashMovementCategories.set([]);
        this.isLoading.set(false);
        this.errorMessage.set('No se pudieron cargar las categorias de movimientos.');
      }
    });
  }

  private loadEmployees(): void {
    this.employeesService.getPaged(1, 1000).subscribe({
      next: response => {
        this.employees.set(response.items);
        this.applyDefaultEmployeeEmail();
        this.isLoading.set(false);
      },
      error: () => {
        this.employees.set([]);
        this.isLoading.set(false);
        this.errorMessage.set('No se pudieron cargar los empleados.');
      }
    });
  }

  private applyDefaultEmployeeEmail(): void {
    if (this.form.controls.collectedByEmployeeEmail.value) {
      return;
    }

    const sessionEmail = this.currentUserEmail()?.trim().toLowerCase();
    const matchedEmployee = sessionEmail
      ? this.employees().find(employee => employee.email?.trim().toLowerCase() === sessionEmail)
      : null;
    const fallbackEmployee = this.employees().find(employee => employee.email?.trim());

    this.form.controls.collectedByEmployeeEmail.setValue(matchedEmployee?.email ?? fallbackEmployee?.email ?? '');
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
}
