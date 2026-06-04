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
  DashboardMonthlyPaymentItem,
  DashboardMonthlyPaymentsResponse,
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

interface DashboardIncomeBreakdownItem {
  label: string;
  value: number;
  displayValue: string;
  percent: number;
  color: string;
}

interface DashboardMonthlyPaymentSegment {
  label: string;
  value: number;
  displayValue: string;
  color: string;
}

interface DashboardMonthlyPaymentColumn {
  label: string;
  year: number;
  month: number;
  total: number;
  displayTotal: string;
  segments: DashboardMonthlyPaymentSegment[];
}

interface DashboardViewModel {
  stats: DashboardStatItem[];
  incomeBreakdown: DashboardIncomeBreakdownItem[];
  incomeChartStyle: Record<string, string>;
  maxMonthlyIncome: number;
  monthlyPayments: DashboardMonthlyPaymentColumn[];
  monthlyPaymentsMaxTotal: number;
  monthlyPaymentsTotal: string;
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

  trackByIncome(_: number, item: DashboardIncomeBreakdownItem): string {
    return item.label;
  }

  incomeBarWidth(item: DashboardIncomeBreakdownItem, maxMonthlyIncome: number): string {
    if (maxMonthlyIncome <= 0) {
      return '0%';
    }

    return `${Math.max((item.value / maxMonthlyIncome) * 100, item.value > 0 ? 3 : 0)}%`;
  }

  monthlyColumnHeight(item: DashboardMonthlyPaymentColumn, maxTotal: number): string {
    if (maxTotal <= 0 || item.total <= 0) {
      return '0%';
    }

    return `${Math.max((item.total / maxTotal) * 100, 8)}%`;
  }

  monthlySegmentHeight(segment: DashboardMonthlyPaymentSegment, total: number): string {
    if (total <= 0 || segment.value <= 0) {
      return '0%';
    }

    return `${(segment.value / total) * 100}%`;
  }

