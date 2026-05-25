import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ClientMembership, ClientMembershipUpdatePayload } from '../../models/client.model';
import { MembershipPlan } from '../../../membership-plans/models/membership-plan.model';

export interface ClientMembershipDialogData {
  clientId: number;
  membership: ClientMembership;
  membershipPlans: MembershipPlan[];
}

@Component({
  selector: 'app-client-membership-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  template: `
    <h2 mat-dialog-title>Editar membresia</h2>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <mat-dialog-content class="dialog-body">
        <mat-form-field appearance="outline">
          <mat-label>Plan</mat-label>
          <mat-select formControlName="membershipPlanId">
            @for (plan of data.membershipPlans; track plan.id) {
              <mat-option [value]="plan.id">{{ plan.nombre }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Inicio</mat-label>
          <input matInput type="date" formControlName="fechaInicio">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Fin</mat-label>
          <input matInput type="date" formControlName="fechaFin">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Precio final</mat-label>
          <input matInput type="number" min="0" formControlName="precioFinal">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Estado</mat-label>
          <mat-select formControlName="estado">
            <mat-option value="Active">Activa</mat-option>
            <mat-option value="Inactive">Inactiva</mat-option>
          </mat-select>
        </mat-form-field>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-stroked-button type="button" mat-dialog-close>Cancelar</button>
        <button mat-flat-button type="submit">Guardar</button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [`
    .dialog-body {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.75rem;
      padding-top: 0.5rem;
    }

    mat-form-field:first-child,
    mat-form-field:last-child {
      grid-column: 1 / -1;
    }

    @media (max-width: 560px) {
      .dialog-body {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientMembershipDialogComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<ClientMembershipDialogComponent, ClientMembershipUpdatePayload>);
  readonly data = inject<ClientMembershipDialogData>(MAT_DIALOG_DATA);

  readonly form = this.formBuilder.nonNullable.group({
    membershipPlanId: [this.data.membership.membershipPlanId, [Validators.required]],
    fechaInicio: [this.toDateInputValue(this.data.membership.fechaInicio), [Validators.required]],
    fechaFin: [this.toDateInputValue(this.data.membership.fechaFin), [Validators.required]],
    precioFinal: [this.data.membership.precioFinal, [Validators.required, Validators.min(0)]],
    estado: [this.data.membership.activo === false || this.data.membership.estado === 'Inactive' ? 'Inactive' : 'Active', [Validators.required]]
  });

  submit(): void {
    if (this.form.invalid || !this.data.membership.id) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    this.dialogRef.close({
      clientId: this.data.clientId,
      membershipId: this.data.membership.id,
      membershipPlanId: Number(raw.membershipPlanId),
      fechaInicio: new Date(`${raw.fechaInicio}T00:00:00`).toISOString(),
      fechaFin: new Date(`${raw.fechaFin}T00:00:00`).toISOString(),
      precioFinal: Number(raw.precioFinal),
      estado: raw.estado
    });
  }

  private toDateInputValue(value?: string | null): string {
    return value ? value.slice(0, 10) : '';
  }
}
