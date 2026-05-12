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
import { Employee } from '../../../employees/models/employee.model';
import { HealthProfessional, HealthProfessionalPayload, HealthProfessionalType } from '../../models/health.model';

export interface HealthProfessionalDialogData {
  professional?: HealthProfessional | null;
  employees: Employee[];
  types: HealthProfessionalType[];
  selectedTypeId?: number | null;
  selectedEmployeeId?: number | null;
}

@Component({
  selector: 'app-health-professional-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatSelectModule],
  template: `
    <section class="dialog-shell">
      <header class="dialog-header">
        <div>
          <h2>{{ data.professional ? 'Editar profesional' : 'Nuevo profesional' }}</h2>
          <p>Relaciona un empleado con una especialidad de salud.</p>
        </div>
        <button mat-icon-button type="button" aria-label="Cerrar" (click)="close()">
          <mat-icon>close</mat-icon>
        </button>
      </header>

      <form [formGroup]="form" (ngSubmit)="save()" class="dialog-form">
        <mat-form-field appearance="outline">
          <mat-label>Empleado</mat-label>
          <mat-select formControlName="employeeId">
            @for (employee of data.employees; track employee.id) {
              <mat-option [value]="employee.id">{{ employee.nombre }} {{ employee.apellido }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

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
          <mat-label>Nombre visible del rol</mat-label>
          <input matInput formControlName="specialty" autocomplete="off">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Matricula</mat-label>
          <input matInput formControlName="licenseNumber" autocomplete="off">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Notas internas</mat-label>
          <textarea matInput formControlName="notes" rows="3"></textarea>
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
    .dialog-actions { display: flex; justify-content: flex-end; gap: 0.6rem; flex-wrap: wrap; }
    .dialog-actions button { min-height: 42px; border-radius: 12px; }
    @media (max-width: 520px) { .dialog-actions button { flex: 1 1 100%; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HealthProfessionalDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<HealthProfessionalDialogComponent, HealthProfessionalPayload | undefined>);
  private readonly formBuilder = inject(FormBuilder);
  readonly data = inject<HealthProfessionalDialogData>(MAT_DIALOG_DATA);

  readonly form = this.formBuilder.nonNullable.group({
    employeeId: [this.data.professional?.employeeId ?? this.data.selectedEmployeeId ?? 0, [Validators.required, Validators.min(1)]],
    healthProfessionalTypeId: [this.data.professional?.healthProfessionalTypeId ?? this.data.selectedTypeId ?? null as number | null],
    specialty: [this.data.professional?.specialty ?? this.getDefaultSpecialty(), Validators.required],
    licenseNumber: [this.data.professional?.licenseNumber ?? ''],
    notes: [this.data.professional?.notes ?? '']
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

  private getDefaultSpecialty(): string {
    return this.data.types.find(type => type.id === this.data.selectedTypeId)?.name ?? 'Profesional de salud';
  }
}
