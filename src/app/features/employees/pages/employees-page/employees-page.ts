import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { EmployeeCategory } from '../../../employee-categories/models/employee-category.model';
import { EmployeeCategoriesService } from '../../../employee-categories/services/employee-categories.service';
import {
  EmployeeDialogComponent,
  EmployeeDialogResult
} from '../../components/employee-dialog/employee-dialog';
import { Employee, EmployeeFilters } from '../../models/employee.model';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
  templateUrl: './employees-page.html',
  styleUrl: './employees-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesPageComponent {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly employeesService = inject(EmployeesService);
  private readonly employeeCategoriesService = inject(EmployeeCategoriesService);

  readonly employees = signal<Employee[]>([]);
  readonly categories = signal<EmployeeCategory[]>([]);
  readonly isLoading = signal(false);
  readonly isSaving = signal(false);
  readonly isLoadingCategories = signal(false);
  readonly errorMessage = signal('');
  readonly totalCount = signal(0);
  readonly pageNumber = signal(1);
  readonly pageSize = signal(12);

  readonly filtersForm = this.formBuilder.nonNullable.group({
    nombre: [''],
    apellido: [''],
    dni: [''],
    employeeCategoryId: ['']
  });

  readonly totalEmployees = computed(() => this.totalCount());
  readonly employeesOnPage = computed(() => this.employees().length);
  readonly currentRangeLabel = computed(() => {
    if (this.totalCount() === 0 || this.employeesOnPage() === 0) {
      return 'Sin resultados';
    }

    const start = (this.pageNumber() - 1) * this.pageSize() + 1;
    const end = start + this.employeesOnPage() - 1;

    return `${start}-${end}`;
  });

  constructor() {
    this.loadCategories();
    this.loadEmployees();
  }

  handlePageChange(event: PageEvent): void {
    this.pageNumber.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
    this.loadEmployees();
  }

  applyFilters(): void {
    this.pageNumber.set(1);
    this.loadEmployees();
  }

  resetFilters(): void {
    this.filtersForm.reset({
      nombre: '',
      apellido: '',
      dni: '',
      employeeCategoryId: ''
    });
    this.pageNumber.set(1);
    this.loadEmployees();
  }

  openCreateModal(): void {
    this.openDialog();
  }

  openEmployeeDetails(employee: Employee): void {
    this.router.navigate(['/employees', employee.id]);
  }

  getCategoryName(categoryId: number): string {
    return this.categories().find(category => category.id === categoryId)?.nombre ?? `ID ${categoryId}`;
  }

  getWhatsAppLink(phone: string): string {
    const sanitizedPhone = phone.replace(/\D/g, '');

    return `https://wa.me/${sanitizedPhone}`;
  }

  getMailLink(email: string): string {
    return `mailto:${email}`;
  }

  private openDialog(employee?: Employee): void {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '860px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      panelClass: 'employee-dialog-panel',
      backdropClass: 'employee-dialog-backdrop',
      data: {
        employee,
        categories: this.categories()
      }
    });

    dialogRef.afterClosed().subscribe((result?: EmployeeDialogResult) => {
      if (!result) {
        return;
      }

      this.isSaving.set(true);
      this.errorMessage.set('');

      const payload = {
        branchId: 1,
        employeeCategoryId: result.employeeCategoryId,
        nombre: result.nombre,
        apellido: result.apellido,
        dni: result.dni,
        telefono: result.telefono,
        email: result.email,
        fechaIngreso: result.fechaIngreso,
        sueldo: result.sueldo
      };

      if (result.id !== undefined) {
        this.employeesService
          .update(result.id, {
            id: result.id,
            ...payload
          })
          .subscribe({
            next: () => {
              this.isSaving.set(false);
              this.loadEmployees();
            },
            error: () => {
              this.isSaving.set(false);
              this.errorMessage.set('No se pudo actualizar el empleado.');
            }
          });
        return;
      }

      this.employeesService.create(payload).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.pageNumber.set(1);
          this.loadEmployees();
        },
        error: () => {
          this.isSaving.set(false);
          this.errorMessage.set('No se pudo crear el empleado.');
        }
      });
    });
  }

  private loadEmployees(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.employeesService
      .getPaged(this.pageNumber(), this.pageSize(), this.getFilters())
      .subscribe({
        next: response => {
          this.employees.set(response.items);
          this.totalCount.set(response.totalCount);
          this.pageNumber.set(response.pageNumber);
          this.pageSize.set(response.pageSize);
          this.isLoading.set(false);
          this.syncLayoutAfterDataLoad();
        },
        error: () => {
          this.employees.set([]);
          this.totalCount.set(0);
          this.isLoading.set(false);
          this.errorMessage.set('No se pudieron cargar los empleados desde la API.');
        }
      });
  }

  private loadCategories(): void {
    this.isLoadingCategories.set(true);

    this.employeeCategoriesService.getPaged(1, 100).subscribe({
      next: response => {
        this.categories.set(response.items);
        this.isLoadingCategories.set(false);
        this.syncLayoutAfterDataLoad();
      },
      error: () => {
        this.categories.set([]);
        this.isLoadingCategories.set(false);
        this.syncLayoutAfterDataLoad();
      }
    });
  }

  private getFilters(): EmployeeFilters {
    const raw = this.filtersForm.getRawValue();

    return {
      nombre: raw.nombre.trim() || undefined,
      apellido: raw.apellido.trim() || undefined,
      dni: raw.dni.trim() || undefined,
      employeeCategoryId: raw.employeeCategoryId ? Number(raw.employeeCategoryId) : undefined
    };
  }

  private syncLayoutAfterDataLoad(): void {
    this.changeDetectorRef.detectChanges();

    requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'));
    });
  }
}
