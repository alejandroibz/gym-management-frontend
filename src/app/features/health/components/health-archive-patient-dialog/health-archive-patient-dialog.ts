import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ArchiveHealthPatientPayload } from '../../models/health.model';

export interface HealthArchivePatientDialogData {
  patientName: string;
  pendingAppointmentsCount: number;
  activeSubscriptionsCount: number;
}

@Component({
  selector: 'app-health-archive-patient-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatCheckboxModule, MatDialogModule, MatIconModule],
  template: `
    <section class="dialog-shell">
      <header>
        <mat-icon>inventory_2</mat-icon>
        <div>
          <h2>Archivar ficha de salud</h2>
          <p>Se conservaran pagos, turnos pasados, evaluaciones, notas y planes historicos.</p>
        </div>
      </header>

      <div class="summary">
        <strong>{{ data.patientName }}</strong>
        <span>{{ data.pendingAppointmentsCount }} turnos pendientes o futuros</span>
        <span>{{ data.activeSubscriptionsCount }} planes activos</span>
      </div>

      <form [formGroup]="form">
        <mat-checkbox formControlName="cancelPendingAppointments">
          Cancelar turnos pendientes o futuros
        </mat-checkbox>
        <mat-checkbox formControlName="finishActiveSubscriptions">
          Finalizar planes activos hoy
        </mat-checkbox>
      </form>

      <footer>
        <button mat-stroked-button type="button" (click)="close()">Volver</button>
        <button mat-flat-button type="button" (click)="confirm()">
          <mat-icon>inventory_2</mat-icon>
          Archivar ficha
        </button>
      </footer>
    </section>
  `,
  styles: [`
    .dialog-shell { display: grid; gap: 1rem; padding: 1rem; color: #0f172a; }
    header { display: flex; gap: 0.75rem; align-items: flex-start; }
    header > mat-icon { color: #0f766e; }
    h2, p { margin: 0; }
    h2 { font-size: 1.15rem; }
    p { margin-top: 0.25rem; color: #64748b; }
    .summary { display: grid; gap: 0.35rem; padding: 0.75rem; border-radius: 12px; background: #f8fafc; border: 1px solid #d8e7e4; }
    .summary span { color: #475569; font-weight: 700; }
    form { display: grid; gap: 0.35rem; }
    footer { display: flex; justify-content: flex-end; gap: 0.6rem; flex-wrap: wrap; }
    footer button { min-height: 42px; border-radius: 12px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HealthArchivePatientDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<HealthArchivePatientDialogComponent, ArchiveHealthPatientPayload | undefined>);
  private readonly formBuilder = inject(FormBuilder);
  readonly data = inject<HealthArchivePatientDialogData>(MAT_DIALOG_DATA);

  readonly form = this.formBuilder.nonNullable.group({
    cancelPendingAppointments: [this.data.pendingAppointmentsCount > 0],
    finishActiveSubscriptions: [this.data.activeSubscriptionsCount > 0]
  });

  close(): void {
    this.dialogRef.close(undefined);
  }

  confirm(): void {
    this.dialogRef.close(this.form.getRawValue());
  }
}
