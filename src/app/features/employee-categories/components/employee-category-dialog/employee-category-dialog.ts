import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

export interface EmployeeCategoryDialogData {
  category?: {
    id: number;
    nombre: string;
    descripcion: string;
    gymId: number;
  };
}

export interface EmployeeCategoryDialogResult {
  id?: number;
  nombre: string;
  descripcion: string;
  gymId: number;
}

@Component({
  selector: 'app-employee-category-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './employee-category-dialog.html',
  styleUrl: './employee-category-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeCategoryDialogComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef =
    inject(MatDialogRef<EmployeeCategoryDialogComponent, EmployeeCategoryDialogResult>);
  readonly data = inject<EmployeeCategoryDialogData>(MAT_DIALOG_DATA);

  readonly form = this.formBuilder.nonNullable.group({
    nombre: [
      this.data.category?.nombre ?? '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(80)]
    ],
    descripcion: [
      this.data.category?.descripcion ?? '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(240)]
    ]
  });

  get isEditing(): boolean {
    return !!this.data.category;
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
      id: this.data.category?.id,
      nombre: value.nombre.trim(),
      descripcion: value.descripcion.trim(),
      gymId: this.data.category?.gymId ?? 1
    });
  }
}
