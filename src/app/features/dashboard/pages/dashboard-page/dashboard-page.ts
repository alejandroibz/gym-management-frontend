import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';
import { PagedResponse } from '../../../../core/models/paged-response.model';
import { EmployeeCategory } from '../../../employee-categories/models/employee-category.model';
import { EmployeeCategoriesService } from '../../../employee-categories/services/employee-categories.service';
import { Client } from '../../../clients/models/client.model';
import { ClientsService } from '../../../clients/services/clients.service';
import { Employee } from '../../../employees/models/employee.model';
import { EmployeesService } from '../../../employees/services/employees.service';
import { MembershipPlan } from '../../../membership-plans/models/membership-plan.model';
import { MembershipPlansService } from '../../../membership-plans/services/membership-plans.service';

interface DashboardMetric {
  label: string;
  value: string;
  hint: string;
  icon: string;
  tone?: 'accent' | 'dark';
}

interface DashboardStatCard {
  label: string;
  value: number;
  hint: string;
  icon: string;
}

interface DashboardActionCard {
  title: string;
  description: string;
  icon: string;
  route: string;
}

interface DashboardActivityItem {
  title: string;
  subtitle: string;
  timestamp?: string;
  icon: string;
  route: string;
}

interface DashboardDistributionItem {
  label: string;
  value: number;
  percentage: number;
  helper: string;
}

interface DashboardAlertItem {
  title: string;
  description: string;
  tone: 'accent' | 'neutral';
  icon: string;
}

interface DashboardViewModel {
  statCards: DashboardStatCard[];
  financeMetrics: DashboardMetric[];
  peopleMetrics: DashboardMetric[];
  actionCards: DashboardActionCard[];
  recentActivity: DashboardActivityItem[];
  categoryDistribution: DashboardDistributionItem[];
  planDistribution: DashboardDistributionItem[];
  alerts: DashboardAlertItem[];
  totalClients: number;
  totalEmployees: number;
  totalPlans: number;
  totalCategories: number;
  averagePlanPrice: number;
  averageSalary: number;
  estimatedRevenue: number;
  estimatedPayroll: number;
}

