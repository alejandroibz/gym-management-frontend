import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog';
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
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    RouterLink
  ],
  templateUrl: './clients-page.html',
  styleUrl: './clients-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
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
  readonly errorMessage = signal('');
  readonly importResult = signal<ClientImportResult | null>(null);
  readonly importFileName = signal('');
  readonly totalCount = signal(0);
  readonly pageNumber = signal(1);
  readonly pageSize = signal(12);

  readonly filtersForm = this.formBuilder.nonNullable.group({
    search: [''],
    dni: [''],
    paymentStatus: ['all'],
    clientStatus: ['active'],
    membershipPlanId: [null as number | null]
  });

  readonly totalClients = computed(() => this.totalCount());
  readonly clientsWithMembership = computed(() => this.clients().filter(client => Boolean(client.membership)).length);
  readonly pendingPaymentsCount = computed(() => this.clients().filter(client => client.debePago).length);
  readonly incomeCategories = computed(() => this.cashMovementCategories().filter(category => category.tipoMovimiento === 1));
  readonly currentUserEmail = signal<string | null>(null);
  readonly activeFiltersCount = computed(() => {
    const raw = this.filtersForm.getRawValue();
    return [
      raw.search.trim(),
      raw.dni.trim(),
      raw.paymentStatus !== 'all' ? raw.paymentStatus : '',
      raw.clientStatus !== 'active' ? raw.clientStatus : '',
      raw.membershipPlanId ? String(raw.membershipPlanId) : ''
    ].filter(Boolean).length;
  });
  readonly activeFilterChips = computed(() => {
    const raw = this.filtersForm.getRawValue();
    const chips: Array<{ label: string; value: string }> = [];

    if (raw.search.trim()) {
      chips.push({ label: 'Búsqueda', value: raw.search.trim() });
    }

    return chips;
  });
  readonly visibleFilterChips = computed(() => {
    const raw = this.filtersForm.getRawValue();
    const chips: Array<{ label: string; value: string }> = [];

    if (raw.search.trim()) chips.push({ label: 'Nombre', value: raw.search.trim() });
    if (raw.dni.trim()) chips.push({ label: 'DNI', value: raw.dni.trim() });
    if (raw.paymentStatus !== 'all') chips.push({ label: 'Estado', value: raw.paymentStatus === 'pending' ? 'Pendiente' : 'Al dia' });
    if (raw.clientStatus !== 'active') chips.push({ label: 'Ficha', value: raw.clientStatus === 'archived' ? 'Archivados' : 'Todos' });
    if (raw.membershipPlanId) {
      const plan = this.membershipPlans().find(item => item.id === raw.membershipPlanId);
      chips.push({ label: 'Membresia', value: plan?.nombre ?? `Plan #${raw.membershipPlanId}` });
    }

    return chips;
  });

  constructor() {
    this.auth.user$.subscribe(user => {
      this.currentUserEmail.set(typeof user?.email === 'string' ? user.email : null);
    });
    this.loadMembershipPlans();
    this.loadPaymentLookups();
    this.loadClients();
  }

  handlePageChange(event: PageEvent): void {
    this.pageNumber.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
    this.loadClients();
  }

  applyFilters(): void {
    this.pageNumber.set(1);
    this.loadClients();
  }

  resetFilters(): void {
    this.filtersForm.reset({
      search: '',
      dni: '',
      paymentStatus: 'all',
      clientStatus: 'active',
      membershipPlanId: null
    });
    this.pageNumber.set(1);
    this.loadClients();
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

    this.openDialog(client);
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      panelClass: 'employee-category-dialog-panel',
      backdropClass: 'employee-category-dialog-backdrop',
      data: {
        title: 'Archivar cliente',
        message: `Se archivará a ${client.nombre} ${client.apellido}. Los cobros realizados se conservarán y la ficha de salud, si existe, seguirá disponible desde Salud.`,
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
        title: 'Primero crea una membresía',
        message:
          'Para registrar un cliente necesitas tener al menos una membresía disponible. Crea un plan y luego vuelve para completar el alta.',
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
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.clientsService
      .getPaged(this.pageNumber(), this.pageSize(), this.getFilters())
      .subscribe({
        next: response => {
          this.clients.set(response.items);
          this.totalCount.set(response.totalCount);
          this.pageNumber.set(response.pageNumber);
          this.pageSize.set(response.pageSize);
          this.isLoading.set(false);
        },
        error: () => {
          this.clients.set([]);
          this.totalCount.set(0);
          this.isLoading.set(false);
          this.errorMessage.set('No se pudieron cargar los clientes desde la API.');
        }
      });
  }

  getMembershipLabel(client: Client): string {
    const membership = this.getEffectiveMembership(client);
    return membership?.plan?.nombre ?? (membership ? `Plan #${membership.membershipPlanId}` : 'Sin membresía');
  }

  getMembershipEndDate(client: Client): string | null {
    return this.getEffectiveMembership(client)?.fechaFin ?? null;
  }

  getPaymentStatusLabel(client: Client): string {
    return client.debePago ? 'Pendiente' : 'Al día';
  }

  isPaymentPending(client: Client): boolean {
    return client.activo && client.debePago;
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

  private getEffectiveMembership(client: Client): ClientMembership | null {
    return client.membership ?? null;
  }
}
