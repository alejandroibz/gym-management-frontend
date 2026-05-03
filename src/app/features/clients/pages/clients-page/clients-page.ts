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
import { Router, RouterLink } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog';
import { ClientDialogComponent, ClientDialogResult } from '../../components/client-dialog/client-dialog';
import { Client, ClientCreatePayload, ClientFilters, ClientUpdatePayload } from '../../models/client.model';
import { ClientsService } from '../../services/clients.service';
import { MembershipPlan } from '../../../membership-plans/models/membership-plan.model';
import { MembershipPlansService } from '../../../membership-plans/services/membership-plans.service';
import { ClientMembership } from '../../models/client.model';

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
  private readonly clientsService = inject(ClientsService);
  private readonly membershipPlansService = inject(MembershipPlansService);

  readonly clients = signal<Client[]>([]);
  readonly membershipPlans = signal<MembershipPlan[]>([]);
  readonly isLoading = signal(false);
  readonly isSaving = signal(false);
  readonly errorMessage = signal('');
  readonly totalCount = signal(0);
  readonly pageNumber = signal(1);
  readonly pageSize = signal(12);

  readonly filtersForm = this.formBuilder.nonNullable.group({
    search: ['']
  });

  readonly totalClients = computed(() => this.totalCount());
  readonly clientsWithMembership = computed(() => this.clients().filter(client => Boolean(client.membership)).length);
  readonly pendingPaymentsCount = computed(() => this.clients().filter(client => client.debePago).length);
  readonly activeFiltersCount = computed(() => {
    const raw = this.filtersForm.getRawValue();
    return raw.search.trim().length > 0 ? 1 : 0;
  });
  readonly activeFilterChips = computed(() => {
    const raw = this.filtersForm.getRawValue();
    const chips: Array<{ label: string; value: string }> = [];

    if (raw.search.trim()) {
      chips.push({ label: 'Busqueda', value: raw.search.trim() });
    }

    return chips;
  });

  constructor() {
    this.loadMembershipPlans();
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
      search: ''
    });
    this.pageNumber.set(1);
    this.loadClients();
  }

  openCreateModal(): void {
    if (this.membershipPlans().length === 0) {
      this.openMissingMembershipPlansDialog();
      return;
    }

    this.openDialog();
  }

  openClientDetails(client: Client): void {
    this.router.navigate(['/clients', client.id]);
  }

  editClient(client: Client): void {
    this.openDialog(client);
  }

  removeClient(client: Client): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      panelClass: 'employee-category-dialog-panel',
      backdropClass: 'employee-category-dialog-backdrop',
      data: {
        title: 'Eliminar cliente',
        message: `Se eliminara a ${client.nombre} ${client.apellido}. Esta accion no se puede deshacer.`,
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
        membershipPlans: this.membershipPlans()
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
        title: 'Primero crea una membresia',
        message:
          'Para registrar un cliente necesitas tener al menos una membresia disponible. Crea un plan y luego vuelve para completar el alta.',
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
    return membership?.plan?.nombre ?? (membership ? `Plan #${membership.membershipPlanId}` : 'Sin membresia');
  }

  getMembershipEndDate(client: Client): string | null {
    return this.getEffectiveMembership(client)?.fechaFin ?? null;
  }

  getPaymentStatusLabel(client: Client): string {
    return client.debePago ? 'Pendiente' : 'Al dia';
  }

  isPaymentPending(client: Client): boolean {
    return client.debePago;
  }

  getMembershipNotificationChips(client: Client): Array<{ label: string; tone: 'warning' | 'info' | 'success' }> {
    const chips: Array<{ label: string; tone: 'warning' | 'info' | 'success' }> = [];

    if (client.membresiaProximaAVencer) {
      chips.push({ label: 'Proxima a vencer', tone: 'warning' });

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
    const filters: ClientFilters = {};

    if (search) {
      if (/^\d+$/.test(search)) {
        filters.dni = search;
      } else {
        const [nombre, ...apellidoParts] = search.split(/\s+/);
        filters.nombre = nombre;

        if (apellidoParts.length > 0) {
          filters.apellido = apellidoParts.join(' ');
        }
      }
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
      appAccess: result.appAccess ?? null,
      membership: {
        membershipPlanId: result.membership.membershipPlanId,
        fechaInicio: result.membership.fechaInicio,
        fechaFin: result.membership.fechaFin,
        precioFinal: result.membership.precioFinal
      }
    };
  }

  private getEffectiveMembership(client: Client): ClientMembership | null {
    if (client.membership) {
      return client.membership;
    }

    const history = client.membershipsHistory ?? [];

    if (history.length === 0) {
      return null;
    }

    return [...history].sort((left, right) => {
      const leftDate = new Date(left.fechaFin ?? left.fechaInicio).getTime();
      const rightDate = new Date(right.fechaFin ?? right.fechaInicio).getTime();
      return rightDate - leftDate;
    })[0] ?? null;
  }
}
