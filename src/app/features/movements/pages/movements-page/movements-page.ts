import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
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
import { Payment, PaymentCreatePayload, PaymentUpdatePayload } from '../../../payments/models/payment.model';
import { PaymentsService } from '../../../payments/services/payments.service';
import { RegisterCashMovementDialogComponent } from '../../components/register-cash-movement-dialog/register-cash-movement-dialog';
import { RegisterPaymentDialogComponent } from '../../components/register-payment-dialog/register-payment-dialog';
import {
  CashMovement,
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
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
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
  readonly balance = signal(0);
  readonly monthlyNet = signal(0);

  readonly isLoadingLookups = signal(true);
  readonly isLoadingPayments = signal(false);
  readonly isLoadingMovements = signal(false);
  readonly isSavingPayment = signal(false);
  readonly isSavingMovement = signal(false);
  readonly errorMessage = signal('');
  readonly currentUserEmail = signal<string | null>(null);

  readonly paymentPageNumber = signal(1);
  readonly paymentPageSize = signal(10);
  readonly paymentTotalCount = signal(0);
  readonly paymentFiltersExpanded = signal(this.getInitialFiltersExpanded());

  readonly movementPageNumber = signal(1);
  readonly movementPageSize = signal(10);
  readonly movementTotalCount = signal(0);
  readonly movementFiltersExpanded = signal(this.getInitialFiltersExpanded());

  readonly paymentFiltersForm = this.formBuilder.nonNullable.group({
    clientId: [''],
    hasDiscount: [''],
    periodYear: [this.currentYear],
    periodMonth: [this.currentMonth]
  });

  readonly movementFiltersForm = this.formBuilder.nonNullable.group({
    tipo: [''],
    categoryId: [''],
    fechaMovimientoDesde: [this.getCurrentMonthStartDate()],
    fechaMovimientoHasta: [this.getCurrentMonthEndDate()]
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
  readonly monthlyNetAmount = computed(() => this.monthlyNet());
  readonly activePaymentFiltersCount = computed(() => {
    const raw = this.paymentFiltersForm.getRawValue();
    let count = 0;
    if (raw.clientId) {
      count += 1;
    }
    if (raw.hasDiscount) {
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
    let count = [raw.tipo, raw.categoryId].filter(value => String(value).trim().length > 0).length;

    if (raw.fechaMovimientoDesde !== this.getCurrentMonthStartDate()) {
      count += 1;
    }

    if (raw.fechaMovimientoHasta !== this.getCurrentMonthEndDate()) {
      count += 1;
    }

    return count;
  });

  constructor() {
    this.auth.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(user => {
      if (typeof user?.email === 'string' && user.email.trim()) {
        this.currentUserEmail.set(user.email.trim());
      }
    });
    this.loadLookups();
    this.loadPayments();
    this.loadCashMovements();
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
      hasDiscount: '',
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

  openPaymentDialog(payment?: Payment): void {
    if (!payment) {
      this.router.navigate(['/movements/payments/new'], {
        queryParams: {
          from: 'movements'
        }
      });
      return;
    }

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
        employees: this.employees(),
        paymentMethods: this.paymentMethods(),
        incomeCategories: this.incomeCategories(),
        defaultDate: this.toDateInputValue(this.today.toISOString()),
        defaultMonth: this.getPaymentPeriodMonth(payment),
        defaultYear: this.getPaymentPeriodYear(payment),
        defaultEmployeeEmail: this.currentUserEmail(),
        payment
      }
    });

    dialogRef.afterClosed().subscribe((payload?: PaymentCreatePayload) => {
      if (!payload) {
        return;
      }

      this.isSavingPayment.set(true);
      this.errorMessage.set('');

      const request = payment
        ? this.paymentsService.update(payment.id, this.toPaymentUpdatePayload(payment.id, payload))
        : this.paymentsService.create(payload);

      request.subscribe({
        next: () => {
          this.isSavingPayment.set(false);
          this.loadPayments();
        },
        error: error => {
          this.isSavingPayment.set(false);
          this.errorMessage.set(this.getApiErrorMessage(error, payment ? 'No se pudo editar el pago.' : 'No se pudo registrar el pago.'));
        }
      });
    });
  }

  deletePayment(payment: Payment): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        title: 'Eliminar pago',
        message: `Se eliminara el pago de ${this.getClientName(payment.clientId)} por ${this.formatCurrency(payment.monto)}.`,
        confirmLabel: 'Eliminar',
        cancelLabel: 'Cancelar',
        tone: 'danger'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) {
        return;
      }

      this.isSavingPayment.set(true);
      this.errorMessage.set('');

      this.paymentsService.delete(payment.id).subscribe({
        next: () => {
          this.isSavingPayment.set(false);
          this.loadPayments();
        },
        error: () => {
          this.isSavingPayment.set(false);
          this.errorMessage.set('No se pudo eliminar el pago.');
        }
      });
    });
  }

  confirmPayment(payment: Payment): void {
    if (!payment.cashMovementCategoryId) {
      this.errorMessage.set('No se pudo identificar el tipo de cobro para confirmar el pago.');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        title: 'Confirmar cobro',
        message: `Se marcara como confirmado el cobro de ${this.getClientName(payment.clientId)} por ${this.formatCurrency(payment.monto)}.`,
        confirmLabel: 'Confirmar',
        cancelLabel: 'Cancelar',
        tone: 'primary'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) {
        return;
      }

      this.isSavingPayment.set(true);
      this.errorMessage.set('');

      this.paymentsService.confirm(payment.id, payment.cashMovementCategoryId!).subscribe({
        next: () => {
          this.isSavingPayment.set(false);
          this.loadPayments();
        },
        error: () => {
          this.isSavingPayment.set(false);
          this.errorMessage.set('No se pudo confirmar el cobro.');
        }
      });
    });
  }

  openMovementDialog(movement?: CashMovement): void {
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
        defaultDate: this.toDateInputValue(this.today.toISOString()),
        defaultEmployeeEmail: this.currentUserEmail(),
        movement
      }
    });

    dialogRef.afterClosed().subscribe((payload?: CashMovementCreatePayload) => {
      if (!payload) {
        return;
      }

      this.isSavingMovement.set(true);
      this.errorMessage.set('');

      const request = movement
        ? this.cashMovementsService.update(movement.id, payload)
        : this.cashMovementsService.create(payload);

      request.subscribe({
        next: () => {
          this.isSavingMovement.set(false);
          this.loadCashMovements();
          this.loadBalance();
        },
        error: error => {
          this.isSavingMovement.set(false);
          this.errorMessage.set(this.getApiErrorMessage(error, movement ? 'No se pudo editar el movimiento.' : 'No se pudo registrar el movimiento.'));
        }
      });
    });
  }

  deleteMovement(movement: CashMovement): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        title: 'Eliminar movimiento externo',
        message: `Se eliminara el movimiento ${this.getCategoryName(movement.cashMovementCategoryId)} por ${this.formatCurrency(movement.monto)}.`,
        confirmLabel: 'Eliminar',
        cancelLabel: 'Cancelar',
        tone: 'danger'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) {
        return;
      }

      this.isSavingMovement.set(true);
      this.errorMessage.set('');

      this.cashMovementsService.delete(movement.id).subscribe({
        next: () => {
          this.isSavingMovement.set(false);
          this.loadCashMovements();
          this.loadBalance();
        },
        error: () => {
          this.isSavingMovement.set(false);
          this.errorMessage.set('No se pudo eliminar el movimiento.');
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
      categoryId: '',
      fechaMovimientoDesde: this.getCurrentMonthStartDate(),
      fechaMovimientoHasta: this.getCurrentMonthEndDate()
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

  togglePaymentFilters(): void {
    this.paymentFiltersExpanded.update(value => !value);
  }

  toggleMovementFilters(): void {
    this.movementFiltersExpanded.update(value => !value);
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

  getPaymentPeriodLabel(payment: Payment): string {
    return this.formatMonthYear(this.getPaymentPeriodMonth(payment), this.getPaymentPeriodYear(payment));
  }

  getPaymentCollectorLabel(payment: Payment): string {
    return payment.collectedByEmployeeNombre || payment.collectedByEmployeeEmail || 'Sin dato';
  }

  hasPaymentDiscount(payment: Payment): boolean {
    return payment.tieneDescuento === true || Number(payment.descuentoMonto ?? 0) > 0;
  }

  getPaymentOriginalAmountLabel(payment: Payment): string {
    return payment.montoOriginal !== null && payment.montoOriginal !== undefined
      ? this.formatCurrency(payment.montoOriginal)
      : 'Sin dato';
  }

  getPaymentDiscountLabel(payment: Payment): string {
    const discountAmount = Number(payment.descuentoMonto ?? 0);
    const percentage = payment.descuentoPorcentaje !== null && payment.descuentoPorcentaje !== undefined
      ? ` (${payment.descuentoPorcentaje}%)`
      : '';

    return discountAmount > 0 ? `${this.formatCurrency(discountAmount)}${percentage}` : 'Sin descuento';
  }

  getPaymentDiscountReason(payment: Payment): string {
    return payment.descuentoMotivo?.trim() || 'Sin motivo';
  }

  getMovementRegisteredByLabel(movement: CashMovement): string {
    return movement.registeredByEmployeeNombre || movement.registeredByEmployeeEmail || 'Sin dato';
  }

  getMovementRelatedEmployeeLabel(movement: CashMovement): string {
    return movement.relatedEmployeeNombre || (movement.relatedEmployeeId ? `Empleado #${movement.relatedEmployeeId}` : 'Sin empleado relacionado');
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
      hasDiscount: filtersRaw.hasDiscount === '' ? undefined : filtersRaw.hasDiscount === 'true',
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

  private toPaymentUpdatePayload(id: number, payload: PaymentCreatePayload): PaymentUpdatePayload {
    return {
      id,
      clientId: payload.clientId,
      clientMembershipId: payload.clientMembershipId,
      fechaPago: payload.fechaPago,
      monto: payload.monto,
      montoOriginal: payload.montoOriginal,
      descuentoMonto: payload.descuentoMonto,
      descuentoPorcentaje: payload.descuentoPorcentaje,
      descuentoMotivo: payload.descuentoMotivo,
      paymentMethodId: payload.paymentMethodId,
      cashMovementCategoryId: payload.cashMovementCategoryId,
      periodYear: payload.periodYear,
      periodMonth: payload.periodMonth,
      collectedByEmployeeEmail: payload.collectedByEmployeeEmail
    };
  }

  private getApiErrorMessage(error: unknown, fallback: string): string {
    const apiError = error as { error?: { error?: unknown; message?: unknown } | string };
    const rawMessage = typeof apiError.error === 'string'
      ? apiError.error
      : typeof apiError.error?.error === 'string'
        ? apiError.error.error
        : typeof apiError.error?.message === 'string'
          ? apiError.error.message
          : '';

    if (rawMessage.toLowerCase().includes('active employee with email') && rawMessage.toLowerCase().includes('not found')) {
      return 'No se encontro un empleado activo con ese email. Revisa el empleado seleccionado.';
    }

    return rawMessage || fallback;
  }

  private loadCashMovements(): void {
    this.isLoadingMovements.set(true);
    this.errorMessage.set('');

    const filtersRaw = this.movementFiltersForm.getRawValue();

    this.cashMovementsService.getPaged(this.movementPageNumber(), this.movementPageSize(), {
      tipo: filtersRaw.tipo ? Number(filtersRaw.tipo) as CashMovementType : undefined,
      categoryId: filtersRaw.categoryId ? Number(filtersRaw.categoryId) : undefined,
      fechaMovimientoDesde: filtersRaw.fechaMovimientoDesde ? this.toDateTimeStart(filtersRaw.fechaMovimientoDesde) : undefined,
      fechaMovimientoHasta: filtersRaw.fechaMovimientoHasta ? this.toDateTimeEnd(filtersRaw.fechaMovimientoHasta) : undefined
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

  private loadBalance(): void {
    this.cashMovementsService.getBalance().subscribe({
      next: response => {
        this.balance.set(response.balance);
        this.monthlyNet.set(response.netoMes);
      },
      error: () => {
        this.balance.set(0);
        this.monthlyNet.set(0);
      }
    });
  }

  private toDateInputValue(value: string): string {
    return value.slice(0, 10);
  }

  private getPaymentPeriodYear(payment?: Payment): number {
    return payment?.periodYear ?? (Number(this.paymentFiltersForm.controls.periodYear.value) || this.currentYear);
  }

  private getPaymentPeriodMonth(payment?: Payment): number {
    return payment?.periodMonth ?? (Number(this.paymentFiltersForm.controls.periodMonth.value) || this.currentMonth);
  }

  private getCurrentMonthStartDate(): string {
    return `${this.currentYear}-${String(this.currentMonth).padStart(2, '0')}-01`;
  }

  private getCurrentMonthEndDate(): string {
    return new Date(this.currentYear, this.currentMonth, 0).toISOString().slice(0, 10);
  }

  private toDateTimeStart(dateInput: string): string {
    return new Date(`${dateInput}T00:00:00`).toISOString();
  }

  private toDateTimeEnd(dateInput: string): string {
    return new Date(`${dateInput}T23:59:59`).toISOString();
  }

  private getInitialFiltersExpanded(): boolean {
    return typeof window === 'undefined' ? true : !window.matchMedia('(max-width: 1024px)').matches;
  }

  private collapseSectionOnMobile(section: { set(value: boolean): void }): void {
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches) {
      section.set(false);
    }
  }
}
