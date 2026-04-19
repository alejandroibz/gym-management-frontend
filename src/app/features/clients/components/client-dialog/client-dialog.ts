import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MembershipPlan } from '../../../membership-plans/models/membership-plan.model';
import { Client, ClientMembership } from '../../models/client.model';

export interface ClientDialogData {
  client?: Client;
  membershipPlans: MembershipPlan[];
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
  membership: ClientMembership;
}

@Component({
  selector: 'app-client-dialog',
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
  templateUrl: './client-dialog.html',
  styleUrl: './client-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientDialogComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<ClientDialogComponent, ClientDialogResult>);
  readonly data = inject<ClientDialogData>(MAT_DIALOG_DATA);
  readonly today = new Date().toISOString().slice(0, 10);

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
    email: [
      this.data.client?.email ?? '',
      [Validators.required, Validators.email, Validators.maxLength(120)]
    ],
    direccion: [
      this.data.client?.direccion ?? '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(160)]
    ],
    membershipPlanId: [this.currentMembership?.membershipPlanId ?? null, [Validators.required]],
    fechaInicio: [
      this.toDateInputValue(this.currentMembership?.fechaInicio) || this.today,
      [Validators.required]
    ],
    fechaFin: [
      this.toDateInputValue(this.currentMembership?.fechaFin) || this.today,
      [Validators.required]
    ],
    precioFinal: [this.currentMembership?.precioFinal ?? null, [Validators.required, Validators.min(0)]]
  });

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
      fechaFin
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
      branchId: this.data.client?.branchId ?? 1,
      nombre: value.nombre.trim(),
      apellido: value.apellido.trim(),
      dni: value.dni.trim(),
      fechaNacimiento: new Date(`${value.fechaNacimiento}T00:00:00`).toISOString(),
      telefono: value.telefono.trim(),
      email: value.email.trim(),
      direccion: value.direccion.trim(),
      membership: {
        membershipPlanId: Number(value.membershipPlanId),
        fechaInicio: new Date(`${value.fechaInicio}T00:00:00`).toISOString(),
        fechaFin: new Date(`${value.fechaFin}T00:00:00`).toISOString(),
        precioFinal: Number(value.precioFinal),
        plan: this.getSelectedPlan() ?? null
      }
    });
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
}
