import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog';
import { CashMovementCategory, CashMovementType } from '../../../cash-movement-categories/models/cash-movement-category.model';
import { CashMovementCategoriesService } from '../../../cash-movement-categories/services/cash-movement-categories.service';
import { Client } from '../../../clients/models/client.model';
import { ClientsService } from '../../../clients/services/clients.service';
import { Employee } from '../../../employees/models/employee.model';
import { EmployeesService } from '../../../employees/services/employees.service';
import { PaymentMethod } from '../../../payment-methods/models/payment-method.model';
import { PaymentMethodsService } from '../../../payment-methods/services/payment-methods.service';
import { Payment, PaymentCreatePayload } from '../../../payments/models/payment.model';
import { PaymentsService } from '../../../payments/services/payments.service';
import { RegisterCashMovementDialogComponent } from '../../components/register-cash-movement-dialog/register-cash-movement-dialog';
import { RegisterPaymentDialogComponent } from '../../components/register-payment-dialog/register-payment-dialog';
import {
  CashMovement,
  CashMovementCategoryMonthlySummary,
  CashMovementCreatePayload
} from '../../models/cash-movement.model';
import { CashMovementsService } from '../../services/cash-movements.service';

@Component({
  selector: 'app-movements-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    RouterLink
  ],
  templateUrl: './movements-page.html',
  styleUrl: './movements-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovementsPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly clientsService = inject(ClientsService);
  private readonly employeesService = inject(EmployeesService);
  private readonly paymentsService = inject(PaymentsService);
  private readonly paymentMethodsService = inject(PaymentMethodsService);
  private readonly cashMovementCategoriesService = inject(CashMovementCategoriesService);
  private readonly cashMovementsService = inject(CashMovementsService);

  private readonly today = new Date();
  private readonly currentYear = this.today.getFullYear();
  private readonly currentMonth = this.today.getMonth() + 1;

  readonly clients = signal<Client[]>([]);
  readonly employees = signal<Employee[]>([]);
  readonly paymentMethods = signal<PaymentMethod[]>([]);
  readonly categories = signal<CashMovementCategory[]>([]);
  readonly payments = signal<Payment[]>([]);
  readonly cashMovements = signal<CashMovement[]>([]);
  readonly monthlySummary = signal<CashMovementCategoryMonthlySummary[]>([]);
  readonly balance = signal(0);

  readonly isLoadingLookups = signal(true);
  readonly isLoadingPayments = signal(false);
  readonly isLoadingMovements = signal(false);
  readonly isLoadingInsights = signal(false);
  readonly isSavingPayment = signal(false);
  readonly isSavingMovement = signal(false);
  readonly errorMessage = signal('');

  readonly paymentPageNumber = signal(1);
  readonly paymentPageSize = signal(10);
  readonly paymentTotalCount = signal(0);
  readonly paymentFiltersExpanded = signal(this.getInitialFiltersExpanded());

  readonly movementPageNumber = signal(1);
  readonly movementPageSize = signal(10);
  readonly movementTotalCount = signal(0);
  readonly movementFiltersExpanded = signal(this.getInitialFiltersExpanded());
  readonly insightsExpanded = signal(this.getInitialFiltersExpanded());

  readonly paymentFiltersForm = this.formBuilder.nonNullable.group({
    clientId: [''],
    periodYear: [this.currentYear],
    periodMonth: [this.currentMonth]
  });

  readonly movementFiltersForm = this.formBuilder.nonNullable.group({
    tipo: [''],
    categoryId: ['']
  });

  readonly insightsForm = this.formBuilder.nonNullable.group({
    year: [this.currentYear],
    month: [this.currentMonth],
    categoryIds: [[] as number[]]
  });

  readonly incomeCategories = computed(() => this.categories().filter(category => category.tipoMovimiento === 1));
  readonly expenseCategories = computed(() => this.categories().filter(category => category.tipoMovimiento === 2));
  readonly paymentTotalAmount = computed(() => this.payments().reduce((sum, payment) => sum + payment.monto, 0));
  readonly confirmedPaymentsCount = computed(() => this.payments().filter(payment => this.isConfirmedPayment(payment.estado)).length);
  readonly pendingPaymentsCount = computed(() => this.payments().filter(payment => !this.isConfirmedPayment(payment.estado)).length);
  readonly visibleIncomeAmount = computed(() =>
    this.cashMovements()
      .filter(movement => movement.tipoMovimiento === 1)
      .reduce((sum, movement) => sum + movement.monto, 0)
  );
  readonly visibleExpenseAmount = computed(() =>
    this.cashMovements()
      .filter(movement => movement.tipoMovimiento === 2)
      .reduce((sum, movement) => sum + movement.monto, 0)
  );
  readonly visibleNetAmount = computed(() => this.visibleIncomeAmount() - this.visibleExpenseAmount());
  readonly monthlyNetAmount = computed(() => this.monthlySummary().reduce((sum, item) => sum + item.net, 0));
  readonly activePaymentFiltersCount = computed(() => {
    const raw = this.paymentFiltersForm.getRawValue();
    let count = 0;
    if (raw.clientId) {
      count += 1;
    }
    if (Number(raw.periodYear) !== this.currentYear) {
      count += 1;
    }
    if (Number(raw.periodMonth) !== this.currentMonth) {
      count += 1;
    }
    return count;
  });
  readonly activeMovementFiltersCount = computed(() => {
    const raw = this.movementFiltersForm.getRawValue();
    return [raw.tipo, raw.categoryId].filter(value => String(value).trim().length > 0).length;
  });
  readonly activeInsightsFiltersCount = computed(() => {
    const raw = this.insightsForm.getRawValue();
    let count = 0;
    if (Number(raw.year) !== this.currentYear) {
      count += 1;
    }
    if (Number(raw.month) !== this.currentMonth) {
      count += 1;
    }
    if (raw.categoryIds.length > 0) {
      count += 1;
    }
    return count;
  });

  constructor() {
    this.loadLookups();
    this.loadPayments();
    this.loadCashMovements();
    this.loadInsights();
    this.loadBalance();
  }

  applyPaymentFilters(): void {
    this.paymentPageNumber.set(1);
    this.loadPayments();
    this.collapseSectionOnMobile(this.paymentFiltersExpanded);
  }

  resetPaymentFilters(): void {
    this.paymentFiltersForm.reset({
      clientId: '',
      periodYear: this.currentYear,
      periodMonth: this.currentMonth
    });
    this.paymentPageNumber.set(1);
    this.loadPayments();
    this.collapseSectionOnMobile(this.paymentFiltersExpanded);
  }

  handlePaymentPageChange(event: PageEvent): void {
    this.paymentPageNumber.set(event.pageIndex + 1);
    this.paymentPageSize.set(event.pageSize);
    this.loadPayments();
  }

  openPaymentDialog(): void {
    if (this.categories().length === 0) {
      this.openMissingCategoriesDialog();
      return;
    }

    const dialogRef = this.dialog.open(RegisterPaymentDialogComponent, {
      width: '760px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      panelClass: 'employee-dialog-panel',
      backdropClass: 'employee-dialog-backdrop',
      data: {
        clients: this.clients(),
        paymentMethods: this.paymentMethods(),
        incomeCategories: this.incomeCategories(),
        defaultDate: this.toDateInputValue(this.today.toISOString()),
        defaultMonth: this.currentMonth,
        defaultYear: this.currentYear
      }
    });

    dialogRef.afterClosed().subscribe((payload?: PaymentCreatePayload) => {
      if (!payload) {
        return;
      }

      this.isSavingPayment.set(true);
      this.errorMessage.set('');

      this.paymentsService.create(payload).subscribe({
        next: () => {
          this.isSavingPayment.set(false);
          this.loadPayments();
          this.loadCashMovements();
          this.loadInsights();
          this.loadBalance();
        },
        error: () => {
          this.isSavingPayment.set(false);
          this.errorMessage.set('No se pudo registrar el pago.');
        }
      });
    });
  }

  openMovementDialog(): void {
    if (this.categories().length === 0) {
      this.openMissingCategoriesDialog();
      return;
    }

    const dialogRef = this.dialog.open(RegisterCashMovementDialogComponent, {
      width: '760px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      panelClass: 'employee-dialog-panel',
      backdropClass: 'employee-dialog-backdrop',
      data: {
        categories: this.categories(),
        employees: this.employees(),
        paymentMethods: this.paymentMethods(),
        defaultDate: this.toDateInputValue(this.today.toISOString())
      }
    });

    dialogRef.afterClosed().subscribe((payload?: CashMovementCreatePayload) => {
      if (!payload) {
        return;
      }

      this.isSavingMovement.set(true);
      this.errorMessage.set('');

      this.cashMovementsService.create(payload).subscribe({
        next: () => {
          this.isSavingMovement.set(false);
          this.loadCashMovements();
          this.loadInsights();
          this.loadBalance();
        },
        error: () => {
          this.isSavingMovement.set(false);
          this.errorMessage.set('No se pudo registrar el movimiento.');
        }
      });
    });
  }

  applyMovementFilters(): void {
    this.movementPageNumber.set(1);
    this.loadCashMovements();
    this.collapseSectionOnMobile(this.movementFiltersExpanded);
  }

  resetMovementFilters(): void {
    this.movementFiltersForm.reset({
      tipo: '',
      categoryId: ''
    });
    this.movementPageNumber.set(1);
    this.loadCashMovements();
    this.collapseSectionOnMobile(this.movementFiltersExpanded);
  }

  handleMovementPageChange(event: PageEvent): void {
    this.movementPageNumber.set(event.pageIndex + 1);
    this.movementPageSize.set(event.pageSize);
    this.loadCashMovements();
  }

  applyInsights(): void {
    this.loadInsights();
    this.collapseSectionOnMobile(this.insightsExpanded);
  }

  togglePaymentFilters(): void {
    this.paymentFiltersExpanded.update(value => !value);
  }

  toggleMovementFilters(): void {
    this.movementFiltersExpanded.update(value => !value);
  }

  toggleInsights(): void {
    this.insightsExpanded.update(value => !value);
  }

  getClientLabel(client: Client): string {
    return `${client.nombre} ${client.apellido}`;
  }

  getPaymentMethodLabel(method: PaymentMethod): string {
    return method.nombre ?? method.descripcion ?? `Metodo #${method.id}`;
  }

  getClientName(clientId: number): string {
    const client = this.clients().find(item => item.id === clientId);
    return client ? `${client.nombre} ${client.apellido}` : `Cliente #${clientId}`;
  }

  getCategoryName(categoryId: number): string {
    return this.categories().find(category => category.id === categoryId)?.nombre ?? `Categoria #${categoryId}`;
  }

  getMovementTypeLabel(type: CashMovementType): string {
    return type === 1 ? 'Ingreso' : 'Egreso';
  }

  getMovementTypeIcon(type: CashMovementType): string {
    return type === 1 ? 'south_west' : 'north_east';
  }

  isConfirmedPayment(state: string): boolean {
    const normalized = state.trim().toLowerCase();
    return normalized === 'confirmado' || normalized === 'confirmed' || normalized === 'paid' || normalized === 'pagado';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(value);
  }

  formatMonthYear(month: number, year: number): string {
    return `${String(month).padStart(2, '0')}/${year}`;
  }

  getCategoriesByType(type: CashMovementType): CashMovementCategory[] {
    return this.categories().filter(category => category.tipoMovimiento === type);
  }

  private openMissingCategoriesDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        title: 'Primero crea una categoria',
        message:
          'Para registrar un pago o un movimiento necesitas al menos una categoria disponible. Crea una categoria y luego vuelve para continuar.',
        confirmLabel: 'Ir a categorias',
        cancelLabel: 'Ahora no',
        tone: 'primary'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) {
        return;
      }

      this.router.navigate(['/movements/categories']);
    });
  }

  private loadLookups(): void {
    this.isLoadingLookups.set(true);
    this.errorMessage.set('');

    this.clientsService.getPaged(1, 1000).subscribe({
      next: clientsResponse => {
        this.clients.set(clientsResponse.items);

        this.employeesService.getPaged(1, 1000).subscribe({
          next: employeesResponse => {
            this.employees.set(employeesResponse.items);

            this.paymentMethodsService.getPaged(1, 1000).subscribe({
              next: methodsResponse => {
                this.paymentMethods.set(methodsResponse.items);

                this.cashMovementCategoriesService.getPaged(1, 1000).subscribe({
                  next: categoriesResponse => {
                    this.categories.set(categoriesResponse.items);
                    this.isLoadingLookups.set(false);
                  },
                  error: () => {
                    this.categories.set([]);
                    this.isLoadingLookups.set(false);
                    this.errorMessage.set('No se pudieron cargar las categorias de movimientos.');
                  }
                });
              },
              error: () => {
                this.paymentMethods.set([]);
                this.isLoadingLookups.set(false);
                this.errorMessage.set('No se pudieron cargar los metodos de pago.');
              }
            });
          },
          error: () => {
            this.employees.set([]);
            this.isLoadingLookups.set(false);
            this.errorMessage.set('No se pudieron cargar los empleados.');
          }
        });
      },
      error: () => {
        this.clients.set([]);
        this.isLoadingLookups.set(false);
        this.errorMessage.set('No se pudieron cargar los clientes.');
      }
    });
  }

  private loadPayments(): void {
    this.isLoadingPayments.set(true);
    this.errorMessage.set('');

    const filtersRaw = this.paymentFiltersForm.getRawValue();

    this.paymentsService.getPaged(this.paymentPageNumber(), this.paymentPageSize(), {
      clientId: filtersRaw.clientId ? Number(filtersRaw.clientId) : undefined,
      periodYear: Number(filtersRaw.periodYear),
      periodMonth: Number(filtersRaw.periodMonth)
    }).subscribe({
      next: response => {
        this.payments.set(response.items);
        this.paymentTotalCount.set(response.totalCount);
        this.paymentPageNumber.set(response.pageNumber);
        this.paymentPageSize.set(response.pageSize);
        this.isLoadingPayments.set(false);
      },
      error: () => {
        this.payments.set([]);
        this.paymentTotalCount.set(0);
        this.isLoadingPayments.set(false);
        this.errorMessage.set('No se pudieron cargar los pagos.');
      }
    });
  }

  private loadCashMovements(): void {
    this.isLoadingMovements.set(true);
    this.errorMessage.set('');

    const filtersRaw = this.movementFiltersForm.getRawValue();

    this.cashMovementsService.getPaged(this.movementPageNumber(), this.movementPageSize(), {
      tipo: filtersRaw.tipo ? Number(filtersRaw.tipo) as CashMovementType : undefined,
      categoryId: filtersRaw.categoryId ? Number(filtersRaw.categoryId) : undefined
    }).subscribe({
      next: response => {
        this.cashMovements.set(response.items);
        this.movementTotalCount.set(response.totalCount);
        this.movementPageNumber.set(response.pageNumber);
        this.movementPageSize.set(response.pageSize);
        this.isLoadingMovements.set(false);
      },
      error: () => {
        this.cashMovements.set([]);
        this.movementTotalCount.set(0);
        this.isLoadingMovements.set(false);
        this.errorMessage.set('No se pudieron cargar los movimientos de caja.');
      }
    });
  }

  private loadInsights(): void {
    this.isLoadingInsights.set(true);
    const raw = this.insightsForm.getRawValue();

    this.cashMovementsService.getMonthlyByCategories(
      Number(raw.year),
      Number(raw.month),
      raw.categoryIds.map(Number)
    ).subscribe({
      next: summary => {
        this.monthlySummary.set(summary);
        this.isLoadingInsights.set(false);
      },
      error: () => {
        this.monthlySummary.set([]);
        this.isLoadingInsights.set(false);
        this.errorMessage.set('No se pudo cargar el resumen mensual por categorias.');
      }
    });
  }

  private loadBalance(): void {
    this.cashMovementsService.getBalance().subscribe({
      next: balance => {
        this.balance.set(balance);
      },
      error: () => {
        this.balance.set(0);
      }
    });
  }

  private toDateInputValue(value: string): string {
    return value.slice(0, 10);
  }

  private getInitialFiltersExpanded(): boolean {
    return typeof window === 'undefined' ? true : !window.matchMedia('(max-width: 768px)').matches;
  }

  private collapseSectionOnMobile(section: { set(value: boolean): void }): void {
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
      section.set(false);
    }
  }
}
