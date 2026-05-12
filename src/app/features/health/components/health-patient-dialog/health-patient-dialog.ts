import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Client } from '../../../clients/models/client.model';
import { HealthPatientPayload, HealthPatientProfile, HealthProfessional } from '../../models/health.model';

export interface HealthPatientDialogData {
  patient?: HealthPatientProfile | null;
  clients: Client[];
  professionals: HealthProfessional[];
}

@Component({
  selector: 'app-health-patient-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatSelectModule],
  template: `
    <section class="dialog-shell">
      <header class="dialog-header">
        <div>
          <h2>{{ data.patient ? 'Editar paciente de salud' : 'Nuevo paciente de salud' }}</h2>
          <p>Usa la ficha base de clientes y agrega los datos propios de salud.</p>
        </div>
        <button mat-icon-button type="button" aria-label="Cerrar" (click)="close()">
          <mat-icon>close</mat-icon>
        </button>
      </header>

      <form [formGroup]="form" (ngSubmit)="save()" class="dialog-form">
        <mat-form-field appearance="outline">
          <mat-label>Cliente</mat-label>
          <mat-select formControlName="clientId">
            @for (client of data.clients; track client.id) {
              <mat-option [value]="client.id">{{ client.nombre }} {{ client.apellido }} - {{ client.dni }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Profesional principal</mat-label>
          <mat-select formControlName="primaryProfessionalId">
            <mat-option [value]="null">Sin asignar</mat-option>
            @for (professional of data.professionals; track professional.id) {
              <mat-option [value]="professional.id">{{ professional.employeeName }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <div class="two-cols">
          <mat-form-field appearance="outline">
            <mat-label>Obra social</mat-label>
            <input matInput formControlName="healthInsuranceName" autocomplete="off">
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Nro afiliado</mat-label>
            <input matInput formControlName="healthInsuranceNumber" autocomplete="off">
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline">
          <mat-label>Notas clinicas privadas</mat-label>
          <textarea matInput formControlName="clinicalNotes" rows="4"></textarea>
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
    .dialog-actions { display: flex; justify-content: flex-end; gap: 0.6rem; flex-wrap: wrap; }
    .dialog-actions button { min-height: 42px; border-radius: 12px; }
    @media (max-width: 520px) {
      .two-cols { grid-template-columns: 1fr; }
      .dialog-actions button { flex: 1 1 100%; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HealthPatientDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<HealthPatientDialogComponent, HealthPatientPayload | undefined>);
  private readonly formBuilder = inject(FormBuilder);
  readonly data = inject<HealthPatientDialogData>(MAT_DIALOG_DATA);

  readonly form = this.formBuilder.nonNullable.group({
    clientId: [this.data.patient?.clientId ?? 0, [Validators.required, Validators.min(1)]],
    primaryProfessionalId: [this.data.patient?.primaryProfessionalId ?? null as number | null],
    healthInsuranceName: [this.data.patient?.healthInsuranceName ?? ''],
    healthInsuranceNumber: [this.data.patient?.healthInsuranceNumber ?? ''],
    clinicalNotes: [this.data.patient?.clinicalNotes ?? '']
  });

  close(): void {
    this.dialogRef.close(undefined);
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close(this.form.getRawValue());
  }
}
