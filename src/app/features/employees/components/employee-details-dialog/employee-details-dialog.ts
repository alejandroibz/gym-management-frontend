import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeCategory } from '../../../employee-categories/models/employee-category.model';
import { Employee } from '../../models/employee.model';

export interface EmployeeDetailsDialogData {
  employee: Employee;
  categories: EmployeeCategory[];
}

@Component({
  selector: 'app-employee-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, CurrencyPipe, DatePipe],
  templateUrl: './employee-details-dialog.html',
  styleUrl: './employee-details-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeDetailsDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<EmployeeDetailsDialogComponent, void>);
  readonly data = inject<EmployeeDetailsDialogData>(MAT_DIALOG_DATA);

  close(): void {
    this.dialogRef.close();
  }

  get categoryName(): string {
    return (
      this.data.categories.find(category => category.id === this.data.employee.employeeCategoryId)?.nombre ??
      `ID ${this.data.employee.employeeCategoryId}`
    );
  }

  get whatsappLink(): string {
    return `https://wa.me/${this.data.employee.telefono.replace(/\D/g, '')}`;
  }

  get mailLink(): string {
    return `mailto:${this.data.employee.email}`;
  }
}
