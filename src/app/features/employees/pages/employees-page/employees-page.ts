import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { AppPageEvent, AppPaginatorComponent } from '../../../../core/components/app-paginator/app-paginator';
import { ConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog';
import { EmployeeCategory } from '../../../employee-categories/models/employee-category.model';
import { EmployeeCategoriesService } from '../../../employee-categories/services/employee-categories.service';
import { HealthProfessional } from '../../../health/models/health.model';
import { HealthServiceApi } from '../../../health/services/health.service';
import {
  EmployeeDialogComponent,
  EmployeeDialogResult
} from '../../components/employee-dialog/employee-dialog';
import { Employee, EmployeeCreatePayload, EmployeeFilters, EmployeeUpdatePayload } from '../../models/employee.model';
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
    MatProgressSpinnerModule,
    AppPaginatorComponent,
    RouterLink
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
  private readonly healthService = inject(HealthServiceApi);

  readonly employees = signal<Employee[]>([]);
  readonly categories = signal<EmployeeCategory[]>([]);
  readonly healthProfessionals = signal<HealthProfessional[]>([]);
  readonly isLoading = signal(false);
  readonly isSaving = signal(false);
  readonly isLoadingCategories = signal(false);
  readonly errorMessage = signal('');
  readonly totalCount = signal(0);
  readonly pageNumber = signal(1);
  readonly pageSize = signal(10);

  readonly filtersForm = this.formBuilder.nonNullable.group({
    search: ['']
  });

  readonly totalEmployees = computed(() => this.totalCount());
  readonly representedCategoriesCount = computed(() => new Set(this.employees().map(employee => employee.employeeCategoryId)).size);
  readonly visiblePayrollTotal = computed(() => this.employees().reduce((sum, employee) => sum + employee.sueldo, 0));
  readonly activeFiltersCount = computed(() => {
    const raw = this.filtersForm.getRawValue();
    return raw.search.trim().length > 0 ? 1 : 0;
  });
  readonly activeFilterChips = computed(() => {
    const raw = this.filtersForm.getRawValue();
    const search = raw.search.trim();

    return search ? [{ label: 'Búsqueda', value: search }] : [];
  });

  constructor() {
    this.loadCategories();
    this.loadEmployees();
    this.loadHealthProfessionals();
  }

  handlePageChange(event: AppPageEvent): void {
    this.pageNumber.set(event.pageNumber);
    this.pageSize.set(event.pageSize);
    this.loadEmployees();
  }

  applyFilters(): void {
    this.pageNumber.set(1);
    this.loadEmployees();
  }

  resetFilters(): void {
    this.filtersForm.reset({
      search: ''
    });
    this.pageNumber.set(1);
    this.loadEmployees();
  }

  openCreateModal(): void {
    if (this.categories().length === 0) {
      this.openMissingCategoriesDialog();
      return;
    }

    this.openDialog();
  }

  openEmployeeDetails(employee: Employee): void {
    this.router.navigate(['/employees', employee.id]);
  }

  editEmployee(employee: Employee): void {
    this.openDialog(employee);
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

  getAppAccessLabel(employee: Employee): string {
    if (!employee.hasAppAccess) {
      return 'Sin acceso';
    }

    return employee.appRole ? employee.appRole : 'Con acceso';
  }

  getHealthProfessional(employee: Employee): HealthProfessional | null {
    return this.healthProfessionals().find(professional => professional.employeeId === employee.id) ?? null;
  }

  getHealthProfessionalLabel(employee: Employee): string {
    const professional = this.getHealthProfessional(employee);

    if (!professional) {
      return 'No asignado';
    }

    return professional.professionalTypeName || professional.specialty || 'Profesional de salud';
  }

  openHealthCatalog(employee?: Employee): void {
    this.router.navigate(['/health'], {
      queryParams: employee ? { employeeId: employee.id } : undefined
    });
  }

  hasActiveFilters(): boolean {
    return this.activeFiltersCount() > 0;
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
        categories: this.categories(),
        healthProfessional: employee ? this.getHealthProfessional(employee) : null
      }
    });

    dialogRef.afterClosed().subscribe((result?: EmployeeDialogResult) => {
      if (!result) {
        return;
      }

      this.isSaving.set(true);
      this.errorMessage.set('');

      const payload = this.buildEmployeePayload(result);

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

  private openMissingCategoriesDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        title: 'Primero crea una categoría',
        message:
          'Para registrar un empleado necesitas al menos una categoría disponible. Crea una categoría y luego vuelve para continuar con el alta.',
        confirmLabel: 'Ir a categorias',
        cancelLabel: 'Ahora no',
        tone: 'primary'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) {
        return;
      }

      this.router.navigate(['/employees/categories']);
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

  private loadHealthProfessionals(): void {
    this.healthService.getProfessionals().subscribe({
      next: response => {
        this.healthProfessionals.set(response.items);
        this.syncLayoutAfterDataLoad();
      },
      error: () => {
        this.healthProfessionals.set([]);
      }
    });
  }

  private getFilters(): EmployeeFilters {
    const raw = this.filtersForm.getRawValue();
    const search = raw.search.trim();
    const filters: EmployeeFilters = {};

    if (search) {
      if (/^\d+$/.test(search)) {
        filters.dni = search;
      } else {
        filters.nombre = search;
      }
    }

    return filters;
  }

  private buildEmployeePayload(result: EmployeeDialogResult): EmployeeCreatePayload | EmployeeUpdatePayload {
    return {
      branchId: result.branchId,
      employeeCategoryId: result.employeeCategoryId,
      nombre: result.nombre,
      apellido: result.apellido,
      dni: result.dni,
      telefono: result.telefono,
      email: result.email,
      fechaNacimiento: result.fechaNacimiento,
      fechaIngreso: result.fechaIngreso,
      sueldo: result.sueldo,
      appAccess: result.appAccess ?? null
    };
  }

  private syncLayoutAfterDataLoad(): void {
    this.changeDetectorRef.detectChanges();

    requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'));
    });
  }
}
