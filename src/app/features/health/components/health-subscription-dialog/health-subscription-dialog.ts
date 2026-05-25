import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { HealthPatientProfile, HealthPlanSubscription, HealthPlanSubscriptionPayload, HealthProfessional, HealthService } from '../../models/health.model';

export interface HealthSubscriptionDialogData {
  subscription?: HealthPlanSubscription | null;
  patients: HealthPatientProfile[];
  professionals: HealthProfessional[];
  services: HealthService[];
}

@Component({
  selector: 'app-health-subscription-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatAutocompleteModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatSelectModule],
  template: `
    <section class="dialog-shell">
      <header class="dialog-header">
        <div>
          <h2>{{ data.subscription ? 'Editar plan mensual' : 'Crear plan mensual' }}</h2>
          <p>{{ data.subscription ? 'Actualiza la suscripción de salud.' : 'Registra una suscripción de salud para un paciente.' }}</p>
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
          <mat-label>Profesional</mat-label>
          <mat-select formControlName="healthProfessionalId">
            @for (professional of data.professionals; track professional.id) {
              <mat-option [value]="professional.id">{{ professional.employeeName }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Servicio mensual</mat-label>
          <mat-select formControlName="healthServiceId" (selectionChange)="onMonthlyServiceChange()">
            @for (service of monthlyServices(); track service.id) {
              <mat-option [value]="service.id">{{ service.name }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <div class="two-cols">
          <mat-form-field appearance="outline">
            <mat-label>Desde</mat-label>
            <input matInput type="date" formControlName="startDate">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Hasta</mat-label>
            <input matInput type="date" formControlName="endDate">
          </mat-form-field>
        </div>

        <div class="two-cols">
          <mat-form-field appearance="outline">
            <mat-label>Monto mensual</mat-label>
            <input matInput type="number" formControlName="monthlyAmount">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Sesiones/semana</mat-label>
            <input matInput type="number" formControlName="sessionsPerWeek">
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline">
          <mat-label>Notas</mat-label>
          <textarea matInput formControlName="notes" rows="3"></textarea>
        </mat-form-field>

        <footer class="dialog-actions">
          <button mat-stroked-button type="button" (click)="close()">Cancelar</button>
          <button mat-flat-button type="submit" [disabled]="form.invalid">
            <mat-icon>event_repeat</mat-icon>
            {{ data.subscription ? 'Guardar cambios' : 'Crear plan' }}
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
    .dialog-actions { display: flex; justify-content: flex-end; gap: 0.6rem; flex-wrap: wrap; }
    .dialog-actions button { min-height: 42px; border-radius: 12px; }
    @media (max-width: 520px) {
      .two-cols { grid-template-columns: 1fr; }
      .dialog-actions button { flex: 1 1 100%; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HealthSubscriptionDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<HealthSubscriptionDialogComponent, HealthPlanSubscriptionPayload | undefined>);
  private readonly formBuilder = inject(FormBuilder);
  readonly data = inject<HealthSubscriptionDialogData>(MAT_DIALOG_DATA);
  readonly monthlyServices = computed(() => this.data.services.filter(service => service.isMonthlyPlan));
  readonly patientSearchControl = new FormControl<HealthPatientProfile | string>(this.getInitialPatient() ?? '', { nonNullable: true });
  readonly displayPatient = (value: HealthPatientProfile | string): string => typeof value === 'string' ? value : value?.clientName ?? '';

  readonly form = this.formBuilder.nonNullable.group({
    healthPatientProfileId: [this.data.subscription?.healthPatientProfileId ?? 0, [Validators.required, Validators.min(1)]],
    healthProfessionalId: [this.data.subscription?.healthProfessionalId ?? 0, [Validators.required, Validators.min(1)]],
    healthServiceId: [this.data.subscription?.healthServiceId ?? 0, [Validators.required, Validators.min(1)]],
    startDate: [this.toDateInput(this.data.subscription?.startDate), Validators.required],
    endDate: [this.toDateInput(this.data.subscription?.endDate, true), Validators.required],
    monthlyAmount: [this.data.subscription?.monthlyAmount ?? 0, [Validators.required, Validators.min(1)]],
    sessionsPerWeek: [this.data.subscription?.sessionsPerWeek ?? 2, [Validators.required, Validators.min(1)]],
    status: [this.normalizeStatus(this.data.subscription?.status)],
    notes: [this.data.subscription?.notes ?? '']
  });

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

  onMonthlyServiceChange(): void {
    if (this.data.subscription) return;
    const selectedService = this.getSelectedMonthlyService();
    if (!selectedService) return;

    this.form.controls.monthlyAmount.setValue(selectedService.price);
  }

  save(): void {
    if (this.form.invalid) return;
    const raw = this.form.getRawValue();
    this.dialogRef.close({
      ...raw,
      status: this.normalizeStatus(raw.status),
      startDate: new Date(`${raw.startDate}T12:00:00`).toISOString(),
      endDate: new Date(`${raw.endDate}T12:00:00`).toISOString()
    });
  }

  private normalizeStatus(status?: string | null): string {
    const normalized = (status ?? '').trim().toLowerCase();
    if (normalized === 'active' || normalized === 'activo') return 'Activo';
    if (normalized === 'inactive' || normalized === 'inactivo') return 'Inactivo';
    if (normalized === 'cancelled' || normalized === 'canceled' || normalized === 'cancelado') return 'Cancelado';
    if (normalized === 'pending' || normalized === 'pendiente') return 'Pendiente';
    if (normalized === 'expired' || normalized === 'vencido') return 'Vencido';
    return 'Activo';
  }

  private getSelectedMonthlyService(): HealthService | null {
    const serviceId = this.form.controls.healthServiceId.value;
    return this.monthlyServices().find(service => service.id === serviceId) ?? null;
  }

  private getInitialPatient(): HealthPatientProfile | null {
    const patientId = this.data.subscription?.healthPatientProfileId;
    return patientId ? this.data.patients.find(patient => patient.id === patientId) ?? null : null;
  }

  private toDateInput(value?: string | null, defaultNextMonth = false): string {
    const fallback = defaultNextMonth
      ? new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
      : new Date();
    return new Date(value ?? fallback).toISOString().slice(0, 10);
  }
}
