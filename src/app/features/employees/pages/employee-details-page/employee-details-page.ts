import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog';
import { EmployeeCategory } from '../../../employee-categories/models/employee-category.model';
import { EmployeeCategoriesService } from '../../../employee-categories/services/employee-categories.service';
import { Employee } from '../../models/employee.model';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-employee-details-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    DatePipe
  ],
  templateUrl: './employee-details-page.html',
  styleUrl: './employee-details-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeDetailsPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly employeesService = inject(EmployeesService);
  private readonly employeeCategoriesService = inject(EmployeeCategoriesService);

  readonly employee = signal<Employee | null>(null);
  readonly categories = signal<EmployeeCategory[]>([]);
  readonly isLoading = signal(true);
  readonly isSaving = signal(false);
  readonly isEditing = signal(false);
  readonly errorMessage = signal('');

  readonly form = this.formBuilder.nonNullable.group({
    employeeCategoryId: [null as number | null, [Validators.required]],
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8), Validators.pattern(/^\d{7,8}$/)]],
    telefono: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
    fechaIngreso: ['', [Validators.required]],
    sueldo: [0, [Validators.required, Validators.min(0)]]
  });

  readonly employeeName = computed(() => {
    const employee = this.employee();
    return employee ? `${employee.nombre} ${employee.apellido}` : 'Empleado';
  });

  readonly currentCategoryName = computed(() => {
    const employee = this.employee();

    if (!employee) {
      return 'Sin categoria';
    }

    return this.getCategoryName(employee.employeeCategoryId);
  });

  constructor() {
    this.form.disable({ emitEvent: false });
    this.loadCategories();
    this.loadEmployee();
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }

  startEditing(): void {
    this.isEditing.set(true);
    this.form.enable({ emitEvent: false });
  }

  cancelEditing(): void {
    const employee = this.employee();

    if (!employee) {
      return;
    }

    this.populateForm(employee);
    this.form.disable({ emitEvent: false });
    this.isEditing.set(false);
  }

  onDniInput(): void {
    const dniControl = this.form.controls.dni;
    const sanitizedValue = dniControl.value.replace(/\D/g, '').slice(0, 8);

    if (dniControl.value !== sanitizedValue) {
      dniControl.setValue(sanitizedValue);
    }
  }

  confirmSave(): void {
    const employee = this.employee();

    if (!employee) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        title: 'Guardar cambios',
        message: `Se actualizaran los datos de ${employee.nombre} ${employee.apellido}.`,
        confirmLabel: 'Guardar',
        cancelLabel: 'Cancelar',
        tone: 'primary'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) {
        return;
      }

      this.saveChanges(employee.id, employee.branchId);
    });
  }

  deleteEmployee(): void {
    const employee = this.employee();

    if (!employee) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        title: 'Eliminar empleado',
        message: `Se eliminara a ${employee.nombre} ${employee.apellido}. Esta accion no se puede deshacer.`,
        confirmLabel: 'Eliminar',
        cancelLabel: 'Cancelar',
        tone: 'danger'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) {
        return;
      }

      this.isSaving.set(true);
      this.errorMessage.set('');

      this.employeesService.delete(employee.id).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.router.navigate(['/employees']);
        },
        error: () => {
          this.isSaving.set(false);
          this.errorMessage.set('No se pudo eliminar el empleado.');
        }
      });
    });
  }

  getCategoryName(categoryId: number): string {
    return this.categories().find(category => category.id === categoryId)?.nombre ?? `Categoria #${categoryId}`;
  }

  private loadEmployee(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.errorMessage.set('No se encontro el empleado solicitado.');
      this.isLoading.set(false);
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.employeesService.getById(id).subscribe({
      next: employee => {
        this.employee.set(employee);
        this.populateForm(employee);
        this.form.disable({ emitEvent: false });
        this.isEditing.set(false);
        this.isLoading.set(false);
      },
      error: () => {
        this.employee.set(null);
        this.isLoading.set(false);
        this.errorMessage.set('No se pudo cargar la informacion del empleado.');
      }
    });
  }

  private loadCategories(): void {
    this.employeeCategoriesService.getPaged(1, 1000).subscribe({
      next: response => {
        this.categories.set(response.items);
      },
      error: () => {
        this.categories.set([]);
      }
    });
  }

  private populateForm(employee: Employee): void {
    this.form.patchValue({
      employeeCategoryId: employee.employeeCategoryId,
      nombre: employee.nombre,
      apellido: employee.apellido,
      dni: employee.dni,
      telefono: employee.telefono,
      email: employee.email,
      fechaIngreso: this.toDateInputValue(employee.fechaIngreso),
      sueldo: employee.sueldo
    });
  }

  private saveChanges(id: number, branchId: number): void {
    const raw = this.form.getRawValue();

    this.isSaving.set(true);
    this.errorMessage.set('');

    this.employeesService.update(id, {
      id,
      branchId,
      employeeCategoryId: Number(raw.employeeCategoryId),
      nombre: raw.nombre.trim(),
      apellido: raw.apellido.trim(),
      dni: raw.dni.trim(),
      telefono: raw.telefono.trim(),
      email: raw.email.trim(),
      fechaIngreso: new Date(`${raw.fechaIngreso}T00:00:00`).toISOString(),
      sueldo: Number(raw.sueldo)
    }).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.loadEmployee();
      },
      error: () => {
        this.isSaving.set(false);
        this.errorMessage.set('No se pudo actualizar el empleado.');
      }
    });
  }

  private toDateInputValue(value?: string | null): string {
    return value ? value.slice(0, 10) : '';
  }
}
