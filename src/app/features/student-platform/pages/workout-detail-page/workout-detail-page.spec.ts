import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { WorkoutDetailPageComponent } from './workout-detail-page';
import { StudentPlatformService } from '../../services/student-platform.service';
import { ClientsService } from '../../../clients/services/clients.service';
import { ToastService } from '../../../../core/services/toast.service';

describe('Workout editing', () => {
  const exercise = (id: number) => ({ id, exerciseId: id, exerciseName: 'Ejercicio ' + id, muscleGroup: 'Piernas', sortOrder: id, sets: 3, reps: 10, weight: 0, restSeconds: 60, notes: null });
  let service: { getRoutineTemplates: ReturnType<typeof vi.fn>; getRoutines: ReturnType<typeof vi.fn>; getExercises: ReturnType<typeof vi.fn>; getTrainingPlans: ReturnType<typeof vi.fn>; getTrainingPlanAssignments: ReturnType<typeof vi.fn>; updateRoutine: ReturnType<typeof vi.fn> };
  let toast: { error: ReturnType<typeof vi.fn>; success: ReturnType<typeof vi.fn> };
  beforeEach(() => {
    service = {
      getRoutineTemplates: vi.fn().mockReturnValue(of([{ id: 1, name: 'Workout', description: '', level: 'General', goal: 'General', exercises: [exercise(1), exercise(2)], blocks: [{ id: 1, name: 'Bloque', cycles: 1, sortOrder: 1, notes: null, exercises: [exercise(1), exercise(2)] }] }])),
      getRoutines: vi.fn().mockReturnValue(of([])), getExercises: vi.fn().mockReturnValue(of([{ id: 1, name: 'Ejercicio 1' }, { id: 2, name: 'Ejercicio 2' }])), getTrainingPlans: vi.fn().mockReturnValue(of([])), getTrainingPlanAssignments: vi.fn().mockReturnValue(of([])), updateRoutine: vi.fn().mockReturnValue(of({}))
    };
    toast = { error: vi.fn(), success: vi.fn() };
    TestBed.configureTestingModule({ imports: [WorkoutDetailPageComponent], providers: [provideRouter([]), { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map([['id', '1']]), queryParamMap: new Map([['edit', 'true']]) } } }, { provide: StudentPlatformService, useValue: service }, { provide: ClientsService, useValue: { getPaged: () => of({ items: [] }) } }, { provide: ToastService, useValue: toast }, { provide: MatDialog, useValue: {} }] });
  });

  it('opens editing from plans and saves removal through the visible action', async () => {
    const fixture = TestBed.createComponent(WorkoutDetailPageComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const component = fixture.componentInstance;
    expect(component.isEditing()).toBe(true);
    const button = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('button')).find(item => item.textContent?.includes('Quitar ejercicio'))!;
    button.click();
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).querySelectorAll('.editable-exercise').length).toBe(1);
    component.workoutEditForm.patchValue({ level: 'Avanzado', goal: 'Fuerza' });
    component.editableBlocks()[0].cycles = 2;
    component.editableBlocks()[0].exercises[0].reps = 8;
    component.saveWorkoutChanges();
    const payload = service.updateRoutine.mock.calls[0][1];
    expect(payload.level).toBe('Avanzado');
    expect(payload.goal).toBe('Fuerza');
    expect(payload.blocks[0].cycles).toBe(2);
    expect(payload.blocks[0].exercises).toEqual([expect.objectContaining({ exerciseId: 2, sortOrder: 1, reps: 8 })]);
  });

  it('offers removal directly in the detail view and saves it only on confirmation', async () => {
    const fixture = TestBed.createComponent(WorkoutDetailPageComponent);
    const component = fixture.componentInstance;
    component.cancelEditing();
    fixture.detectChanges();
    await fixture.whenStable();
    const button = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('.remove-exercise-action')!;
    expect(button.textContent).toContain('Quitar del workout');
    button.click();
    fixture.detectChanges();
    expect(component.isEditing()).toBe(true);
    expect(component.editableBlocks()[0].exercises.map(e => e.exerciseId)).toEqual([2]);
    expect(service.updateRoutine).not.toHaveBeenCalled();
    component.saveWorkoutChanges();
    expect(service.updateRoutine.mock.calls[0][1].blocks[0].exercises).toEqual([expect.objectContaining({ exerciseId: 2 })]);
  });

  it('cancels removals and field edits without mutating the saved workout', () => {
    const component = TestBed.createComponent(WorkoutDetailPageComponent).componentInstance;
    component.enableEditing();
    component.editableBlocks()[0].exercises[0].reps = 50;
    component.removeWorkoutExercise(0, 1);
    component.cancelEditing();
    expect(component.editableBlocks()[0].exercises.length).toBe(2);
    expect(component.editableBlocks()[0].exercises[0].reps).toBe(10);
    expect(service.updateRoutine).not.toHaveBeenCalled();
  });

  it('keeps legacy workouts without blocks editable', () => {
    const component = TestBed.createComponent(WorkoutDetailPageComponent).componentInstance;
    component.workout.update(workout => ({ ...workout!, blocks: [] }));
    component.enableEditing();
    component.removeWorkoutExercise(0, 0);
    component.saveWorkoutChanges();
    expect(service.updateRoutine.mock.calls[0][1].blocks[0].exercises).toHaveLength(1);
  });

  it('requires replacing the last exercise or removing its empty block before saving', () => {
    const component = TestBed.createComponent(WorkoutDetailPageComponent).componentInstance;
    component.removeWorkoutExercise(0, 1);
    component.removeWorkoutExercise(0, 0);
    component.saveWorkoutChanges();
    expect(service.updateRoutine).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalled();
  });
});
