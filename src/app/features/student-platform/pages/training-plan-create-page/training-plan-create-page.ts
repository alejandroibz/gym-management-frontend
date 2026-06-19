import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastService } from '../../../../core/services/toast.service';
import { RoutineTemplate } from '../../models/student-platform.model';
import { StudentPlatformService } from '../../services/student-platform.service';

interface PlanWorkoutBuilder {
  routineId: number;
  routineName: string;
  goal: string;
  level: string;
  exerciseCount: number;
  sortOrder: number;
  dayLabel: string | null;
  notes: string | null;
  suggestedDayOfWeek: number | null;
}

@Component({
  selector: 'app-training-plan-create-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressBarModule, MatSelectModule, MatTooltipModule],
  templateUrl: './training-plan-create-page.html',
  styleUrl: './training-plan-create-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingPlanCreatePageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly platformService = inject(StudentPlatformService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  readonly workouts = signal<RoutineTemplate[]>([]);
  readonly planWorkouts = signal<PlanWorkoutBuilder[]>([]);
  readonly isLoading = signal(false);
  readonly createdCount = signal(0);
  readonly workoutSearch = this.formBuilder.nonNullable.control('');

  readonly planForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    description: [''],
    level: ['General'],
    goal: ['General', Validators.required]
  });

  readonly workoutForm = this.formBuilder.nonNullable.group({
    routineId: [0],
    dayLabel: [''],
    suggestedDayOfWeek: [-1],
    notes: ['']
  });

  constructor() {
    this.platformService.getRoutineTemplates().subscribe({
      next: workouts => this.workouts.set(workouts),
      error: () => this.toast.error('No se pudieron cargar los workouts.')
    });
  }

  getWorkoutMatches(): RoutineTemplate[] {
    const term = this.normalize(this.workoutSearch.value);
    const selected = this.planWorkouts().map(item => item.routineId);
    const available = this.workouts().filter(workout => !selected.includes(workout.id));
    if (!term) return available.slice(0, 8);
    return available.filter(workout => this.normalize(`${workout.name} ${workout.goal} ${workout.level}`).includes(term)).slice(0, 10);
  }

  selectedWorkout(): RoutineTemplate | undefined {
    return this.workouts().find(workout => workout.id === this.workoutForm.controls.routineId.value);
  }

  selectWorkout(workout: RoutineTemplate): void {
    this.workoutForm.patchValue({ routineId: workout.id });
    this.workoutSearch.setValue(`${workout.name} - ${workout.goal}`);
  }

  addWorkoutToPlan(): void {
    const raw = this.workoutForm.getRawValue();
    const workout = this.workouts().find(item => item.id === raw.routineId);
    if (!workout) {
      this.toast.error('Busca y selecciona un workout para agregarlo al plan.');
      return;
    }

    this.planWorkouts.update(items => [
      ...items,
      {
        routineId: workout.id,
        routineName: workout.name,
        goal: workout.goal,
        level: workout.level,
        exerciseCount: workout.exercises.length,
        sortOrder: items.length + 1,
        dayLabel: raw.dayLabel || null,
        notes: raw.notes || null
        ,suggestedDayOfWeek: raw.suggestedDayOfWeek >= 0 ? raw.suggestedDayOfWeek : null
      }
    ]);

    this.workoutForm.reset({ routineId: 0, dayLabel: '', suggestedDayOfWeek: -1, notes: '' });
    this.workoutSearch.setValue('');
  }

  moveWorkout(index: number, direction: -1 | 1): void {
    const next = [...this.planWorkouts()];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    this.planWorkouts.set(next.map((item, itemIndex) => ({ ...item, sortOrder: itemIndex + 1 })));
  }

  removeWorkout(index: number): void {
    this.planWorkouts.update(items =>
      items.filter((_, itemIndex) => itemIndex !== index).map((item, itemIndex) => ({ ...item, sortOrder: itemIndex + 1 }))
    );
  }

  savePlan(stayOnPage = true): void {
    if (!this.canSavePlan()) {
      this.planForm.markAllAsTouched();
      this.toast.error('Completa el plan y agrega al menos un workout.');
      return;
    }

    const raw = this.planForm.getRawValue();
    this.isLoading.set(true);
    this.platformService.createTrainingPlan({
      name: raw.name,
      description: raw.description || null,
      level: raw.level || 'General',
      goal: raw.goal || 'General',
      workouts: this.planWorkouts().map(item => ({
        routineId: item.routineId,
        sortOrder: item.sortOrder,
        dayLabel: item.dayLabel,
        notes: item.notes
        ,suggestedDayOfWeek: item.suggestedDayOfWeek
      }))
    }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.createdCount.update(count => count + 1);
        this.toast.success('Plan de entrenamiento creado.');
        if (stayOnPage) {
          this.resetPlan();
          return;
        }
        this.router.navigate(['/student-platform'], { queryParams: { tab: 'planes' } });
      },
      error: () => {
        this.isLoading.set(false);
        this.toast.error('No se pudo guardar el plan de entrenamiento.');
      }
    });
  }

  resetPlan(): void {
    this.planForm.reset({ name: '', description: '', level: 'General', goal: 'General' });
    this.workoutForm.reset({ routineId: 0, dayLabel: '', suggestedDayOfWeek: -1, notes: '' });
    this.planWorkouts.set([]);
    this.workoutSearch.setValue('');
  }

  canSavePlan(): boolean {
    return this.planForm.valid && this.planWorkouts().length > 0 && !this.isLoading();
  }

  private normalize(value: string): string {
    return value.trim().toLowerCase();
  }
}
