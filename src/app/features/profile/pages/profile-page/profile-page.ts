import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';

import { ToastService } from '../../../../core/services/toast.service';
import { UserProfile } from '../../models/profile.model';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule
  ],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly profileService = inject(ProfileService);
  private readonly toast = inject(ToastService);

  readonly profile = signal<UserProfile | null>(null);
  readonly isLoading = signal(false);
  readonly isSaving = signal(false);
  readonly imagePreviewUrl = signal<string | null>(null);
  readonly selectedAvatarName = signal<string | null>(null);
  readonly hasPendingChanges = signal(false);
  readonly cropImageUrl = signal<string | null>(null);
  readonly cropZoom = signal(1);
  readonly cropX = signal(50);
  readonly cropY = signal(50);
  private selectedAvatar: File | null = null;
  private originalAvatar: File | null = null;
  private lastSavedValue = '';
  private cropPreviewObjectUrl: string | null = null;
  private cropRenderToken = 0;

  readonly form = this.formBuilder.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    apellido: ['', [Validators.required, Validators.maxLength(100)]],
    telefono: ['', Validators.maxLength(50)],
    direccion: ['', Validators.maxLength(250)],
    bio: ['', Validators.maxLength(1000)],
    avatarUrl: ['', Validators.maxLength(1000)]
  });

  constructor() {
    this.form.valueChanges.subscribe(() => {
      this.hasPendingChanges.set(this.serializeForm() !== this.lastSavedValue || this.selectedAvatar !== null || this.originalAvatar !== null);
    });
    this.loadProfile();
  }

  get isStudentProfile(): boolean {
    return this.profile()?.profileType === 'Student';
  }

  get roleLabel(): string {
    const profile = this.profile();
    if (!profile) return 'Perfil';
    if (profile.profileType === 'Student') return 'Alumno';
    if (profile.role === 'SuperAdmin') return 'SuperAdmin';
    return 'Administrador';
  }

  get fullName(): string {
    const raw = this.form.getRawValue();
    const name = `${raw.nombre} ${raw.apellido}`.trim();
    return name || 'Mi perfil';
  }

  loadProfile(): void {
    this.isLoading.set(true);
    this.profileService.getMe().subscribe({
      next: profile => {
        this.profile.set(profile);
        this.populateForm(profile);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.toast.error('No se pudo cargar tu perfil.');
      }
    });
  }

  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.toast.error('Selecciona una imagen valida.');
      input.value = '';
      return;
    }

    this.originalAvatar = file;
    this.selectedAvatar = null;
    this.selectedAvatarName.set(file.name);
    this.cropZoom.set(1);
    this.cropX.set(50);
    this.cropY.set(50);
    this.renderCropPreview();
    this.hasPendingChanges.set(true);
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.error('Revisa los datos obligatorios del perfil.');
      return;
    }

    if (this.selectedAvatar || this.originalAvatar) {
      this.isSaving.set(true);
      this.prepareAvatarForUpload()
        .then(file => this.uploadAvatarAndPersist(file))
        .catch(() => {
          this.isSaving.set(false);
          this.toast.error('No se pudo preparar la foto de perfil.');
        });
      return;
    }

    this.isSaving.set(true);
    this.persistProfile();
  }

  clearAvatar(): void {
    this.originalAvatar = null;
    this.selectedAvatar = null;
    this.selectedAvatarName.set(null);
    this.clearCropPreviewUrl();
    this.imagePreviewUrl.set(null);
    this.form.patchValue({ avatarUrl: '' });
    this.hasPendingChanges.set(true);
  }

  updateCropZoom(event: Event): void {
    this.cropZoom.set(Number((event.target as HTMLInputElement).value));
    this.renderCropPreview();
  }

  updateCropX(event: Event): void {
    this.cropX.set(Number((event.target as HTMLInputElement).value));
    this.renderCropPreview();
  }

  updateCropY(event: Event): void {
    this.cropY.set(Number((event.target as HTMLInputElement).value));
    this.renderCropPreview();
  }

  applyCropPreview(): void {
    if (!this.originalAvatar) return;
    this.isSaving.set(true);
    this.createCroppedAvatarFile(this.originalAvatar)
      .then(file => {
        this.selectedAvatar = file;
        this.originalAvatar = null;
        this.clearCropPreviewUrl();
        this.imagePreviewUrl.set(URL.createObjectURL(file));
        this.isSaving.set(false);
        this.toast.info('Encuadre aplicado.');
      })
      .catch(() => {
        this.isSaving.set(false);
        this.toast.error('No se pudo aplicar el encuadre.');
      });
  }

  resetCrop(): void {
    this.cropZoom.set(1);
    this.cropX.set(50);
    this.cropY.set(50);
    this.renderCropPreview();
  }

  getInitials(): string {
    const raw = this.form.getRawValue();
    const first = raw.nombre.trim().charAt(0);
    const last = raw.apellido.trim().charAt(0);
    const initials = `${first}${last}`.trim();
    return initials ? initials.toUpperCase() : 'U';
  }

  private persistProfile(): void {
    const raw = this.form.getRawValue();
    this.profileService.updateMe({
      nombre: raw.nombre,
      apellido: raw.apellido,
      telefono: raw.telefono || null,
      direccion: this.isStudentProfile ? raw.direccion || null : null,
      avatarUrl: raw.avatarUrl || null,
      bio: raw.bio || null
    }).subscribe({
      next: profile => {
        this.profile.set(profile);
        this.populateForm(profile);
        this.isSaving.set(false);
        this.hasPendingChanges.set(false);
        this.toast.success('Perfil actualizado.');
      },
      error: () => {
        this.isSaving.set(false);
        this.toast.error('No se pudo actualizar el perfil.');
      }
    });
  }

  private async prepareAvatarForUpload(): Promise<File> {
    if (this.selectedAvatar) {
      return this.selectedAvatar;
    }

    if (!this.originalAvatar) {
      throw new Error('Avatar file is missing.');
    }

    return this.createCroppedAvatarFile(this.originalAvatar);
  }

  private uploadAvatarAndPersist(file: File): void {
    this.profileService.uploadAvatar(file).subscribe({
      next: uploaded => {
        this.form.patchValue({ avatarUrl: uploaded.url });
        this.selectedAvatar = null;
        this.originalAvatar = null;
        this.clearCropPreviewUrl();
        this.persistProfile();
      },
      error: () => {
        this.isSaving.set(false);
        this.toast.error('No se pudo subir la foto de perfil.');
      }
    });
  }

  private async createCroppedAvatarFile(file: File): Promise<File> {
    const blob = await this.createCroppedAvatarBlob(file, 720, .9);
    const baseName = file.name.replace(/\.[^.]+$/, '') || 'perfil';
    return new File([blob], `${baseName}-perfil.jpg`, { type: 'image/jpeg' });
  }

  private async createCroppedAvatarBlob(file: File, outputSize: number, quality: number): Promise<Blob> {
    const image = await this.loadImage(file);
    const canvas = document.createElement('canvas');
    canvas.width = outputSize;
    canvas.height = outputSize;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Canvas is not available.');
    }

    const zoom = this.cropZoom();
    const baseCropSize = Math.min(image.naturalWidth, image.naturalHeight);
    const cropSize = baseCropSize / zoom;
    const maxSourceX = Math.max(0, image.naturalWidth - cropSize);
    const maxSourceY = Math.max(0, image.naturalHeight - cropSize);
    const sourceX = maxSourceX * (this.cropX() / 100);
    const sourceY = maxSourceY * (this.cropY() / 100);

    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, outputSize, outputSize);
    context.drawImage(image, sourceX, sourceY, cropSize, cropSize, 0, 0, outputSize, outputSize);

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(result => result ? resolve(result) : reject(new Error('Canvas export failed.')), 'image/jpeg', quality);
    });
  }

  private loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Image load failed.'));
      image.src = URL.createObjectURL(file);
    });
  }

  private renderCropPreview(): void {
    const file = this.originalAvatar;
    if (!file) return;

    const token = ++this.cropRenderToken;
    this.createCroppedAvatarBlob(file, 360, .86)
      .then(blob => {
        if (token !== this.cropRenderToken || this.originalAvatar !== file) return;
        this.clearCropPreviewUrl();
        this.cropPreviewObjectUrl = URL.createObjectURL(blob);
        this.cropImageUrl.set(this.cropPreviewObjectUrl);
        this.imagePreviewUrl.set(this.cropPreviewObjectUrl);
      })
      .catch(() => this.toast.error('No se pudo previsualizar el encuadre.'));
  }

  private clearCropPreviewUrl(): void {
    if (this.cropPreviewObjectUrl) {
      URL.revokeObjectURL(this.cropPreviewObjectUrl);
      this.cropPreviewObjectUrl = null;
    }
    this.cropImageUrl.set(null);
  }

  private populateForm(profile: UserProfile): void {
    this.form.setValue({
      nombre: profile.nombre,
      apellido: profile.apellido,
      telefono: profile.telefono ?? '',
      direccion: profile.direccion ?? '',
      bio: profile.bio ?? '',
      avatarUrl: profile.avatarUrl ?? ''
    }, { emitEvent: false });
    this.imagePreviewUrl.set(profile.avatarUrl ?? null);
    this.selectedAvatar = null;
    this.originalAvatar = null;
    this.selectedAvatarName.set(null);
    this.clearCropPreviewUrl();
    this.lastSavedValue = this.serializeForm();
    this.hasPendingChanges.set(false);
  }

  private serializeForm(): string {
    return JSON.stringify(this.form.getRawValue());
  }
}
