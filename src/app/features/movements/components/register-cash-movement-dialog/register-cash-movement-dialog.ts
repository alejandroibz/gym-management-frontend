import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CashMovementCategory, CashMovementType } from '../../../cash-movement-categories/models/cash-movement-category.model';
import { Employee } from '../../../employees/models/employee.model';
import { PaymentMethod } from '../../../payment-methods/models/payment-method.model';
import { CashMovementCreatePayload } from '../../models/cash-movement.model';

export interface RegisterCashMovementDialogData {
  categories: CashMovementCategory[];
  employees: Employee[];
  paymentMethods: PaymentMethod[];
  defaultDate: string;
}

@Component({
  selector: 'app-register-cash-movement-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './register-cash-movement-dialog.html',
  styleUrl: './register-cash-movement-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterCashMovementDialogComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<RegisterCashMovementDialogComponent, CashMovementCreatePayload>);
  readonly data = inject<RegisterCashMovementDialogData>(MAT_DIALOG_DATA);

  readonly selectedType = signal<CashMovementType>(1);
  readonly selectedCategoryId = signal<number | null>(this.data.categories.find(category => category.tipoMovimiento === 1)?.id ?? null);
  readonly selectedEmployeeId = signal<number | null>(null);
  readonly filteredCategories = computed(() => this.data.categories.filter(category => category.tipoMovimiento === this.selectedType()));
  readonly selectedCategory = computed(() => {
    const categoryId = this.selectedCategoryId();
    return this.data.categories.find(category => category.id === categoryId) ?? null;
  });
  readonly selectedEmployee = computed(() => {
    const employeeId = this.selectedEmployeeId();
    return this.data.employees.find(employee => employee.id === employeeId) ?? null;
  });
  readonly shouldShowEmployeeField = computed(() => {
    const category = this.selectedCategory();
    return this.selectedType() === 2 && category?.nombre.trim().toLowerCase() === 'pago de sueldos';
  });
  readonly amountLabel = computed(() => this.shouldShowEmployeeField() ? 'Sueldo empleado' : 'Monto');

  readonly form = this.formBuilder.group({
    cashMovementCategoryId: [this.filteredCategories()[0]?.id ?? null, [Validators.required]],
    tipoMovimiento: [1 as CashMovementType, [Validators.required]],
    monto: [0, [Validators.required, Validators.min(0)]],
    fechaMovimiento: [this.data.defaultDate, [Validators.required]],
    descripcion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(160)]],
    metodoPago: [null as string | null],
    employeeId: [null as number | null],
  });

  close(): void {
    this.dialogRef.close();
  }

  onTypeChange(): void {
    const type = Number(this.form.controls.tipoMovimiento.value) as CashMovementType;
    this.selectedType.set(type);
    const nextCategoryId = this.filteredCategories()[0]?.id ?? null;
    this.selectedCategoryId.set(nextCategoryId);
    this.form.controls.cashMovementCategoryId.setValue(nextCategoryId);
    this.syncEmployeeFieldVisibility();
  }

  onCategoryChange(): void {
    this.selectedCategoryId.set(Number(this.form.controls.cashMovementCategoryId.value) || null);
    this.syncEmployeeFieldVisibility();
  }

  onEmployeeChange(): void {
    const employeeId = Number(this.form.controls.employeeId.value) || null;
    this.selectedEmployeeId.set(employeeId);

    const employee = this.selectedEmployee();
    if (employee) {
      this.form.controls.monto.setValue(employee.sueldo);
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    this.dialogRef.close({
      gymId: 2,
      branchId: 2,
      cashMovementCategoryId: Number(raw.cashMovementCategoryId),
      tipoMovimiento: Number(raw.tipoMovimiento) as CashMovementType,
      monto: Number(raw.monto),
      fechaMovimiento: new Date(`${raw.fechaMovimiento}T00:00:00`).toISOString(),
      descripcion: raw.descripcion?.trim() ?? '',
      metodoPago: raw.metodoPago?.trim() || null,
      employeeId: raw.employeeId ? Number(raw.employeeId) : null,
    });
  }

  getPaymentMethodLabel(method: PaymentMethod): string {
    return method.nombre ?? method.descripcion ?? `Metodo #${method.id}`;
  }

  getEmployeeLabel(employee: Employee): string {
    return `${employee.nombre} ${employee.apellido} - DNI ${employee.dni}`;
  }

  private syncEmployeeFieldVisibility(): void {
    if (!this.shouldShowEmployeeField()) {
      this.selectedEmployeeId.set(null);
      this.form.controls.employeeId.setValue(null);
    }
  }
}
