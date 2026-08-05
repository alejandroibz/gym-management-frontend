import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastService } from '../../../../core/services/toast.service';
import { Exercise } from '../../models/student-platform.model';
import { StudentPlatformService } from '../../services/student-platform.service';

interface RoutineBuilderExercise {
  exerciseId: number;
  exerciseName: string;
  muscleGroup: string;
  sortOrder: number;
  sets: number | null;
  reps: number | null;
  weight: number | null;
  restSeconds: number | null;
  notes: string | null;
}

@Component({
  selector: 'app-routine-create-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatTooltipModule
  ],
  templateUrl: './routine-create-page.html',
  styleUrl: './routine-create-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoutineCreatePageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly platformService = inject(StudentPlatformService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly sanitizer = inject(DomSanitizer);

  readonly exercises = signal<Exercise[]>([]);
  readonly routineBuilderExercises = signal<RoutineBuilderExercise[]>([]);
  readonly isLoading = signal(false);
  readonly createdCount = signal(0);
  readonly exercisePickerPage = signal(0);
  readonly previewExercise = signal<Exercise | null>(null);
  readonly previewVideoUrl = signal<SafeResourceUrl | null>(null);

  readonly builderExerciseSearch = this.formBuilder.nonNullable.control('');
  private readonly exercisePickerPageSize = 6;

  readonly routineForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    description: [''],
    level: ['General'],
    goal: ['General', Validators.required]
  });

  readonly routineExerciseForm = this.formBuilder.nonNullable.group({
    exerciseId: [0],
    sets: [3],
    reps: [10],
    weight: [0],
    restSeconds: [60],
    notes: ['']
  });

  constructor() {
    this.platformService.getExercises().subscribe({
      next: exercises => this.exercises.set(exercises),
      error: () => this.toast.error('No se pudo cargar la biblioteca de ejercicios.')
    });

    this.builderExerciseSearch.valueChanges.subscribe(() => this.exercisePickerPage.set(0));
  }

  getBuilderExerciseMatches(): Exercise[] {
    const start = this.exercisePickerPage() * this.exercisePickerPageSize;
    return this.availableBuilderExercises().slice(start, start + this.exercisePickerPageSize);
  }

  availableBuilderExercises(): Exercise[] {
    const term = this.normalize(this.builderExerciseSearch.value);
    const selectedIds = this.routineBuilderExercises().map(item => item.exerciseId);
    const available = this.exercises().filter(exercise => !selectedIds.includes(exercise.id));
    if (!term) return available;
    return available.filter(exercise =>
      this.normalize(`${exercise.name} ${exercise.muscleGroup} ${exercise.description} ${exercise.primaryMuscleGroupName ?? ''} ${exercise.secondaryMuscleGroupName ?? ''}`).includes(term)
    );
  }

  exercisePickerPageCount(): number {
    return Math.max(1, Math.ceil(this.availableBuilderExercises().length / this.exercisePickerPageSize));
  }

  canGoPreviousExercisePage(): boolean {
    return this.exercisePickerPage() > 0;
  }

  canGoNextExercisePage(): boolean {
    return this.exercisePickerPage() < this.exercisePickerPageCount() - 1;
  }

  previousExercisePage(): void {
    if (!this.canGoPreviousExercisePage()) return;
    this.exercisePickerPage.update(page => page - 1);
  }

  nextExercisePage(): void {
    if (!this.canGoNextExercisePage()) return;
    this.exercisePickerPage.update(page => page + 1);
  }

  selectedExercise(): Exercise | undefined {
    return this.exercises().find(exercise => exercise.id === this.routineExerciseForm.controls.exerciseId.value);
  }

  getYouTubeThumbnailUrl(exercise: Exercise | undefined): string | null {
    if (!exercise) return null;

    const videoUrl = exercise.videoUrl
      || exercise.media?.find(media => media.mediaType === 'Video' && this.getYouTubeVideoId(media.url))?.url;
    const videoId = this.getYouTubeVideoId(videoUrl);
    return videoId ? `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg` : null;
  }

  getExercisePhotoUrl(exercise: Exercise): string | null {
    return exercise.photoUrl
      || exercise.media?.find(media => media.mediaType === 'Image')?.url
      || null;
  }

  openExercisePreview(exercise: Exercise, template: TemplateRef<unknown>): void {
    const videoId = this.getYouTubeVideoId(this.getExerciseVideoUrl(exercise));
    if (!videoId) return;

    this.previewExercise.set(exercise);
    this.previewVideoUrl.set(
      this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`)
    );

    this.dialog.open(template, {
      width: 'min(900px, 96vw)',
      maxWidth: '96vw',
      panelClass: 'exercise-preview-dialog'
    }).afterClosed().subscribe(() => {
      this.previewExercise.set(null);
      this.previewVideoUrl.set(null);
    });
  }

  selectBuilderExercise(exercise: Exercise): void {
    this.routineExerciseForm.patchValue({ exerciseId: exercise.id });
    this.builderExerciseSearch.setValue(`${exercise.name} - ${exercise.primaryMuscleGroupName || exercise.muscleGroup}`);
  }

  clearSelectedExercise(): void {
    this.routineExerciseForm.patchValue({ exerciseId: 0 });
    this.builderExerciseSearch.setValue('');
    this.exercisePickerPage.set(0);
  }

  addExerciseToRoutine(): void {
    const raw = this.routineExerciseForm.getRawValue();
    const exercise = this.exercises().find(item => item.id === raw.exerciseId);
    if (!exercise) {
      this.toast.error('Busca y selecciona un ejercicio para agregarlo a la rutina.');
      return;
    }

    if (this.routineBuilderExercises().some(item => item.exerciseId === exercise.id)) {
      this.toast.error('Ese ejercicio ya esta en la rutina.');
      return;
    }

    this.routineBuilderExercises.update(items => [
      ...items,
      {
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        muscleGroup: exercise.primaryMuscleGroupName || exercise.muscleGroup,
        sortOrder: items.length + 1,
        sets: raw.sets || null,
        reps: raw.reps || null,
        weight: raw.weight || null,
        restSeconds: raw.restSeconds || null,
        notes: raw.notes || null
      }
    ]);

    this.routineExerciseForm.reset({ exerciseId: 0, sets: 3, reps: 10, weight: 0, restSeconds: 60, notes: '' });
    this.builderExerciseSearch.setValue('');
    this.exercisePickerPage.set(0);
  }

  moveRoutineExercise(index: number, direction: -1 | 1): void {
    const next = [...this.routineBuilderExercises()];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    this.routineBuilderExercises.set(next.map((item, itemIndex) => ({ ...item, sortOrder: itemIndex + 1 })));
  }

  removeRoutineExercise(index: number): void {
    this.routineBuilderExercises.update(items =>
      items.filter((_, itemIndex) => itemIndex !== index).map((item, itemIndex) => ({ ...item, sortOrder: itemIndex + 1 }))
    );
  }

  saveRoutine(stayOnPage = true): void {
    if (!this.canSaveRoutine()) {
      this.routineForm.markAllAsTouched();
      this.toast.error('Completa la rutina y agrega al menos un ejercicio.');
      return;
    }

    const raw = this.routineForm.getRawValue();
    this.isLoading.set(true);
    this.platformService.createRoutine({
      name: raw.name,
      description: raw.description || null,
      level: raw.level || 'General',
      goal: raw.goal || 'General',
      clientIds: [],
      scheduleDays: [],
      exercises: this.routineBuilderExercises().map(item => ({
        exerciseId: item.exerciseId,
        sortOrder: item.sortOrder,
        sets: item.sets,
        reps: item.reps,
        weight: item.weight,
        restSeconds: item.restSeconds,
        notes: item.notes
      }))
    }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.createdCount.update(count => count + 1);
        this.toast.success('Plantilla creada.');
        if (stayOnPage) {
          this.resetRoutineBuilder();
          return;
        }
        this.router.navigate(['/student-platform']);
      },
      error: () => {
        this.isLoading.set(false);
        this.toast.error('No se pudo guardar la plantilla.');
      }
    });
  }

  resetRoutineBuilder(): void {
    this.routineForm.reset({ name: '', description: '', level: 'General', goal: 'General' });
    this.routineExerciseForm.reset({ exerciseId: 0, sets: 3, reps: 10, weight: 0, restSeconds: 60, notes: '' });
    this.routineBuilderExercises.set([]);
    this.builderExerciseSearch.setValue('');
    this.exercisePickerPage.set(0);
  }

  canSaveRoutine(): boolean {
    return this.routineForm.valid && this.routineBuilderExercises().length > 0 && !this.isLoading();
  }

  private normalize(value: string): string {
    return value.trim().toLowerCase();
  }

  private getYouTubeVideoId(value: string | null | undefined): string | null {
    if (!value?.trim()) return null;

    try {
      const url = new URL(value.trim());
      const hostname = url.hostname.toLowerCase().replace(/^www\./, '');
      let videoId = '';

      if (hostname === 'youtu.be') {
        videoId = url.pathname.split('/').filter(Boolean)[0] ?? '';
      } else if (hostname === 'youtube.com' || hostname === 'm.youtube.com' || hostname === 'youtube-nocookie.com') {
        const pathParts = url.pathname.split('/').filter(Boolean);
        videoId = url.searchParams.get('v')
          ?? (['embed', 'shorts', 'live'].includes(pathParts[0]) ? pathParts[1] : '')
          ?? '';
      }

      return /^[a-zA-Z0-9_-]{11}$/.test(videoId) ? videoId : null;
    } catch {
      return null;
    }
  }

  private getExerciseVideoUrl(exercise: Exercise): string | null {
    return exercise.videoUrl
      || exercise.media?.find(media => media.mediaType === 'Video' && this.getYouTubeVideoId(media.url))?.url
      || null;
  }
}
