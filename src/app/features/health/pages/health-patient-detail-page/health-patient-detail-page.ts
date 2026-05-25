import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog';
import { Client } from '../../../clients/models/client.model';
import { ClientsService } from '../../../clients/services/clients.service';
import { Employee } from '../../../employees/models/employee.model';
import { EmployeesService } from '../../../employees/services/employees.service';
import { PaymentMethod } from '../../../payment-methods/models/payment-method.model';
import { PaymentMethodsService } from '../../../payment-methods/services/payment-methods.service';
import { HealthPaymentDialogComponent } from '../../components/health-payment-dialog/health-payment-dialog';
import { HealthPatientDialogComponent } from '../../components/health-patient-dialog/health-patient-dialog';
import { HealthSubscriptionDialogComponent } from '../../components/health-subscription-dialog/health-subscription-dialog';
import { HealthArchivePatientDialogComponent } from '../../components/health-archive-patient-dialog/health-archive-patient-dialog';
import { HealthAppointment, HealthPatientDetail, HealthPatientProfile, HealthPayment, HealthPlanSubscription, HealthProfessional, HealthProfessionalType, HealthService, HealthTrainerNote } from '../../models/health.model';
import { HealthServiceApi } from '../../services/health.service';

@Component({
  selector: 'app-health-patient-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
  templateUrl: './health-patient-detail-page.html',
  styleUrl: './health-patient-detail-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HealthPatientDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly formBuilder = inject(FormBuilder);
  private readonly healthService = inject(HealthServiceApi);
  private readonly clientsService = inject(ClientsService);
  private readonly employeesService = inject(EmployeesService);
  private readonly paymentMethodsService = inject(PaymentMethodsService);

  readonly detail = signal<HealthPatientDetail | null>(null);
  readonly client = signal<Client | null>(null);
  readonly professionals = signal<HealthProfessional[]>([]);
  readonly professionalTypes = signal<HealthProfessionalType[]>([]);
  readonly services = signal<HealthService[]>([]);
  readonly employees = signal<Employee[]>([]);
  readonly paymentMethods = signal<PaymentMethod[]>([]);
  readonly isLoading = signal(true);
  readonly isSaving = signal(false);
  readonly feedback = signal('');
  readonly isTrainerNoteEditorOpen = signal(false);
  readonly editingTrainerNote = signal<HealthTrainerNote | null>(null);

  readonly patientName = computed(() => this.detail()?.patient.clientName ?? 'Paciente');
  readonly isPatientArchived = computed(() => this.detail()?.patient.activo === false);

  readonly trainerNoteForm = this.formBuilder.nonNullable.group({
    healthPatientProfileId: [0, [Validators.required, Validators.min(1)]],
    healthProfessionalId: [0, [Validators.required, Validators.min(1)]],
    title: ['', Validators.required],
    restrictions: [''],
    trainingIndications: [''],
    alertNotes: ['']
  });

  constructor() {
    this.loadProfessionalTypes();
    this.loadProfessionals();
    this.loadServices();
    this.loadPaymentLookups();
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id > 0) {
        this.loadDetail(id);
      } else {
        this.router.navigate(['/health'], { queryParams: { tab: 'patients' } });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/health'], { queryParams: { tab: 'patients' } });
  }

  openPatientDialog(patient: HealthPatientProfile): void {
    if (!patient.activo) return;
    const dialogRef = this.dialog.open(HealthPatientDialogComponent, {
      width: '720px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        patient,
        clients: this.client() ? [this.client()!] : [],
        professionals: this.professionals()
      }
    });

    dialogRef.afterClosed().subscribe(payload => {
      if (!payload) return;
      this.save(() => this.healthService.updatePatient(patient.id, payload), () => this.loadDetail(patient.id));
    });
  }

  archivePatient(): void {
    const current = this.detail();
    if (!current || !current.patient.activo) return;

    const dialogRef = this.dialog.open(HealthArchivePatientDialogComponent, {
      width: '520px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        patientName: current.patient.clientName,
        pendingAppointmentsCount: this.getPendingAppointmentsCount(current),
        activeSubscriptionsCount: this.getActiveSubscriptionsCount(current)
      }
    });

    dialogRef.afterClosed().subscribe(payload => {
      if (!payload) return;
      this.save(() => this.healthService.archivePatient(current.patient.id, payload), () => this.loadDetail(current.patient.id));
    });
  }

  reactivatePatient(): void {
    const current = this.detail();
    if (!current || current.patient.activo) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        title: 'Reactivar ficha',
        message: `Se reactivara la ficha de salud de ${current.patient.clientName}. Los turnos y planes cancelados quedaran como historial.`,
        confirmLabel: 'Reactivar',
        cancelLabel: 'Cancelar',
        tone: 'primary'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.save(() => this.healthService.reactivatePatient(current.patient.id), () => this.loadDetail(current.patient.id));
    });
  }

  reactivateClient(): void {
    const current = this.detail();
    if (!current || this.client()) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        title: 'Reactivar cliente',
        message: `Se reactivara la ficha base de ${current.patient.clientName}. Los cobros historicos se conservaran.`,
        confirmLabel: 'Reactivar',
        cancelLabel: 'Cancelar',
        tone: 'primary'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.save(() => this.clientsService.reactivate(current.patient.clientId), () => this.loadDetail(current.patient.id));
    });
  }

  editTrainerNote(note: HealthTrainerNote): void {
    this.editingTrainerNote.set(note);
    this.isTrainerNoteEditorOpen.set(true);
    this.patchTrainerNote(note);
  }

  createTrainerNote(): void {
    if (this.trainerNoteForm.invalid) return;
    const raw = this.trainerNoteForm.getRawValue();
    const editing = this.editingTrainerNote();
    this.save(
      () => editing ? this.healthService.updateTrainerNote(editing.id, raw) : this.healthService.createTrainerNote(raw),
      () => this.loadDetail(raw.healthPatientProfileId)
    );
  }

  cancelTrainerNoteEdit(): void {
    const note = this.detail()?.trainerNotes[0] ?? null;
    this.editingTrainerNote.set(null);
    this.isTrainerNoteEditorOpen.set(false);
    if (note) {
      this.patchTrainerNote(note);
      return;
    }

    const patient = this.detail()?.patient;
    this.trainerNoteForm.reset({
      healthPatientProfileId: patient?.id ?? 0,
      healthProfessionalId: patient?.primaryProfessionalId ?? 0,
      title: '',
      restrictions: '',
      trainingIndications: '',
      alertNotes: ''
    });
  }

  deleteTrainerNote(note: HealthTrainerNote): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        title: 'Eliminar indicacion',
        message: `Se va a eliminar "${note.title}".`,
        confirmLabel: 'Eliminar',
        cancelLabel: 'Cancelar',
        tone: 'danger'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.save(() => this.healthService.deleteTrainerNote(note.id), () => this.loadDetail(note.healthPatientProfileId));
    });
  }

  editSubscription(subscription: HealthPlanSubscription): void {
    const dialogRef = this.dialog.open(HealthSubscriptionDialogComponent, {
      width: '680px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        subscription,
        patients: this.detail()?.patient ? [this.detail()!.patient] : [],
        professionals: this.professionals(),
        services: this.services()
      }
    });

    dialogRef.afterClosed().subscribe(payload => {
      if (!payload) return;
      this.save(() => this.healthService.updateSubscription(subscription.id, payload), () => this.loadDetail(subscription.healthPatientProfileId));
    });
  }

  deleteSubscription(subscription: HealthPlanSubscription): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        title: 'Eliminar plan mensual',
        message: `Se va a eliminar el plan "${subscription.serviceName ?? 'Plan mensual'}".`,
        confirmLabel: 'Eliminar',
        cancelLabel: 'Cancelar',
        tone: 'danger'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.save(() => this.healthService.deleteSubscription(subscription.id), () => this.loadDetail(subscription.healthPatientProfileId));
    });
  }

  openPaymentForAppointment(appointment: HealthAppointment): void {
    const patient = this.detail()?.patient;
    if (!patient || !patient.activo) return;

    const dialogRef = this.dialog.open(HealthPaymentDialogComponent, {
      width: '680px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        appointment,
        payment: null,
        patients: [patient],
        paymentMethods: this.paymentMethods(),
        employees: this.employees(),
        professionalTypes: this.professionalTypes(),
        services: this.services()
      }
    });

    dialogRef.afterClosed().subscribe(payload => {
      if (!payload) return;
      this.save(() => this.healthService.createPayment(payload), () => this.loadDetail(patient.id));
    });
  }

  getPaymentForAppointment(appointmentId: number): HealthPayment | null {
    return this.detail()?.payments.find(payment => payment.healthAppointmentId === appointmentId) ?? null;
  }

  canRegisterPaymentForAppointment(appointment: HealthAppointment): boolean {
    return !this.isPatientArchived() && !this.getPaymentForAppointment(appointment.id);
  }

  editAppointment(appointment: HealthAppointment): void {
    this.router.navigate(['/health'], {
      queryParams: {
        tab: 'agenda',
        appointmentId: appointment.id,
        date: appointment.startsAt.slice(0, 10)
      }
    });
  }

  deleteAppointment(appointment: HealthAppointment): void {
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
      this.save(() => this.healthService.deleteAppointment(appointment.id), () => this.loadDetail(appointment.healthPatientProfileId));
    });
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

  private loadDetail(id: number): void {
    this.isLoading.set(true);
    this.feedback.set('');
    this.healthService.getPatientDetail(id).subscribe({
      next: detail => {
        this.detail.set(detail);
        this.prepareTrainerNote(detail);
        this.clientsService.getById(detail.patient.clientId).subscribe({
          next: client => this.client.set(client),
          error: () => this.client.set(null)
        });
        this.isLoading.set(false);
      },
      error: () => {
        this.feedback.set('No se pudo cargar el detalle del paciente.');
        this.isLoading.set(false);
      }
    });
  }

  private loadProfessionals(): void {
    this.healthService.getProfessionals().subscribe(response => this.professionals.set(response.items));
  }

  private loadProfessionalTypes(): void {
    this.healthService.getProfessionalTypes().subscribe(response => this.professionalTypes.set(response.items));
  }

  private loadServices(): void {
    this.healthService.getServices().subscribe(response => this.services.set(response.items));
  }

  private loadPaymentLookups(): void {
    this.employeesService.getPaged(1, 1000).subscribe(response => this.employees.set(response.items));
    this.paymentMethodsService.getPaged(1, 1000).subscribe(response => this.paymentMethods.set(response.items));
  }

  private getPendingAppointmentsCount(detail: HealthPatientDetail): number {
    const now = new Date();
    return detail.appointments.filter(appointment =>
      new Date(appointment.startsAt) >= now &&
      appointment.status.trim().toLowerCase() === 'pendiente').length;
  }

  private getActiveSubscriptionsCount(detail: HealthPatientDetail): number {
    return detail.subscriptions.filter(subscription =>
      subscription.status.trim().toLowerCase() === 'activo' ||
      subscription.status.trim().toLowerCase() === 'active').length;
  }

  private prepareTrainerNote(detail: HealthPatientDetail): void {
    const note = detail.trainerNotes[0] ?? null;
    this.editingTrainerNote.set(null);
    this.isTrainerNoteEditorOpen.set(false);
    if (note) {
      this.patchTrainerNote(note);
      return;
    }

    this.trainerNoteForm.reset({
      healthPatientProfileId: detail.patient.id,
      healthProfessionalId: detail.patient.primaryProfessionalId ?? 0,
      title: '',
      restrictions: '',
      trainingIndications: '',
      alertNotes: ''
    });
  }

  private patchTrainerNote(note: HealthTrainerNote): void {
    this.trainerNoteForm.patchValue({
      healthPatientProfileId: note.healthPatientProfileId,
      healthProfessionalId: note.healthProfessionalId,
      title: note.title,
      restrictions: note.restrictions ?? '',
      trainingIndications: note.trainingIndications ?? '',
      alertNotes: note.alertNotes ?? ''
    });
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
        this.feedback.set('No se pudo guardar el cambio.');
        this.isSaving.set(false);
      }
    });
  }
}
