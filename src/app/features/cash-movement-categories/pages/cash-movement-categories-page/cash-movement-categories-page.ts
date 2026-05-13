import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog';
import {
  CashMovementCategoryDialogComponent,
  CashMovementCategoryDialogResult
} from '../../components/cash-movement-category-dialog/cash-movement-category-dialog';
import {
  CashMovementCategory,
  CashMovementType
} from '../../models/cash-movement-category.model';
import { CashMovementCategoriesService } from '../../services/cash-movement-categories.service';

type CategoryMovementFilter = 'all' | CashMovementType;

@Component({
  selector: 'app-cash-movement-categories-page',
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
    MatSelectModule,
    RouterLink
  ],
  templateUrl: './cash-movement-categories-page.html',
  styleUrl: './cash-movement-categories-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CashMovementCategoriesPageComponent {
  private readonly dialog = inject(MatDialog);
  private readonly cashMovementCategoriesService = inject(CashMovementCategoriesService);

  readonly categories = signal<CashMovementCategory[]>([]);
  readonly filterTerm = signal('');
  readonly movementFilter = signal<CategoryMovementFilter>('all');
  readonly isLoading = signal(false);
  readonly isSaving = signal(false);
  readonly errorMessage = signal('');
  readonly totalCount = signal(0);
  readonly pageNumber = signal(1);
  readonly pageSize = signal(10);
  readonly filtersExpanded = signal(this.getInitialFiltersExpanded());

  readonly totalCategories = computed(() => this.totalCount());
  readonly categoriesOnPage = computed(() => this.categories().length);
  readonly activeFiltersCount = computed(() => {
    let count = 0;
    if (this.filterTerm().trim()) {
      count += 1;
    }
    if (this.movementFilter() !== 'all') {
      count += 1;
    }
    return count;
  });
  readonly filteredCategories = computed(() => {
    const search = this.filterTerm().trim().toLowerCase();
    const movementType = this.movementFilter();

    return this.categories().filter(category => {
      const matchesType = movementType === 'all' || category.tipoMovimiento === movementType;
      const matchesSearch =
        !search ||
        category.nombre.toLowerCase().includes(search) ||
        category.descripcion.toLowerCase().includes(search);

      return matchesType && matchesSearch;
    });
  });

  constructor() {
    this.loadCategories();
  }

  updateSearchTerm(term: string): void {
    this.filterTerm.set(term);
  }

  updateMovementFilter(value: CategoryMovementFilter): void {
    this.movementFilter.set(value);
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

  editCategory(category: CashMovementCategory): void {
    this.isSaving.set(true);
    this.errorMessage.set('');

    this.cashMovementCategoriesService.getById(category.id).subscribe({
      next: categoryDetail => {
        this.isSaving.set(false);
        this.openDialog(categoryDetail);
      },
      error: () => {
        this.isSaving.set(false);
        this.errorMessage.set('No se pudo cargar el detalle de la categoría.');
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
        title: 'Eliminar categoría',
        message: 'Se eliminará la categoría seleccionada. Esta acción no se puede deshacer.',
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

      this.cashMovementCategoriesService.delete(categoryId).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.loadCategories();
        },
        error: () => {
          this.isSaving.set(false);
          this.errorMessage.set('No se pudo eliminar la categoría.');
        }
      });
    });
  }

  getMovementTypeLabel(tipoMovimiento: CashMovementType): string {
    return tipoMovimiento === 1 ? 'Ingreso' : 'Egreso';
  }

  private openDialog(category?: CashMovementCategory): void {
    const dialogRef = this.dialog.open(CashMovementCategoryDialogComponent, {
      width: '680px',
      maxWidth: 'calc(100vw - 2rem)',
      autoFocus: false,
      panelClass: 'employee-category-dialog-panel',
      backdropClass: 'employee-category-dialog-backdrop',
      data: category ? { category } : {}
    });

    dialogRef.afterClosed().subscribe((result?: CashMovementCategoryDialogResult) => {
      if (!result) {
        return;
      }

      this.isSaving.set(true);
      this.errorMessage.set('');

      if (result.id !== undefined) {
        this.cashMovementCategoriesService
          .update(result.id, {
            id: result.id,
            gymId: result.gymId,
            nombre: result.nombre,
            descripcion: result.descripcion,
            tipoMovimiento: result.tipoMovimiento
          })
          .subscribe({
            next: () => {
              this.isSaving.set(false);
              this.loadCategories();
            },
            error: () => {
              this.isSaving.set(false);
              this.errorMessage.set('No se pudo actualizar la categoría.');
            }
          });
        return;
      }

      this.cashMovementCategoriesService
        .create({
          gymId: result.gymId,
          nombre: result.nombre,
          descripcion: result.descripcion,
          tipoMovimiento: result.tipoMovimiento
        })
        .subscribe({
          next: () => {
            this.isSaving.set(false);
            this.pageNumber.set(1);
            this.loadCategories();
          },
          error: () => {
            this.isSaving.set(false);
            this.errorMessage.set('No se pudo crear la categoría.');
          }
        });
    });
  }

  private loadCategories(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.cashMovementCategoriesService.getPaged(this.pageNumber(), this.pageSize()).subscribe({
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
    return typeof window === 'undefined' ? true : !window.matchMedia('(max-width: 1024px)').matches;
  }
}
