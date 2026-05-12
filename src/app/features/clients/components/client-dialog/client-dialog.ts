import { CommonModule } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CashMovementCategory } from '../../../cash-movement-categories/models/cash-movement-category.model';
import { Employee } from '../../../employees/models/employee.model';
import { MembershipPlan } from '../../../membership-plans/models/membership-plan.model';
import { PaymentMethod } from '../../../payment-methods/models/payment-method.model';
import { Client, ClientAppAccessPayload, ClientMembership } from '../../models/client.model';

export interface ClientDialogData {
  client?: Client;
  membershipPlans: MembershipPlan[];
  paymentMethods: PaymentMethod[];
  incomeCategories: CashMovementCategory[];
  employees: Employee[];
  defaultEmployeeEmail?: string | null;
}

export interface ClientDialogResult {
  id?: number;
  branchId: number;
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: string;
  telefono: string;
  email: string;
  direccion: string;
  tieneLesion: boolean;
  observaciones: string;
  appAccess?: ClientAppAccessPayload | null;
  membership?: ClientMembership | null;
  initialPayment?: {
    fechaPago: string;
    monto: number;
    paymentMethodId: number;
    cashMovementCategoryId?: number | null;
    collectedByEmployeeEmail: string;
    periodYear: number;
    periodMonth: number;
  } | null;
}

