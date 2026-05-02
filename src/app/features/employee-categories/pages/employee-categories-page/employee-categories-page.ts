import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog';
import {
  EmployeeCategoryDialogComponent,
  EmployeeCategoryDialogResult
} from '../../components/employee-category-dialog/employee-category-dialog';
import { EmployeeCategory } from '../../models/employee-category.model';
import { EmployeeCategoriesService } from '../../services/employee-categories.service';

@Component({
  selector: 'app-employee-categories-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    RouterLink
  ],
  templateUrl: './employee-categories-page.html',
  styleUrl: './employee-categories-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeCategoriesPageComponent {
  private readonly dialog = inject(MatDialog);
  private readonly employeeCategoriesService = inject(EmployeeCategoriesService);

  readonly categories = signal<EmployeeCategory[]>([]);
  readonly filterTerm = signal('');
  readonly isLoading = signal(false);
  readonly isSaving = signal(false);
  readonly errorMessage = signal('');
  readonly totalCount = signal(0);
  readonly pageNumber = signal(1);
  readonly pageSize = signal(10);
  readonly filtersExpanded = signal(this.getInitialFiltersExpanded());

  readonly totalCategories = computed(() => this.totalCount());
  readonly categoriesOnPage = computed(() => this.categories().length);
  readonly activeFiltersCount = computed(() => this.filterTerm().trim() ? 1 : 0);
  readonly currentRangeLabel = computed(() => {
    if (this.totalCount() === 0 || this.filteredCategories().length === 0) {
      return 'Sin resultados';
    }

    const start = (this.pageNumber() - 1) * this.pageSize() + 1;
    const end = start + this.categoriesOnPage() - 1;

    return `${start}-${end}`;
  });
  readonly filteredCategories = computed(() => {
    const search = this.filterTerm().trim().toLowerCase();

    return this.categories().filter(category => {
      if (!search) {
        return true;
      }

      return (
        category.nombre.toLowerCase().includes(search) ||
        category.descripcion.toLowerCase().includes(search)
      );
    });
  });

  constructor() {
    this.loadCategories();
  }

  updateSearchTerm(term: string): void {
    this.filterTerm.set(term);
  }

  toggleFilters(): void {
    this.filtersExpanded.update(value => !value);
  }

  handlePageChange(event: PageEvent): void {
    this.pageNumber.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
    this.loadCategories();
  }

  openCreateModal(): void {
    this.openDialog();
  }

  editCategory(category: EmployeeCategory): void {
    this.isSaving.set(true);
    this.errorMessage.set('');

    this.employeeCategoriesService.getById(category.id).subscribe({
      next: categoryDetail => {
        this.isSaving.set(false);
        this.openDialog(categoryDetail);
      },
      error: () => {
        this.isSaving.set(false);
        this.errorMessage.set('No se pudo cargar el detalle de la categoria.');
      }
    });
  }

  removeCategory(categoryId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      panelClass: 'employee-category-dialog-panel',
      backdropClass: 'employee-category-dialog-backdrop',
      data: {
        title: 'Eliminar categoria',
        message: 'Se eliminara la categoria seleccionada. Esta accion no se puede deshacer.',
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

      this.employeeCategoriesService.delete(categoryId).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.loadCategories();
        },
        error: () => {
          this.isSaving.set(false);
          this.errorMessage.set('No se pudo eliminar la categoria.');
        }
      });
    });
  }

  private openDialog(category?: EmployeeCategory): void {
    const dialogRef = this.dialog.open(EmployeeCategoryDialogComponent, {
      width: '680px',
      maxWidth: 'calc(100vw - 2rem)',
      autoFocus: false,
      panelClass: 'employee-category-dialog-panel',
      backdropClass: 'employee-category-dialog-backdrop',
      data: category ? { category } : {}
    });

    dialogRef.afterClosed().subscribe((result?: EmployeeCategoryDialogResult) => {
      if (!result) {
        return;
      }

      this.isSaving.set(true);
      this.errorMessage.set('');

      if (result.id !== undefined) {
        this.employeeCategoriesService
          .update(result.id, {
            id: result.id,
            nombre: result.nombre,
            descripcion: result.descripcion,
            gymId: result.gymId
          })
          .subscribe({
            next: () => {
              this.isSaving.set(false);
              this.loadCategories();
            },
            error: () => {
              this.isSaving.set(false);
              this.errorMessage.set('No se pudo actualizar la categoria.');
            }
          });
        return;
      }

      this.employeeCategoriesService
        .create({
          nombre: result.nombre,
          descripcion: result.descripcion,
          gymId: result.gymId
        })
        .subscribe({
          next: () => {
            this.isSaving.set(false);
            this.pageNumber.set(1);
            this.loadCategories();
          },
          error: () => {
            this.isSaving.set(false);
            this.errorMessage.set('No se pudo crear la categoria.');
          }
        });
    });
  }

  private loadCategories(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.employeeCategoriesService.getPaged(this.pageNumber(), this.pageSize()).subscribe({
      next: response => {
        this.categories.set(response.items);
        this.totalCount.set(response.totalCount);
        this.pageNumber.set(response.pageNumber);
        this.pageSize.set(response.pageSize);
        this.isLoading.set(false);
      },
      error: () => {
        this.categories.set([]);
        this.totalCount.set(0);
        this.isLoading.set(false);
        this.errorMessage.set('No se pudieron cargar las categorias desde la API.');
      }
    });
  }

  private getInitialFiltersExpanded(): boolean {
    return typeof window === 'undefined' ? true : !window.matchMedia('(max-width: 768px)').matches;
  }
}
