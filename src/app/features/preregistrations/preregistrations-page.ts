import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';
import { AppPageEvent, AppPaginatorComponent } from '../../core/components/app-paginator/app-paginator';
import { ConfirmDialogComponent } from '../../core/components/confirm-dialog/confirm-dialog';
import { Applicant, ApplicantDetail, ClientMatch, PreregistrationsService, statusLabel } from './preregistrations.service';

@Component({
  selector: 'app-preregistrations-page', standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatProgressSpinnerModule, AppPaginatorComponent],
  templateUrl: './preregistrations-page.html', styleUrl: './preregistrations-page.scss', changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreregistrationsPageComponent {
  private readonly service = inject(PreregistrationsService);
  private readonly dialog = inject(MatDialog);
  private readonly destroy = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private request?: Subscription;
  readonly items = signal<Applicant[]>([]); readonly total = signal(0); readonly loading = signal(false);
  readonly error = signal(''); readonly page = signal(1); readonly size = signal(20);
  readonly statusLabel = statusLabel;
  search = ''; status = ''; private appliedSearch = ''; private appliedStatus = '';
  constructor() {
    this.load();
    const id = Number(this.route.snapshot.queryParamMap.get('id'));
    if (Number.isInteger(id) && id > 0) this.openId(id);
  }
  searchApplicants(): void { this.appliedSearch = this.search.trim(); this.appliedStatus = this.status; this.page.set(1); this.load(); }
  changePage(event: AppPageEvent): void { this.page.set(event.pageNumber); this.size.set(event.pageSize); this.load(); }
  load(): void {
    this.request?.unsubscribe(); this.loading.set(true); this.error.set(''); this.items.set([]);
    this.request = this.service.list(this.appliedSearch, this.appliedStatus, this.page(), this.size()).pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next: response => { this.items.set(response.items); this.total.set(response.totalCount); this.loading.set(false); },
      error: () => { this.error.set('No pudimos cargar las preinscripciones. Intentá nuevamente.'); this.loading.set(false); }
    });
  }
  open(item: Applicant): void { this.openId(item.id); }
  private openId(id: number): void {
    this.dialog.open(PreregistrationDetailComponent, { data: id, width: '900px', maxWidth: '95vw', maxHeight: '92vh' })
      .afterClosed().pipe(takeUntilDestroyed(this.destroy)).subscribe(() => this.load());
  }
  receivedDate(value: string): string { return /Z$|[+-]\d{2}:\d{2}$/.test(value) ? value : `${value}Z`; }
}

@Component({
  selector: 'app-preregistration-detail', standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatProgressSpinnerModule],
  templateUrl: './preregistration-detail.html', styleUrl: './preregistrations-page.scss', changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreregistrationDetailComponent {
  private readonly id = inject<number>(MAT_DIALOG_DATA);
  private readonly service = inject(PreregistrationsService);
  private readonly destroy = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly ref = inject(MatDialogRef<PreregistrationDetailComponent>);
  readonly item = signal<ApplicantDetail | null>(null); readonly loading = signal(false); readonly saving = signal(false);
  readonly error = signal(''); readonly editing = signal(false); readonly statusLabel = statusLabel;
  draft: Record<string, string> = {};
  readonly fields = [
    { key: 'firstName', label: 'Nombre', max: 100, type: 'text' }, { key: 'lastName', label: 'Apellido', max: 100, type: 'text' },
    { key: 'documentNumber', label: 'DNI', max: 10, type: 'text' }, { key: 'birthDate', label: 'Fecha de nacimiento', max: 10, type: 'date' },
    { key: 'whatsapp', label: 'WhatsApp', max: 40, type: 'tel' }, { key: 'email', label: 'Email', max: 254, type: 'email' },
    { key: 'address', label: 'Domicilio', max: 300, type: 'text' }, { key: 'desiredStartDate', label: 'Inicio estimado', max: 10, type: 'date' },
    { key: 'goalsAndBackground', label: 'Objetivos y antecedentes de entrenamiento', max: 4000, type: 'textarea' },
    { key: 'healthConsiderations', label: 'Molestias y antecedentes de salud declarados', max: 4000, type: 'textarea' }
  ];
  readonly shifts = ['Mañana (07:00 a 12:00)', 'Mediodía (12:00 a 16:30)', 'Tarde / noche (16:30 a 21:00)', 'Entrenamiento libre (sin rutina asignada)'];
  readonly snapshotFields = [...this.fields, { key: 'weeklyFrequency', label: 'Frecuencia semanal', type: 'text' }, { key: 'preferredShift', label: 'Turno preferido', type: 'text' }, { key: 'followUpNotes', label: 'Notas de seguimiento', type: 'textarea' }];
  constructor() { this.load(); }
  load(): void {
    this.editing.set(false); this.loading.set(true); this.error.set('');
    this.service.get(this.id).pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next: result => { this.item.set(result); this.loading.set(false); },
      error: () => { this.error.set('No pudimos cargar la ficha. Intentá nuevamente.'); this.loading.set(false); }
    });
  }
  startEdit(): void {
    const p = this.item(); if (!p || p.clientId) return;
    this.draft = {};
    for (const field of this.snapshotFields) this.draft[field.key] = this.value(p as unknown as Record<string, unknown>, field.key);
    this.draft['status'] = p.status; this.editing.set(true); this.error.set('');
  }
  save(): void {
    const p = this.item(); if (!p || this.saving()) return;
    this.setSaving(true); this.error.set('');
    this.service.edit(p.id, p.version, this.draft).pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next: () => { this.setSaving(false); this.editing.set(false); this.load(); },
      error: err => { this.setSaving(false); this.error.set(err.error?.message ?? 'No pudimos guardar. Revisá los campos.'); }
    });
  }
  enroll(): void {
    const p = this.item(); if (!p || p.clientId || p.status === 'Discarded') return;
    this.ref.close(); this.router.navigate(['/clients/new'], { queryParams: { preregistrationId: p.id, returnUrl: '/preregistrations' } });
  }
  link(match: ClientMatch): void {
    const p = this.item(); if (!p || this.saving()) return;
    this.dialog.open(ConfirmDialogComponent, { data: {
      title: 'Vincular cliente existente',
      message: `La solicitud se marcará como inscripta y se vinculará a ${match.nombre} ${match.apellido} (DNI ${match.dni}). Se conservarán los datos y las membresías del cliente.${match.activo ? '' : ' El cliente está archivado y seguirá archivado.'}`,
      confirmLabel: 'Vincular cliente', cancelLabel: 'Cancelar', tone: 'primary'
    }}).afterClosed().pipe(takeUntilDestroyed(this.destroy)).subscribe(confirmed => {
      if (!confirmed) return;
      this.setSaving(true); this.error.set('');
      this.service.link(p.id, p.version, match.id).pipe(takeUntilDestroyed(this.destroy)).subscribe({
        next: () => { this.setSaving(false); this.load(); },
        error: err => { this.setSaving(false); this.error.set(err.error?.message ?? 'No pudimos vincular el cliente.'); }
      });
    });
  }
  valueFromItem(key: string): string { return this.value(this.item() as unknown as Record<string, unknown>, key); }
  private setSaving(value: boolean): void { this.saving.set(value); this.ref.disableClose = value; }
  value(data: Record<string, unknown>, key: string): string { return data[key] == null ? '' : String(data[key]); }
  receivedDate(value: string): string { return /Z$|[+-]\d{2}:\d{2}$/.test(value) ? value : `${value}Z`; }
}