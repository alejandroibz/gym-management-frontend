import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, Observable, of, startWith, switchMap } from 'rxjs';
import { RoleService } from '../../../../core/auth/role';
import { AppPageEvent, AppPaginatorComponent } from '../../../../core/components/app-paginator/app-paginator';
import { ConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog';
import { ClientsService } from '../../../clients/services/clients.service';
import { EmployeesService } from '../../../employees/services/employees.service';
import { PaymentMethodsService } from '../../../payment-methods/services/payment-methods.service';
import { CashMovementCategoriesService } from '../../../cash-movement-categories/services/cash-movement-categories.service';
import { Client } from '../../../clients/models/client.model';
import { Employee } from '../../../employees/models/employee.model';
import { PaymentMethod } from '../../../payment-methods/models/payment-method.model';
import { CashMovementCategory } from '../../../cash-movement-categories/models/cash-movement-category.model';
import { HealthPatientDialogComponent } from '../../components/health-patient-dialog/health-patient-dialog';
import { HealthProfessionalDialogComponent } from '../../components/health-professional-dialog/health-professional-dialog';
import { HealthProfessionalTypeDialogComponent } from '../../components/health-professional-type-dialog/health-professional-type-dialog';
import { HealthServiceDialogComponent } from '../../components/health-service-dialog/health-service-dialog';
import { HealthPaymentDialogComponent } from '../../components/health-payment-dialog/health-payment-dialog';
import { HealthSubscriptionDialogComponent } from '../../components/health-subscription-dialog/health-subscription-dialog';
import {
  HealthAppointment,
  HealthPatientProfile,
  HealthPayment,
  HealthPaymentSummary,
  HealthPlanSubscription,
  HealthProfessional,
  HealthService,
  HealthProfessionalType
} from '../../models/health.model';
import { HealthServiceApi } from '../../services/health.service';

type CalendarView = 'day' | 'week' | 'month';

interface CalendarDayCell {
  date: Date;
  dayNumber: number;
  label: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  appointments: HealthAppointment[];
}

@Component({
  selector: 'app-health-page',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTabsModule,
    AppPaginatorComponent,
    RouterLink
  ],
  templateUrl: './health-page.html',
  styleUrl: './health-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HealthPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialog = inject(MatDialog);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly roleService = inject(RoleService);
  private readonly healthService = inject(HealthServiceApi);
  private readonly clientsService = inject(ClientsService);
  private readonly employeesService = inject(EmployeesService);
  private readonly paymentMethodsService = inject(PaymentMethodsService);
  private readonly cashMovementCategoriesService = inject(CashMovementCategoriesService);
  private hasLoadedRestrictedHealthData = false;

  readonly isLoading = signal(false);
  readonly isSaving = signal(false);
  readonly feedback = signal('');
  readonly calendarView = signal<CalendarView>('month');
  readonly selectedDate = signal(this.toDateInput(new Date()));
  readonly selectedTabIndex = signal(0);
  readonly selectedProfessionalTypeId = signal<number | null>(null);
  readonly pendingProfessionalEmployeeId = signal<number | null>(null);
  readonly pendingPatientId = signal<number | null>(null);
  readonly pendingAppointmentId = signal<number | null>(null);

  readonly services = signal<HealthService[]>([]);
  readonly professionalTypes = signal<HealthProfessionalType[]>([]);
  readonly professionals = signal<HealthProfessional[]>([]);
  readonly patients = signal<HealthPatientProfile[]>([]);
  readonly patientLookups = signal<HealthPatientProfile[]>([]);
  readonly patientsTotalCount = signal(0);
  readonly patientsPageNumber = signal(1);
  readonly patientsPageSize = signal(10);
  readonly patientsSearch = signal('');
  readonly showArchivedPatients = signal(false);
  readonly appointments = signal<HealthAppointment[]>([]);
  readonly appointmentPatientOptions = signal<HealthPatientProfile[]>([]);
  readonly editingAppointment = signal<HealthAppointment | null>(null);
  readonly payments = signal<HealthPayment[]>([]);
  readonly paymentsTotalCount = signal(0);
  readonly paymentsPageNumber = signal(1);
  readonly paymentsPageSize = signal(10);
  readonly subscriptions = signal<HealthPlanSubscription[]>([]);
  readonly subscriptionsTotalCount = signal(0);
  readonly subscriptionsPageNumber = signal(1);
  readonly subscriptionsPageSize = signal(10);
  readonly paymentSummary = signal<HealthPaymentSummary | null>(null);
  readonly clients = signal<Client[]>([]);
  readonly employees = signal<Employee[]>([]);
  readonly paymentMethods = signal<PaymentMethod[]>([]);
  readonly cashCategories = signal<CashMovementCategory[]>([]);
  readonly editingProfessionalType = signal<HealthProfessionalType | null>(null);
  readonly editingProfessional = signal<HealthProfessional | null>(null);
  readonly editingService = signal<HealthService | null>(null);
  readonly isSuperAdmin = toSignal(this.roleService.hasRole('SuperAdmin'), { initialValue: false });
  readonly canManageHealth = computed(() => this.isSuperAdmin());

  readonly serviceForm = this.formBuilder.nonNullable.group({
    healthProfessionalTypeId: [null as number | null],
    name: ['', Validators.required],
    description: [''],
    price: [0, [Validators.required, Validators.min(0)]],
    defaultDurationMinutes: [60, [Validators.required, Validators.min(15)]],
    isMonthlyPlan: [false],
    sessionsPerWeek: [null as number | null]
  });

  readonly professionalForm = this.formBuilder.nonNullable.group({
    employeeId: [0, [Validators.required, Validators.min(1)]],
    healthProfessionalTypeId: [null as number | null],
    specialty: ['Kinesiología', Validators.required],
    licenseNumber: [''],
    notes: ['']
  });

  readonly appointmentForm = this.formBuilder.nonNullable.group({
    healthPatientProfileId: [0, [Validators.required, Validators.min(1)]],
    healthProfessionalId: [0, [Validators.required, Validators.min(1)]],
    healthServiceId: [null as number | null],
    startsAt: ['', Validators.required],
    status: ['Pendiente'],
    isWalkIn: [false],
    notes: ['']
  });
  readonly appointmentPatientSearchControl = new FormControl<string | HealthPatientProfile>('', { nonNullable: true });

  readonly professionalTypeForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    description: ['']
  });

  readonly paymentFiltersForm = this.formBuilder.nonNullable.group({
    professionalTypeId: [null as number | null],
    professionalId: [null as number | null],
    patientProfileId: [null as number | null],
    from: [''],
    to: ['']
  });
  readonly paymentPatientFilterSearchControl = new FormControl<HealthPatientProfile | string>('', { nonNullable: true });
  readonly subscriptionPatientFilterSearchControl = new FormControl<HealthPatientProfile | string>('', { nonNullable: true });
  readonly subscriptionFiltersForm = this.formBuilder.nonNullable.group({
    patientProfileId: [null as number | null],
    healthServiceId: [null as number | null],
    status: ['all']
  });

  readonly appointmentRangeLabel = computed(() => {
    const range = this.getRange();
    return `${this.formatDate(range.from)} - ${this.formatDate(range.to)}`;
  });
  readonly calendarTitle = computed(() => {
    const selected = new Date(`${this.selectedDate()}T00:00:00`);
    if (this.calendarView() === 'month') {
      return selected.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' });
    }
    if (this.calendarView() === 'day') {
      return selected.toLocaleDateString('es-AR', { weekday: 'long', day: '2-digit', month: 'long' });
    }
    return this.appointmentRangeLabel();
  });
  readonly calendarDays = computed(() => this.buildCalendarDays());
  readonly displayAppointmentPatient = (value: string | HealthPatientProfile): string =>
    typeof value === 'string' ? value : value?.clientName ?? '';
  readonly displayPaymentFilterPatient = (value: string | HealthPatientProfile): string =>
    typeof value === 'string' ? value : value?.clientName ?? '';
  readonly displaySubscriptionFilterPatient = (value: string | HealthPatientProfile): string =>
    typeof value === 'string' ? value : value?.clientName ?? '';

  readonly pendingAppointments = computed(() => this.appointments().filter(item => item.status === 'Pendiente').length);
  readonly activeSubscriptions = computed(() => this.subscriptions().filter(item => this.isActiveSubscription(item)));
  readonly visibleSubscriptions = computed(() => this.subscriptions());
  readonly selectedProfessionalType = computed(() => {
    const id = this.selectedProfessionalTypeId();
    return id ? this.professionalTypes().find(type => type.id === id) ?? null : null;
  });
  readonly filteredProfessionals = computed(() => {
    const id = this.selectedProfessionalTypeId();
    return id ? this.professionals().filter(professional => professional.healthProfessionalTypeId === id) : this.professionals();
  });
  readonly filteredServices = computed(() => {
    const id = this.selectedProfessionalTypeId();
    return id ? this.services().filter(service => service.healthProfessionalTypeId === id) : this.services();
  });

  constructor() {
    effect(() => {
      if (this.canManageHealth() && !this.hasLoadedRestrictedHealthData) {
        this.hasLoadedRestrictedHealthData = true;
        this.loadLookups();
        this.loadPaymentsAndSummary();
        this.loadSubscriptions();
      }
    });

    this.appointmentPatientSearchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(250),
      distinctUntilChanged(),
      switchMap(value => this.searchAppointmentPatients(value))
    ).subscribe(patients => this.appointmentPatientOptions.set(patients));

    this.loadHealthData();
    this.route.queryParamMap.subscribe(params => {
      const tab = params.get('tab');
      const canManageHealth = this.canManageHealth();
      if (!canManageHealth) {
        this.selectedTabIndex.set(0);
      }
      if (canManageHealth && tab === 'patients') {
        this.selectedTabIndex.set(1);
      }
      if (tab === 'agenda') {
        this.selectedTabIndex.set(0);
      }
      if (canManageHealth && (tab === 'payments' || tab === 'plans')) {
        this.selectedTabIndex.set(2);
      }
      const appointmentId = Number(params.get('appointmentId'));
      const appointmentDate = params.get('date');
      if (appointmentId > 0) {
        this.pendingAppointmentId.set(appointmentId);
        this.selectedTabIndex.set(0);
        this.calendarView.set('day');
        if (appointmentDate) {
          this.selectedDate.set(appointmentDate);
        }
        this.loadAppointments();
      }
      const employeeId = Number(params.get('employeeId'));
      if (canManageHealth && employeeId > 0) {
        this.pendingProfessionalEmployeeId.set(employeeId);
        this.selectedTabIndex.set(3);
      }
      const patientId = Number(params.get('patientId'));
      if (canManageHealth && patientId > 0) {
        this.pendingPatientId.set(patientId);
        this.selectedTabIndex.set(1);
        this.router.navigate(['/health', 'patients', patientId]);
      }
    });
  }

  selectProfessionalType(typeId: number | null): void {
    this.selectedProfessionalTypeId.set(typeId);
  }

  selectHealthTab(index: number): void {
    this.selectedTabIndex.set(this.canManageHealth() ? index : 0);
  }

  getProfessionalCount(typeId: number): number {
    return this.professionals().filter(professional => professional.healthProfessionalTypeId === typeId).length;
  }

  getServiceCount(typeId: number): number {
    return this.services().filter(service => service.healthProfessionalTypeId === typeId).length;
  }

  getTypeTotal(typeId: number): number {
    return this.paymentSummary()?.byProfessionalType.find(group => group.id === typeId)?.totalAmount ?? 0;
  }

  getProfessionalTotal(professionalId: number): number {
    return this.paymentSummary()?.byProfessional.find(group => group.id === professionalId)?.totalAmount ?? 0;
  }

  getPaymentFilterProfessionals(): HealthProfessional[] {
    const typeId = this.paymentFiltersForm.controls.professionalTypeId.value;
    return typeId
      ? this.professionals().filter(professional => professional.healthProfessionalTypeId === typeId)
      : this.professionals();
  }

  onPaymentProfessionalTypeChange(typeId: number | null): void {
    const professionalId = this.paymentFiltersForm.controls.professionalId.value;
    if (!typeId || !professionalId) return;

    const professionalMatchesType = this.professionals().some(professional =>
      professional.id === professionalId && professional.healthProfessionalTypeId === typeId);
    if (!professionalMatchesType) {
      this.paymentFiltersForm.controls.professionalId.setValue(null);
    }
  }

  filterPaymentsByProfessional(professional: HealthProfessional): void {
    if (!this.canManageHealth()) {
      return;
    }

    this.paymentFiltersForm.patchValue({
      professionalTypeId: professional.healthProfessionalTypeId ?? null,
      professionalId: professional.id,
      patientProfileId: null
    });
    this.selectedTabIndex.set(2);
    this.loadPaymentsAndSummary();
  }

  getPatientAppointmentCount(patientId: number): number {
    return this.appointments().filter(appointment => appointment.healthPatientProfileId === patientId).length;
  }

  getPatientPaymentTotal(patientId: number): number {
    return this.payments()
      .filter(payment => payment.healthPatientProfileId === patientId)
      .reduce((sum, payment) => sum + payment.monto, 0);
  }

  getPatientActiveSubscription(patientId: number): HealthPlanSubscription | null {
    return this.subscriptions().find(subscription => subscription.healthPatientProfileId === patientId && this.isActiveSubscription(subscription)) ?? null;
  }

  isActiveSubscription(subscription: HealthPlanSubscription): boolean {
    const normalized = subscription.status.trim().toLowerCase();
    return normalized === 'activo' || normalized === 'active';
  }

  getSubscriptionStatusLabel(status: string): string {
    const normalized = status.trim().toLowerCase();
    if (normalized === 'active' || normalized === 'activo') return 'Activo';
    if (normalized === 'inactive' || normalized === 'inactivo') return 'Inactivo';
    if (normalized === 'cancelled' || normalized === 'canceled' || normalized === 'cancelado') return 'Cancelado';
    if (normalized === 'pending' || normalized === 'pendiente') return 'Pendiente';
    if (normalized === 'expired' || normalized === 'vencido') return 'Vencido';
    return status;
  }

  getSubscriptionPatientName(subscription: HealthPlanSubscription): string {
    return subscription.patientName
      ?? this.patients().find(patient => patient.id === subscription.healthPatientProfileId)?.clientName
      ?? `Paciente #${subscription.healthPatientProfileId}`;
  }

  getSubscriptionProfessionalName(subscription: HealthPlanSubscription): string {
    return subscription.professionalName
      ?? this.professionals().find(professional => professional.id === subscription.healthProfessionalId)?.employeeName
      ?? `Profesional #${subscription.healthProfessionalId}`;
  }

  getSubscriptionServiceName(subscription: HealthPlanSubscription): string {
    return subscription.serviceName
      ?? this.services().find(service => service.id === subscription.healthServiceId)?.name
      ?? `Servicio #${subscription.healthServiceId}`;
  }

  openPatientDetail(patient: HealthPatientProfile): void {
    if (!this.canManageHealth()) {
      return;
    }

    this.router.navigate(['/health', 'patients', patient.id]);
  }

  applyPatientsSearch(search: string): void {
    this.patientsSearch.set(search);
    this.patientsPageNumber.set(1);
    this.loadPatients();
  }

  toggleArchivedPatients(checked: boolean): void {
    this.showArchivedPatients.set(checked);
    this.patientsPageNumber.set(1);
    this.loadPatients();
  }

  selectAppointmentPatient(patient: HealthPatientProfile): void {
    this.appointmentForm.controls.healthPatientProfileId.setValue(patient.id);
    this.appointmentPatientSearchControl.setValue(patient, { emitEvent: false });
  }

  onAppointmentPatientSearchInput(): void {
    this.appointmentForm.controls.healthPatientProfileId.setValue(0);
  }

  onPatientsPageChange(event: AppPageEvent): void {
    this.patientsPageNumber.set(event.pageNumber);
    this.patientsPageSize.set(event.pageSize);
    this.loadPatients();
  }

  onPaymentsPageChange(event: AppPageEvent): void {
    this.paymentsPageNumber.set(event.pageNumber);
    this.paymentsPageSize.set(event.pageSize);
    this.loadPaymentsAndSummary();
  }

  onSubscriptionsPageChange(event: AppPageEvent): void {
    this.subscriptionsPageNumber.set(event.pageNumber);
    this.subscriptionsPageSize.set(event.pageSize);
    this.loadSubscriptions();
  }

  openPatientDialog(patient?: HealthPatientProfile): void {
    if (!this.canManageHealth()) {
      return;
    }

    const dialogRef = this.dialog.open(HealthPatientDialogComponent, {
      width: '680px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        patient: patient ?? null,
        clients: this.clients(),
        professionals: this.professionals()
      }
    });

    dialogRef.afterClosed().subscribe(payload => {
      if (!payload) return;
      this.save(() => patient ? this.healthService.updatePatient(patient.id, payload) : this.healthService.createPatient(payload), () => {
        this.loadHealthData();
      });
    });
  }

  openProfessionalTypeDialog(type?: HealthProfessionalType): void {
    if (!this.canManageHealth()) {
      return;
    }

    const dialogRef = this.dialog.open(HealthProfessionalTypeDialogComponent, {
      width: '520px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: { type: type ?? null }
    });

    dialogRef.afterClosed().subscribe(payload => {
      if (!payload) return;
      this.save(() => type ? this.healthService.updateProfessionalType(type.id, payload) : this.healthService.createProfessionalType(payload), () => {
        this.loadHealthData();
      });
    });
  }

  openProfessionalDialog(professional?: HealthProfessional, selectedEmployeeId?: number | null): void {
    if (!this.canManageHealth()) {
      return;
    }

    const dialogRef = this.dialog.open(HealthProfessionalDialogComponent, {
      width: '620px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        professional: professional ?? null,
        employees: this.employees(),
        types: this.professionalTypes(),
        selectedTypeId: professional?.healthProfessionalTypeId ?? this.selectedProfessionalTypeId(),
        selectedEmployeeId: selectedEmployeeId ?? null
      }
    });

    dialogRef.afterClosed().subscribe(payload => {
      if (!payload) return;
      this.save(() => professional ? this.healthService.updateProfessional(professional.id, payload) : this.healthService.createProfessional(payload), () => {
        this.loadHealthData();
      });
    });
  }

  openServiceDialog(service?: HealthService): void {
    const dialogRef = this.dialog.open(HealthServiceDialogComponent, {
      width: '620px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        service: service ?? null,
        types: this.professionalTypes(),
        selectedTypeId: service?.healthProfessionalTypeId ?? this.selectedProfessionalTypeId()
      }
    });

    dialogRef.afterClosed().subscribe(payload => {
      if (!payload) return;
      this.save(() => service ? this.healthService.updateService(service.id, payload) : this.healthService.createService(payload), () => {
        this.loadHealthData();
      });
    });
  }

  setCalendarView(view: CalendarView): void {
    this.calendarView.set(view);
    this.loadAppointments();
  }

  changeDate(offset: number): void {
    const current = new Date(`${this.selectedDate()}T00:00:00`);
    const amount = this.calendarView() === 'month' ? 31 * offset : this.calendarView() === 'week' ? 7 * offset : offset;
    current.setDate(current.getDate() + amount);
    this.selectedDate.set(this.toDateInput(current));
    this.loadAppointments();
  }

  loadAppointments(): void {
    const range = this.getRange();
    this.healthService.getAppointments(range.from.toISOString(), range.to.toISOString()).subscribe({
      next: response => {
        this.appointments.set(response.items);
        const pendingAppointmentId = this.pendingAppointmentId();
        if (pendingAppointmentId) {
          const appointment = response.items.find(item => item.id === pendingAppointmentId);
          if (appointment) {
            this.pendingAppointmentId.set(null);
            this.editAppointment(appointment);
          }
        }
      },
      error: () => this.feedback.set('No se pudo cargar la agenda de salud.')
    });
  }

  saveService(): void {
    if (this.serviceForm.invalid) return;
    const editing = this.editingService();
    const payload = this.serviceForm.getRawValue();
    this.save(() => editing ? this.healthService.updateService(editing.id, payload) : this.healthService.createService(payload), () => {
      this.cancelServiceEdit();
      this.loadHealthData();
    });
  }

  editService(service: HealthService): void {
    this.openServiceDialog(service);
  }

  cancelServiceEdit(): void {
    this.editingService.set(null);
    this.serviceForm.reset({ healthProfessionalTypeId: null, name: '', description: '', price: 0, defaultDurationMinutes: 60, isMonthlyPlan: false, sessionsPerWeek: null });
  }

  deleteService(service: HealthService): void {
    if (!this.isSuperAdmin()) {
      return;
    }

    this.confirmDelete('Eliminar servicio', `Se va a desactivar "${service.name}" del catalogo de salud.`, () => {
      this.save(() => this.healthService.deleteService(service.id), () => {
        this.cancelServiceEdit();
        this.loadHealthData();
      });
    });
  }

  saveProfessional(): void {
    if (this.professionalForm.invalid) return;
    const editing = this.editingProfessional();
    const payload = this.professionalForm.getRawValue();
    this.save(() => editing ? this.healthService.updateProfessional(editing.id, payload) : this.healthService.createProfessional(payload), () => {
      this.cancelProfessionalEdit();
      this.loadHealthData();
    });
  }

  editProfessional(professional: HealthProfessional): void {
    this.openProfessionalDialog(professional);
  }

  cancelProfessionalEdit(): void {
    this.editingProfessional.set(null);
    this.professionalForm.reset({ employeeId: 0, healthProfessionalTypeId: null, specialty: 'Kinesiología', licenseNumber: '', notes: '' });
  }

  deleteProfessional(professional: HealthProfessional): void {
    if (!this.isSuperAdmin()) {
      return;
    }

    this.confirmDelete('Eliminar profesional', `Se va a desactivar a ${professional.employeeName} como profesional de salud.`, () => {
      this.save(() => this.healthService.deleteProfessional(professional.id), () => {
        this.cancelProfessionalEdit();
        this.loadHealthData();
      });
    });
  }

  saveProfessionalType(): void {
    if (this.professionalTypeForm.invalid) return;
    const editing = this.editingProfessionalType();
    const payload = this.professionalTypeForm.getRawValue();
    this.save(() => editing ? this.healthService.updateProfessionalType(editing.id, payload) : this.healthService.createProfessionalType(payload), () => {
      this.cancelProfessionalTypeEdit();
      this.loadHealthData();
    });
  }

  editProfessionalType(type: HealthProfessionalType): void {
    this.openProfessionalTypeDialog(type);
  }

  cancelProfessionalTypeEdit(): void {
    this.editingProfessionalType.set(null);
    this.professionalTypeForm.reset({ name: '', description: '' });
  }

  deleteProfessionalType(type: HealthProfessionalType): void {
    if (!this.isSuperAdmin()) {
      return;
    }

    this.confirmDelete('Eliminar tipo de profesional', `Se va a desactivar "${type.name}" para nuevos usos.`, () => {
      this.save(() => this.healthService.deleteProfessionalType(type.id), () => {
        this.cancelProfessionalTypeEdit();
        this.loadHealthData();
      });
    });
  }

  saveAppointment(): void {
    if (this.appointmentForm.invalid) return;
    const raw = this.appointmentForm.getRawValue();
    const editing = this.editingAppointment();
    const payload = { ...raw, startsAt: new Date(raw.startsAt).toISOString(), endsAt: null };
    this.save(
      () => editing ? this.healthService.updateAppointment(editing.id, payload) : this.healthService.createAppointment(payload),
      () => {
        this.cancelAppointmentEdit();
        this.loadAppointments();
      }
    );
  }

  updateAppointmentStatus(appointment: HealthAppointment, status: string): void {
    const billable = status === 'Ausente' ? true : status === 'Cancelado' ? false : appointment.isBillable;
    this.save(() => this.healthService.updateAppointmentStatus(appointment.id, status, billable, appointment.cancellationReason), () => this.loadAppointments());
  }

  getCalendarHeaders(): string[] {
    return ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];
  }

  openCalendarDay(date: Date): void {
    if (this.calendarView() === 'day') return;
    this.selectedDate.set(this.toDateInput(date));
    this.setCalendarView('day');
  }

  openPatientFromAppointment(appointment: HealthAppointment): void {
    if (this.calendarView() !== 'day' || !this.canManageHealth()) return;
    this.router.navigate(['/health', 'patients', appointment.healthPatientProfileId]);
  }

  editAppointment(appointment: HealthAppointment): void {
    this.editingAppointment.set(appointment);
    const patient = this.patients().find(item => item.id === appointment.healthPatientProfileId);
    this.appointmentPatientSearchControl.setValue(patient ?? appointment.patientName, { emitEvent: false });
    this.appointmentForm.patchValue({
      healthPatientProfileId: appointment.healthPatientProfileId,
      healthProfessionalId: appointment.healthProfessionalId,
      healthServiceId: appointment.healthServiceId ?? null,
      startsAt: this.toDateTimeLocalInput(appointment.startsAt),
      status: appointment.status || 'Pendiente',
      isWalkIn: appointment.isWalkIn,
      notes: appointment.notes ?? ''
    });
  }

  cancelAppointmentEdit(): void {
    this.editingAppointment.set(null);
    this.appointmentPatientSearchControl.setValue('', { emitEvent: false });
    this.appointmentForm.reset({
      healthPatientProfileId: 0,
      healthProfessionalId: 0,
      healthServiceId: null,
      startsAt: '',
      status: 'Pendiente',
      isWalkIn: false,
      notes: ''
    });
  }

  deleteAppointment(appointment: HealthAppointment): void {
    if (!this.isSuperAdmin()) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        title: 'Eliminar turno',
        message: `Se va a eliminar el turno de ${appointment.patientName}.`,
        confirmLabel: 'Eliminar',
        cancelLabel: 'Cancelar',
        tone: 'danger'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.save(() => this.healthService.deleteAppointment(appointment.id), () => {
        if (this.editingAppointment()?.id === appointment.id) {
          this.cancelAppointmentEdit();
        }
        this.loadAppointments();
      });
    });
  }

  openPaymentDialog(payment?: HealthPayment): void {
    if (!this.canManageHealth()) {
      return;
    }

    if (payment && !this.isSuperAdmin()) {
      return;
    }

    const dialogRef = this.dialog.open(HealthPaymentDialogComponent, {
      width: '680px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        payment: payment ?? null,
        patients: this.patientLookups(),
        paymentMethods: this.paymentMethods(),
        employees: this.employees(),
        professionalTypes: this.professionalTypes(),
        services: this.services()
      }
    });

    dialogRef.afterClosed().subscribe(payload => {
      if (!payload) return;
      this.save(() => payment ? this.healthService.updatePayment(payment.id, payload) : this.healthService.createPayment(payload), () => this.loadHealthData());
    });
  }

  deletePayment(payment: HealthPayment): void {
    if (!this.isSuperAdmin()) {
      return;
    }

    this.confirmDelete('Eliminar pago', `Se va a eliminar el cobro de ${payment.patientName} por ${this.formatCurrency(payment.monto)}.`, () => {
      this.save(() => this.healthService.deletePayment(payment.id), () => {
        this.loadHealthData();
      });
    });
  }

  confirmPayment(payment: HealthPayment): void {
    if (!this.canManageHealth()) {
      return;
    }

    const categoryId = payment.cashMovementCategoryId ?? this.getDefaultHealthPaymentCategoryId();
    const employeeEmail = payment.collectedByEmployeeEmail;

    if (!categoryId) {
      this.feedback.set('No hay una categoría de ingreso disponible para confirmar el cobro.');
      return;
    }

    if (!employeeEmail) {
      this.feedback.set('El pago no tiene cobrador asignado para confirmar el cobro.');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        title: 'Confirmar cobro',
        message: `Se marcará como confirmado el cobro de ${payment.patientName} por ${this.formatCurrency(payment.monto)}.`,
        confirmLabel: 'Confirmar',
        cancelLabel: 'Cancelar',
        tone: 'primary'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;

      this.save(() => this.healthService.confirmPayment(payment.id, {
        cashMovementCategoryId: categoryId,
        registeredByEmployeeEmail: employeeEmail
      }), () => {
        this.loadHealthData();
      });
    });
  }

  isConfirmedPayment(payment: HealthPayment): boolean {
    return payment.confirmado || payment.estado === 'Confirmado';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(value);
  }

  applyPaymentFilters(): void {
    this.paymentsPageNumber.set(1);
    this.loadPaymentsAndSummary();
  }

  applySubscriptionFilters(): void {
    this.subscriptionsPageNumber.set(1);
    this.loadSubscriptions();
  }

  resetSubscriptionFilters(): void {
    this.subscriptionFiltersForm.reset({
      patientProfileId: null,
      healthServiceId: null,
      status: 'all'
    });
    this.subscriptionPatientFilterSearchControl.setValue('', { emitEvent: false });
    this.subscriptionsPageNumber.set(1);
    this.loadSubscriptions();
  }

  filteredSubscriptionFilterPatients(): HealthPatientProfile[] {
    const rawValue = this.subscriptionPatientFilterSearchControl.value;
    const value = typeof rawValue === 'string' ? rawValue.trim().toLowerCase() : rawValue.clientName.toLowerCase();
    if (!value) return this.patientLookups().slice(0, 25);
    return this.patientLookups()
      .filter(patient =>
        patient.clientName.toLowerCase().includes(value) ||
        patient.dni?.toLowerCase().includes(value) ||
        patient.phone?.toLowerCase().includes(value))
      .slice(0, 25);
  }

  onSubscriptionPatientFilterInput(): void {
    this.subscriptionFiltersForm.controls.patientProfileId.setValue(null);
  }

  selectSubscriptionFilterPatient(patient: HealthPatientProfile): void {
    this.subscriptionFiltersForm.controls.patientProfileId.setValue(patient.id);
    this.subscriptionPatientFilterSearchControl.setValue(patient, { emitEvent: false });
  }

  clearSubscriptionPatientFilter(): void {
    this.subscriptionFiltersForm.controls.patientProfileId.setValue(null);
    this.subscriptionPatientFilterSearchControl.setValue('', { emitEvent: false });
  }

  filteredPaymentFilterPatients(): HealthPatientProfile[] {
    const rawValue = this.paymentPatientFilterSearchControl.value;
    const value = typeof rawValue === 'string' ? rawValue.trim().toLowerCase() : rawValue.clientName.toLowerCase();
    if (!value) return this.patientLookups().slice(0, 25);
    return this.patientLookups()
      .filter(patient =>
        patient.clientName.toLowerCase().includes(value) ||
        patient.dni?.toLowerCase().includes(value) ||
        patient.phone?.toLowerCase().includes(value))
      .slice(0, 25);
  }

  onPaymentPatientFilterInput(): void {
    this.paymentFiltersForm.controls.patientProfileId.setValue(null);
  }

  selectPaymentFilterPatient(patient: HealthPatientProfile): void {
    this.paymentFiltersForm.controls.patientProfileId.setValue(patient.id);
    this.paymentPatientFilterSearchControl.setValue(patient, { emitEvent: false });
  }

  clearPaymentPatientFilter(): void {
    this.paymentFiltersForm.controls.patientProfileId.setValue(null);
    this.paymentPatientFilterSearchControl.setValue('', { emitEvent: false });
  }

  openSubscriptionDialog(subscription?: HealthPlanSubscription): void {
    if (!this.canManageHealth()) {
      return;
    }

    if (subscription && !this.isSuperAdmin()) {
      return;
    }

    const dialogRef = this.dialog.open(HealthSubscriptionDialogComponent, {
      width: '680px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        subscription: subscription ?? null,
        patients: this.patientLookups(),
        professionals: this.professionals(),
        services: this.services()
      }
    });

    dialogRef.afterClosed().subscribe(payload => {
      if (!payload) return;
      this.save(() => subscription ? this.healthService.updateSubscription(subscription.id, payload) : this.healthService.createSubscription(payload), () => {
        this.loadSubscriptions();
        this.loadPaymentsAndSummary();
      });
    });
  }

  deleteSubscription(subscription: HealthPlanSubscription): void {
    if (!this.isSuperAdmin()) {
      return;
    }

    this.confirmDelete('Eliminar plan mensual', `Se va a eliminar el plan de ${this.getSubscriptionPatientName(subscription)}.`, () => {
      this.save(() => this.healthService.deleteSubscription(subscription.id), () => {
        this.loadSubscriptions();
        this.loadPaymentsAndSummary();
      });
    });
  }

  private loadLookups(): void {
    if (!this.canManageHealth()) {
      return;
    }

    this.clientsService.getPaged(1, 1000).subscribe(response => this.clients.set(response.items));
    this.employeesService.getPaged(1, 1000).subscribe(response => {
      this.employees.set(response.items);
      const pendingEmployeeId = this.pendingProfessionalEmployeeId();
      if (pendingEmployeeId) {
        this.pendingProfessionalEmployeeId.set(null);
        setTimeout(() => this.openProfessionalDialog(undefined, pendingEmployeeId));
      }
    });
    this.paymentMethodsService.getPaged(1, 1000).subscribe(response => this.paymentMethods.set(response.items));
    this.cashMovementCategoriesService.getPaged(1, 1000).subscribe(response => this.cashCategories.set(response.items));
  }

  private loadHealthData(): void {
    this.isLoading.set(true);
    this.feedback.set('');
    this.healthService.getProfessionalTypes().subscribe(response => this.professionalTypes.set(response.items));
    this.healthService.getServices().subscribe(response => this.services.set(response.items));
    this.healthService.getProfessionals().subscribe(response => this.professionals.set(response.items));
    this.healthService.getPatients('', 1, 1000).subscribe(response => this.patientLookups.set(response.items));
    this.loadPatients();
    if (this.canManageHealth()) {
      this.loadPaymentsAndSummary();
      this.loadSubscriptions();
    }
    this.loadAppointments();
    this.isLoading.set(false);
  }

  private loadPatients(): void {
    this.healthService.getPatients(this.patientsSearch(), this.patientsPageNumber(), this.patientsPageSize(), this.showArchivedPatients()).subscribe(response => {
      this.patients.set(response.items);
      if (!this.appointmentPatientSearchControl.value) {
        this.appointmentPatientOptions.set(response.items.slice(0, 8));
      }
      this.patientsTotalCount.set(response.totalCount);
      const pendingPatientId = this.pendingPatientId();
      if (pendingPatientId) {
        this.pendingPatientId.set(null);
        this.router.navigate(['/health', 'patients', pendingPatientId]);
      }
    });
  }

  private loadPaymentsAndSummary(): void {
    const filters = this.buildPaymentFilters();
    this.healthService.getPayments({
      ...filters,
      pageNumber: this.paymentsPageNumber(),
      pageSize: this.paymentsPageSize()
    }).subscribe(response => {
      this.payments.set(response.items);
      this.paymentsTotalCount.set(response.totalCount);
      this.paymentsPageNumber.set(response.pageNumber);
      this.paymentsPageSize.set(response.pageSize);
    });
    this.healthService.getPaymentSummary(filters).subscribe(response => this.paymentSummary.set(response));
  }

  private loadSubscriptions(): void {
    const raw = this.subscriptionFiltersForm.getRawValue();
    this.healthService.getSubscriptions({
      patientProfileId: raw.patientProfileId,
      healthServiceId: raw.healthServiceId,
      status: raw.status,
      pageNumber: this.subscriptionsPageNumber(),
      pageSize: this.subscriptionsPageSize()
    }).subscribe({
      next: response => {
        this.subscriptions.set(response.items);
        this.subscriptionsTotalCount.set(response.totalCount);
        this.subscriptionsPageNumber.set(response.pageNumber);
        this.subscriptionsPageSize.set(response.pageSize);
      },
      error: () => {
        this.subscriptions.set([]);
        this.subscriptionsTotalCount.set(0);
        this.feedback.set('No se pudieron cargar los planes mensuales.');
      }
    });
  }

  private buildPaymentFilters(): { patientProfileId?: number | null; professionalTypeId?: number | null; professionalId?: number | null; from?: string; to?: string } {
    const raw = this.paymentFiltersForm.getRawValue();
    return {
      patientProfileId: raw.patientProfileId,
      professionalTypeId: raw.professionalTypeId,
      professionalId: raw.professionalId,
      from: raw.from ? new Date(`${raw.from}T00:00:00`).toISOString() : undefined,
      to: raw.to ? new Date(`${raw.to}T23:59:59`).toISOString() : undefined
    };
  }

  private searchAppointmentPatients(value: string | HealthPatientProfile): Observable<HealthPatientProfile[]> {
    if (typeof value !== 'string') {
      return of([value]);
    }

    return this.healthService.getPatients(value, 1, 8).pipe(
      switchMap(response => of(response.items)),
      catchError(() => of([]))
    );
  }

  private getDefaultHealthPaymentCategoryId(): number | null {
    const incomeCategories = this.cashCategories().filter(category => category.tipoMovimiento === 1);
    return incomeCategories.find(category => category.nombre.toLowerCase().includes('salud'))?.id
      ?? incomeCategories.find(category => category.nombre.toLowerCase().includes('cobro'))?.id
      ?? incomeCategories[0]?.id
      ?? null;
  }

  private save(request: () => Observable<unknown>, afterSave: () => void): void {
    this.isSaving.set(true);
    this.feedback.set('');
    request().subscribe({
      next: () => {
        this.isSaving.set(false);
        afterSave();
      },
      error: () => {
        this.isSaving.set(false);
        this.feedback.set('No se pudo guardar la operación.');
      }
    });
  }

  private getRange(): { from: Date; to: Date } {
    const selected = new Date(`${this.selectedDate()}T00:00:00`);
    if (this.calendarView() === 'day') {
      return { from: selected, to: new Date(selected.getFullYear(), selected.getMonth(), selected.getDate(), 23, 59, 59) };
    }
    if (this.calendarView() === 'month') {
      return { from: new Date(selected.getFullYear(), selected.getMonth(), 1), to: new Date(selected.getFullYear(), selected.getMonth() + 1, 0, 23, 59, 59) };
    }
    const day = selected.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;
    const from = new Date(selected);
    from.setDate(selected.getDate() + mondayOffset);
    const to = new Date(from);
    to.setDate(from.getDate() + 6);
    to.setHours(23, 59, 59);
    return { from, to };
  }

  private buildCalendarDays(): CalendarDayCell[] {
    const selected = new Date(`${this.selectedDate()}T00:00:00`);
    if (this.calendarView() === 'day') {
      return [this.buildCalendarDayCell(selected, selected.getMonth())];
    }

    if (this.calendarView() === 'week') {
      const range = this.getRange();
      return Array.from({ length: 7 }, (_, index) => {
        const date = new Date(range.from);
        date.setDate(range.from.getDate() + index);
        return this.buildCalendarDayCell(date, selected.getMonth());
      });
    }

    const firstOfMonth = new Date(selected.getFullYear(), selected.getMonth(), 1);
    const mondayOffset = firstOfMonth.getDay() === 0 ? -6 : 1 - firstOfMonth.getDay();
    const firstCell = new Date(firstOfMonth);
    firstCell.setDate(firstOfMonth.getDate() + mondayOffset);

    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(firstCell);
      date.setDate(firstCell.getDate() + index);
      return this.buildCalendarDayCell(date, selected.getMonth());
    });
  }

  private buildCalendarDayCell(date: Date, selectedMonth: number): CalendarDayCell {
    return {
      date,
      dayNumber: date.getDate(),
      label: date.toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric' }),
      isCurrentMonth: date.getMonth() === selectedMonth,
      isToday: this.isSameDate(date, new Date()),
      appointments: this.appointments()
        .filter(appointment => this.isSameDate(new Date(appointment.startsAt), date))
        .sort((left, right) => new Date(left.startsAt).getTime() - new Date(right.startsAt).getTime())
    };
  }

  private isSameDate(left: Date, right: Date): boolean {
    return left.getFullYear() === right.getFullYear()
      && left.getMonth() === right.getMonth()
      && left.getDate() === right.getDate();
  }

  private toDateInput(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

  private toDateTimeLocalInput(value: string): string {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  private confirmDelete(title: string, message: string, onConfirm: () => void): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        title,
        message,
        confirmLabel: 'Eliminar',
        cancelLabel: 'Cancelar',
        tone: 'danger'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        onConfirm();
      }
    });
  }
}
