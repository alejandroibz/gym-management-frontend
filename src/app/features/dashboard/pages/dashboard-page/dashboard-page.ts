import { CommonModule, DatePipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  signal
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';
import {
  DashboardFinancialSummaryResponse,
  DashboardPendingPayment,
  DashboardRecentPayment,
  DashboardSummaryResponse,
  DashboardUpcomingExpiration
} from '../../models/dashboard.model';
import { DashboardService } from '../../services/dashboard.service';

interface DashboardStatItem {
  label: string;
  value: number;
  displayValue: string;
  hint: string;
  icon: string;
  kind?: 'number' | 'currency';
  tone: 'neutral' | 'info' | 'success' | 'accent';
}

interface DashboardTableRow {
  title: string;
  line1: string;
  line2: string;
  route: string;
}

interface DashboardViewModel {
  stats: DashboardStatItem[];
  recentPayments: DashboardTableRow[];
  pendingPayments: DashboardTableRow[];
  upcomingExpirations: DashboardTableRow[];
}

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    DatePipe
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DashboardPageComponent implements AfterViewInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dashboardService = inject(DashboardService);

  readonly isLoading = signal(true);
  readonly errorMessage = signal('');
  readonly lastUpdated = signal<Date | null>(null);
  readonly dashboard = signal<DashboardViewModel | null>(null);

  constructor() {
    this.loadDashboard();
  }

  ngAfterViewInit(): void {
    this.stabilizeLayout();
  }

  refreshDashboard(): void {
    this.loadDashboard();
  }

  trackByLabel(_: number, item: DashboardStatItem): string {
    return item.label;
  }

  trackByTitle(_: number, item: DashboardTableRow): string {
    return `${item.title}-${item.line1}`;
  }

  private loadDashboard(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    forkJoin({
      summary: this.dashboardService.getSummary(),
      financialSummary: this.dashboardService.getFinancialSummary().pipe(catchError(() => of(null)))
    })
      .pipe(
        catchError(() => {
          this.errorMessage.set('No se pudo cargar el resumen del dashboard.');
          return of(null);
        })
      )
      .subscribe({
        next: response => {
          if (!response) {
            this.dashboard.set(null);
            this.lastUpdated.set(new Date());
            this.isLoading.set(false);
            return;
          }

          this.dashboard.set(this.buildViewModel(response.summary, response.financialSummary));
          this.lastUpdated.set(new Date());
          this.isLoading.set(false);
          this.stabilizeLayout();
        }
      });
  }

  private buildViewModel(
    summary: DashboardSummaryResponse,
    financialSummary: DashboardFinancialSummaryResponse | null
  ): DashboardViewModel {
    return {
      stats: [
        {
          label: 'Total de clientes histórico',
          value: summary.totalClients,
          displayValue: this.formatNumber(summary.totalClients),
          hint: 'Base acumulada del gimnasio',
          icon: 'groups',
          kind: 'number',
          tone: 'neutral'
        },
        {
          label: 'Clientes activos',
          value: summary.activeClients,
          displayValue: this.formatNumber(summary.activeClients),
          hint: 'Clientes con actividad vigente',
          icon: 'person',
          kind: 'number',
          tone: 'info'
        },
        {
          label: 'Ingreso de hoy',
          value: summary.todayIncome,
          displayValue: this.formatCurrency(summary.todayIncome),
          hint: 'Cobrado durante la jornada',
          icon: 'payments',
          kind: 'currency',
          tone: 'success'
        },
        {
          label: 'Ingreso del mes',
          value: summary.monthIncome,
          displayValue: this.formatCurrency(summary.monthIncome),
          hint: 'Acumulado mensual',
          icon: 'trending_up',
          kind: 'currency',
          tone: 'accent'
        },
        {
          label: 'Descuentos hoy',
          value: summary.todayDiscountAmount ?? 0,
          displayValue: this.formatCurrency(summary.todayDiscountAmount ?? 0),
          hint: 'Bonificado durante la jornada',
          icon: 'sell',
          kind: 'currency',
          tone: 'neutral'
        },
        {
          label: 'Descuentos del mes',
          value: summary.monthDiscountAmount ?? 0,
          displayValue: this.formatCurrency(summary.monthDiscountAmount ?? 0),
          hint: 'Total mensual descontado',
          icon: 'local_offer',
          kind: 'currency',
          tone: 'accent'
        },
        {
          label: 'Pagos con descuento',
          value: financialSummary?.discountedPaymentsCount ?? 0,
          displayValue: this.formatNumber(financialSummary?.discountedPaymentsCount ?? 0),
          hint: 'Cobros con bonificación en el período',
          icon: 'confirmation_number',
          kind: 'number',
          tone: 'info'
        },
        {
          label: 'Promedio descuento',
          value: financialSummary?.averageDiscountAmount ?? 0,
          displayValue: this.formatCurrency(financialSummary?.averageDiscountAmount ?? 0),
          hint: `Total descontado ${this.formatCurrency(financialSummary?.totalDiscountAmount ?? 0)}`,
          icon: 'percent',
          kind: 'currency',
          tone: 'neutral'
        },
        {
          label: 'Total de empleados',
          value: summary.totalEmployees,
          displayValue: this.formatNumber(summary.totalEmployees),
          hint: 'Equipo actual cargado',
          icon: 'badge',
          kind: 'number',
          tone: 'neutral'
        },
        {
          label: 'Pagos pendientes',
          value: summary.pendingPayments,
          displayValue: this.formatNumber(summary.pendingPayments),
          hint: 'Cobros que requieren seguimiento',
          icon: 'receipt_long',
          kind: 'number',
          tone: 'accent'
        },
        {
          label: 'Membresias vencidas',
          value: summary.expiredMemberships,
          displayValue: this.formatNumber(summary.expiredMemberships),
          hint: 'Casos para recuperar',
          icon: 'event_busy',
          kind: 'number',
          tone: 'neutral'
        }
      ],
      recentPayments: this.mapRecentPayments(summary.recentPayments),
      pendingPayments: this.mapPendingPayments(summary.pendingPaymentsPreview),
      upcomingExpirations: this.mapUpcomingExpirations(summary.upcomingExpirations)
    };
  }

  private mapRecentPayments(items: DashboardRecentPayment[]): DashboardTableRow[] {
    return items.map(item => ({
      title: item.clientFullName,
      line1: item.hasDiscount
        ? `${item.membershipPlanName} · Con descuento`
        : `${item.membershipPlanName} · ${item.paymentMethodName}`,
      line2: item.hasDiscount
        ? `${this.formatCurrency(item.amount)} final · descuento ${this.formatCurrency(item.discountAmount ?? 0)}`
        : `${this.formatCurrency(item.amount)} · ${this.formatDateTime(item.paymentDate)}`,
      route: `/clients/${item.clientId}`
    }));
  }

  private mapPendingPayments(items: DashboardPendingPayment[]): DashboardTableRow[] {
    return items.map(item => ({
      title: item.clientFullName,
      line1: `${item.planName} · Período ${item.periodMonth}/${item.periodYear}`,
      line2: `Vence ${this.formatDate(item.membershipEndDate)}`,
      route: `/clients/${item.clientId}`
    }));
  }

  private mapUpcomingExpirations(items: DashboardUpcomingExpiration[]): DashboardTableRow[] {
    return items.map(item => ({
      title: item.clientFullName,
      line1: `${item.planName} · ${item.daysRemaining} dias restantes`,
      line2: `Vence ${this.formatDate(item.endDate)}`,
      route: `/clients/${item.clientId}`
    }));
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(value);
  }

  private formatNumber(value: number): string {
    return new Intl.NumberFormat('es-AR', {
      maximumFractionDigits: 0
    }).format(value);
  }

  private formatDate(value: string): string {
    return new Intl.DateTimeFormat('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(value));
  }

  private formatDateTime(value: string): string {
    return new Intl.DateTimeFormat('es-AR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(value));
  }

  private stabilizeLayout(): void {
    const timeouts: number[] = [];
    const rerender = () => {
      this.changeDetectorRef.detectChanges();
      window.dispatchEvent(new Event('resize'));
    };

    rerender();

    [0, 32, 120, 260].forEach(delay => {
      const id = window.setTimeout(rerender, delay);
      timeouts.push(id);
    });

    this.destroyRef.onDestroy(() => {
      timeouts.forEach(id => window.clearTimeout(id));
    });
  }
}
