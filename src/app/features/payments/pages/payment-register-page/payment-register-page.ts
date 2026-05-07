import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { forkJoin } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog';
import { CashMovementCategory } from '../../../cash-movement-categories/models/cash-movement-category.model';
import { CashMovementCategoriesService } from '../../../cash-movement-categories/services/cash-movement-categories.service';
import { Client, ClientMembership } from '../../../clients/models/client.model';
import { ClientsService } from '../../../clients/services/clients.service';
import { Employee } from '../../../employees/models/employee.model';
import { EmployeesService } from '../../../employees/services/employees.service';
import { PaymentMethod } from '../../../payment-methods/models/payment-method.model';
import { PaymentMethodsService } from '../../../payment-methods/services/payment-methods.service';
import { PaymentCreatePayload } from '../../models/payment.model';
import { PaymentsService } from '../../services/payments.service';

type ReturnTarget = 'clients' | 'movements';

@Component({
  selector: 'app-payment-register-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
  templateUrl: './payment-register-page.html',
  styleUrl: './payment-register-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentRegisterPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly auth = inject(AuthService);
  private readonly clientsService = inject(ClientsService);
  private readonly employeesService = inject(EmployeesService);
  private readonly paymentMethodsService = inject(PaymentMethodsService);
  private readonly cashMovementCategoriesService = inject(CashMovementCategoriesService);
  private readonly paymentsService = inject(PaymentsService);

  readonly clients = signal<Client[]>([]);
  readonly employees = signal<Employee[]>([]);
  readonly paymentMethods = signal<PaymentMethod[]>([]);
  readonly categories = signal<CashMovementCategory[]>([]);
  readonly selectedClient = signal<Client | null>(null);
  readonly selectedCategoryId = signal<number | null>(null);
  readonly isLoading = signal(true);
  readonly isSaving = signal(false);
  readonly errorMessage = signal('');
  readonly returnTarget = signal<ReturnTarget>('movements');

  readonly incomeCategories = computed(() => this.categories().filter(category => category.tipoMovimiento === 1));
  readonly currentMembership = computed(() => this.getEffectiveMembership(this.selectedClient()));
  readonly selectedCategory = computed(() => {
    const categoryId = this.selectedCategoryId();
    return this.incomeCategories().find(category => category.id === categoryId) ?? null;
  });
  readonly isMembershipPayment = computed(() => this.isMembershipCategory(this.selectedCategory()));
  readonly paymentTypeLabel = computed(() => this.selectedCategory()?.nombre ?? 'Tipo de cobro sin seleccionar');
  readonly breadcrumbClientLabel = computed(() => this.selectedClient() ? this.getClientLabel(this.selectedClient()!) : 'Seleccionar cliente');
  readonly membershipLabel = computed(() => {
    const membership = this.currentMembership();
    return membership?.plan?.nombre ?? (membership ? `Plan #${membership.membershipPlanId}` : 'Sin membresia activa');
  });

  readonly form = this.formBuilder.group(
    {
      clientId: [null as number | null, [Validators.required]],
      clientMembershipId: [null as number | null],
      cashMovementCategoryId: [null as number | null, [Validators.required]],
      paymentMethodId: [null as number | null, [Validators.required]],
      fechaPago: [this.toDateInputValue(new Date().toISOString()), [Validators.required]],
      monto: [0, [Validators.required, Validators.min(0)]],
      aplicarDescuento: [false],
      montoOriginal: [null as number | null, [Validators.min(0)]],
      descuentoMonto: [0, [Validators.required, Validators.min(0)]],
      descuentoPorcentaje: [null as number | null, [Validators.min(0), Validators.max(100)]],
      descuentoMotivo: ['', [Validators.maxLength(160)]],
      collectedByEmployeeEmail: ['', [Validators.required]]
    },
    { validators: [this.paymentValidator] }
  );

  constructor() {
    this.auth.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(user => {
        if (typeof user?.email === 'string' && user.email.trim()) {
          this.applyDefaultEmployeeEmail(user.email);
        }
      });

    this.loadLookups();
  }

  onClientChange(): void {
    const clientId = Number(this.form.controls.clientId.value);
    const client = this.clients().find(item => item.id === clientId) ?? null;
    this.selectedClient.set(client);
    this.applyMembershipDefaults();

    if (clientId) {
      this.loadClientDetails(clientId);
    }
  }

  onCategoryChange(): void {
    this.selectedCategoryId.set(Number(this.form.controls.cashMovementCategoryId.value) || null);
    this.applyMembershipDefaults();
    this.form.updateValueAndValidity({ emitEvent: false });
  }

  onDiscountToggle(): void {
    if (this.isDiscountApplied()) {
      const currentAmount = Number(this.form.controls.monto.value ?? 0);

      if (!this.form.controls.montoOriginal.value && currentAmount > 0) {
        this.form.controls.montoOriginal.setValue(currentAmount, { emitEvent: false });
      }

      this.form.updateValueAndValidity({ emitEvent: false });
      return;
    }

    const originalAmount = Number(this.form.controls.montoOriginal.value ?? 0);

    this.form.patchValue({
      monto: originalAmount > 0 ? originalAmount : this.form.controls.monto.value,
      montoOriginal: null,
      descuentoMonto: 0,
      descuentoPorcentaje: null,
      descuentoMotivo: ''
    }, { emitEvent: false });
    this.form.updateValueAndValidity({ emitEvent: false });
  }

  onOriginalAmountInput(): void {
    this.updateFinalAmountFromDiscount();
  }

  onDiscountAmountInput(): void {
    this.updateFinalAmountFromDiscount();
  }

  onDiscountPercentageInput(): void {
    if (!this.isDiscountApplied()) {
      return;
    }

    const originalAmount = Number(this.form.controls.montoOriginal.value ?? 0);
    const percentage = Number(this.form.controls.descuentoPorcentaje.value ?? 0);

    if (originalAmount <= 0 || percentage < 0 || percentage > 100) {
      return;
    }

    this.form.controls.descuentoMonto.setValue(Math.round((originalAmount * percentage) / 100), { emitEvent: false });
    this.updateFinalAmountFromDiscount();
  }

  confirmPayment(): void {
    if (this.isMembershipPayment() && !this.currentMembership()?.id) {
      this.errorMessage.set('Para cobrar una membresia, selecciona un cliente con membresia activa.');
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.buildPayload();
    const client = this.selectedClient();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '520px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        title: 'Confirmar cobro',
        message: this.getConfirmationMessage(payload, client),
        confirmLabel: 'Confirmar cobro',
        cancelLabel: 'Cancelar',
        tone: 'primary'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) {
        return;
      }

      this.savePayment(payload);
    });
  }

  cancel(): void {
    this.navigateBack();
  }

  getClientLabel(client: Client): string {
    return `${client.nombre} ${client.apellido}`;
  }

  getPaymentMethodLabel(method: PaymentMethod): string {
    return method.nombre ?? method.descripcion ?? `Metodo #${method.id}`;
  }

  getEmployeeLabel(employee: Employee): string {
    return `${employee.nombre} ${employee.apellido} - ${employee.email || 'Sin email'}`;
  }

  canSelectEmployee(employee: Employee): boolean {
    return !!employee.email?.trim();
  }

  isDiscountApplied(): boolean {
    return this.form.controls.aplicarDescuento.value === true;
  }

  hasDiscount(): boolean {
    return this.isDiscountApplied() && Number(this.form.controls.descuentoMonto.value ?? 0) > 0;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(value);
  }

  private loadLookups(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    forkJoin({
      clients: this.clientsService.getPaged(1, 1000),
      employees: this.employeesService.getPaged(1, 1000),
      paymentMethods: this.paymentMethodsService.getPaged(1, 1000),
      categories: this.cashMovementCategoriesService.getPaged(1, 1000)
    }).subscribe({
      next: response => {
        this.clients.set(response.clients.items);
        this.employees.set(response.employees.items);
        this.paymentMethods.set(response.paymentMethods.items);
        this.categories.set(response.categories.items);
        const firstCategoryId = this.incomeCategories()[0]?.id ?? null;
        this.selectedCategoryId.set(firstCategoryId);
        this.form.controls.cashMovementCategoryId.setValue(firstCategoryId);
        this.form.controls.paymentMethodId.setValue(this.paymentMethods()[0]?.id ?? null);
        this.applyDefaultEmployeeEmail();
        this.applyInitialRouteState();
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.errorMessage.set('No se pudieron cargar las opciones para registrar el cobro.');
      }
    });
  }

  private applyInitialRouteState(): void {
    const clientId = Number(this.route.snapshot.queryParamMap.get('clientId'));
    const source = this.route.snapshot.queryParamMap.get('from');
    this.returnTarget.set(source === 'clients' ? 'clients' : 'movements');

    if (!clientId) {
      return;
    }

    this.form.controls.clientId.setValue(clientId);
    this.selectedClient.set(this.clients().find(client => client.id === clientId) ?? null);
    this.applyMembershipDefaults();
    this.loadClientDetails(clientId);
  }

  private loadClientDetails(clientId: number): void {
    this.clientsService.getById(clientId).subscribe({
      next: client => {
        if (Number(this.form.controls.clientId.value) !== clientId) {
          return;
        }

        this.selectedClient.set(client);
        this.applyMembershipDefaults();
      }
    });
  }

  private applyMembershipDefaults(): void {
    const membership = this.currentMembership();
    const shouldUseMembership = this.isMembershipPayment();

    this.form.patchValue({
      clientMembershipId: shouldUseMembership ? membership?.id ?? null : null
    }, { emitEvent: false });

    if (shouldUseMembership && membership?.precioFinal && !this.isDiscountApplied()) {
      this.form.patchValue({
        monto: membership.precioFinal
      }, { emitEvent: false });
    }

    if (shouldUseMembership && membership?.precioFinal && this.isDiscountApplied()) {
      this.form.patchValue({
        montoOriginal: this.form.controls.montoOriginal.value ?? membership.precioFinal
      }, { emitEvent: false });
      this.updateFinalAmountFromDiscount();
    }
  }

  private applyDefaultEmployeeEmail(email?: string): void {
    if (this.form.controls.collectedByEmployeeEmail.value) {
      return;
    }

    const normalizedEmail = email?.trim().toLowerCase();
    const matched = normalizedEmail
      ? this.employees().find(employee => employee.email?.trim().toLowerCase() === normalizedEmail)
      : null;
    const fallback = this.employees().find(employee => employee.email?.trim());

    this.form.controls.collectedByEmployeeEmail.setValue(matched?.email ?? fallback?.email ?? '');
  }

  private updateFinalAmountFromDiscount(): void {
    if (!this.isDiscountApplied()) {
      return;
    }

    const originalAmount = Number(this.form.controls.montoOriginal.value ?? 0);
    const discountAmount = Number(this.form.controls.descuentoMonto.value ?? 0);

    if (originalAmount <= 0 || discountAmount < 0) {
      return;
    }

    this.form.controls.monto.setValue(Math.max(0, originalAmount - discountAmount), { emitEvent: false });
    this.form.updateValueAndValidity({ emitEvent: false });
  }

  private buildPayload(): PaymentCreatePayload {
    const raw = this.form.getRawValue();
    const paymentDate = new Date(`${raw.fechaPago}T00:00:00`);

    return {
      clientId: Number(raw.clientId),
      clientMembershipId: this.isMembershipPayment() ? Number(raw.clientMembershipId) : null,
      fechaPago: paymentDate.toISOString(),
      monto: Number(raw.monto),
      montoOriginal: raw.aplicarDescuento && raw.montoOriginal !== null && raw.montoOriginal !== undefined
        ? Number(raw.montoOriginal)
        : null,
      descuentoMonto: raw.aplicarDescuento ? Number(raw.descuentoMonto ?? 0) : 0,
      descuentoPorcentaje: raw.aplicarDescuento && raw.descuentoPorcentaje !== null && raw.descuentoPorcentaje !== undefined
        ? Number(raw.descuentoPorcentaje)
        : null,
      descuentoMotivo: raw.aplicarDescuento ? raw.descuentoMotivo?.trim() || null : null,
      paymentMethodId: Number(raw.paymentMethodId),
      cashMovementCategoryId: Number(raw.cashMovementCategoryId),
      periodYear: paymentDate.getFullYear(),
      periodMonth: paymentDate.getMonth() + 1,
      collectedByEmployeeEmail: raw.collectedByEmployeeEmail ?? ''
    };
  }

  private getConfirmationMessage(payload: PaymentCreatePayload, client: Client | null): string {
    const lines = [
      `Cliente: ${client ? this.getClientLabel(client) : `#${payload.clientId}`}`,
      this.isMembershipPayment()
        ? `Membresia: ${this.membershipLabel()}`
        : `Tipo de cobro: ${this.paymentTypeLabel()}`,
      `Monto final: ${this.formatCurrency(payload.monto)}`,
      `Metodo: ${this.paymentMethods().find(method => method.id === payload.paymentMethodId)?.nombre ?? 'Sin dato'}`,
      `Fecha: ${new Intl.DateTimeFormat('es-AR').format(new Date(payload.fechaPago))}`
    ];

    if (payload.descuentoMonto > 0) {
      lines.splice(3, 0, `Descuento: ${this.formatCurrency(payload.descuentoMonto)}${payload.descuentoPorcentaje ? ` (${payload.descuentoPorcentaje}%)` : ''}`);
      lines.splice(4, 0, `Motivo: ${payload.descuentoMotivo || 'Sin motivo'}`);
    }

    return lines.join('\n');
  }

  private savePayment(payload: PaymentCreatePayload): void {
    this.isSaving.set(true);
    this.errorMessage.set('');

    this.paymentsService.create(payload).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.navigateBack();
      },
      error: error => {
        this.isSaving.set(false);
        this.errorMessage.set(this.getApiErrorMessage(error, 'No se pudo registrar el cobro.'));
      }
    });
  }

  private navigateBack(): void {
    const clientId = Number(this.form.controls.clientId.value);

    if (this.returnTarget() === 'clients' && clientId) {
      this.router.navigate(['/clients', clientId]);
      return;
    }

    this.router.navigate(['/movements']);
  }

  private isMembershipCategory(category: CashMovementCategory | null): boolean {
    return this.normalizeText(category?.nombre ?? '').includes('membres');
  }

  private getEffectiveMembership(client: Client | null): ClientMembership | null {
    if (!client) {
      return null;
    }

    if (client.membership) {
      return client.membership;
    }

    const history = client.membershipsHistory ?? [];

    return [...history].sort((left, right) => {
      const leftDate = new Date(left.fechaFin ?? left.fechaInicio).getTime();
      const rightDate = new Date(right.fechaFin ?? right.fechaInicio).getTime();
      return rightDate - leftDate;
    })[0] ?? null;
  }

  private paymentValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as {
      aplicarDescuento?: boolean | null;
      montoOriginal?: number | string | null;
      descuentoMonto?: number | string | null;
      descuentoPorcentaje?: number | string | null;
      clientMembershipId?: number | string | null;
      cashMovementCategoryId?: number | string | null;
    };
    const errors: ValidationErrors = {};

    if (value.aplicarDescuento === true) {
      const originalAmount = value.montoOriginal === null || value.montoOriginal === undefined || value.montoOriginal === ''
        ? null
        : Number(value.montoOriginal);
      const discountAmount = Number(value.descuentoMonto ?? 0);
      const discountPercentage = value.descuentoPorcentaje === null || value.descuentoPorcentaje === undefined || value.descuentoPorcentaje === ''
        ? null
        : Number(value.descuentoPorcentaje);

      if (discountAmount < 0) {
        errors['discountAmountNegative'] = true;
      }

      if (originalAmount !== null && discountAmount > originalAmount) {
        errors['discountGreaterThanOriginal'] = true;
      }

      if (discountPercentage !== null && (discountPercentage < 0 || discountPercentage > 100)) {
        errors['discountPercentageRange'] = true;
      }
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  private toDateInputValue(value: string): string {
    return value.slice(0, 10);
  }

  private normalizeText(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase();
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

    return rawMessage || fallback;
  }
}
