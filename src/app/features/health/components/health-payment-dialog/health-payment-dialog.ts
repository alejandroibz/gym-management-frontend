import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Employee } from '../../../employees/models/employee.model';
import { PaymentMethod } from '../../../payment-methods/models/payment-method.model';
import { HealthAppointment, HealthPatientProfile, HealthPayment, HealthPaymentPayload, HealthProfessionalType, HealthService } from '../../models/health.model';

export interface HealthPaymentDialogData {
  payment?: HealthPayment | null;
  appointment?: HealthAppointment | null;
  patients: HealthPatientProfile[];
  paymentMethods: PaymentMethod[];
  employees: Employee[];
  professionalTypes?: HealthProfessionalType[];
  services?: HealthService[];
}

@Component({
  selector: 'app-health-payment-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatSelectModule],
  template: `
    <section class="dialog-shell">
      <header class="dialog-header">
        <div>
          <h2>{{ data.payment ? 'Editar pago' : 'Registrar pago' }}</h2>
          <p>{{ data.payment ? 'Actualiza el cobro de salud.' : 'Carga un nuevo cobro de salud.' }}</p>
        </div>
        <button mat-icon-button type="button" aria-label="Cerrar" (click)="close()">
          <mat-icon>close</mat-icon>
        </button>
      </header>

      <form [formGroup]="form" (ngSubmit)="save()" class="dialog-form">
        <mat-form-field appearance="outline">
          <mat-label>Paciente</mat-label>
          <input
            matInput
            type="text"
            [formControl]="patientSearchControl"
            [matAutocomplete]="patientAutocomplete"
            placeholder="Escribir nombre, DNI o telefono"
            (input)="onPatientSearchInput()">
          <mat-autocomplete #patientAutocomplete="matAutocomplete" [displayWith]="displayPatient" (optionSelected)="selectPatient($event.option.value)">
            @for (patient of filteredPatients(); track patient.id) {
              <mat-option [value]="patient">{{ patient.clientName }}</mat-option>
            }
          </mat-autocomplete>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Método de pago</mat-label>
          <mat-select formControlName="paymentMethodId">
            @for (method of data.paymentMethods; track method.id) {
              <mat-option [value]="method.id">{{ method.nombre }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <div class="two-cols">
          <mat-form-field appearance="outline">
            <mat-label>Tipo de especialidad</mat-label>
            <mat-select formControlName="healthProfessionalTypeId" (selectionChange)="onProfessionalTypeChange()">
              <mat-option [value]="null">Sin especificar</mat-option>
              @for (type of data.professionalTypes ?? []; track type.id) {
                <mat-option [value]="type.id">{{ type.name }}</mat-option>
              }
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Servicio</mat-label>
            <mat-select formControlName="healthServiceId" (selectionChange)="onServiceChange()">
              <mat-option [value]="null">Sin especificar</mat-option>
              @for (service of filteredServices(); track service.id) {
                <mat-option [value]="service.id">{{ service.name }}</mat-option>
              }
            </mat-select>
          </mat-form-field>
        </div>

        <div class="two-cols">
          <mat-form-field appearance="outline">
            <mat-label>Fecha</mat-label>
            <input matInput type="date" formControlName="fechaPago">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Monto</mat-label>
            <input matInput type="number" min="0" step="0.01" formControlName="monto">
          </mat-form-field>
        </div>

        <div class="discount-toggle">
          <mat-checkbox formControlName="aplicarDescuento" (change)="onDiscountToggle()">Aplicar descuento</mat-checkbox>
          @if (hasDiscount()) {
            <span class="discount-badge">Con descuento</span>
          }
        </div>

        @if (isDiscountApplied()) {
          <div class="discount-box" [class.has-discount]="hasDiscount()">
            <div class="discount-grid">
              <mat-form-field appearance="outline">
                <mat-label>Monto original</mat-label>
                <input matInput type="number" min="0" step="0.01" formControlName="montoOriginal" (input)="onOriginalAmountInput()">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Descuento %</mat-label>
                <input matInput type="number" min="0" max="100" step="0.01" formControlName="descuentoPorcentaje" (input)="onDiscountPercentageInput()">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Descuento $</mat-label>
                <input matInput type="number" min="0" step="0.01" formControlName="descuentoMonto" (input)="onDiscountAmountInput()">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Motivo del descuento</mat-label>
                <input matInput maxlength="160" formControlName="descuentoMotivo">
              </mat-form-field>
            </div>
            @if (form.hasError('discountGreaterThanOriginal')) {
              <small>El descuento no puede superar el monto original.</small>
            }
            @if (form.hasError('discountPercentageRange')) {
              <small>El porcentaje debe estar entre 0 y 100.</small>
            }
          </div>
        }

        <mat-form-field appearance="outline">
          <mat-label>Concepto</mat-label>
          <input matInput formControlName="concepto">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Cobrador</mat-label>
          <mat-select formControlName="collectedByEmployeeEmail">
            @for (employee of data.employees; track employee.id) {
              <mat-option [value]="employee.email">{{ employee.nombre }} {{ employee.apellido }} - {{ employee.email }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <footer class="dialog-actions">
          <button mat-stroked-button type="button" (click)="close()">Cancelar</button>
          <button mat-flat-button type="submit" [disabled]="form.invalid">
            <mat-icon>save</mat-icon>
            Guardar
          </button>
        </footer>
      </form>
    </section>
  `,
  styles: [`
    .dialog-shell { display: grid; gap: 1rem; padding: 1rem; }
    .dialog-header { display: flex; justify-content: space-between; gap: 1rem; align-items: flex-start; }
    h2, p { margin: 0; }
    h2 { color: #151517; font-size: 1.2rem; }
    p { margin-top: 0.25rem; color: #667085; }
    .dialog-form { display: grid; gap: 0.75rem; }
    .two-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; }
    .discount-toggle { display: flex; align-items: center; gap: 0.75rem; min-height: 40px; }
    .discount-box { display: grid; gap: 0.65rem; padding: 0.85rem; border-radius: 14px; background: #fff7ed; border: 1px solid rgba(234, 88, 12, 0.18); }
    .discount-box.has-discount { background: #fef3c7; border-color: rgba(245, 158, 11, 0.38); }
    .discount-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; }
    .discount-badge { padding: 0.32rem 0.6rem; border-radius: 999px; background: #fde68a; border: 1px solid #f59e0b; color: #92400e; font-size: 0.78rem; font-weight: 800; }
    .discount-box small { color: #b45309; font-weight: 700; }
    .dialog-actions { display: flex; justify-content: flex-end; gap: 0.6rem; flex-wrap: wrap; }
    .dialog-actions button { min-height: 42px; border-radius: 12px; }
    @media (max-width: 520px) {
      .two-cols, .discount-grid { grid-template-columns: 1fr; }
      .dialog-actions button { flex: 1 1 100%; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HealthPaymentDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<HealthPaymentDialogComponent, HealthPaymentPayload | undefined>);
  private readonly formBuilder = inject(FormBuilder);
  readonly data = inject<HealthPaymentDialogData>(MAT_DIALOG_DATA);
  private readonly initialService = this.getInitialService();
  readonly patientSearchControl = new FormControl<HealthPatientProfile | string>(this.getInitialPatient() ?? '', { nonNullable: true });
  readonly displayPatient = (value: HealthPatientProfile | string): string => typeof value === 'string' ? value : value?.clientName ?? '';

  readonly form = this.formBuilder.nonNullable.group(
    {
      healthPatientProfileId: [this.data.payment?.healthPatientProfileId ?? this.data.appointment?.healthPatientProfileId ?? 0, [Validators.required, Validators.min(1)]],
      healthAppointmentId: [this.data.payment?.healthAppointmentId ?? this.data.appointment?.id ?? null as number | null],
      healthEvaluationId: [this.data.payment?.healthEvaluationId ?? null as number | null],
      healthPlanSubscriptionId: [this.data.payment?.healthPlanSubscriptionId ?? null as number | null],
      healthProfessionalTypeId: [this.data.payment?.healthProfessionalTypeId ?? this.initialService?.healthProfessionalTypeId ?? null as number | null],
      healthServiceId: [this.data.appointment?.healthServiceId ?? this.initialService?.id ?? null as number | null],
      paymentMethodId: [this.data.payment?.paymentMethodId ?? 0, [Validators.required, Validators.min(1)]],
      cashMovementCategoryId: [this.data.payment?.cashMovementCategoryId ?? null as number | null],
      fechaPago: [this.toDateInput(this.data.payment?.fechaPago), Validators.required],
      monto: [this.data.payment?.monto ?? this.initialService?.price ?? 0, [Validators.required, Validators.min(0)]],
      aplicarDescuento: [this.hasInitialDiscount()],
      montoOriginal: [this.data.payment?.montoOriginal ?? this.initialService?.price ?? null as number | null, [Validators.min(0)]],
      descuentoMonto: [this.data.payment?.descuentoMonto ?? 0, [Validators.required, Validators.min(0)]],
      descuentoPorcentaje: [this.data.payment?.descuentoPorcentaje ?? null as number | null, [Validators.min(0), Validators.max(100)]],
      descuentoMotivo: [this.data.payment?.descuentoMotivo ?? '', [Validators.maxLength(160)]],
      concepto: [this.data.payment?.concepto ?? this.buildInitialConcept(), Validators.required],
      collectedByEmployeeEmail: [this.data.payment?.collectedByEmployeeEmail ?? '', Validators.required],
      periodYear: [this.data.payment?.periodYear ?? 0],
      periodMonth: [this.data.payment?.periodMonth ?? 0]
    },
    { validators: [this.discountValidator] }
  );

  close(): void {
    this.dialogRef.close(undefined);
  }

  filteredPatients(): HealthPatientProfile[] {
    const rawValue = this.patientSearchControl.value;
    const value = typeof rawValue === 'string' ? rawValue.trim().toLowerCase() : rawValue.clientName.toLowerCase();
    if (!value) return this.data.patients.slice(0, 25);
    return this.data.patients
      .filter(patient =>
        patient.clientName.toLowerCase().includes(value) ||
        patient.dni?.toLowerCase().includes(value) ||
        patient.phone?.toLowerCase().includes(value))
      .slice(0, 25);
  }

  onPatientSearchInput(): void {
    this.form.controls.healthPatientProfileId.setValue(0);
  }

  selectPatient(patient: HealthPatientProfile): void {
    this.form.controls.healthPatientProfileId.setValue(patient.id);
    this.patientSearchControl.setValue(patient, { emitEvent: false });
  }

  save(): void {
    if (this.form.invalid) return;
    const raw = this.form.getRawValue();
    const { healthProfessionalTypeId, healthServiceId, aplicarDescuento, ...payload } = raw;
    const date = new Date(`${raw.fechaPago}T12:00:00`);
    this.dialogRef.close({
      ...payload,
      monto: Number(raw.monto),
      montoOriginal: aplicarDescuento && raw.montoOriginal !== null && raw.montoOriginal !== undefined
        ? Number(raw.montoOriginal)
        : null,
      descuentoMonto: aplicarDescuento ? Number(raw.descuentoMonto ?? 0) : 0,
      descuentoPorcentaje: aplicarDescuento && raw.descuentoPorcentaje !== null && raw.descuentoPorcentaje !== undefined
        ? Number(raw.descuentoPorcentaje)
        : null,
      descuentoMotivo: aplicarDescuento ? raw.descuentoMotivo?.trim() || null : null,
      fechaPago: date.toISOString(),
      periodYear: raw.periodYear || date.getFullYear(),
      periodMonth: raw.periodMonth || date.getMonth() + 1
    });
  }

  filteredServices(): HealthService[] {
    const professionalTypeId = this.form.controls.healthProfessionalTypeId.value;
    const services = this.data.services ?? [];
    return professionalTypeId
      ? services.filter(service => service.healthProfessionalTypeId === professionalTypeId)
      : services;
  }

  onProfessionalTypeChange(): void {
    const service = this.getSelectedService();
    if (service && !this.filteredServices().some(item => item.id === service.id)) {
      this.form.controls.healthServiceId.setValue(null);
    }
  }

  onServiceChange(): void {
    const service = this.getSelectedService();
    if (!service) return;

    this.form.patchValue({
      healthProfessionalTypeId: service.healthProfessionalTypeId ?? this.form.controls.healthProfessionalTypeId.value,
      monto: this.isDiscountApplied() ? this.form.controls.monto.value : service.price,
      montoOriginal: service.price,
      concepto: service.name
    });
    this.updateFinalAmountFromDiscount();
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
    this.updateFinalAmountFromDiscount();
  }

  onDiscountAmountInput(): void {
    this.updateFinalAmountFromDiscount();
  }

  onDiscountPercentageInput(): void {
    const originalAmount = Number(this.form.controls.montoOriginal.value ?? 0);
    const percentage = Number(this.form.controls.descuentoPorcentaje.value ?? 0);

    if (!this.isDiscountApplied() || originalAmount <= 0 || percentage < 0 || percentage > 100) {
      return;
    }

    this.form.controls.descuentoMonto.setValue(Math.round((originalAmount * percentage) / 100), { emitEvent: false });
    this.updateFinalAmountFromDiscount();
  }

  private toDateInput(value?: string | null): string {
    return value ? new Date(value).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);
  }

  private getInitialService(): HealthService | null {
    const serviceId = this.data.appointment?.healthServiceId;
    if (!serviceId) return null;
    return (this.data.services ?? []).find(service => service.id === serviceId) ?? null;
  }

  private getInitialPatient(): HealthPatientProfile | null {
    const patientId = this.data.payment?.healthPatientProfileId ?? this.data.appointment?.healthPatientProfileId;
    return patientId ? this.data.patients.find(patient => patient.id === patientId) ?? null : null;
  }

  private getSelectedService(): HealthService | null {
    const serviceId = this.form.controls.healthServiceId.value;
    return serviceId ? (this.data.services ?? []).find(service => service.id === serviceId) ?? null : null;
  }

  private buildInitialConcept(): string {
    if (this.data.appointment?.serviceName) return this.data.appointment.serviceName;
    if (this.initialService?.name) return this.initialService.name;
    return '';
  }

  private hasInitialDiscount(): boolean {
    return this.data.payment?.tieneDescuento === true || Number(this.data.payment?.descuentoMonto ?? 0) > 0;
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
