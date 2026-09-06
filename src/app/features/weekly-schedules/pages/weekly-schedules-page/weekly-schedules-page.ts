import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { forkJoin } from 'rxjs';
import { ConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog';
import { Client } from '../../../clients/models/client.model';
import { ClientsService } from '../../../clients/services/clients.service';
import { BulkAssignmentPayload, BulkAssignmentPreview, TrainerSchedule, WeeklyAssignment, WeeklyShift } from '../../models/weekly-schedule.model';
import { WeeklySchedulesService } from '../../services/weekly-schedules.service';

@Component({ selector: 'app-weekly-schedules-page', standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatCheckboxModule, MatDialogModule, MatIconModule, MatProgressSpinnerModule, MatSelectModule, MatTabsModule],
  templateUrl: './weekly-schedules-page.html', styleUrl: './weekly-schedules-page.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class WeeklySchedulesPageComponent {
  @Input() embedded = false;
  @Output() trackingRequested = new EventEmitter<number>();
  private readonly api = inject(WeeklySchedulesService); private readonly clientsApi = inject(ClientsService); private readonly dialog = inject(MatDialog);
  readonly days = [{ value: 1, label: 'Lunes' }, { value: 2, label: 'Martes' }, { value: 3, label: 'Miércoles' }, { value: 4, label: 'Jueves' }, { value: 5, label: 'Viernes' }, { value: 6, label: 'Sábado' }];
  readonly shifts = [{ value: WeeklyShift.Morning, label: 'Mañana', hours: '07:00–12:00' }, { value: WeeklyShift.Afternoon, label: 'Tarde', hours: '12:00–16:30' }, { value: WeeklyShift.Night, label: 'Noche', hours: '16:30–21:00' }];
  readonly trainers = signal<TrainerSchedule[]>([]); readonly clients = signal<Client[]>([]); readonly assignments = signal<WeeklyAssignment[]>([]);
  readonly selectedClients = signal(new Set<number>()); readonly selectedDays = signal(new Set<number>());
  readonly loading = signal(true); readonly saving = signal(false); readonly error = signal(''); readonly success = signal(''); readonly preview = signal<BulkAssignmentPreview | null>(null);
  readonly clientPage = signal(1); readonly clientTotalPages = signal(1); readonly clientsLoading = signal(false);
  search = ''; readonly selectedShift = signal(WeeklyShift.Morning); selectedTrainerId: number | null = null; attendanceTime = '';
  viewIndex = 0;
  private clientSearchTimer?: ReturnType<typeof setTimeout>;
  readonly filteredClients = computed(() => { const term = this.search.trim().toLowerCase(); return this.clients().filter(c => !term || `${c.apellido} ${c.nombre} ${c.dni}`.toLowerCase().includes(term)); });
  readonly availableTrainers = computed(() => { const days = [...this.selectedDays()]; const shift = this.selectedShift(); if (!days.length) return []; return this.trainers().filter(t => t.active && days.every(day => t.slots.some(slot => slot.dayOfWeek === day && slot.shift === shift))); });
  constructor() { this.load(); }
  hasSlot(trainer: TrainerSchedule, day: number, shift: WeeklyShift): boolean { return trainer.slots.some(x => x.dayOfWeek === day && x.shift === shift); }
  toggleSlot(trainer: TrainerSchedule, day: number, shift: WeeklyShift): void { const slots = this.hasSlot(trainer, day, shift) ? trainer.slots.filter(x => x.dayOfWeek !== day || x.shift !== shift) : [...trainer.slots, { dayOfWeek: day, shift }]; this.saving.set(true); this.api.saveTrainer(trainer.employeeId, slots).subscribe({ next: () => { this.saving.set(false); this.loadTrainers(); }, error: () => { this.saving.set(false); this.error.set('No se pudo guardar el cronograma del profesor.'); } }); }
  toggleClient(id: number): void { if (!this.clients().find(x => x.id === id)?.activo) return; const next = new Set(this.selectedClients()); next.has(id) ? next.delete(id) : next.add(id); this.selectedClients.set(next); this.preview.set(null); }
  toggleAll(): void { const visible = this.filteredClients().filter(x => x.activo); const all = visible.every(x => this.selectedClients().has(x.id)); const next = new Set(this.selectedClients()); visible.forEach(x => all ? next.delete(x.id) : next.add(x.id)); this.selectedClients.set(next); this.preview.set(null); }
  toggleDay(day: number): void { const next = new Set(this.selectedDays()); next.has(day) ? next.delete(day) : next.add(day); this.selectedDays.set(next); this.selectedTrainerId = null; this.preview.set(null); }
  changeView(index: number): void { this.viewIndex = index; if (index === 1 && !this.clients().length) this.loadClients(1); }
  onClientSearchChanged(value: string): void { this.search = value; clearTimeout(this.clientSearchTimer); this.clientSearchTimer = setTimeout(() => this.loadClients(1), 300); }
  setClientPage(direction: -1 | 1): void { const page = this.clientPage() + direction; if (page < 1 || page > this.clientTotalPages()) return; this.loadClients(page); }
  shiftChanged(shift: WeeklyShift): void { this.selectedShift.set(shift); this.selectedTrainerId = null; this.attendanceTime = ''; this.preview.set(null); }
  assignmentFor(clientId: number, day: number): WeeklyAssignment | undefined { return this.assignments().find(x => x.clientId === clientId && x.dayOfWeek === day); }
  assignmentsForTrainer(employeeId: number): WeeklyAssignment[] { return this.assignments().filter(x => x.employeeId === employeeId).sort((a, b) => a.dayOfWeek - b.dayOfWeek || a.clientName.localeCompare(b.clientName)); }
  assignmentsForTrainerDay(employeeId: number, day: number): WeeklyAssignment[] { return this.assignmentsForTrainer(employeeId).filter(x => x.dayOfWeek === day); }
  openClientTracking(item: WeeklyAssignment): void { this.trackingRequested.emit(item.clientId); }
  shiftLabel(value: WeeklyShift): string { return this.shifts.find(x => x.value === value)?.label ?? ''; }
  previewChanges(): void { const payload = this.payload(); if (!payload) return; this.saving.set(true); this.error.set(''); this.success.set(''); this.api.preview(payload).subscribe({ next: result => { this.preview.set(result); this.saving.set(false); }, error: () => { this.saving.set(false); this.error.set('No se pudo validar la asignación.'); } }); }
  confirmChanges(): void {
    const payload = this.payload();
    if (!payload) return;
    this.saving.set(true);
    this.error.set('');
    this.success.set('');
    this.api.preview(payload).subscribe({
      next: result => {
        this.preview.set(result);
        if (result.errors.length || result.invalidCount > 0 || result.replacedCount > 0) {
          this.saving.set(false);
          return;
        }
        this.applyPayload(payload);
      },
      error: () => {
        this.saving.set(false);
        this.error.set('No se pudo validar la asignación.');
      }
    });
  }
  applyChanges(): void { const payload = this.payload(); if (!payload || this.preview()?.errors.length) return; this.saving.set(true); this.applyPayload(payload); }
  editAssignment(item: WeeklyAssignment): void { this.selectedClients.set(new Set([item.clientId])); this.selectedDays.set(new Set([item.dayOfWeek])); this.selectedShift.set(item.shift); this.attendanceTime = item.attendanceTime?.slice(0, 5) ?? ''; this.selectedTrainerId = item.employeeId; this.preview.set(null); this.viewIndex = 1; if (!this.clients().length) this.loadClients(1); }
  removeAssignment(item: WeeklyAssignment): void {
    this.dialog.open(ConfirmDialogComponent, {
      width: 'min(480px, calc(100vw - 32px))',
      disableClose: true,
      data: {
        title: 'Eliminar asignación',
        message: `Se eliminará la asignación de ${item.clientName} para el día ${this.days.find(day => day.value === item.dayOfWeek)?.label ?? ''}.`,
        confirmLabel: 'Eliminar asignación',
        cancelLabel: 'Cancelar',
        tone: 'danger'
      }
    }).afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.api.delete([item.clientId], [item.dayOfWeek]).subscribe({
        next: () => {
          this.success.set('La asignación fue eliminada.');
          this.loadAssignments();
        },
        error: () => this.error.set('No se pudo eliminar la asignación.')
      });
    });
  }
  private payload(): BulkAssignmentPayload | null { if (!this.selectedClients().size || !this.selectedDays().size || !this.selectedTrainerId) { this.error.set('Seleccioná alumnos, días y un profesor disponible.'); return null; } return { clientIds: [...this.selectedClients()], days: [...this.selectedDays()], shift: this.selectedShift(), employeeId: this.selectedTrainerId, attendanceTime: this.attendanceTime || null }; }
  private applyPayload(payload: BulkAssignmentPayload): void { this.api.apply(payload).subscribe({ next: result => { this.saving.set(false); this.preview.set(null); this.selectedClients.set(new Set()); this.success.set(`Se guardaron ${result.newCount + result.replacedCount} asignaciones.`); this.loadAssignments(); }, error: () => { this.saving.set(false); this.error.set('No se pudieron guardar las asignaciones.'); } }); }
  private load(): void { forkJoin({ trainers: this.api.getTrainers(), assignments: this.api.getAssignments() }).subscribe({ next: data => { this.trainers.set(data.trainers); this.assignments.set(data.assignments); this.loading.set(false); }, error: () => { this.loading.set(false); this.error.set('No se pudo cargar la planificación semanal.'); } }); }
  private loadClients(page: number): void { this.clientsLoading.set(true); this.clientsApi.getPaged(page, 50, { clientStatus: 'all', search: this.search.trim() || undefined }).subscribe({ next: result => { this.clients.set(result.items); this.clientPage.set(result.pageNumber); this.clientTotalPages.set(result.totalPages); this.clientsLoading.set(false); }, error: () => { this.clientsLoading.set(false); this.error.set('No se pudieron cargar los alumnos.'); } }); }
  private loadTrainers(): void { this.api.getTrainers().subscribe(x => this.trainers.set(x)); }
  private loadAssignments(): void { this.api.getAssignments().subscribe(x => this.assignments.set(x)); }
}
