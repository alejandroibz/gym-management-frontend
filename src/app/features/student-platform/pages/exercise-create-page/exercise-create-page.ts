import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { forkJoin } from 'rxjs';
import { ConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog';
import { ToastService } from '../../../../core/services/toast.service';
import { Exercise, ExerciseMedia, Muscle, MuscleGroup } from '../../models/student-platform.model';
import { StudentPlatformService } from '../../services/student-platform.service';
import { ExerciseBodyMapComponent } from '../../components/exercise-body-map/exercise-body-map';

interface PendingExerciseImage {
  file: File;
  previewUrl: string;
  name: string;
}

@Component({
  selector: 'app-exercise-create-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatTooltipModule,
    ExerciseBodyMapComponent
  ],
  templateUrl: './exercise-create-page.html',
  styleUrl: './exercise-create-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseCreatePageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly platformService = inject(StudentPlatformService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);

  readonly muscleGroups = signal<MuscleGroup[]>([]);
  readonly currentExercise = signal<Exercise | null>(null);
  readonly selectedExerciseMuscleIds = signal<number[]>([]);
  readonly existingExerciseImages = signal<ExerciseMedia[]>([]);
  readonly selectedExerciseImages = signal<PendingExerciseImage[]>([]);
  readonly exerciseVideoUrls = signal<string[]>([]);
  readonly isLoading = signal(false);
  readonly isEditingExercise = signal(true);
  readonly createdCount = signal(0);
  readonly muscleSearch = this.formBuilder.nonNullable.control('');
  readonly videoUrlInput = this.formBuilder.nonNullable.control('');

  readonly exerciseForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    primaryMuscleGroupId: [0],
    secondaryMuscleGroupId: [0],
    photoUrl: [''],
    videoUrl: ['']
  });

  constructor() {
    const exerciseId = Number(this.route.snapshot.paramMap.get('id') ?? 0);
    this.isLoading.set(true);

    if (exerciseId > 0) {
      forkJoin({
        groups: this.platformService.getMuscleGroups(),
        exercise: this.platformService.getExercise(exerciseId)
      }).subscribe({
        next: result => {
          this.muscleGroups.set(result.groups);
          this.loadExercise(result.exercise);
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
          this.toast.error('No se pudo cargar el ejercicio.');
          this.router.navigate(['/student-platform'], { queryParams: { tab: 'ejercicios' } });
        }
      });
      return;
    }

    this.platformService.getMuscleGroups().subscribe({
      next: groups => {
        this.muscleGroups.set(groups);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.toast.error('No se pudo cargar el catalogo muscular.');
      }
    });
  }

  isEditMode(): boolean {
    return !!this.currentExercise();
  }

  isReadOnly(): boolean {
    return this.isEditMode() && !this.isEditingExercise();
  }

  startEditing(): void {
    this.isEditingExercise.set(true);
    this.exerciseForm.enable({ emitEvent: false });
  }

  onExerciseImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    if (!files.length) return;

    const invalid = files.find(file => !file.type.startsWith('image/'));
    if (invalid) {
      this.toast.error('Selecciona una imagen valida para el ejercicio.');
      input.value = '';
      return;
    }

    this.selectedExerciseImages.update(current => [
      ...current,
      ...files.map(file => ({ file, previewUrl: URL.createObjectURL(file), name: file.name }))
    ]);
    input.value = '';
  }

  removeExerciseImage(index: number): void {
    this.selectedExerciseImages.update(items => items.filter((_, itemIndex) => itemIndex !== index));
  }

  removeExistingExerciseImage(index: number): void {
    this.existingExerciseImages.update(items => items.filter((_, itemIndex) => itemIndex !== index));
  }

  addExerciseVideo(): void {
    const value = this.videoUrlInput.value.trim();
    if (!this.isUrlValid(value)) {
      this.toast.error('Usa una URL valida que empiece con http o https.');
      return;
    }

    if (this.exerciseVideoUrls().includes(value)) {
      this.toast.error('Ese video ya esta agregado.');
      return;
    }

    this.exerciseVideoUrls.update(urls => [...urls, value]);
    this.videoUrlInput.setValue('');
  }

  removeExerciseVideo(index: number): void {
    this.exerciseVideoUrls.update(urls => urls.filter((_, itemIndex) => itemIndex !== index));
  }

  toggleExerciseMuscle(muscleId: number): void {
    this.selectedExerciseMuscleIds.update(ids =>
      ids.includes(muscleId) ? ids.filter(id => id !== muscleId) : [...ids, muscleId]
    );
  }

  selectMuscle(muscleId: number): void {
    this.selectedExerciseMuscleIds.update(ids => ids.includes(muscleId) ? ids : [...ids, muscleId]);
    this.muscleSearch.setValue('');
  }

  removeMuscle(muscleId: number): void {
    this.selectedExerciseMuscleIds.update(ids => ids.filter(id => id !== muscleId));
  }

  selectedMuscles(): Muscle[] {
    const ids = this.selectedExerciseMuscleIds();
    return this.allMuscles().filter(muscle => ids.includes(muscle.id));
  }

  suggestedMuscles(): Muscle[] {
    const term = this.normalize(this.muscleSearch.value);
    const selectedIds = this.selectedExerciseMuscleIds();
    const primaryId = Number(this.exerciseForm.controls.primaryMuscleGroupId.value);
    const secondaryId = Number(this.exerciseForm.controls.secondaryMuscleGroupId.value);
    const preferredGroupIds = [primaryId, secondaryId].filter(id => id > 0);
    const muscles = this.allMuscles().filter(muscle => !selectedIds.includes(muscle.id));

    if (term) {
      return muscles
        .filter(muscle => this.normalize(`${muscle.name} ${muscle.muscleGroupName}`).includes(term))
        .sort((a, b) => Number(preferredGroupIds.includes(b.muscleGroupId)) - Number(preferredGroupIds.includes(a.muscleGroupId)))
        .slice(0, 12);
    }

    if (preferredGroupIds.length) {
      return muscles.filter(muscle => preferredGroupIds.includes(muscle.muscleGroupId)).slice(0, 12);
    }

    return muscles.slice(0, 8);
  }

  saveExercise(stayOnPage = true): void {
    if (!this.canSaveExercise()) {
      this.exerciseForm.markAllAsTouched();
      this.toast.error(this.muscleGroups().length && !this.exerciseForm.controls.primaryMuscleGroupId.value
        ? 'Selecciona el grupo principal del ejercicio.'
        : 'Completa los datos obligatorios antes de guardar.');
      return;
    }

    this.isLoading.set(true);

    const images = this.selectedExerciseImages();
    if (images.length) {
      forkJoin(images.map(image => this.platformService.uploadExerciseImage(image.file))).subscribe({
        next: files => this.persistExercise(stayOnPage, files.map((file, index) => ({
          mediaType: 'Image' as const,
          url: file.downloadUrl || file.url,
          title: images[index]?.name ?? null,
          sortOrder: index + 1
        }))),
        error: () => {
          this.isLoading.set(false);
          this.toast.error('No se pudieron subir las imagenes del ejercicio.');
        }
      });
      return;
    }

    this.persistExercise(stayOnPage, []);
  }

  resetExerciseForm(): void {
    if (this.isEditMode()) {
      const exercise = this.currentExercise();
      if (exercise) this.loadExercise(exercise);
      return;
    }

    this.exerciseForm.reset({
      name: '',
      description: '',
      primaryMuscleGroupId: 0,
      secondaryMuscleGroupId: 0,
      photoUrl: '',
      videoUrl: ''
    });
    this.selectedExerciseMuscleIds.set([]);
    this.selectedExerciseImages.set([]);
    this.exerciseVideoUrls.set([]);
    this.muscleSearch.setValue('');
    this.videoUrlInput.setValue('');
  }

  isExerciseVideoValid(): boolean {
    const value = this.videoUrlInput.value.trim();
    return !value || this.isUrlValid(value);
  }

  canSaveExercise(): boolean {
    const hasRequiredGroup = !this.muscleGroups().length || Number(this.exerciseForm.controls.primaryMuscleGroupId.value) > 0;
    return this.exerciseForm.valid && hasRequiredGroup && this.isExerciseVideoValid() && !this.isLoading();
  }

  private persistExercise(stayOnPage: boolean, uploadedImages: Array<{ mediaType: 'Image'; url: string; title: string | null; sortOrder: number }>): void {
    const raw = this.exerciseForm.getRawValue();
    const selectedMuscleNames = this.selectedMuscles().map(muscle => muscle.name).join(', ');
    const existingImages = this.existingExerciseImages().map((image, index) => ({
      ...image,
      sortOrder: index + 1
    }));
    const uploaded = uploadedImages.map((image, index) => ({
      ...image,
      sortOrder: existingImages.length + index + 1
    }));
    const videos = this.exerciseVideoUrls().map((url, index) => ({
      mediaType: 'Video' as const,
      url,
      title: null,
      sortOrder: existingImages.length + uploaded.length + index + 1
    }));
    const media = [...existingImages, ...uploaded, ...videos];
    const payload = {
      name: raw.name,
      description: raw.description,
      muscleGroup: this.getGroupName(raw.primaryMuscleGroupId) || 'General',
      musclesInvolved: selectedMuscleNames || null,
      primaryMuscleGroupId: raw.primaryMuscleGroupId || null,
      secondaryMuscleGroupId: raw.secondaryMuscleGroupId || null,
      muscleIds: this.selectedExerciseMuscleIds(),
      media,
      photoUrl: existingImages[0]?.url ?? uploaded[0]?.url ?? null,
      videoUrl: videos[0]?.url ?? null
    };
    const editingExercise = this.currentExercise();
    const request = editingExercise
      ? this.platformService.updateExercise(editingExercise.id, payload)
      : this.platformService.createExercise(payload);

    request.subscribe({
      next: exercise => {
        this.isLoading.set(false);
        this.toast.success(editingExercise ? 'Ejercicio actualizado.' : 'Ejercicio guardado.');
        if (editingExercise) {
          this.loadExercise(exercise);
          return;
        }

        this.createdCount.update(count => count + 1);
        if (stayOnPage) {
          this.resetExerciseForm();
          return;
        }
        this.router.navigate(['/student-platform'], { queryParams: { tab: 'ejercicios', exerciseId: exercise.id } });
      },
      error: () => {
        this.isLoading.set(false);
        this.toast.error(this.isEditMode() ? 'No se pudo actualizar el ejercicio.' : 'No se pudo guardar el ejercicio.');
      }
    });
  }

  deleteExercise(): void {
    const exercise = this.currentExercise();
    if (!exercise) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar ejercicio',
        message: `Se eliminara "${exercise.name}" del catalogo de ejercicios.`,
        confirmLabel: 'Eliminar',
        tone: 'danger'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.isLoading.set(true);
      this.platformService.deleteExercise(exercise.id).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.toast.success('Ejercicio eliminado.');
          this.router.navigate(['/student-platform'], { queryParams: { tab: 'ejercicios' } });
        },
        error: () => {
          this.isLoading.set(false);
          this.toast.error('No se pudo eliminar el ejercicio.');
        }
      });
    });
  }

  private loadExercise(exercise: Exercise): void {
    this.currentExercise.set(exercise);
    this.isEditingExercise.set(false);
    this.exerciseForm.reset({
      name: exercise.name,
      description: exercise.description,
      primaryMuscleGroupId: exercise.primaryMuscleGroupId ?? 0,
      secondaryMuscleGroupId: exercise.secondaryMuscleGroupId ?? 0,
      photoUrl: exercise.photoUrl ?? '',
      videoUrl: exercise.videoUrl ?? ''
    });
    this.selectedExerciseMuscleIds.set(exercise.muscles.map(muscle => muscle.id));
    this.existingExerciseImages.set(exercise.media.filter(media => media.mediaType === 'Image'));
    this.selectedExerciseImages.set([]);
    this.exerciseVideoUrls.set(exercise.media.filter(media => media.mediaType === 'Video').map(media => media.url));
    if (!this.exerciseVideoUrls().length && exercise.videoUrl) this.exerciseVideoUrls.set([exercise.videoUrl]);
    this.muscleSearch.setValue('');
    this.videoUrlInput.setValue('');
    this.exerciseForm.disable({ emitEvent: false });
  }

  private allMuscles(): Muscle[] {
    return this.muscleGroups().flatMap(group => group.muscles);
  }

  getGroupName(groupId: number): string | null {
    return this.muscleGroups().find(group => group.id === groupId)?.name ?? null;
  }

  private normalize(value: string): string {
    return value.trim().toLowerCase();
  }

  private isUrlValid(value: string): boolean {
    return /^https?:\/\/.+/i.test(value);
  }
}