  private loadDashboard(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    forkJoin({
      summary: this.dashboardService.getSummary(),
      financialSummary: this.dashboardService.getFinancialSummary().pipe(catchError(() => of(null))),
      monthlyPayments: this.dashboardService.getMonthlyPayments(6).pipe(catchError(() => of(null)))
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

          this.dashboard.set(this.buildViewModel(response.summary, response.financialSummary, response.monthlyPayments));
          this.lastUpdated.set(new Date());
          this.isLoading.set(false);
          this.stabilizeLayout();
        }
      });
  }

  private buildViewModel(
    summary: DashboardSummaryResponse,
    financialSummary: DashboardFinancialSummaryResponse | null,
    monthlyPaymentsResponse: DashboardMonthlyPaymentsResponse | null
  ): DashboardViewModel {
    const incomeBreakdown = this.buildIncomeBreakdown(summary);
    const monthlyPayments = this.buildMonthlyPayments(monthlyPaymentsResponse?.months ?? []);

    return {
      stats: [
        {
          label: 'Total clientes historico',
          value: summary.totalClients,
          displayValue: this.formatNumber(summary.totalClients),
          hint: 'Activos y archivados',
          icon: 'groups',
          kind: 'number',
          tone: 'neutral'
        },
        {
          label: 'Clientes activos',
          value: summary.activeClients,
          displayValue: this.formatNumber(summary.activeClients),
          hint: 'Disponibles para operar',
          icon: 'person',
          kind: 'number',
          tone: 'info'
        },
        {
          label: 'Ingreso total hoy',
          value: summary.todayIncome,
          displayValue: this.formatCurrency(summary.todayIncome),
          hint: 'Gym + salud + caja externa',
          icon: 'payments',
          kind: 'currency',
          tone: 'success'
        },
        {
          label: 'Ingreso total mes',
          value: summary.monthIncome,
          displayValue: this.formatCurrency(summary.monthIncome),
          hint: 'Total mensual operativo',
          icon: 'trending_up',
          kind: 'currency',
          tone: 'accent'
        },
        {
          label: 'Gym del mes',
          value: summary.monthGymIncome ?? 0,
          displayValue: this.formatCurrency(summary.monthGymIncome ?? 0),
          hint: 'Cobros de membresias',
          icon: 'fitness_center',
          kind: 'currency',
          tone: 'info'
        },
        {
          label: 'Salud del mes',
          value: summary.monthHealthIncome ?? 0,
          displayValue: this.formatCurrency(summary.monthHealthIncome ?? 0),
          hint: 'Pagos de salud confirmados',
          icon: 'health_and_safety',
          kind: 'currency',
          tone: 'success'
        },
        {
          label: 'Caja externa mes',
          value: summary.monthExternalIncome ?? 0,
          displayValue: this.formatCurrency(summary.monthExternalIncome ?? 0),
          hint: 'Ingresos manuales',
          icon: 'account_balance_wallet',
          kind: 'currency',
          tone: 'neutral'
        },
        {
          label: 'Descuentos hoy',
          value: summary.todayDiscountAmount ?? 0,
          displayValue: this.formatCurrency(summary.todayDiscountAmount ?? 0),
          hint: 'Gym + salud confirmados',
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
          hint: 'Cobros con bonificacion en el periodo',
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
          hint: 'Membresias sin pago confirmado',
          icon: 'receipt_long',
          kind: 'number',
          tone: 'accent'
        },
        {
          label: 'Membresias vencidas',
          value: summary.expiredMemberships,
          displayValue: this.formatNumber(summary.expiredMemberships),
          hint: 'Clientes activos a recuperar',
          icon: 'event_busy',
          kind: 'number',
          tone: 'neutral'
        }
      ],
      incomeBreakdown,
      incomeChartStyle: this.buildIncomeChartStyle(incomeBreakdown),
      maxMonthlyIncome: Math.max(...incomeBreakdown.map(item => item.value), 1),
      monthlyPayments,
      monthlyPaymentsMaxTotal: Math.max(...monthlyPayments.map(item => item.total), 1),
      monthlyPaymentsTotal: this.formatCurrency(monthlyPayments.reduce((sum, item) => sum + item.total, 0)),
      recentPayments: this.mapRecentPayments(summary.recentPayments),
      pendingPayments: this.mapPendingPayments(summary.pendingPaymentsPreview),
      upcomingExpirations: this.mapUpcomingExpirations(summary.upcomingExpirations)
    };
  }

  private mapRecentPayments(items: DashboardRecentPayment[]): DashboardTableRow[] {
    return items.map(item => ({
      title: item.clientFullName,
      line1: item.hasDiscount
        ? `${item.membershipPlanName ?? 'Cobro'} - Con descuento`
        : `${item.membershipPlanName ?? 'Cobro'} - ${item.paymentMethodName ?? 'Sin metodo'}`,
      line2: item.hasDiscount
        ? `${this.formatCurrency(item.amount)} final - descuento ${this.formatCurrency(item.discountAmount ?? 0)}`
        : `${this.formatCurrency(item.amount)} - ${this.formatDateTime(item.paymentDate)}`,
      route: `/clients/${item.clientId}`
    }));
  }

  private mapPendingPayments(items: DashboardPendingPayment[]): DashboardTableRow[] {
    return items.map(item => ({
      title: item.clientFullName,
      line1: `${item.planName} - Periodo ${item.periodMonth}/${item.periodYear}`,
      line2: `Vence ${this.formatDate(item.membershipEndDate)}`,
      route: `/clients/${item.clientId}`
    }));
  }

  private mapUpcomingExpirations(items: DashboardUpcomingExpiration[]): DashboardTableRow[] {
    return items.map(item => ({
      title: item.clientFullName,
      line1: `${item.planName} - ${item.daysRemaining} dias restantes`,
      line2: `Vence ${this.formatDate(item.endDate)}`,
      route: `/clients/${item.clientId}`
    }));
  }

  private buildIncomeBreakdown(summary: DashboardSummaryResponse): DashboardIncomeBreakdownItem[] {
    const items = [
      { label: 'Gimnasio', value: summary.monthGymIncome ?? 0, color: '#2563eb' },
      { label: 'Salud', value: summary.monthHealthIncome ?? 0, color: '#0f766e' },
      { label: 'Caja externa', value: summary.monthExternalIncome ?? 0, color: '#c1121f' }
    ];
    const total = items.reduce((sum, item) => sum + item.value, 0);

    return items.map(item => ({
      ...item,
      displayValue: this.formatCurrency(item.value),
      percent: total === 0 ? 0 : Math.round((item.value / total) * 100)
    }));
  }

  private buildIncomeChartStyle(items: DashboardIncomeBreakdownItem[]): Record<string, string> {
    const total = items.reduce((sum, item) => sum + item.value, 0);
    if (total <= 0) {
      return { background: '#e5e7eb' };
    }

    let cursor = 0;
    const segments = items.map(item => {
      const start = cursor;
      cursor += (item.value / total) * 100;
      return `${item.color} ${start}% ${cursor}%`;
    });

    return { background: `conic-gradient(${segments.join(', ')})` };
  }

  private buildMonthlyPayments(items: DashboardMonthlyPaymentItem[]): DashboardMonthlyPaymentColumn[] {
    return items.map(item => ({
      label: item.label,
      year: item.year,
      month: item.month,
      total: item.totalIncome,
      displayTotal: this.formatCurrency(item.totalIncome),
      segments: [
        {
          label: 'Gimnasio',
          value: item.gymIncome,
          displayValue: this.formatCurrency(item.gymIncome),
          color: '#2563eb'
        },
        {
          label: 'Salud',
          value: item.healthIncome,
          displayValue: this.formatCurrency(item.healthIncome),
          color: '#0f766e'
        },
        {
          label: 'Caja externa',
          value: item.externalIncome,
          displayValue: this.formatCurrency(item.externalIncome),
          color: '#c1121f'
        }
      ]
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
