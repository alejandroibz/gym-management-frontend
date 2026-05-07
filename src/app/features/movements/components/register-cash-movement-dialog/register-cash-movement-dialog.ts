import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CashMovementCategory, CashMovementType } from '../../../cash-movement-categories/models/cash-movement-category.model';
import { Employee } from '../../../employees/models/employee.model';
import { PaymentMethod } from '../../../payment-methods/models/payment-method.model';
import { CashMovement, CashMovementCreatePayload } from '../../models/cash-movement.model';

export interface RegisterCashMovementDialogData {
  categories: CashMovementCategory[];
  employees: Employee[];
  paymentMethods: PaymentMethod[];
  defaultDate: string;
  defaultEmployeeEmail?: string | null;
  movement?: CashMovement;
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
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  readonly data = inject<RegisterCashMovementDialogData>(MAT_DIALOG_DATA);
  readonly isEditing = !!this.data.movement;

  readonly selectedType = signal<CashMovementType>(this.data.movement?.tipoMovimiento ?? 1);
  readonly selectedCategoryId = signal<number | null>(
    this.data.movement?.cashMovementCategoryId
      ?? this.data.categories.find(category => category.tipoMovimiento === this.selectedType())?.id
      ?? null
  );
  readonly selectedEmployeeId = signal<number | null>(this.data.movement?.relatedEmployeeId ?? null);
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
  readonly title = this.isEditing ? 'Editar movimiento externo' : 'Registrar movimiento externo';
  readonly submitLabel = this.isEditing ? 'Guardar cambios' : 'Registrar movimiento externo';

  readonly form = this.formBuilder.group({
    cashMovementCategoryId: [this.selectedCategoryId(), [Validators.required]],
    tipoMovimiento: [this.selectedType(), [Validators.required]],
    monto: [this.data.movement?.monto ?? 0, [Validators.required, Validators.min(0)]],
    fechaMovimiento: [this.toDateInputValue(this.data.movement?.fechaMovimiento ?? this.data.defaultDate), [Validators.required]],
    descripcion: [this.data.movement?.descripcion ?? '', [Validators.required, Validators.minLength(3), Validators.maxLength(160)]],
    metodoPago: [this.data.movement?.metodoPago ?? null as string | null],
    relatedEmployeeId: [this.data.movement?.relatedEmployeeId ?? null as number | null],
    registeredByEmployeeEmail: [this.getInitialEmployeeEmail(), [Validators.required]]
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
    const employeeId = Number(this.form.controls.relatedEmployeeId.value) || null;
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
      relatedEmployeeId: raw.relatedEmployeeId ? Number(raw.relatedEmployeeId) : null,
      registeredByEmployeeEmail: raw.registeredByEmployeeEmail ?? ''
    });
  }

  getPaymentMethodLabel(method: PaymentMethod): string {
    return method.nombre ?? method.descripcion ?? `Metodo #${method.id}`;
  }

  getEmployeeLabel(employee: Employee): string {
    return `${employee.nombre} ${employee.apellido} - DNI ${employee.dni}`;
  }

  getResponsibleEmployeeLabel(employee: Employee): string {
    return `${employee.nombre} ${employee.apellido} - ${employee.email || 'Sin email'}`;
  }

  canSelectResponsibleEmployee(employee: Employee): boolean {
    return !!employee.email?.trim();
  }

  private syncEmployeeFieldVisibility(): void {
    if (!this.shouldShowEmployeeField()) {
      this.selectedEmployeeId.set(null);
      this.form.controls.relatedEmployeeId.setValue(null);
    }
  }

  private getInitialEmployeeEmail(): string {
    const movementEmail = this.data.movement?.registeredByEmployeeEmail?.trim();
    const defaultEmail = this.data.defaultEmployeeEmail?.trim().toLowerCase();
    const matchedDefault = defaultEmail
      ? this.data.employees.find(employee => employee.email?.trim().toLowerCase() === defaultEmail)
      : null;

    return movementEmail || matchedDefault?.email || this.data.employees.find(employee => employee.email?.trim())?.email || '';
  }

  private applyDefaultEmployeeEmail(email: string): void {
    const control = this.form.controls.registeredByEmployeeEmail;

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

  private toDateInputValue(value: string): string {
    return value.slice(0, 10);
  }
}