@Component({
  selector: 'app-client-dialog',
  standalone: true,
  imports: [
    CommonModule,
    TextFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './client-dialog.html',
  styleUrl: './client-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientDialogComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialogRef = inject(MatDialogRef<ClientDialogComponent, ClientDialogResult>);
  readonly data = inject<ClientDialogData>(MAT_DIALOG_DATA);
  readonly today = new Date().toISOString().slice(0, 10);
  readonly observacionesMaxLength = 3000;

  private readonly currentMembership = this.data.client?.membership ?? null;

  readonly form = this.formBuilder.nonNullable.group({
    nombre: [
      this.data.client?.nombre ?? '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(80)]
    ],
    apellido: [
      this.data.client?.apellido ?? '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(80)]
    ],
    dni: [
      this.data.client?.dni ?? '',
      [Validators.required, Validators.minLength(7), Validators.maxLength(8), Validators.pattern(/^\d{7,8}$/)]
    ],
    fechaNacimiento: [this.toDateInputValue(this.data.client?.fechaNacimiento), [Validators.required]],
    telefono: [
      this.data.client?.telefono ?? '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
    ],
    email: [this.data.client?.email ?? '', [Validators.email, Validators.maxLength(120)]],
    direccion: [
      this.data.client?.direccion ?? '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(160)]
    ],
    tieneLesion: [this.data.client?.tieneLesion ?? false],
    observaciones: [
      this.data.client?.observaciones ?? '',
      [Validators.maxLength(this.observacionesMaxLength)]
    ],
    createAccess: [false],
    hasMembership: [!!this.currentMembership || (!this.isEditing && this.data.membershipPlans.length > 0)],
    membershipPlanId: [this.currentMembership?.membershipPlanId ?? null, [Validators.required]],
    fechaInicio: [
      this.toDateInputValue(this.currentMembership?.fechaInicio) || this.today,
      [Validators.required]
    ],
    fechaFin: [
      this.toDateInputValue(this.currentMembership?.fechaFin) || this.today,
      [Validators.required]
    ],
    precioFinal: [this.currentMembership?.precioFinal ?? null, [Validators.required, Validators.min(0)]],
    registerInitialPayment: [false],
    initialPaymentDate: [this.today],
    initialPaymentAmount: [this.currentMembership?.precioFinal ?? null as number | null],
    initialPaymentMethodId: [null as number | null],
    initialPaymentCategoryId: [this.data.incomeCategories[0]?.id ?? null as number | null],
    initialPaymentEmployeeEmail: [this.getDefaultEmployeeEmail()],
    initialPaymentPeriodYear: [new Date().getFullYear()],
    initialPaymentPeriodMonth: [new Date().getMonth() + 1]
  });
  readonly observacionesLength = signal(this.form.controls.observaciones.value.length);
  readonly observacionesRemaining = computed(() => this.observacionesMaxLength - this.observacionesLength());

  constructor() {
    this.form.controls.createAccess.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.updateEmailValidators();
      });

    this.form.controls.hasMembership.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.updateMembershipValidators();
        this.updateInitialPaymentValidators();
      });

    this.form.controls.registerInitialPayment.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.updateInitialPaymentValidators();
      });

    this.form.controls.precioFinal.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        if (!this.form.controls.initialPaymentAmount.dirty) {
          this.form.controls.initialPaymentAmount.setValue(value, { emitEvent: false });
        }
      });

    this.form.controls.observaciones.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        this.observacionesLength.set(value.length);
      });

    this.updateEmailValidators();
    this.updateMembershipValidators();
    this.updateInitialPaymentValidators();
  }

  get isEditing(): boolean {
    return !!this.data.client;
  }

  close(): void {
    this.dialogRef.close();
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

    const fechaInicio = this.form.controls.fechaInicio.value || this.today;
    const fechaFin = this.addDays(fechaInicio, plan.duracionDias);

    this.form.patchValue({
      precioFinal: plan.precio,
      fechaFin,
      initialPaymentAmount: plan.precio
    });
  }

  onFechaInicioChange(): void {
    const plan = this.getSelectedPlan();

    if (!plan) {
      return;
    }

    const fechaInicio = this.form.controls.fechaInicio.value;

    if (!fechaInicio) {
      return;
    }

    this.form.controls.fechaFin.setValue(this.addDays(fechaInicio, plan.duracionDias));
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    this.dialogRef.close({
      id: this.data.client?.id,
      branchId: this.data.client?.branchId ?? 2,
      nombre: value.nombre.trim(),
      apellido: value.apellido.trim(),
      dni: value.dni.trim(),
      fechaNacimiento: new Date(`${value.fechaNacimiento}T00:00:00`).toISOString(),
      telefono: value.telefono.trim(),
      email: value.email.trim(),
      direccion: value.direccion.trim(),
      tieneLesion: value.tieneLesion,
      observaciones: value.observaciones.trim(),
      appAccess: value.createAccess ? { createAccess: true } : null,
      membership: value.hasMembership
        ? {
            membershipPlanId: Number(value.membershipPlanId),
            fechaInicio: new Date(`${value.fechaInicio}T00:00:00`).toISOString(),
            fechaFin: new Date(`${value.fechaFin}T00:00:00`).toISOString(),
            precioFinal: Number(value.precioFinal),
            plan: this.getSelectedPlan() ?? null
          }
        : null,
      initialPayment: !this.isEditing && value.hasMembership && value.registerInitialPayment
        ? {
            fechaPago: new Date(`${value.initialPaymentDate}T00:00:00`).toISOString(),
            monto: Number(value.initialPaymentAmount),
            paymentMethodId: Number(value.initialPaymentMethodId),
            cashMovementCategoryId: value.initialPaymentCategoryId ? Number(value.initialPaymentCategoryId) : null,
            collectedByEmployeeEmail: value.initialPaymentEmployeeEmail,
            periodYear: Number(value.initialPaymentPeriodYear),
            periodMonth: Number(value.initialPaymentPeriodMonth)
          }
        : null
    });
  }

  getPaymentMethodLabel(method: PaymentMethod): string {
    return method.nombre ?? method.descripcion ?? `Metodo #${method.id}`;
  }

  getEmployeeLabel(employee: Employee): string {
    return `${employee.nombre} ${employee.apellido} - ${employee.email || 'Sin email'}`;
  }

  canSelectEmployee(employee: Employee): boolean {
    return !!employee.email?.trim();
  }

  private toDateInputValue(value?: string): string {
    return value ? value.slice(0, 10) : '';
  }

  private getSelectedPlan(): MembershipPlan | undefined {
    return this.data.membershipPlans.find(plan => plan.id === Number(this.form.controls.membershipPlanId.value));
  }

  private addDays(dateInput: string, days: number): string {
    const date = new Date(`${dateInput}T00:00:00`);
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
  }

  private updateEmailValidators(): void {
    const emailControl = this.form.controls.email;
    const validators = [Validators.email, Validators.maxLength(120)];

    if (this.form.controls.createAccess.value) {
      validators.unshift(Validators.required);
    }

    emailControl.setValidators(validators);
    emailControl.updateValueAndValidity({ emitEvent: false });
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
      this.form.patchValue({
        membershipPlanId: null,
        fechaInicio: this.today,
        fechaFin: this.today,
        precioFinal: null,
        registerInitialPayment: false
      }, { emitEvent: false });
    }

    membershipPlanControl.updateValueAndValidity({ emitEvent: false });
    fechaInicioControl.updateValueAndValidity({ emitEvent: false });
    fechaFinControl.updateValueAndValidity({ emitEvent: false });
    precioFinalControl.updateValueAndValidity({ emitEvent: false });
  }

  private updateInitialPaymentValidators(): void {
    const shouldRegisterPayment = !this.isEditing && this.form.controls.hasMembership.value && this.form.controls.registerInitialPayment.value;
    const controls = [
      this.form.controls.initialPaymentDate,
      this.form.controls.initialPaymentAmount,
      this.form.controls.initialPaymentMethodId,
      this.form.controls.initialPaymentEmployeeEmail,
      this.form.controls.initialPaymentPeriodYear,
      this.form.controls.initialPaymentPeriodMonth
    ];

    if (shouldRegisterPayment) {
      this.form.controls.initialPaymentDate.setValidators([Validators.required]);
      this.form.controls.initialPaymentAmount.setValidators([Validators.required, Validators.min(1)]);
      this.form.controls.initialPaymentMethodId.setValidators([Validators.required]);
      this.form.controls.initialPaymentEmployeeEmail.setValidators([Validators.required, Validators.email]);
      this.form.controls.initialPaymentPeriodYear.setValidators([Validators.required, Validators.min(2000)]);
      this.form.controls.initialPaymentPeriodMonth.setValidators([Validators.required, Validators.min(1), Validators.max(12)]);
    } else {
      controls.forEach(control => control.clearValidators());
    }

    controls.forEach(control => control.updateValueAndValidity({ emitEvent: false }));
  }

  private getDefaultEmployeeEmail(): string {
    const defaultEmail = this.data.defaultEmployeeEmail?.trim().toLowerCase();
    const matchedDefault = defaultEmail
      ? this.data.employees.find(employee => employee.email?.trim().toLowerCase() === defaultEmail)
      : null;

    return matchedDefault?.email || this.data.employees.find(employee => employee.email?.trim())?.email || '';
  }
}
