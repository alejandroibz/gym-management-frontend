import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@auth0/auth0-angular';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { TrainingBatchBuilderComponent } from './training-batch-builder';
import { StudentPlatformService } from '../../services/student-platform.service';
import { ToastService } from '../../../../core/services/toast.service';

describe('Exercise structure navigation', () => {
  const row = (key: string, id: number, order: number) => ({ clientKey: key, exerciseId: id, name: `Ejercicio ${id}`, muscleGroup: 'Piernas', sortOrder: order, sets: 4, reps: 8, weight: 25, restSeconds: 90, notes: 'Controlar descenso' });
  const plan = (key: string, rows: ReturnType<typeof row>[]) => ({ clientKey: key, name: key, description: '', level: 'General', goal: 'General', sortOrder: 1, collapsed: false, workouts: [{ clientKey: key + '-w', sourceRoutineId: 1, name: 'Workout', description: '', level: 'General', goal: 'General', dayLabel: '', notes: '', suggestedDayOfWeek: null, sortOrder: 1, collapsed: false, blocks: [{ clientKey: key + '-b', name: 'Bloque', cycles: 1, notes: '', sortOrder: 1, collapsed: false, exercises: rows }] }] });
  let component: TrainingBatchBuilderComponent;
  let toast: { error: ReturnType<typeof vi.fn> };
  beforeEach(() => {
    localStorage.clear();
    toast = { error: vi.fn() };
    TestBed.configureTestingModule({ imports: [TrainingBatchBuilderComponent], providers: [provideRouter([]),
      { provide: StudentPlatformService, useValue: { getExercises: () => of([]), getRoutineTemplates: () => of([]) } },
      { provide: ToastService, useValue: toast }, { provide: MatDialog, useValue: {} },
      { provide: AuthService, useValue: { user$: of({ sub: 'tree-test' }) } }
    ] });
    component = TestBed.runInInjectionContext(() => new TrainingBatchBuilderComponent());
    component.plans.set([plan('p1', [row('e1', 1, 1), row('e2', 2, 2)]), plan('p2', [])]);
  });

  it('moves across plans, keeps prescriptions, updates both workouts and persists the draft', () => {
    const original = structuredClone(component.plans()[0].workouts[0].blocks[0].exercises[0]);
    component.plans()[1].collapsed = true;
    component.plans()[1].workouts[0].collapsed = true;
    component.moveTreeExercise('p1-b', 'e1', 'p2-b');
    expect(component.plans()[0].workouts[0].blocks[0].exercises.map(e => [e.clientKey, e.sortOrder])).toEqual([['e2', 1]]);
    expect(component.plans()[1].workouts[0].blocks[0].exercises).toEqual([original]);
    expect(component.plans().every(p => p.workouts[0].isModified)).toBe(true);
    expect(component.plans()[1].collapsed).toBe(false);
    expect(component.selectedBlock()?.clientKey).toBe('p2-b');
    const saved = JSON.parse(localStorage.getItem('gym:training-batch-builder:v3:current-user:plans')!);
    expect(saved.plans[1].workouts[0].blocks[0].exercises[0].clientKey).toBe('e1');
  });

  it('reorders within a block and refuses a duplicate in another block without removing the source', () => {
    component.moveTreeExercise('p1-b', 'e1', 'p1-b', 1);
    expect(component.selectedBlock()?.exercises.map(e => [e.clientKey, e.sortOrder])).toEqual([['e2', 1], ['e1', 2]]);
    component.plans()[1].workouts[0].blocks[0].exercises.push(row('duplicate', 1, 1));
    component.moveTreeExercise('p1-b', 'e1', 'p2-b');
    expect(toast.error).toHaveBeenCalled();
    expect(component.plans()[0].workouts[0].blocks[0].exercises).toHaveLength(2);
    expect(component.plans()[1].workouts[0].blocks[0].exercises).toHaveLength(1);
  });

  it('renders exercise names in the sidebar and opens their block on click', () => {
    const fixture = TestBed.createComponent(TrainingBatchBuilderComponent);
    fixture.detectChanges();
    fixture.componentInstance.plans.set(component.plans());
    fixture.detectChanges();
    const names = fixture.nativeElement.querySelectorAll('.tree-exercise-name') as NodeListOf<HTMLButtonElement>;
    expect(names.length).toBe(2);
    expect(names[0].textContent).toContain('Ejercicio 1');
    names[0].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.selectedBlock()?.clientKey).toBe('p1-b');
    expect(fixture.nativeElement.querySelector('.exercise-focused')?.textContent).toContain('Ejercicio 1');
    expect(fixture.nativeElement.querySelectorAll('.tree-exercise-empty').length).toBe(1);
  });
});
