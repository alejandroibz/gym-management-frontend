import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
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
import { ConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog';
import { MembershipPlanDetailsDialogComponent } from '../../components/membership-plan-details-dialog/membership-plan-details-dialog';
import {
  MembershipPlanDialogComponent,
  MembershipPlanDialogResult
} from '../../components/membership-plan-dialog/membership-plan-dialog';
import { MembershipPlan, MembershipPlanFilters } from '../../models/membership-plan.model';
import { MembershipPlansService } from '../../services/membership-plans.service';

@Component({
  selector: 'app-membership-plans-page',
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
  templateUrl: './membership-plans-page.html',
  styleUrl: './membership-plans-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembershipPlansPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialog = inject(MatDialog);
  private readonly membershipPlansService = inject(MembershipPlansService);

  readonly plans = signal<MembershipPlan[]>([]);
  readonly isLoading = signal(false);
  readonly isSaving = signal(false);
  readonly errorMessage = signal('');
  readonly totalCount = signal(0);
  readonly pageNumber = signal(1);
  readonly pageSize = signal(12);

  readonly filtersForm = this.formBuilder.nonNullable.group({
    nombre: ['']
  });

  readonly totalPlans = computed(() => this.totalCount());
  readonly plansOnPage = computed(() => this.plans().length);

  constructor() {
    this.loadPlans();
  }

  handlePageChange(event: PageEvent): void {
    this.pageNumber.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
    this.loadPlans();
  }

  applyFilters(): void {
    this.pageNumber.set(1);
    this.loadPlans();
  }

  resetFilters(): void {
    this.filtersForm.reset({
      nombre: ''
    });
    this.pageNumber.set(1);
    this.loadPlans();
  }

  openCreateModal(): void {
    this.openDialog();
  }

  viewPlanDetails(plan: MembershipPlan): void {
    this.isSaving.set(true);
    this.errorMessage.set('');

    this.membershipPlansService.getById(plan.id).subscribe({
      next: planDetail => {
        this.isSaving.set(false);
        this.dialog.open(MembershipPlanDetailsDialogComponent, {
          width: '720px',
          maxWidth: 'calc(100vw - 1rem)',
          autoFocus: false,
          panelClass: 'employee-dialog-panel',
          backdropClass: 'employee-dialog-backdrop',
          data: { plan: planDetail }
        });
      },
      error: () => {
        this.isSaving.set(false);
        this.errorMessage.set('No se pudo cargar el detalle del plan.');
      }
    });
  }

  editPlan(plan: MembershipPlan): void {
    this.isSaving.set(true);
    this.errorMessage.set('');

    this.membershipPlansService.getById(plan.id).subscribe({
      next: planDetail => {
        this.isSaving.set(false);
        this.openDialog(planDetail);
      },
      error: () => {
        this.isSaving.set(false);
        this.errorMessage.set('No se pudo cargar el detalle del plan.');
      }
    });
  }

  removePlan(plan: MembershipPlan): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      panelClass: 'employee-category-dialog-panel',
      backdropClass: 'employee-category-dialog-backdrop',
      data: {
        title: 'Eliminar plan',
        message: `Se eliminara el plan ${plan.nombre}. Esta accion no se puede deshacer.`,
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

      this.membershipPlansService.delete(plan.id).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.loadPlans();
        },
        error: () => {
          this.isSaving.set(false);
          this.errorMessage.set('No se pudo eliminar el plan.');
        }
      });
    });
  }

  private openDialog(plan?: MembershipPlan): void {
    const dialogRef = this.dialog.open(MembershipPlanDialogComponent, {
      width: '760px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      panelClass: 'employee-dialog-panel',
      backdropClass: 'employee-dialog-backdrop',
      data: plan ? { plan } : {}
    });

    dialogRef.afterClosed().subscribe((result?: MembershipPlanDialogResult) => {
      if (!result) {
        return;
      }

      this.isSaving.set(true);
      this.errorMessage.set('');

      const payload = {
        gymId: plan?.gymId ?? 1,
        nombre: result.nombre,
        descripcion: result.descripcion,
        precio: result.precio,
        duracionDias: result.duracionDias
      };

      if (result.id !== undefined) {
        this.membershipPlansService
          .update(result.id, {
            id: result.id,
            ...payload
          })
          .subscribe({
            next: () => {
              this.isSaving.set(false);
              this.loadPlans();
            },
            error: () => {
              this.isSaving.set(false);
              this.errorMessage.set('No se pudo actualizar el plan.');
            }
          });
        return;
      }

      this.membershipPlansService.create(payload).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.pageNumber.set(1);
          this.loadPlans();
        },
        error: () => {
          this.isSaving.set(false);
          this.errorMessage.set('No se pudo crear el plan.');
        }
      });
    });
  }

  private loadPlans(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.membershipPlansService
      .getPaged(this.pageNumber(), this.pageSize(), this.getFilters())
      .subscribe({
        next: response => {
          this.plans.set(response.items);
          this.totalCount.set(response.totalCount);
          this.pageNumber.set(response.pageNumber);
          this.pageSize.set(response.pageSize);
          this.isLoading.set(false);
        },
        error: () => {
          this.plans.set([]);
          this.totalCount.set(0);
          this.isLoading.set(false);
          this.errorMessage.set('No se pudieron cargar los planes desde la API.');
        }
      });
  }

  private getFilters(): MembershipPlanFilters {
    const raw = this.filtersForm.getRawValue();

    return {
      nombre: raw.nombre.trim() || undefined
    };
  }
}
