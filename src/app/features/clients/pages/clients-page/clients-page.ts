import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RoleService } from '../../../../core/auth/role';
import { AppPageEvent, AppPaginatorComponent } from '../../../../core/components/app-paginator/app-paginator';
import { ConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog';
import { createNotifiedErrorSignal } from '../../../../core/services/notified-error-signal';
import { CashMovementCategory } from '../../../cash-movement-categories/models/cash-movement-category.model';
import { CashMovementCategoriesService } from '../../../cash-movement-categories/services/cash-movement-categories.service';
import { Employee } from '../../../employees/models/employee.model';
import { EmployeesService } from '../../../employees/services/employees.service';
import { ClientDialogComponent, ClientDialogResult } from '../../components/client-dialog/client-dialog';
import { Client, ClientCreatePayload, ClientFilters, ClientImportResult, ClientUpdatePayload } from '../../models/client.model';
import { ClientsService } from '../../services/clients.service';
import { MembershipPlan } from '../../../membership-plans/models/membership-plan.model';
import { MembershipPlansService } from '../../../membership-plans/services/membership-plans.service';
import { ClientMembership } from '../../models/client.model';
import { PaymentMethod } from '../../../payment-methods/models/payment-method.model';
import { PaymentMethodsService } from '../../../payment-methods/services/payment-methods.service';
import { debounceTime, distinctUntilChanged, map, merge } from 'rxjs';

type ClientOperationalStatus = 'archived' | 'noMembership' | 'upToDate' | 'nearExpiration' | 'pendingPayment' | 'expired' | 'scheduled' | 'paused';

@Component({
  selector: 'app-clients-page',
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
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    AppPaginatorComponent,
    RouterLink
  ],
  templateUrl: './clients-page.html',
  styleUrl: './clients-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly auth = inject(AuthService);
  private readonly roleService = inject(RoleService);
  private readonly clientsService = inject(ClientsService);
  private readonly membershipPlansService = inject(MembershipPlansService);
  private readonly employeesService = inject(EmployeesService);
  private readonly paymentMethodsService = inject(PaymentMethodsService);
  private readonly cashMovementCategoriesService = inject(CashMovementCategoriesService);

  readonly clients = signal<Client[]>([]);
  readonly membershipPlans = signal<MembershipPlan[]>([]);
  readonly employees = signal<Employee[]>([]);
  readonly paymentMethods = signal<PaymentMethod[]>([]);
  readonly cashMovementCategories = signal<CashMovementCategory[]>([]);
  readonly isLoading = signal(false);
  readonly isSaving = signal(false);
  readonly errorMessage = createNotifiedErrorSignal();
  readonly importResult = signal<ClientImportResult | null>(null);
  readonly importFileName = signal('');
  readonly totalCount = signal(0);
  readonly pageNumber = signal(1);
  readonly pageSize = signal(10);
  readonly clientsWithMembershipCount = signal(0);
  readonly pendingPaymentsTotalCount = signal(0);
  private clientStatsRequestId = 0;
  private clientsRequestId = 0;
  private readonly filterRevision = signal(0);
  private readonly filterStorageKey = 'admin-clients-view-state';
  private readonly columnStorageKey = 'admin-clients-columns';
  readonly visibleColumns = signal(this.restoreColumns());

  readonly filtersForm = this.formBuilder.nonNullable.group({
    search: [''],
    dni: [''],
    paymentStatus: ['all'],
    clientStatus: ['active'],
    contractStatus: ['all'],
    membershipPlanId: [null as number | null]
  });

  readonly totalClients = computed(() => this.totalCount());
  readonly clientsWithMembership = computed(() => this.clientsWithMembershipCount());
  readonly pendingPaymentsCount = computed(() => this.pendingPaymentsTotalCount());
  readonly incomeCategories = computed(() => this.cashMovementCategories().filter(category => category.tipoMovimiento === 1));
  readonly currentUserEmail = signal<string | null>(null);
  readonly isSuperAdmin = toSignal(this.roleService.hasRole('SuperAdmin'), { initialValue: false });
  readonly activeFiltersCount = computed(() => {
    this.filterRevision();
    const raw = this.filtersForm.getRawValue();
    return [
      raw.search.trim(),
      raw.dni.trim(),
      raw.paymentStatus !== 'all' ? raw.paymentStatus : '',
      raw.clientStatus !== 'active' ? raw.clientStatus : '',
      raw.contractStatus !== 'all' ? raw.contractStatus : '',
      raw.membershipPlanId ? String(raw.membershipPlanId) : ''
    ].filter(Boolean).length;
  });
  readonly activeFilterChips = computed(() => {
    this.filterRevision();
    const raw = this.filtersForm.getRawValue();
    const chips: Array<{ label: string; value: string }> = [];

    if (raw.search.trim()) {
      chips.push({ label: 'BÃºsqueda', value: raw.search.trim() });
    }

    return chips;
  });
  readonly visibleFilterChips = computed(() => {
    this.filterRevision();
    const raw = this.filtersForm.getRawValue();
    const chips: Array<{ label: string; value: string }> = [];

    if (raw.search.trim()) chips.push({ label: 'Nombre', value: raw.search.trim() });
    if (raw.dni.trim()) chips.push({ label: 'DNI', value: raw.dni.trim() });
    if (raw.paymentStatus !== 'all') chips.push({ label: 'Estado', value: raw.paymentStatus === 'pending' ? 'Pendiente' : 'Al día' });
    if (raw.clientStatus !== 'active') chips.push({ label: 'Ficha', value: raw.clientStatus === 'archived' ? 'Archivados' : 'Todos' });
    if (raw.contractStatus !== 'all') chips.push({ label: 'Contrato', value: raw.contractStatus === 'missing' ? 'Sin firmar' : 'Firmado' });
    if (raw.membershipPlanId) {
      const plan = this.membershipPlans().find(item => item.id === raw.membershipPlanId);
      chips.push({ label: 'Membresia', value: plan?.nombre ?? `Plan #${raw.membershipPlanId}` });
    }

    return chips;
  });

  constructor() {
    this.restoreViewState();
    const requestedPaymentStatus = this.route.snapshot.queryParamMap.get('paymentStatus');
    const requestedContractStatus = this.route.snapshot.queryParamMap.get('contractStatus');
    if (requestedPaymentStatus === 'pending' || requestedPaymentStatus === 'upToDate') this.filtersForm.controls.paymentStatus.setValue(requestedPaymentStatus);
    if (requestedContractStatus === 'missing' || requestedContractStatus === 'signed') this.filtersForm.controls.contractStatus.setValue(requestedContractStatus);
    this.setupAutomaticFilters();
    this.auth.user$.subscribe(user => {
      this.currentUserEmail.set(typeof user?.email === 'string' ? user.email : null);
    });
    this.loadMembershipPlans();
    this.loadPaymentLookups();
    this.loadClients();
    if (this.route.snapshot.queryParamMap.get('create') === '1') {
      window.setTimeout(() => void this.router.navigate(['/clients/new'], { replaceUrl: true }));
    }
  }

  handlePageChange(event: AppPageEvent): void {
    this.pageNumber.set(event.pageNumber);
    this.pageSize.set(event.pageSize);
    this.persistViewState();
    this.loadClients();
    if (this.route.snapshot.queryParamMap.get('create') === '1') {
      window.setTimeout(() => void this.router.navigate(['/clients/new'], { replaceUrl: true }));
    }
  }

  applyFilters(): void {
    this.pageNumber.set(1);
    this.persistViewState();
    this.loadClients();
    if (this.route.snapshot.queryParamMap.get('create') === '1') {
      window.setTimeout(() => void this.router.navigate(['/clients/new'], { replaceUrl: true }));
    }
  }

  resetFilters(): void {
    this.filtersForm.reset({
      search: '',
      dni: '',
      paymentStatus: 'all',
      clientStatus: 'active',
      contractStatus: 'all',
      membershipPlanId: null
    }, { emitEvent: false });
    this.filterRevision.update(value => value + 1);
    this.pageNumber.set(1);
    this.persistViewState();
    this.loadClients();
    if (this.route.snapshot.queryParamMap.get('create') === '1') {
      window.setTimeout(() => void this.router.navigate(['/clients/new'], { replaceUrl: true }));
    }
  }

  toggleColumn(column: 'dni' | 'membership' | 'contact' | 'status'): void {
    this.visibleColumns.update(current => {
      const next = { ...current, [column]: !current[column] };
      localStorage.setItem(this.columnStorageKey, JSON.stringify(next));
      return next;
    });
  }

  private restoreColumns(): Record<'dni' | 'membership' | 'contact' | 'status', boolean> {
    const defaults = { dni: true, membership: true, contact: true, status: true };
    try {
      return { ...defaults, ...JSON.parse(localStorage.getItem(this.columnStorageKey) ?? '{}') };
    } catch {
      return defaults;
    }
  }

  private persistViewState(): void {
    localStorage.setItem(this.filterStorageKey, JSON.stringify({
      filters: this.filtersForm.getRawValue(),
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize()
    }));
  }

  private restoreViewState(): void {
    try {
      const raw = localStorage.getItem(this.filterStorageKey);
      if (!raw) return;
      const saved = JSON.parse(raw) as {
        filters?: Partial<{ search: string; dni: string; paymentStatus: string; clientStatus: string; contractStatus: string; membershipPlanId: number | null }>;
        pageNumber?: number;
        pageSize?: number;
      };
      if (saved.filters) this.filtersForm.patchValue(saved.filters, { emitEvent: false });
      if (saved.pageNumber && saved.pageNumber > 0) this.pageNumber.set(saved.pageNumber);
      if (saved.pageSize && saved.pageSize > 0) this.pageSize.set(saved.pageSize);
    } catch {
      localStorage.removeItem(this.filterStorageKey);
    }
  }

  openCreateModal(): void {
    this.openDialog();
  }

  importClientsFromFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';

    if (!file) {
      return;
    }

    this.isSaving.set(true);
    this.errorMessage.set('');
    this.importResult.set(null);
    this.importFileName.set(file.name);

    this.clientsService.importClients(file).subscribe({
      next: result => {
        this.isSaving.set(false);
        this.importResult.set(result);
        this.pageNumber.set(1);
        this.loadClients();
      },
      error: error => {
        this.isSaving.set(false);
        this.importFileName.set('');
        this.errorMessage.set(typeof error?.error === 'string' ? error.error : 'No se pudo importar el archivo de clientes.');
      }
    });
  }

  openClientDetails(client: Client): void {
    if (!client.activo) {
      return;
    }

    this.router.navigate(['/clients', client.id]);
  }

  editClient(client: Client): void {
    if (!client.activo) {
      return;
    }

    this.router.navigate(['/clients', client.id], { queryParams: { edit: 1 } });
  }

  reactivateClient(client: Client): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      panelClass: 'employee-category-dialog-panel',
      backdropClass: 'employee-category-dialog-backdrop',
      data: {
        title: 'Reactivar cliente',
        message: `Se reactivara a ${client.nombre} ${client.apellido}.`,
        confirmLabel: 'Reactivar',
        cancelLabel: 'Cancelar',
        tone: 'primary'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) {
        return;
      }

      this.isSaving.set(true);
      this.errorMessage.set('');

      this.clientsService.reactivate(client.id).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.loadClients();
        },
        error: () => {
          this.isSaving.set(false);
          this.errorMessage.set('No se pudo reactivar el cliente.');
        }
      });
    });
  }

  removeClient(client: Client): void {
    if (!this.isSuperAdmin()) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      panelClass: 'employee-category-dialog-panel',
      backdropClass: 'employee-category-dialog-backdrop',
      data: {
        title: 'Archivar cliente',
        message: `Se archivarÃ¡ a ${client.nombre} ${client.apellido}. Los cobros realizados se conservarÃ¡n y la ficha de salud, si existe, seguirÃ¡ disponible desde Salud.`,
        confirmLabel: 'Archivar',
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

      this.clientsService.delete(client.id).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.loadClients();
        },
        error: () => {
          this.isSaving.set(false);
          this.errorMessage.set('No se pudo eliminar el cliente.');
        }
      });
    });
  }

  getWhatsAppLink(phone: string): string {
    return `https://wa.me/${phone.replace(/\D/g, '')}`;
  }

  getMailLink(email: string): string {
    return `mailto:${email}`;
  }

  hasActiveFilters(): boolean {
    return this.activeFiltersCount() > 0;
  }

  private openDialog(client?: Client): void {
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      width: '860px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      panelClass: 'employee-dialog-panel',
      backdropClass: 'employee-dialog-backdrop',
      data: {
        client,
        membershipPlans: this.membershipPlans(),
        paymentMethods: this.paymentMethods(),
        incomeCategories: this.incomeCategories(),
        employees: this.employees(),
        defaultEmployeeEmail: this.currentUserEmail()
      }
    });

    dialogRef.afterClosed().subscribe((result?: ClientDialogResult) => {
      if (!result) {
        return;
      }

      this.isSaving.set(true);
      this.errorMessage.set('');

      const payload = this.buildClientPayload(result);

      if (result.id !== undefined) {
        this.clientsService
          .update(result.id, {
            id: result.id,
            ...payload
          })
          .subscribe({
            next: () => {
              this.isSaving.set(false);
              this.loadClients();
            },
            error: () => {
              this.isSaving.set(false);
              this.errorMessage.set('No se pudo actualizar el cliente.');
            }
          });
        return;
      }

      this.clientsService.create(payload).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.pageNumber.set(1);
          this.loadClients();
        },
        error: () => {
          this.isSaving.set(false);
          this.errorMessage.set('No se pudo crear el cliente.');
        }
      });
    });
  }

  private openMissingMembershipPlansDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        title: 'Primero crea una membresÃ­a',
        message:
          'Para registrar un cliente necesitas tener al menos una membresÃ­a disponible. Crea un plan y luego vuelve para completar el alta.',
        confirmLabel: 'Ir a membresias',
        cancelLabel: 'Ahora no',
        tone: 'primary'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) {
        return;
      }

      this.router.navigate(['/membership-plans']);
    });
  }

  private loadClients(): void {
    const requestId = ++this.clientsRequestId;
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.clientsService
      .getPaged(this.pageNumber(), this.pageSize(), this.getFilters())
      .subscribe({
        next: response => {
          if (requestId !== this.clientsRequestId) return;
          this.clients.set(response.items);
          this.totalCount.set(response.totalCount);
          this.pageNumber.set(response.pageNumber);
          this.pageSize.set(response.pageSize);
          this.loadClientStats(response.totalCount);
          this.isLoading.set(false);
        },
        error: () => {
          if (requestId !== this.clientsRequestId) return;
          this.clients.set([]);
          this.totalCount.set(0);
          this.clientsWithMembershipCount.set(0);
          this.pendingPaymentsTotalCount.set(0);
          this.isLoading.set(false);
          this.errorMessage.set('No se pudieron cargar los clientes desde la API.');
        }
      });
  }

  private setupAutomaticFilters(): void {
    this.filtersForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.filterRevision.update(value => value + 1));

    merge(
      this.filtersForm.controls.search.valueChanges.pipe(map(value => value.trim()), debounceTime(1000), distinctUntilChanged()),
      this.filtersForm.controls.dni.valueChanges.pipe(map(value => value.trim()), debounceTime(1000), distinctUntilChanged())
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.applyFilters());

    merge(
      this.filtersForm.controls.paymentStatus.valueChanges,
      this.filtersForm.controls.clientStatus.valueChanges,
      this.filtersForm.controls.contractStatus.valueChanges,
      this.filtersForm.controls.membershipPlanId.valueChanges
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.applyFilters());
  }

  getMembershipLabel(client: Client): string {
    const membership = this.getEffectiveMembership(client);
    return membership?.plan?.nombre ?? (membership ? `Plan #${membership.membershipPlanId}` : 'Sin membresía');
  }

  getMembershipEndDate(client: Client): string | null {
    return this.getEffectiveMembership(client)?.fechaFin ?? null;
  }

  getMembershipEndLabel(client: Client): string {
    const endDate = this.getMembershipEndDate(client);
    if (!endDate) {
      return 'Sin vencimiento informado';
    }

    const formattedDate = new Intl.DateTimeFormat('es-AR').format(new Date(endDate));
    if (!client.debePago) {
      return `${this.isMembershipExpired(this.getEffectiveMembership(client)) ? 'Venció' : 'Válida hasta'} ${formattedDate}`;
    }
    return `${this.isMembershipExpired(this.getEffectiveMembership(client)) ? 'Vencida el ' : 'Vence '}${formattedDate}`;
  }

  getOperationalStatus(client: Client): ClientOperationalStatus {
    if (this.isArchived(client)) {
      return 'archived';
    }

    const membership = this.getEffectiveMembership(client);
    if (!membership) {
      return 'noMembership';
    }

    if (this.isMembershipExpired(membership)) return 'expired';
    const today = new Intl.DateTimeFormat('en-CA', {timeZone:'America/Argentina/Buenos_Aires',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
    if (membership.fechaInicio.slice(0,10) > today) return 'scheduled';
    if (client.debePago) return 'pendingPayment';

    if (client.membresiaProximaAVencer) {
      return 'nearExpiration';
    }

    return 'upToDate';
  }

  getOperationalStatusLabel(client: Client): string {
    const labels: Record<ClientOperationalStatus, string> = {
      archived: 'Archivado',
      noMembership: 'Sin membresía',
      upToDate: 'Al día',
      nearExpiration: 'Próximo a vencer',
      pendingPayment: 'Pendiente de pago',
      expired: 'Vencida',
      scheduled: 'Programada',
      paused: 'Período pendiente de pago'
    };

    return labels[this.getOperationalStatus(client)];
  }

  isPaymentPending(client: Client): boolean {
    return this.getOperationalStatus(client) === 'pendingPayment';
  }

  isNearExpiration(client: Client): boolean {
    return this.getOperationalStatus(client) === 'nearExpiration';
  }

  isPaused(client: Client): boolean {
    return this.getOperationalStatus(client) === 'paused';
  }

  isNoMembership(client: Client): boolean {
    return this.getOperationalStatus(client) === 'noMembership';
  }
  isArchived(client: Client): boolean {
    return !client.activo;
  }

  getMembershipNotificationChips(client: Client): Array<{ label: string; tone: 'warning' | 'info' | 'success' }> {
    const chips: Array<{ label: string; tone: 'warning' | 'info' | 'success' }> = [];

    if (client.membresiaProximaAVencer) {
      chips.push({ label: 'Próxima a vencer', tone: 'warning' });

      if (!client.membresiaVencimientoNotificado) {
        chips.push({ label: 'Sin notificar', tone: 'info' });
      }
    }

    if (client.membresiaVencimientoNotificado) {
      chips.push({ label: 'Notificado', tone: 'success' });
    }

    return chips;
  }

  private loadMembershipPlans(): void {
    this.membershipPlansService.getPaged(1, 1000).subscribe({
      next: response => {
        this.membershipPlans.set(response.items);
      },
      error: () => {
        this.membershipPlans.set([]);
      }
    });
  }

  private getFilters(): ClientFilters {
    const raw = this.filtersForm.getRawValue();
    const search = raw.search.trim();
    const dni = raw.dni.trim();
    const filters: ClientFilters = {};

    if (search) {
      filters.search = search;
    }

    if (dni) {
      filters.dni = dni;
    }

    if (raw.paymentStatus !== 'all') {
      filters.paymentStatus = raw.paymentStatus as 'pending' | 'upToDate';
    }

    if (raw.clientStatus !== 'active') {
      filters.clientStatus = raw.clientStatus as 'archived' | 'all';
    }

    if (raw.contractStatus !== 'all') {
      filters.contractStatus = raw.contractStatus as 'missing' | 'signed';
    }

    if (raw.membershipPlanId) {
      filters.membershipPlanId = raw.membershipPlanId;
    }

    return filters;
  }

  private buildClientPayload(result: ClientDialogResult): ClientCreatePayload | ClientUpdatePayload {
    return {
      branchId: result.branchId,
      nombre: result.nombre,
      apellido: result.apellido,
      dni: result.dni,
      fechaNacimiento: result.fechaNacimiento,
      telefono: result.telefono,
      email: result.email,
      direccion: result.direccion,
      tieneLesion: result.tieneLesion,
      observaciones: result.observaciones,
      appAccess: result.appAccess ?? null,
      membership: result.membership
        ? {
            membershipPlanId: result.membership.membershipPlanId,
            fechaInicio: result.membership.fechaInicio,
            fechaFin: result.membership.fechaFin,
            periodYear: result.membership.periodYear,
            periodMonth: result.membership.periodMonth,
            precioFinal: result.membership.precioFinal
          }
        : null,
      initialPayment: 'initialPayment' in result ? result.initialPayment ?? null : null
    };
  }

  private loadPaymentLookups(): void {
    this.employeesService.getPaged(1, 1000).subscribe({
      next: response => this.employees.set(response.items),
      error: () => this.employees.set([])
    });

    this.paymentMethodsService.getPaged(1, 1000).subscribe({
      next: response => this.paymentMethods.set(response.items),
      error: () => this.paymentMethods.set([])
    });

    this.cashMovementCategoriesService.getPaged(1, 1000).subscribe({
      next: response => this.cashMovementCategories.set(response.items),
      error: () => this.cashMovementCategories.set([])
    });
  }

  private loadClientStats(totalCount: number): void {
    const requestId = ++this.clientStatsRequestId;

    if (totalCount === 0) {
      this.clientsWithMembershipCount.set(0);
      this.pendingPaymentsTotalCount.set(0);
      return;
    }

    if (totalCount === this.clients().length) {
      this.clientsWithMembershipCount.set(this.clients().filter(client => Boolean(this.getEffectiveMembership(client))).length);
      this.pendingPaymentsTotalCount.set(this.clients().filter(client => client.debePago).length);
      return;
    }

    this.clientsService.getPaged(1, totalCount, this.getFilters()).subscribe({
      next: response => {
        if (requestId !== this.clientStatsRequestId) {
          return;
        }

        this.clientsWithMembershipCount.set(response.items.filter(client => Boolean(this.getEffectiveMembership(client))).length);
        this.pendingPaymentsTotalCount.set(response.items.filter(client => client.debePago).length);
      },
      error: () => {
        if (requestId !== this.clientStatsRequestId) {
          return;
        }

        this.clientsWithMembershipCount.set(this.clients().filter(client => Boolean(this.getEffectiveMembership(client))).length);
        this.pendingPaymentsTotalCount.set(this.clients().filter(client => client.debePago).length);
      }
    });
  }

  private getEffectiveMembership(client: Client): ClientMembership | null {
    if (client.membership) {
      return client.membership;
    }

    return this.getLatestMembership(client);
  }

  private getLatestMembership(client: Client): ClientMembership | null {
    const history = client.membershipsHistory?.filter(membership => membership.activo !== false) ?? [];
    if (history.length === 0) {
      return null;
    }

    return [...history].sort((left, right) => {
      const leftDate = new Date(left.fechaFin ?? left.fechaInicio).getTime();
      const rightDate = new Date(right.fechaFin ?? right.fechaInicio).getTime();
      return rightDate - leftDate;
    })[0] ?? null;
  }

  private getMembershipSortValue(membership: ClientMembership): number {
    const periodYear = Number(membership.periodYear ?? 0);
    const periodMonth = Number(membership.periodMonth ?? 0);

    if (periodYear > 0 && periodMonth > 0) {
      return periodYear * 100 + periodMonth;
    }

    return new Date(membership.fechaFin ?? membership.fechaInicio).getTime();
  }

  private isMembershipExpired(membership: ClientMembership | null): boolean {
    if (!membership?.fechaFin) {
      return false;
    }

    const endDate = new Date(membership.fechaFin);
    const today = new Date();
    endDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return endDate < today;
  }

  private isMembershipPaused(membership: ClientMembership | null): boolean {
    if (!membership?.fechaFin || !this.isMembershipExpired(membership)) {
      return false;
    }

    const pauseThreshold = new Date(membership.fechaFin);
    pauseThreshold.setHours(0, 0, 0, 0);
    pauseThreshold.setMonth(pauseThreshold.getMonth() + 2);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return pauseThreshold < today;
  }}
