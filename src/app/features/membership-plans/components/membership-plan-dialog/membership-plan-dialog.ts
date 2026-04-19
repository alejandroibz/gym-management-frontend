import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MembershipPlan } from '../../models/membership-plan.model';

export interface MembershipPlanDialogData {
  plan?: MembershipPlan;
}

export interface MembershipPlanDialogResult {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  duracionDias: number;
}

@Component({
  selector: 'app-membership-plan-dialog',
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
  templateUrl: './membership-plan-dialog.html',
  styleUrl: './membership-plan-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembershipPlanDialogComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef =
    inject(MatDialogRef<MembershipPlanDialogComponent, MembershipPlanDialogResult>);
  readonly data = inject<MembershipPlanDialogData>(MAT_DIALOG_DATA);

  readonly form = this.formBuilder.nonNullable.group({
    nombre: [
      this.data.plan?.nombre ?? '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(80)]
    ],
    descripcion: [
      this.data.plan?.descripcion ?? '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(240)]
    ],
    precio: [this.data.plan?.precio ?? null, [Validators.required, Validators.min(0)]],
    duracionDias: [this.data.plan?.duracionDias ?? null, [Validators.required, Validators.min(1)]]
  });

  get isEditing(): boolean {
    return !!this.data.plan;
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    this.dialogRef.close({
      id: this.data.plan?.id,
      nombre: value.nombre.trim(),
      descripcion: value.descripcion.trim(),
      precio: Number(value.precio),
      duracionDias: Number(value.duracionDias)
    });
  }
}
