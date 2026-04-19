import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EmployeeCategory } from '../../../employee-categories/models/employee-category.model';
import { Employee } from '../../models/employee.model';

export interface EmployeeDialogData {
  employee?: Employee;
  categories: EmployeeCategory[];
}

export interface EmployeeDialogResult {
  id?: number;
  branchId: number;
  employeeCategoryId: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  fechaIngreso: string;
  sueldo: number;
}

@Component({
  selector: 'app-employee-dialog',
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
  templateUrl: './employee-dialog.html',
  styleUrl: './employee-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeDialogComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<EmployeeDialogComponent, EmployeeDialogResult>);
  readonly data = inject<EmployeeDialogData>(MAT_DIALOG_DATA);

  readonly form = this.formBuilder.nonNullable.group({
    employeeCategoryId: [
      this.data.employee?.employeeCategoryId ?? null,
      [Validators.required]
    ],
    nombre: [
      this.data.employee?.nombre ?? '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(80)]
    ],
    apellido: [
      this.data.employee?.apellido ?? '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(80)]
    ],
    dni: [
      this.data.employee?.dni ?? '',
      [Validators.required, Validators.minLength(7), Validators.maxLength(8), Validators.pattern(/^\d{7,8}$/)]
    ],
    telefono: [
      this.data.employee?.telefono ?? '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
    ],
    email: [
      this.data.employee?.email ?? '',
      [Validators.required, Validators.email, Validators.maxLength(120)]
    ],
    fechaIngreso: [
      this.toDateInputValue(this.data.employee?.fechaIngreso) ?? '',
      [Validators.required]
    ],
    sueldo: [
      this.data.employee?.sueldo ?? null,
      [Validators.required, Validators.min(0)]
    ]
  });

  get isEditing(): boolean {
    return !!this.data.employee;
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

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    this.dialogRef.close({
      id: this.data.employee?.id,
      branchId: this.data.employee?.branchId ?? 1,
      employeeCategoryId: Number(value.employeeCategoryId),
      nombre: value.nombre.trim(),
      apellido: value.apellido.trim(),
      dni: value.dni.trim(),
      telefono: value.telefono.trim(),
      email: value.email.trim(),
      fechaIngreso: new Date(`${value.fechaIngreso}T00:00:00`).toISOString(),
      sueldo: Number(value.sueldo)
    });
  }

  private toDateInputValue(value?: string): string {
    if (!value) {
      return '';
    }

    return value.slice(0, 10);
  }
}
