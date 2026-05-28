import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ClientsService } from '../../../clients/services/clients.service';
import { Client } from '../../../clients/models/client.model';
import { Exercise, RankingResponse, RoutineAssignment } from '../../models/student-platform.model';
import { StudentPlatformService } from '../../services/student-platform.service';

@Component({
  selector: 'app-student-platform-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTabsModule
  ],
  templateUrl: './student-platform-page.html',
  styleUrl: './student-platform-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentPlatformPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly platformService = inject(StudentPlatformService);
  private readonly clientsService = inject(ClientsService);

  readonly exercises = signal<Exercise[]>([]);
  readonly clients = signal<Client[]>([]);
  readonly routines = signal<RoutineAssignment[]>([]);
  readonly ranking = signal<RankingResponse | null>(null);
  readonly feedback = signal('');
  readonly isLoading = signal(false);

  readonly exerciseForm = this.formBuilder.nonNullable.group({
    id: [0],
    name: ['', Validators.required],
    description: ['', Validators.required],
    muscleGroup: ['', Validators.required],
    musclesInvolved: [''],
    photoUrl: [''],
    videoUrl: [''],
    qrSlug: ['']
  });

  readonly routineForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    description: [''],
    level: ['General'],
    goal: ['General'],
    clientId: [0, Validators.required],
    exerciseId: [0, Validators.required],
    sets: [3],
    reps: [10],
    restSeconds: [60]
  });

  constructor() {
    this.loadAll();
  }

  loadAll(): void {
    this.isLoading.set(true);
    this.feedback.set('');
    this.platformService.getExercises().subscribe({
      next: exercises => {
        this.exercises.set(exercises);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.feedback.set('No se pudo cargar la biblioteca de ejercicios.');
      }
    });

    this.clientsService.getPaged(1, 100, { clientStatus: 'active' }).subscribe({
      next: response => this.clients.set(response.items),
      error: () => this.feedback.set('No se pudo cargar la lista de alumnos.')
    });

    this.platformService.getRoutines().subscribe({
      next: routines => this.routines.set(routines),
      error: () => this.feedback.set('No se pudieron cargar las rutinas.')
    });

    this.loadRanking('attendance');
  }

  editExercise(exercise: Exercise): void {
    this.exerciseForm.setValue({
      id: exercise.id,
      name: exercise.name,
      description: exercise.description,
      muscleGroup: exercise.muscleGroup,
      musclesInvolved: exercise.musclesInvolved ?? '',
      photoUrl: exercise.photoUrl ?? '',
      videoUrl: exercise.videoUrl ?? '',
      qrSlug: exercise.qrSlug ?? ''
    });
  }

  saveExercise(): void {
    if (this.exerciseForm.invalid) return;

    const raw = this.exerciseForm.getRawValue();
    const payload = {
      name: raw.name,
      description: raw.description,
      muscleGroup: raw.muscleGroup,
      musclesInvolved: raw.musclesInvolved || null,
      photoUrl: raw.photoUrl || null,
      videoUrl: raw.videoUrl || null,
      qrSlug: raw.qrSlug || null
    };

    const request = raw.id
      ? this.platformService.updateExercise(raw.id, payload)
      : this.platformService.createExercise(payload);

    request.subscribe({
      next: () => {
        this.feedback.set('Ejercicio guardado.');
        this.exerciseForm.reset({ id: 0, name: '', description: '', muscleGroup: '', musclesInvolved: '', photoUrl: '', videoUrl: '', qrSlug: '' });
        this.platformService.getExercises().subscribe(exercises => this.exercises.set(exercises));
      },
      error: () => this.feedback.set('No se pudo guardar el ejercicio.')
    });
  }

  deleteExercise(exercise: Exercise): void {
    this.platformService.deleteExercise(exercise.id).subscribe({
      next: () => {
        this.feedback.set('Ejercicio eliminado.');
        this.exercises.update(items => items.filter(item => item.id !== exercise.id));
      },
      error: () => this.feedback.set('No se pudo eliminar el ejercicio.')
    });
  }

  createRoutine(): void {
    if (this.routineForm.invalid) return;
    const raw = this.routineForm.getRawValue();

    this.platformService.createRoutine({
      name: raw.name,
      description: raw.description || null,
      level: raw.level,
      goal: raw.goal,
      clientIds: [raw.clientId],
      exercises: [{
        exerciseId: raw.exerciseId,
        sortOrder: 1,
        sets: raw.sets,
        reps: raw.reps,
        restSeconds: raw.restSeconds
      }]
    }).subscribe({
      next: () => {
        this.feedback.set('Rutina asignada.');
        this.platformService.getRoutines().subscribe(routines => this.routines.set(routines));
      },
      error: () => this.feedback.set('No se pudo asignar la rutina.')
    });
  }

  loadRanking(metric: 'attendance' | 'achievements'): void {
    this.platformService.getRanking(metric, 'monthly').subscribe({
      next: ranking => this.ranking.set(ranking),
      error: () => this.feedback.set('No se pudo cargar el ranking.')
    });
  }
}
