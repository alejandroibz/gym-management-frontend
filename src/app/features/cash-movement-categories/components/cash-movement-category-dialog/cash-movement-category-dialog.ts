import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CashMovementType } from '../../models/cash-movement-category.model';

export interface CashMovementCategoryDialogData {
  category?: {
    id: number;
    gymId: number;
    nombre: string;
    descripcion: string;
    tipoMovimiento: CashMovementType;
  };
}

export interface CashMovementCategoryDialogResult {
  id?: number;
  gymId: number;
  nombre: string;
  descripcion: string;
  tipoMovimiento: CashMovementType;
}

@Component({
  selector: 'app-cash-movement-category-dialog',
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
  templateUrl: './cash-movement-category-dialog.html',
  styleUrl: './cash-movement-category-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CashMovementCategoryDialogComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef =
    inject(MatDialogRef<CashMovementCategoryDialogComponent, CashMovementCategoryDialogResult>);
  readonly data = inject<CashMovementCategoryDialogData>(MAT_DIALOG_DATA);

  readonly movementTypeOptions = [
    { value: 1 as CashMovementType, label: 'Ingreso' },
    { value: 2 as CashMovementType, label: 'Egreso' }
  ];

  readonly form = this.formBuilder.nonNullable.group({
    nombre: [
      this.data.category?.nombre ?? '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(80)]
    ],
    descripcion: [
      this.data.category?.descripcion ?? '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(240)]
    ],
    tipoMovimiento: [this.data.category?.tipoMovimiento ?? (1 as CashMovementType), [Validators.required]]
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
      gymId: this.data.category?.gymId ?? 2,
      nombre: value.nombre.trim(),
      descripcion: value.descripcion.trim(),
      tipoMovimiento: value.tipoMovimiento
    });
  }
}