const EMPTY_PAGED_RESPONSE = <T>(): PagedResponse<T> => ({
  items: [],
  pageNumber: 1,
  pageSize: 100,
  totalCount: 0,
  totalPages: 1
});

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CurrencyPipe,
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent {
  private readonly clientsService = inject(ClientsService);
  private readonly employeesService = inject(EmployeesService);
  private readonly employeeCategoriesService = inject(EmployeeCategoriesService);
  private readonly membershipPlansService = inject(MembershipPlansService);

  readonly isLoading = signal(true);
  readonly errorMessage = signal('');
  readonly lastUpdated = signal<Date | null>(null);
  readonly dashboard = signal<DashboardViewModel | null>(null);

  readonly headline = computed(() => {
    const snapshot = this.dashboard();

    if (!snapshot) {
      return 'Vista general del negocio';
    }

    return `${snapshot.totalClients} clientes, ${snapshot.totalEmployees} empleados y ${snapshot.totalPlans} planes activos en gestion`;
  });

  readonly healthScore = computed(() => {
    const snapshot = this.dashboard();

    if (!snapshot) {
      return 0;
    }

    let score = 52;

    if (snapshot.totalClients > 0) {
      score += 12;
    }

    if (snapshot.totalEmployees > 0) {
      score += 10;
    }

    if (snapshot.totalPlans >= 3) {
      score += 10;
    }

    if (snapshot.estimatedRevenue > snapshot.estimatedPayroll) {
      score += 10;
    }

    if (snapshot.totalCategories >= 2) {
      score += 6;
    }

    return Math.min(score, 100);
  });

  constructor() {
    this.loadDashboard();
  }

  refreshDashboard(): void {
    this.loadDashboard();
  }

  trackByLabel(_: number, item: DashboardDistributionItem): string {
    return item.label;
  }

  trackByTitle(_: number, item: DashboardActionCard | DashboardAlertItem | DashboardActivityItem): string {
    return item.title;
  }

  private loadDashboard(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    forkJoin({
      clients: this.clientsService.getPaged(1, 100).pipe(catchError(() => of(EMPTY_PAGED_RESPONSE<Client>()))),
      employees: this.employeesService.getPaged(1, 100).pipe(catchError(() => of(EMPTY_PAGED_RESPONSE<Employee>()))),
      categories: this.employeeCategoriesService
        .getPaged(1, 100)
        .pipe(catchError(() => of(EMPTY_PAGED_RESPONSE<EmployeeCategory>()))),
      plans: this.membershipPlansService
        .getPaged(1, 100)
        .pipe(catchError(() => of(EMPTY_PAGED_RESPONSE<MembershipPlan>())))
    }).subscribe({
      next: response => {
        const snapshot = this.buildDashboard(response.clients, response.employees, response.categories, response.plans);

        this.dashboard.set(snapshot);
        this.lastUpdated.set(new Date());
        this.isLoading.set(false);

        if (
          response.clients.totalCount === 0 &&
          response.employees.totalCount === 0 &&
          response.categories.totalCount === 0 &&
          response.plans.totalCount === 0
        ) {
          this.errorMessage.set(
            'No se encontraron datos suficientes para todas las secciones. El dashboard muestra una base inicial estimada.'
          );
        }
      },
      error: () => {
        this.dashboard.set(this.buildDashboard(
          EMPTY_PAGED_RESPONSE<Client>(),
          EMPTY_PAGED_RESPONSE<Employee>(),
          EMPTY_PAGED_RESPONSE<EmployeeCategory>(),
          EMPTY_PAGED_RESPONSE<MembershipPlan>()
        ));
        this.errorMessage.set('No se pudieron cargar todas las metricas en tiempo real. Se muestran referencias estimadas.');
        this.lastUpdated.set(new Date());
        this.isLoading.set(false);
      }
    });
  }

  private buildDashboard(
    clientsResponse: PagedResponse<Client>,
    employeesResponse: PagedResponse<Employee>,
    categoriesResponse: PagedResponse<EmployeeCategory>,
    plansResponse: PagedResponse<MembershipPlan>
  ): DashboardViewModel {
    const clients = clientsResponse.items;
    const employees = employeesResponse.items;
    const categories = categoriesResponse.items;
    const plans = plansResponse.items;

    const totalClients = clientsResponse.totalCount;
    const totalEmployees = employeesResponse.totalCount;
    const totalCategories = categoriesResponse.totalCount;
    const totalPlans = plansResponse.totalCount;

    const clientsWithMemberships = clients.filter(client => !!client.membership).length;
    const clientsWithPayments = clients.filter(client => (client.payments?.length ?? 0) > 0).length;
    const averagePlanPrice = this.average(plans.map(plan => plan.precio));
    const averageSalary = this.average(employees.map(employee => employee.sueldo));
    const averagePlanDuration = this.average(plans.map(plan => plan.duracionDias));
    const estimatedActiveMembers = Math.max(clientsWithMemberships, Math.round(totalClients * 0.72));
    const estimatedRevenue = Math.round(estimatedActiveMembers * (averagePlanPrice || 38000));
    const estimatedPayroll = Math.round(totalEmployees * (averageSalary || 350000));
    const estimatedMargin = estimatedRevenue - estimatedPayroll;
    const clientGrowth30d = this.countRecent(
      clients.map(client => client.fechaAlta).filter(this.isDefinedString),
      30
    );
    const employeeGrowth30d = this.countRecent(
      employees
        .map(employee => employee.fechaCreacion ?? employee.fechaIngreso)
        .filter(this.isDefinedString),
      30
    );

    const statCards: DashboardStatCard[] = [
      {
        label: 'Clientes',
        value: totalClients,
        hint: `${clientsWithMemberships} con membresias registradas en la muestra actual`,
        icon: 'groups'
      },
      {
        label: 'Empleados',
        value: totalEmployees,
        hint: `${totalCategories} categorias configuradas para operar`,
        icon: 'badge'
      },
      {
        label: 'Planes',
        value: totalPlans,
        hint: `${averagePlanDuration.toFixed(0)} dias promedio por plan`,
        icon: 'card_membership'
      },
      {
        label: 'Ingresos estimados',
        value: estimatedRevenue,
        hint: 'Estimado mensual basado en cartera y ticket promedio',
        icon: 'trending_up'
      }
    ];

    const financeMetrics: DashboardMetric[] = [
      {
        label: 'Ticket promedio',
        value: this.formatCurrency(averagePlanPrice || 38000),
        hint: 'Calculado con los planes disponibles',
        icon: 'sell',
        tone: 'dark'
      },
      {
        label: 'Nomina estimada',
        value: this.formatCurrency(estimatedPayroll),
        hint: 'Proyeccion mensual a partir de los sueldos cargados',
        icon: 'payments'
      },
      {
        label: 'Margen operativo',
        value: this.formatCurrency(estimatedMargin),
        hint: estimatedMargin >= 0 ? 'Cobertura positiva sobre la estructura actual' : 'Revisar estructura y pricing',
        icon: estimatedMargin >= 0 ? 'monitoring' : 'priority_high',
        tone: estimatedMargin >= 0 ? 'accent' : 'dark'
      }
    ];

    const peopleMetrics: DashboardMetric[] = [
      {
        label: 'Altas de clientes',
        value: `${clientGrowth30d}`,
        hint: 'Registradas en los ultimos 30 dias dentro de la muestra',
        icon: 'person_add'
      },
      {
        label: 'Altas de personal',
        value: `${employeeGrowth30d}`,
        hint: 'Ingresos recientes del equipo',
        icon: 'group_add'
      },
      {
        label: 'Cobertura de pagos',
        value: `${this.toPercent(totalClients === 0 ? 0 : (clientsWithPayments / Math.max(clients.length, 1)) * 100)}`,
        hint: 'Lectura muestral de clientes con pagos asociados',
        icon: 'receipt_long',
        tone: 'dark'
      }
    ];

    const actionCards: DashboardActionCard[] = [
      {
        title: 'Administrar clientes',
        description: 'Alta, edicion, detalle y seguimiento de relaciones del cliente.',
        icon: 'person',
        route: '/clients'
      },
      {
        title: 'Gestionar planes',
        description: 'Ajusta precios, duracion y propuesta comercial vigente.',
        icon: 'card_membership',
        route: '/membership-plans'
      },
      {
        title: 'Revisar empleados',
        description: 'Consulta estructura, categorias y datos operativos del personal.',
        icon: 'groups',
        route: '/employees'
      },
      {
        title: 'Ordenar categorias',
        description: 'Mantene clara la estructura interna del equipo.',
        icon: 'category',
        route: '/employees/categories'
      }
    ];

    const recentActivity = this.buildRecentActivity(clients, employees, plans);
    const categoryDistribution = this.buildCategoryDistribution(employees, categories, totalEmployees);
    const planDistribution = this.buildPlanDistribution(plans, totalClients);
    const alerts = this.buildAlerts({
      totalClients,
      totalEmployees,
      totalPlans,
      totalCategories,
      clientsWithMemberships,
      averagePlanPrice,
      averageSalary,
      estimatedRevenue,
      estimatedPayroll
    });

    return {
      statCards,
      financeMetrics,
      peopleMetrics,
      actionCards,
      recentActivity,
      categoryDistribution,
      planDistribution,
      alerts,
      totalClients,
      totalEmployees,
      totalPlans,
      totalCategories,
      averagePlanPrice,
      averageSalary,
      estimatedRevenue,
      estimatedPayroll
    };
  }

  private buildRecentActivity(
    clients: Client[],
    employees: Employee[],
    plans: MembershipPlan[]
  ): DashboardActivityItem[] {
    const clientActivity = clients.map(client => ({
      title: `${client.nombre} ${client.apellido}`,
      subtitle: `Nuevo cliente registrado con DNI ${client.dni}`,
      timestamp: client.fechaAlta,
      icon: 'person_add',
      route: '/clients'
    }));

    const employeeActivity = employees.map(employee => ({
      title: `${employee.nombre} ${employee.apellido}`,
      subtitle: 'Actualizacion reciente en el equipo',
      timestamp: employee.fechaCreacion ?? employee.fechaIngreso,
      icon: 'badge',
      route: '/employees'
    }));

    const planActivity = plans.map(plan => ({
      title: plan.nombre,
      subtitle: `Plan configurado por ${this.formatCurrency(plan.precio)}`,
      timestamp: plan.fechaCreacion,
      icon: 'sell',
      route: '/membership-plans'
    }));

    return [...clientActivity, ...employeeActivity, ...planActivity]
      .sort((a, b) => this.parseDate(b.timestamp) - this.parseDate(a.timestamp))
      .slice(0, 6);
  }

  private buildCategoryDistribution(
    employees: Employee[],
    categories: EmployeeCategory[],
    totalEmployees: number
  ): DashboardDistributionItem[] {
    if (employees.length === 0 || categories.length === 0) {
      return [
        {
          label: 'Sin estructura suficiente',
          value: 0,
          percentage: 0,
          helper: 'Carga categorias y empleados para ver composicion real.'
        }
      ];
    }

    return categories
      .map(category => {
        const count = employees.filter(employee => employee.employeeCategoryId === category.id).length;

        return {
          label: category.nombre,
          value: count,
          percentage: totalEmployees === 0 ? 0 : Math.round((count / totalEmployees) * 100),
          helper: category.descripcion || 'Categoria operativa'
        };
      })
      .filter(item => item.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }

  private buildPlanDistribution(plans: MembershipPlan[], totalClients: number): DashboardDistributionItem[] {
    if (plans.length === 0) {
      return [
        {
          label: 'Sin planes configurados',
          value: 0,
          percentage: 0,
          helper: 'Crea planes para comenzar a medir la propuesta comercial.'
        }
      ];
    }

    const totalPlanValue = plans.reduce((sum, plan) => sum + plan.precio, 0);

    return plans
      .map(plan => ({
        label: plan.nombre,
        value: plan.precio,
        percentage: totalPlanValue === 0 ? 0 : Math.round((plan.precio / totalPlanValue) * 100),
        helper: `${plan.duracionDias} dias · cobertura potencial ${Math.max(1, Math.round(totalClients / Math.max(plans.length, 1)))} clientes`
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 4);
  }

  private buildAlerts(input: {
    totalClients: number;
    totalEmployees: number;
    totalPlans: number;
    totalCategories: number;
    clientsWithMemberships: number;
    averagePlanPrice: number;
    averageSalary: number;
    estimatedRevenue: number;
    estimatedPayroll: number;
  }): DashboardAlertItem[] {
    const alerts: DashboardAlertItem[] = [];

    if (input.totalPlans < 3) {
      alerts.push({
        title: 'Oferta comercial acotada',
        description: 'Conviene ampliar la cantidad de planes para mejorar conversion y segmentacion.',
        tone: 'accent',
        icon: 'campaign'
      });
    }

    if (input.totalCategories < 2) {
      alerts.push({
        title: 'Estructura interna por reforzar',
        description: 'Crear mas categorias puede ordenar permisos, tareas y reportes del personal.',
        tone: 'neutral',
        icon: 'account_tree'
      });
    }

    if (input.clientsWithMemberships === 0 && input.totalClients > 0) {
      alerts.push({
        title: 'Relacion cliente-membresia incompleta',
        description: 'Hay clientes cargados pero no aparecen membresias asociadas en la muestra actual.',
        tone: 'accent',
        icon: 'link_off'
      });
    }

    if (input.estimatedPayroll > input.estimatedRevenue) {
      alerts.push({
        title: 'Cobertura financiera ajustada',
        description: 'La nomina estimada supera la proyeccion comercial actual. Revisar planes y cartera.',
        tone: 'accent',
        icon: 'warning'
      });
    }

    if (alerts.length === 0) {
      alerts.push({
        title: 'Operacion estable',
        description: 'La estructura actual muestra una base saludable para seguir creciendo.',
        tone: 'neutral',
        icon: 'verified'
      });
    }

    if (input.averagePlanPrice === 0 || input.averageSalary === 0) {
      alerts.push({
        title: 'Metricas mixtas',
        description: 'Parte del panel se completa con estimaciones mientras terminamos de poblar todos los datos.',
        tone: 'neutral',
        icon: 'insights'
      });
    }

    return alerts.slice(0, 4);
  }

  private average(values: number[]): number {
    if (values.length === 0) {
      return 0;
    }

    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  private countRecent(dates: string[], days: number): number {
    const threshold = new Date();
    threshold.setDate(threshold.getDate() - days);

    return dates.filter(date => this.parseDate(date) >= threshold.getTime()).length;
  }

  private parseDate(date?: string): number {
    if (!date) {
      return 0;
    }

    const parsed = new Date(date).getTime();

    return Number.isNaN(parsed) ? 0 : parsed;
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(value);
  }

  private toPercent(value: number): string {
    return `${Math.round(value)}%`;
  }

  private isDefinedString(value?: string): value is string {
    return typeof value === 'string' && value.length > 0;
  }
}
