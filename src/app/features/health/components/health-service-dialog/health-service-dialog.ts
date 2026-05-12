import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { HealthProfessionalType, HealthService, HealthServicePayload } from '../../models/health.model';

export interface HealthServiceDialogData {
  service?: HealthService | null;
  types: HealthProfessionalType[];
  selectedTypeId?: number | null;
}

@Component({
  selector: 'app-health-service-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatSelectModule],
  template: `
    <section class="dialog-shell">
      <header class="dialog-header">
        <div>
          <h2>{{ data.service ? 'Editar servicio' : 'Nuevo servicio' }}</h2>
          <p>Configura precio, duracion y si corresponde a un plan mensual.</p>
        </div>
        <button mat-icon-button type="button" aria-label="Cerrar" (click)="close()">
          <mat-icon>close</mat-icon>
        </button>
      </header>

      <form [formGroup]="form" (ngSubmit)="save()" class="dialog-form">
        <mat-form-field appearance="outline">
          <mat-label>Especialidad</mat-label>
          <mat-select formControlName="healthProfessionalTypeId">
            <mat-option [value]="null">Sin especialidad</mat-option>
            @for (type of data.types; track type.id) {
              <mat-option [value]="type.id">{{ type.name }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Nombre</mat-label>
          <input matInput formControlName="name" autocomplete="off">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Descripcion</mat-label>
          <textarea matInput formControlName="description" rows="3"></textarea>
        </mat-form-field>

        <div class="two-cols">
          <mat-form-field appearance="outline">
            <mat-label>Precio</mat-label>
            <input matInput type="number" formControlName="price">
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Minutos</mat-label>
            <input matInput type="number" formControlName="defaultDurationMinutes">
          </mat-form-field>
        </div>

        <mat-checkbox formControlName="isMonthlyPlan">Es plan mensual</mat-checkbox>

        <mat-form-field appearance="outline">
          <mat-label>Sesiones por semana</mat-label>
          <input matInput type="number" formControlName="sessionsPerWeek">
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
export class HealthServiceDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<HealthServiceDialogComponent, HealthServicePayload | undefined>);
  private readonly formBuilder = inject(FormBuilder);
  readonly data = inject<HealthServiceDialogData>(MAT_DIALOG_DATA);

  readonly form = this.formBuilder.nonNullable.group({
    healthProfessionalTypeId: [this.data.service?.healthProfessionalTypeId ?? this.data.selectedTypeId ?? null as number | null],
    name: [this.data.service?.name ?? '', Validators.required],
    description: [this.data.service?.description ?? ''],
    price: [this.data.service?.price ?? 0, [Validators.required, Validators.min(0)]],
    defaultDurationMinutes: [this.data.service?.defaultDurationMinutes ?? 60, [Validators.required, Validators.min(15)]],
    isMonthlyPlan: [this.data.service?.isMonthlyPlan ?? false],
    sessionsPerWeek: [this.data.service?.sessionsPerWeek ?? null as number | null]
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
