import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { ClientContract, ContractTemplate } from '../../models/contract.model';
import { ContractsService } from '../../services/contracts.service';

@Component({
  selector: 'app-contracts-page', standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTabsModule],
  templateUrl: './contracts-page.html', styleUrl: './contracts-page.scss', changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractsPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(ContractsService);
  readonly templates = signal<ContractTemplate[]>([]);
  readonly contracts = signal<ClientContract[]>([]);
  readonly editingId = signal<number | null>(null);
  readonly selectedStatus = signal<'New' | string>('New');
  readonly selectedVersion = signal<number | null>(null);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly feedback = signal('');
  readonly legalReviewed = signal(false);
  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required], acceptanceText: ['', Validators.required],
    clauses: this.fb.array([] as ReturnType<ContractsPageComponent['clauseGroup']>[])
  });

  get clauses(): FormArray { return this.form.controls.clauses; }
  get isDraft(): boolean { return this.selectedStatus() === 'Draft'; }

  constructor() { this.load(true); }

  load(selectCurrent = false): void {
    this.loading.set(true);
    this.service.getTemplates().subscribe(items => {
      this.templates.set(items);
      if (selectCurrent) this.edit(items.find(item => item.status === 'Active') ?? items.find(item => item.status === 'Draft') ?? items[0] ?? null);
      this.loading.set(false);
    });
    this.service.getContracts().subscribe(items => this.contracts.set(items));
  }

  clauseGroup(clause?: { title?: string; body?: string }) {
    return this.fb.nonNullable.group({ title: [clause?.title ?? '', Validators.required], body: [clause?.body ?? '', Validators.required] });
  }

  addClause(): void { if (this.canEdit()) this.clauses.push(this.clauseGroup()); }
  removeClause(index: number): void { if (this.canEdit() && this.clauses.length > 1) this.clauses.removeAt(index); }
  move(index: number, direction: number): void {
    if (!this.canEdit()) return;
    const target = index + direction;
    if (target < 0 || target >= this.clauses.length) return;
    const control = this.clauses.at(index); this.clauses.removeAt(index); this.clauses.insert(target, control);
  }

  edit(template: ContractTemplate | null): void {
    this.editingId.set(template?.status === 'Draft' ? template.id : null);
    this.selectedStatus.set(template?.status ?? 'New');
    this.selectedVersion.set(template?.version ?? null);
    this.form.enable({ emitEvent: false });
    this.form.patchValue({ name: template?.name ?? 'Contrato de deslinde general', acceptanceText: template?.acceptanceText ?? 'Declaro haber leído y comprendido el presente contrato.' });
    this.clauses.clear();
    (template?.clauses ?? [{ title: '', body: '' }]).forEach(item => this.clauses.push(this.clauseGroup(item)));
    if (template && template.status !== 'Draft') this.form.disable({ emitEvent: false });
    this.legalReviewed.set(false);
    this.feedback.set('');
  }

  createVersion(): void {
    const source = this.templates().find(item => item.status === 'Active') ?? this.templates()[0] ?? null;
    this.edit(source);
    this.form.enable({ emitEvent: false });
    this.editingId.set(null);
    this.selectedStatus.set('New');
    this.selectedVersion.set(null);
    this.feedback.set('Nueva versión preparada a partir del contrato activo.');
  }

  save(): void {
    if (!this.canEdit() || !this.validateForm()) return;
    this.saving.set(true);
    this.service.saveTemplate(this.draftPayload()).subscribe({
      next: item => {
        this.editingId.set(item.id); this.selectedStatus.set('Draft'); this.selectedVersion.set(item.version);
        this.feedback.set('Borrador guardado.'); this.saving.set(false); this.load(false);
      },
      error: response => { this.feedback.set(response.error?.error ?? 'No se pudo guardar.'); this.saving.set(false); }
    });
  }

  activate(): void {
    if (!this.canEdit() || !this.legalReviewed() || !this.validateForm()) return;
    this.saving.set(true);
    this.service.saveTemplate(this.draftPayload()).pipe(
      switchMap(saved => this.service.activateTemplate(saved.id))
    ).subscribe({
      next: active => {
        this.feedback.set(`Versión ${active.version} guardada y activada.`);
        this.saving.set(false);
        this.editingId.set(null);
        this.selectedStatus.set('Active');
        this.selectedVersion.set(active.version);
        this.load(true);
      },
      error: response => { this.feedback.set(response.error?.error ?? 'No se pudo guardar y activar la versión.'); this.saving.set(false); }
    });
  }

  badgeLabel(): string {
    if (this.selectedStatus() === 'Active') return `ACTIVA · V${this.selectedVersion()}`;
    if (this.selectedStatus() === 'Archived') return `ARCHIVADA · V${this.selectedVersion()}`;
    if (this.selectedStatus() === 'Draft') return `BORRADOR · V${this.selectedVersion()}`;
    return 'NUEVA VERSIÓN';
  }

  count(status: string): number { return this.contracts().filter(item => item.status === status).length; }
  statusLabel(status: string): string { return ({ PendingSignature: 'Pendiente', Signed: 'Firmado', Voided: 'Anulado', Superseded: 'Reemplazado' } as Record<string, string>)[status] ?? status; }
  download(contract: ClientContract): void { this.service.download(this.service.pdfUrl(contract.id)).subscribe(blob => { const url = URL.createObjectURL(blob), anchor = document.createElement('a'); anchor.href = url; anchor.download = `contrato-${contract.clientName}.pdf`; anchor.click(); URL.revokeObjectURL(url); }); }

  private canEdit(): boolean { return this.selectedStatus() === 'Draft' || this.selectedStatus() === 'New'; }
  private validateForm(): boolean { if (this.form.valid) return true; this.form.markAllAsTouched(); return false; }
  private draftPayload() {
    const raw = this.form.getRawValue();
    return { id: this.editingId(), name: raw.name, acceptanceText: raw.acceptanceText, clauses: raw.clauses.map((item, index) => ({ sortOrder: index + 1, title: item.title, body: item.body })) };
  }
}
