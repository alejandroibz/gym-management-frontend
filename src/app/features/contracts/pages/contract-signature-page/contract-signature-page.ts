import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../../../core/auth/role';
import { ClientContract } from '../../models/contract.model';
import { ContractsService } from '../../services/contracts.service';

@Component({
  selector: 'app-contract-signature-page', standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './contract-signature-page.html', styleUrl: './contract-signature-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractSignaturePageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(ContractsService);
  private readonly roles = inject(RoleService);
  private readonly fb = inject(FormBuilder);
  private drawing = false;
  private openedAt = Date.now();
  private canvasElement?: HTMLCanvasElement;

  readonly contract = signal<ClientContract | null>(null);
  readonly hasSignature = signal(false);
  readonly reachedEnd = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly isStudent = signal(false);
  readonly form = this.fb.nonNullable.group({
    signerName: ['', Validators.required], signerDni: ['', Validators.required],
    signerCapacity: ['Self'],
    readConfirmed: [{ value: false, disabled: true }, Validators.requiredTrue],
    accepted: [false, Validators.requiredTrue]
  });

  @ViewChild('canvas') set canvas(ref: ElementRef<HTMLCanvasElement> | undefined) {
    if (!ref) return;
    this.canvasElement = ref.nativeElement;
    queueMicrotask(() => this.prepareCanvas(ref.nativeElement));
  }

  constructor() {
    this.roles.hasRole('User').subscribe(value => this.isStudent.set(value));
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.get(id).subscribe({
      next: item => {
        this.contract.set(item);
        this.openedAt = Date.now();
        this.form.patchValue({ signerName: item.snapshot.isMinor ? '' : item.clientName, signerDni: item.snapshot.isMinor ? '' : item.clientDni ?? '', signerCapacity: item.snapshot.isMinor ? 'Guardian' : 'Self' });
        if (item.status !== 'PendingSignature') this.error.set('Este contrato ya no está pendiente de firma.');
      },
      error: () => this.error.set('No se pudo abrir el contrato.')
    });
  }

  onContractScroll(event: Event): void {
    const element = event.currentTarget as HTMLElement;
    if (element.scrollHeight - element.scrollTop - element.clientHeight <= 12) this.unlockReadingConfirmation();
  }

  unlockIfShort(element: HTMLElement): void {
    if (element.scrollHeight <= element.clientHeight + 12) this.unlockReadingConfirmation();
  }

  start(event: PointerEvent): void {
    this.drawing = true;
    this.canvasElement?.setPointerCapture(event.pointerId);
    this.draw(event, true);
  }

  move(event: PointerEvent): void { if (this.drawing) this.draw(event, false); }
  stop(): void { if (this.drawing) this.hasSignature.set(true); this.drawing = false; this.canvasElement?.getContext('2d')?.beginPath(); }
  clear(): void { const canvas = this.canvasElement; if (canvas) canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height); this.hasSignature.set(false); }

  submit(): void {
    const item = this.contract();
    if (!item || !this.canvasElement || this.form.invalid || !this.hasSignature() || !this.reachedEnd()) return;
    this.saving.set(true);
    const raw = this.form.getRawValue();
    this.service.sign(item.id, {
      ...raw,
      readingSeconds: Math.max(3, Math.floor((Date.now() - this.openedAt) / 1000)),
      signatureDataUrl: this.canvasElement.toDataURL('image/png')
    }).subscribe({
      next: () => void this.router.navigate([this.isStudent() ? '/profile' : `/clients/${item.clientId}`]),
      error: response => { this.error.set(response.error?.error ?? 'No se pudo guardar la firma.'); this.saving.set(false); }
    });
  }

  private unlockReadingConfirmation(): void {
    if (this.reachedEnd()) return;
    this.reachedEnd.set(true);
    this.form.controls.readConfirmed.enable();
  }

  private prepareCanvas(canvas: HTMLCanvasElement): void {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * ratio;
    canvas.height = 220 * ratio;
    canvas.getContext('2d')?.scale(ratio, ratio);
  }

  private draw(event: PointerEvent, start: boolean): void {
    const canvas = this.canvasElement, context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    const bounds = canvas.getBoundingClientRect(), x = event.clientX - bounds.left, y = event.clientY - bounds.top;
    context.strokeStyle = '#171719'; context.lineWidth = 2.4; context.lineCap = 'round'; context.lineJoin = 'round';
    if (start) { context.beginPath(); context.moveTo(x, y); } else { context.lineTo(x, y); context.stroke(); }
  }
}
