import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, TemplateRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { forkJoin } from 'rxjs';
import { ConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog';
import { ToastService } from '../../../../core/services/toast.service';
import { Client } from '../../../clients/models/client.model';
import { ClientsService } from '../../../clients/services/clients.service';
import { Exercise, RoutineAssignment, RoutineTemplate, TrainingPlan, TrainingPlanAssignment } from '../../models/student-platform.model';
import { StudentPlatformService } from '../../services/student-platform.service';

interface EditableWorkoutExercise {
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
interface EditableWorkoutBlock { id?: number; name: string; sortOrder: number; cycles: number; notes: string | null; exercises: EditableWorkoutExercise[]; }

@Component({
  selector: 'app-workout-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressBarModule, MatTooltipModule],
  templateUrl: './workout-detail-page.html',
  styleUrl: './workout-detail-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly platformService = inject(StudentPlatformService);
  private readonly clientsService = inject(ClientsService);
  private readonly dialog = inject(MatDialog);
  private readonly toast = inject(ToastService);

  readonly workout = signal<RoutineTemplate | null>(null);
  readonly trainingPlans = signal<TrainingPlan[]>([]);
  readonly planAssignments = signal<TrainingPlanAssignment[]>([]);
  readonly directAssignments = signal<RoutineAssignment[]>([]);
  readonly clients = signal<Client[]>([]);
  readonly exercises = signal<Exercise[]>([]);
  readonly editableExercises = signal<EditableWorkoutExercise[]>([]);
  readonly editableBlocks = signal<EditableWorkoutBlock[]>([]);
  readonly activeEditableBlockIndex = signal(0);
  readonly isLoading = signal(true);
  readonly isSaving = signal(false);
  readonly isEditing = signal(false);
  readonly planPickerOpen = signal(false);
  readonly clientPickerOpen = signal(false);
  readonly exercisePickerOpen = signal(false);
  readonly planSearch = this.formBuilder.nonNullable.control('');
  readonly clientSearch = this.formBuilder.nonNullable.control('');
  readonly builderExerciseSearch = this.formBuilder.nonNullable.control('');

  readonly workoutEditForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    description: ['']
  });

  readonly routineExerciseForm = this.formBuilder.nonNullable.group({
    exerciseId: [0],
    sets: [3],
    reps: [10],
    weight: [0],
    restSeconds: [60],
    notes: ['']
  });
  readonly blockForm = this.formBuilder.nonNullable.group({ name: ['Nuevo bloque', Validators.required], cycles: [1, [Validators.required, Validators.min(1)]], notes: [''] });

  readonly directAssignmentForm = this.formBuilder.nonNullable.group({
    clientId: [0, Validators.min(1)]
  });

  readonly planAssignmentForm = this.formBuilder.nonNullable.group({
    trainingPlanId: [0, Validators.min(1)]
  });

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.isLoading.set(false);
      this.toast.error('No pudimos identificar el workout.');
      return;
    }

    forkJoin({
      routines: this.platformService.getRoutineTemplates(),
      routineAssignments: this.platformService.getRoutines(),
      exercises: this.platformService.getExercises(),
      trainingPlans: this.platformService.getTrainingPlans(),
      trainingPlanAssignments: this.platformService.getTrainingPlanAssignments(),
      clients: this.clientsService.getPaged(1, 250, { clientStatus: 'active' })
    }).subscribe({
      next: ({ routines, routineAssignments, exercises, trainingPlans, trainingPlanAssignments, clients }) => {
        const workout = routines.find(item => item.id === id) ?? null;
        this.workout.set(workout);
        this.resetEditableWorkout(workout);
        this.directAssignments.set(routineAssignments.filter(assignment => assignment.routineId === id));
        this.exercises.set(exercises);
        this.trainingPlans.set(trainingPlans);
        this.planAssignments.set(trainingPlanAssignments);
        this.clients.set(clients.items);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.toast.error('No se pudo cargar el detalle del workout.');
      }
    });
  }

  plansUsingWorkout(): TrainingPlan[] {
    const workoutId = this.workout()?.id;
    if (!workoutId) return [];
    return this.trainingPlans().filter(plan => plan.workouts.some(workout => workout.routineId === workoutId));
  }

  assignmentsForPlan(planId: number): TrainingPlanAssignment[] {
    return this.planAssignments().filter(assignment => assignment.trainingPlanId === planId);
  }

  enableEditing(): void {
    this.resetEditableWorkout(this.workout());
    this.isEditing.set(true);
  }

  cancelEditing(): void {
    this.resetEditableWorkout(this.workout());
    this.isEditing.set(false);
  }

  openTemplate(template: TemplateRef<unknown>, width = '620px'): void {
    this.dialog.open(template, {
      width,
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false
    });
  }

  filteredPlans(): TrainingPlan[] {
    const term = this.normalize(this.planSearch.value);
    const workoutId = this.workout()?.id;
    return this.trainingPlans().filter(plan => {
      const isAvailable = !workoutId || !plan.workouts.some(item => item.routineId === workoutId);
      const matches = !term || this.normalize(`${plan.name} ${plan.goal} ${plan.level}`).includes(term);
      return isAvailable && matches;
    });
  }

  filteredClients(): Client[] {
    const term = this.normalize(this.clientSearch.value);
    if (!term) return this.clients();
    return this.clients().filter(client =>
      this.normalize(`${client.apellido} ${client.nombre} ${client.dni} ${client.email}`).includes(term)
    );
  }

  filteredExercises(): Exercise[] {
    const term = this.normalize(this.builderExerciseSearch.value);
    const selectedIds = this.editableBlocks()[this.activeEditableBlockIndex()]?.exercises.map(item => item.exerciseId) ?? [];
    const available = this.exercises().filter(exercise => !selectedIds.includes(exercise.id));
    if (!term) return available.slice(0, 8);
    return available
      .filter(exercise =>
        this.normalize(`${exercise.name} ${exercise.description} ${exercise.muscleGroup} ${exercise.primaryMuscleGroupName ?? ''} ${exercise.secondaryMuscleGroupName ?? ''}`).includes(term)
      )
      .slice(0, 8);
  }

  selectedExercise(): Exercise | undefined {
    return this.exercises().find(exercise => exercise.id === this.routineExerciseForm.controls.exerciseId.value);
  }

  selectExercise(exercise: Exercise): void {
    this.routineExerciseForm.patchValue({ exerciseId: exercise.id });
    this.builderExerciseSearch.setValue(`${exercise.name} - ${exercise.primaryMuscleGroupName || exercise.muscleGroup}`);
    this.exercisePickerOpen.set(false);
  }

  clearSelectedExercise(): void {
    this.routineExerciseForm.patchValue({ exerciseId: 0 });
    this.builderExerciseSearch.setValue('');
  }

  closeExercisePickerSoon(): void {
    setTimeout(() => this.exercisePickerOpen.set(false), 120);
  }

  addExerciseToWorkout(): void {
    const raw = this.routineExerciseForm.getRawValue();
    const exercise = this.exercises().find(item => item.id === raw.exerciseId);
    if (!exercise) {
      this.toast.error('Busca y selecciona un ejercicio para agregar.');
      return;
    }

    const blocks = this.editableBlocks();
    const block = blocks[this.activeEditableBlockIndex()];
    if (!block) { this.toast.error('Seleccioná o creá un bloque.'); return; }
    if (block.exercises.some(item => item.exerciseId === exercise.id)) {
      this.toast.error('Ese ejercicio ya está en el bloque.');
      return;
    }

    block.exercises.push({
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        muscleGroup: exercise.primaryMuscleGroupName || exercise.muscleGroup,
        sortOrder: block.exercises.length + 1,
        sets: raw.sets || null,
        reps: raw.reps || null,
        weight: raw.weight || null,
        restSeconds: raw.restSeconds || null,
        notes: raw.notes || null
      });
    this.editableBlocks.set([...blocks]);

    this.routineExerciseForm.reset({ exerciseId: 0, sets: 3, reps: 10, weight: 0, restSeconds: 60, notes: '' });
    this.builderExerciseSearch.setValue('');
  }

  removeWorkoutExercise(blockIndex: number, index: number): void {
    const blocks = this.editableBlocks(); const block = blocks[blockIndex]; if (!block) return;
    block.exercises = block.exercises.filter((_, itemIndex) => itemIndex !== index).map((item, itemIndex) => ({ ...item, sortOrder: itemIndex + 1 }));
    this.editableBlocks.set([...blocks]);
  }

  addEditableBlock(): void { if (this.blockForm.invalid) return; const raw = this.blockForm.getRawValue(); const blocks = this.editableBlocks(); blocks.push({ name: raw.name, cycles: raw.cycles, notes: raw.notes || null, sortOrder: blocks.length + 1, exercises: [] }); this.editableBlocks.set([...blocks]); this.activeEditableBlockIndex.set(blocks.length - 1); this.blockForm.reset({ name: `Bloque ${blocks.length + 1}`, cycles: 1, notes: '' }); }
  removeEditableBlock(index: number): void { const blocks = this.editableBlocks().filter((_, i) => i !== index).map((block, i) => ({ ...block, sortOrder: i + 1 })); this.editableBlocks.set(blocks); this.activeEditableBlockIndex.set(Math.max(0, Math.min(this.activeEditableBlockIndex(), blocks.length - 1))); }

  saveWorkoutChanges(): void {
    const workout = this.workout();
    if (!workout || this.workoutEditForm.invalid || !this.editableBlocks().length || this.editableBlocks().some(block => !block.exercises.length)) {
      this.workoutEditForm.markAllAsTouched();
      this.toast.error('Completa nombre y deja al menos un ejercicio.');
      return;
    }

    const raw = this.workoutEditForm.getRawValue();
    this.isSaving.set(true);
    this.platformService.updateRoutine(workout.id, {
      name: raw.name,
      description: raw.description || null,
      level: workout.level,
      goal: workout.goal,
      clientIds: [],
      scheduleDays: [],
      exercises: [],
      blocks: this.editableBlocks().map(block => ({ name: block.name, sortOrder: block.sortOrder, cycles: block.cycles, notes: block.notes, exercises: block.exercises.map(item => ({ exerciseId: item.exerciseId, sortOrder: item.sortOrder, sets: item.sets, reps: item.reps, weight: item.weight, restSeconds: item.restSeconds, notes: item.notes })) }))
    }).subscribe({
      next: () => {
        this.toast.success('Workout actualizado.');
        this.isEditing.set(false);
        this.isSaving.set(false);
        this.refreshWorkout(workout.id);
        this.refreshPlans();
      },
      error: () => {
        this.isSaving.set(false);
        this.toast.error('No se pudo actualizar el workout.');
      }
    });
  }

  selectPlan(plan: TrainingPlan): void {
    this.planAssignmentForm.patchValue({ trainingPlanId: plan.id });
    this.planSearch.setValue(`${plan.name} - ${plan.goal}`);
    this.planPickerOpen.set(false);
  }

  selectClient(client: Client): void {
    this.directAssignmentForm.patchValue({ clientId: client.id });
    this.clientSearch.setValue(`${client.apellido}, ${client.nombre} - DNI ${client.dni}`);
    this.clientPickerOpen.set(false);
  }

  closePlanPickerSoon(): void {
    setTimeout(() => this.planPickerOpen.set(false), 120);
  }

  closeClientPickerSoon(): void {
    setTimeout(() => this.clientPickerOpen.set(false), 120);
  }

  assignToClient(): void {
    const workout = this.workout();
    const raw = this.directAssignmentForm.getRawValue();
    const clientId = Number(raw.clientId);
    if (!workout || clientId <= 0) {
      this.toast.error('Selecciona un alumno para asignar el workout.');
      return;
    }

    this.platformService.assignRoutine(workout.id, {
      clientIds: [clientId],
      startsAt: null,
      endsAt: null,
      scheduleDays: []
    }).subscribe({
      next: () => {
        this.toast.success('Workout asignado al alumno.');
        this.dialog.closeAll();
        this.directAssignmentForm.reset({ clientId: 0 });
        this.clientSearch.setValue('');
        this.refreshAssignments(workout.id);
      },
      error: () => this.toast.error('No se pudo asignar el workout.')
    });
  }

  addToPlan(): void {
    const workout = this.workout();
    const raw = this.planAssignmentForm.getRawValue();
    const planId = Number(raw.trainingPlanId);
    const plan = this.trainingPlans().find(item => item.id === planId);
    if (!workout || !plan) {
      this.toast.error('Selecciona un plan para agregar el workout.');
      return;
    }

    if (plan.workouts.some(item => item.routineId === workout.id)) {
      this.toast.error('Este workout ya forma parte del plan seleccionado.');
      return;
    }

    this.platformService.updateTrainingPlan(plan.id, {
      name: plan.name,
      description: plan.description ?? null,
      level: plan.level,
      goal: plan.goal,
      workouts: [
        ...plan.workouts.map(item => ({
          routineId: item.routineId,
          sortOrder: item.sortOrder,
          dayLabel: item.dayLabel ?? null,
          notes: item.notes ?? null
        })),
        {
          routineId: workout.id,
          sortOrder: plan.workouts.length + 1,
          dayLabel: null,
          notes: null
        }
      ]
    }).subscribe({
      next: () => {
        this.toast.success('Workout agregado al plan.');
        this.dialog.closeAll();
        this.planAssignmentForm.reset({ trainingPlanId: 0 });
        this.planSearch.setValue('');
        this.refreshPlans();
      },
      error: () => this.toast.error('No se pudo agregar el workout al plan.')
    });
  }

  deleteWorkout(): void {
    const workout = this.workout();
    if (!workout) return;

    this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        title: 'Eliminar workout',
        message: `Se eliminara "${workout.name}". Las asignaciones historicas no se borran.`,
        confirmLabel: 'Eliminar',
        cancelLabel: 'Cancelar',
        tone: 'danger'
      }
    }).afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.platformService.deleteRoutine(workout.id).subscribe({
        next: () => {
          this.toast.success('Workout eliminado.');
          this.router.navigate(['/student-platform'], { queryParams: { tab: 'workouts' } });
        },
        error: () => this.toast.error('No se pudo eliminar el workout.')
      });
    });
  }

  initials(assignment: RoutineAssignment): string {
    return `${assignment.clientNombre?.charAt(0) ?? ''}${assignment.clientApellido?.charAt(0) ?? ''}`;
  }

  private normalize(value: string | null | undefined): string {
    return (value ?? '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  private resetEditableWorkout(workout: RoutineTemplate | null): void {
    this.workoutEditForm.reset({
      name: workout?.name ?? '',
      description: workout?.description ?? ''
    });
    this.editableExercises.set((workout?.exercises ?? []).map(item => ({
      exerciseId: item.exerciseId,
      exerciseName: item.exerciseName,
      muscleGroup: item.muscleGroup,
      sortOrder: item.sortOrder,
      sets: item.sets ?? null,
      reps: item.reps ?? null,
      weight: item.weight ?? null,
      restSeconds: item.restSeconds ?? null,
      notes: item.notes ?? null
    })));
    this.editableBlocks.set((workout?.blocks ?? []).map(block => ({ id: block.id, name: block.name, sortOrder: block.sortOrder, cycles: block.cycles, notes: block.notes ?? null, exercises: block.exercises.map(item => ({ exerciseId: item.exerciseId, exerciseName: item.exerciseName, muscleGroup: item.muscleGroup, sortOrder: item.sortOrder, sets: item.sets ?? null, reps: item.reps ?? null, weight: item.weight ?? null, restSeconds: item.restSeconds ?? null, notes: item.notes ?? null })) })));
    this.activeEditableBlockIndex.set(0);
    this.routineExerciseForm.reset({ exerciseId: 0, sets: 3, reps: 10, weight: 0, restSeconds: 60, notes: '' });
    this.builderExerciseSearch.setValue('');
  }

  private refreshWorkout(workoutId: number): void {
    this.platformService.getRoutineTemplates().subscribe({
      next: routines => {
        const updated = routines.find(item => item.id === workoutId) ?? null;
        this.workout.set(updated);
        this.resetEditableWorkout(updated);
      },
      error: () => this.toast.error('No se pudo actualizar el detalle del workout.')
    });
  }

  private refreshAssignments(workoutId: number): void {
    this.platformService.getRoutines().subscribe({
      next: assignments => this.directAssignments.set(assignments.filter(assignment => assignment.routineId === workoutId)),
      error: () => this.toast.error('No se pudieron actualizar las asignaciones.')
    });
  }

  private refreshPlans(): void {
    this.platformService.getTrainingPlans().subscribe({
      next: plans => this.trainingPlans.set(plans),
      error: () => this.toast.error('No se pudieron actualizar los planes.')
    });
  }
}
