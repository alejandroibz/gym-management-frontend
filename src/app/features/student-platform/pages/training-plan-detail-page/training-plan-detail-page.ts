import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { forkJoin } from 'rxjs';
import { ToastService } from '../../../../core/services/toast.service';
import { RoutineTemplate, TrainingPlan, TrainingPlanAssignment, TrainingPlanWorkout } from '../../models/student-platform.model';
import { StudentPlatformService } from '../../services/student-platform.service';

@Component({
  selector: 'app-training-plan-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatProgressBarModule, MatTooltipModule],
  templateUrl: './training-plan-detail-page.html',
  styleUrl: './training-plan-detail-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingPlanDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly platformService = inject(StudentPlatformService);
  private readonly toast = inject(ToastService);

  readonly plan = signal<TrainingPlan | null>(null);
  readonly assignments = signal<TrainingPlanAssignment[]>([]);
  readonly routines = signal<RoutineTemplate[]>([]);
  readonly isLoading = signal(true);
  readonly expandedWorkoutIds = signal<number[]>([]);
  readonly editingSchedule = signal(false);
  readonly scheduleDraft = signal<Record<number, number>>({});

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.isLoading.set(false);
      this.toast.error('No pudimos identificar el plan de entrenamiento.');
      return;
    }

    forkJoin({
      plan: this.platformService.getTrainingPlan(id),
      assignments: this.platformService.getTrainingPlanAssignments(),
      routines: this.platformService.getRoutineTemplates()
    }).subscribe({
      next: ({ plan, assignments, routines }) => {
        this.plan.set(plan);
        this.scheduleDraft.set(Object.fromEntries(plan.workouts.map(workout => [workout.id, workout.suggestedDayOfWeek ?? -1])));
        this.assignments.set(assignments.filter(assignment => assignment.trainingPlanId === plan.id));
        this.routines.set(routines);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.toast.error('No se pudo cargar el detalle del plan.');
      }
    });
  }

  workoutRoutine(workout: TrainingPlanWorkout): RoutineTemplate | undefined {
    return this.routines().find(routine => routine.id === workout.routineId);
  }

  isWorkoutExpanded(workoutId: number): boolean {
    return this.expandedWorkoutIds().includes(workoutId);
  }

  toggleWorkout(workoutId: number): void {
    this.expandedWorkoutIds.update(ids =>
      ids.includes(workoutId) ? ids.filter(id => id !== workoutId) : [...ids, workoutId]
    );
  }

  totalExercises(): number {
    return this.plan()?.workouts.reduce((total, workout) => total + workout.exerciseCount, 0) ?? 0;
  }

  activeAssignments(): number {
    return this.assignments().filter(assignment => assignment.status === 'Active').length;
  }

  initials(assignment: TrainingPlanAssignment): string {
    return `${assignment.clientNombre.charAt(0)}${assignment.clientApellido.charAt(0)}`;
  }

  planReturnUrl(): string {
    const planId = this.plan()?.id;
    return planId ? `/student-platform/training-plans/${planId}` : '/student-platform?tab=planes';
  }

  startScheduleEditing(): void {
    const plan = this.plan(); if (!plan) return;
    this.scheduleDraft.set(Object.fromEntries(plan.workouts.map(workout => [workout.id, workout.suggestedDayOfWeek ?? -1])));
    this.editingSchedule.set(true);
  }

  updateSuggestedDay(workoutId: number, event: Event): void {
    const day = Number((event.target as HTMLSelectElement).value);
    this.scheduleDraft.update(items => ({ ...items, [workoutId]: day }));
  }

  saveSchedule(): void {
    const plan = this.plan(); if (!plan) return;
    this.isLoading.set(true);
    this.platformService.updateTrainingPlan(plan.id, { name: plan.name, description: plan.description, level: plan.level, goal: plan.goal, workouts: plan.workouts.map(workout => ({ routineId: workout.routineId, sortOrder: workout.sortOrder, dayLabel: workout.dayLabel, notes: workout.notes, suggestedDayOfWeek: this.scheduleDraft()[workout.id] >= 0 ? this.scheduleDraft()[workout.id] : null })) }).subscribe({
      next: () => { this.plan.set({ ...plan, workouts: plan.workouts.map(workout => ({ ...workout, suggestedDayOfWeek: this.scheduleDraft()[workout.id] >= 0 ? this.scheduleDraft()[workout.id] : null })) }); this.editingSchedule.set(false); this.isLoading.set(false); this.toast.success('Agenda sugerida actualizada.'); },
      error: () => { this.isLoading.set(false); this.toast.error('No se pudo actualizar la agenda.'); }
    });
  }
}
