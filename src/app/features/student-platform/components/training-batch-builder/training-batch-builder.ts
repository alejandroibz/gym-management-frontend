import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { take } from 'rxjs';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog';
import { ToastService } from '../../../../core/services/toast.service';
import { Exercise, RoutinePayload, RoutineTemplate, TrainingPlanCompositionBatchPayload } from '../../models/student-platform.model';
import { StudentPlatformService } from '../../services/student-platform.service';

type SelectionKind = 'plan' | 'workout' | 'block';
interface BuilderExercise { clientKey: string; exerciseId: number; name: string; muscleGroup: string; sortOrder: number; sets: number | null; reps: number | null; weight: number | null; restSeconds: number | null; notes: string; selected?: boolean; }
interface BuilderBlock { clientKey: string; name: string; cycles: number; notes: string; sortOrder: number; collapsed: boolean; exercises: BuilderExercise[]; }
interface BuilderWorkout { clientKey: string; sourceRoutineId?: number; sourceRoutineName?: string; isModified?: boolean; name: string; description: string; level: string; goal: string; dayLabel: string; notes: string; suggestedDayOfWeek: number | null; sortOrder: number; collapsed: boolean; blocks: BuilderBlock[]; }
interface BuilderPlan { clientKey: string; name: string; description: string; level: string; goal: string; sortOrder: number; collapsed: boolean; workouts: BuilderWorkout[]; }
interface BuilderSelection { kind: SelectionKind; planKey: string; workoutKey?: string; blockKey?: string; }
interface BuilderIssue { message: string; selection: BuilderSelection; }
interface BuilderDraft { plans: BuilderPlan[]; selection: BuilderSelection | null; clipboard: BuilderExercise[]; blockClipboard?: BuilderBlock | null; }
interface TrainingPreset { name: string; sets: number; reps: number; weight: number; rest: number; }

@Component({
  selector: 'app-training-batch-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule, MatButtonModule, MatIconModule, MatInputModule, MatProgressBarModule, MatSelectModule, MatTooltipModule],
  templateUrl: './training-batch-builder.html',
  styleUrl: './training-batch-builder.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingBatchBuilderComponent implements OnInit {
  @Input() mode: 'plans' | 'workouts' = 'plans';
  private readonly service = inject(StudentPlatformService);
  private readonly toast = inject(ToastService);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private userStorageSuffix = 'current-user';

  readonly plans = signal<BuilderPlan[]>([]);
  readonly selection = signal<BuilderSelection | null>(null);
  readonly exercises = signal<Exercise[]>([]);
  readonly templates = signal<RoutineTemplate[]>([]);
  readonly catalogSelection = signal<Set<number>>(new Set());
  readonly clipboard = signal<BuilderExercise[]>([]);
  readonly blockClipboard = signal<BuilderBlock | null>(null);
  readonly savedAt = signal<Date | null>(null);
  readonly loading = signal(false);
  readonly libraryOpen = signal(true);
  readonly mobileTreeOpen = signal(false);
  readonly search = signal('');
  readonly muscleFilter = signal('');
  readonly librarySearch = signal('');
  readonly commonSets = signal(3);
  readonly commonReps = signal(10);
  readonly commonWeight = signal(0);
  readonly commonRest = signal(60);
  readonly favoriteTemplateIds = signal<Set<number>>(new Set());
  readonly presets: TrainingPreset[] = [{name:'Hipertrofia',sets:3,reps:12,weight:0,rest:60},{name:'Fuerza',sets:5,reps:5,weight:0,rest:120},{name:'Resistencia',sets:3,reps:20,weight:0,rest:30},{name:'Técnica',sets:3,reps:8,weight:0,rest:90}];
  private duplicatePolicy: 'omit' | 'replace' | null = null;

  readonly selectedPlan = computed(() => this.plans().find(p => p.clientKey === this.selection()?.planKey));
  readonly selectedWorkout = computed(() => this.selectedPlan()?.workouts.find(w => w.clientKey === this.selection()?.workoutKey));
  readonly selectedBlock = computed(() => this.selectedWorkout()?.blocks.find(b => b.clientKey === this.selection()?.blockKey));
  readonly issues = computed(() => this.validate());
  readonly totals = computed(() => {
    const plans = this.plans(); const workouts = plans.flatMap(p => p.workouts); const blocks = workouts.flatMap(w => w.blocks);
    return { plans: this.mode === 'plans' ? plans.length : 0, workouts: workouts.length, blocks: blocks.length, exercises: blocks.reduce((n, b) => n + b.exercises.length, 0) };
  });
  readonly muscleGroups = computed(() => [...new Set(this.exercises().map(e => e.primaryMuscleGroupName || e.muscleGroup).filter(Boolean))].sort());
  readonly filteredExercises = computed(() => {
    const q = this.normalize(this.search()); const muscle = this.muscleFilter(); const existing = new Set(this.selectedBlock()?.exercises.map(e => e.exerciseId) ?? []);
    return this.exercises().filter(e => !existing.has(e.id) && (!muscle || (e.primaryMuscleGroupName || e.muscleGroup) === muscle) && (!q || this.normalize(`${e.name} ${e.muscleGroup} ${e.description}`).includes(q))).slice(0, 40);
  });
  readonly filteredTemplates = computed(() => { const q=this.normalize(this.librarySearch()),favorites=this.favoriteTemplateIds(); return this.templates().filter(t=>!q||this.normalize(`${t.name} ${t.goal} ${t.level}`).includes(q)).sort((a,b)=>Number(favorites.has(b.id))-Number(favorites.has(a.id))).slice(0,20); });
  readonly insights = computed(() => { const workout=this.selectedWorkout(); if(!workout)return null; const rows=workout.blocks.flatMap(block=>block.exercises.map(exercise=>({block,exercise}))); const prescribedSets=rows.reduce((n,x)=>n+(x.exercise.sets??0)*x.block.cycles,0),restSeconds=rows.reduce((n,x)=>n+(x.exercise.sets??0)*x.block.cycles*(x.exercise.restSeconds??0),0); const muscles=new Map<string,number>();rows.forEach(x=>muscles.set(x.exercise.muscleGroup,(muscles.get(x.exercise.muscleGroup)??0)+(x.exercise.sets??0)*x.block.cycles));const distribution=[...muscles.entries()].sort((a,b)=>b[1]-a[1]),alerts:string[]=[];const durationMinutes=Math.max(1,Math.round((prescribedSets*40+restSeconds)/60));if(durationMinutes>90)alerts.push('La duración estimada supera los 90 minutos.');if(!workout.blocks.some(b=>this.normalize(b.name).includes('calent')))alerts.push('No se identificó un bloque de calentamiento.');if(distribution.length===1&&prescribedSets>20)alerts.push(`El volumen está muy concentrado en ${distribution[0][0]}.`);if(workout.blocks.some(b=>b.cycles>8))alerts.push('Hay bloques con más de 8 ciclos; revisá la fatiga esperada.');return{prescribedSets,durationMinutes,distribution,alerts}; });

  ngOnInit(): void {
    this.service.getExercises().subscribe({ next: v => this.exercises.set(v), error: () => this.toast.error('No se pudo cargar el catálogo de ejercicios.') });
    this.service.getRoutineTemplates().subscribe({ next: v => this.templates.set(v), error: () => this.toast.error('No se pudo cargar la biblioteca.') });
    this.auth.user$.pipe(take(1)).subscribe(user => { this.userStorageSuffix=encodeURIComponent(user?.sub??user?.email??'current-user');try{this.favoriteTemplateIds.set(new Set(JSON.parse(localStorage.getItem(this.favoriteStorageKey)??'[]')));}catch{}this.restoreOrStart(); });
  }

  addPlan(): void { const plan = this.newPlan(this.plans().length + 1); this.plans.update(v => [...v, plan]); this.select({ kind: 'plan', planKey: plan.clientKey }); this.persist(); }
  duplicatePlan(plan: BuilderPlan): void { const copy = this.clonePlan(plan); copy.name += ' - copia'; this.plans.update(v => [...v, copy].map((p, i) => ({ ...p, sortOrder: i + 1 }))); this.select({ kind: 'plan', planKey: copy.clientKey }); this.persist(); }
  removePlan(plan: BuilderPlan): void { this.confirmDelete('Eliminar plan', `Se eliminará “${plan.name}” y todo su contenido del borrador.`, () => { this.plans.update(v => v.filter(p => p.clientKey !== plan.clientKey).map((p, i) => ({ ...p, sortOrder: i + 1 }))); this.selection.set(null); this.persist(); }); }
  addWorkout(plan = this.selectedPlan()): void { if (!plan) return; const workout = this.newWorkout(plan.workouts.length + 1); plan.workouts.push(workout); this.touch(); this.select({ kind: 'workout', planKey: plan.clientKey, workoutKey: workout.clientKey }); }
  duplicateWorkout(workout = this.selectedWorkout()): void { const plan = this.selectedPlan(); if (!plan || !workout) return; const copy = this.cloneWorkout(workout); copy.name += ' - copia'; plan.workouts.push(copy); this.touch(); this.select({ kind: 'workout', planKey: plan.clientKey, workoutKey: copy.clientKey }); }
  removeWorkout(plan: BuilderPlan, workout: BuilderWorkout): void { this.confirmDelete('Eliminar workout', `Se eliminará “${workout.name}” con sus bloques.`, () => { plan.workouts = plan.workouts.filter(w => w.clientKey !== workout.clientKey).map((w, i) => ({ ...w, sortOrder: i + 1 })); this.selection.set({ kind: 'plan', planKey: plan.clientKey }); this.touch(); }); }
  addBlock(workout = this.selectedWorkout()): void { const plan = this.selectedPlan(); if (!plan || !workout) return; const block = this.newBlock(workout.blocks.length + 1); workout.blocks.push(block); this.touchWorkout(workout); this.select({ kind: 'block', planKey: plan.clientKey, workoutKey: workout.clientKey, blockKey: block.clientKey }); }
  duplicateBlock(block = this.selectedBlock()): void { const plan = this.selectedPlan(), workout = this.selectedWorkout(); if (!plan || !workout || !block) return; const copy = this.cloneBlock(block); copy.name += ' - copia'; workout.blocks.push(copy); this.touchWorkout(workout); this.select({ kind: 'block', planKey: plan.clientKey, workoutKey: workout.clientKey, blockKey: copy.clientKey }); }
  copyBlock(block = this.selectedBlock()): void { if (!block) return; this.blockClipboard.set(this.cloneBlock(block)); this.persist(); this.toast.success('Bloque copiado. Elegí otro workout para pegarlo.'); }
  pasteBlock(workout = this.selectedWorkout()): void { const source = this.blockClipboard(); const plan = this.selectedPlan(); if (!source || !workout || !plan) return; const copy = this.cloneBlock(source); copy.sortOrder = workout.blocks.length + 1; workout.blocks.push(copy); this.touchWorkout(workout); this.select({ kind: 'block', planKey: plan.clientKey, workoutKey: workout.clientKey, blockKey: copy.clientKey }); }
  removeBlock(workout: BuilderWorkout, block: BuilderBlock): void { this.confirmDelete('Eliminar bloque', `Se eliminará “${block.name}” y sus ejercicios.`, () => { workout.blocks = workout.blocks.filter(b => b.clientKey !== block.clientKey).map((b, i) => ({ ...b, sortOrder: i + 1 })); this.touchWorkout(workout); this.selection.update(s => s ? ({ kind: 'workout', planKey: s.planKey, workoutKey: workout.clientKey }) : s); }); }

  select(value: BuilderSelection): void { this.selection.set(value); this.mobileTreeOpen.set(false); this.persist(); }
  selectIssue(issue: BuilderIssue): void { this.select(issue.selection); }
  touch(): void { this.plans.set(structuredClone(this.plans())); this.persist(); }
  touchWorkout(workout: BuilderWorkout): void { if (workout.sourceRoutineId) workout.isModified = true; this.touch(); }
  toggleCatalog(id: number): void { const next = new Set(this.catalogSelection()); next.has(id) ? next.delete(id) : next.add(id); this.catalogSelection.set(next); }
  selectAllVisible(): void { const next = new Set(this.catalogSelection()); this.filteredExercises().forEach(e => next.add(e.id)); this.catalogSelection.set(next); }
  clearCatalog(): void { this.catalogSelection.set(new Set()); }
  addSelectedExercises(): void {
    const block = this.selectedBlock(), workout = this.selectedWorkout(); if (!block || !workout) return;
    const chosen = this.exercises().filter(e => this.catalogSelection().has(e.id));
    chosen.forEach(e => block.exercises.push({ clientKey: this.key(), exerciseId: e.id, name: e.name, muscleGroup: e.primaryMuscleGroupName || e.muscleGroup, sortOrder: block.exercises.length + 1, sets: this.commonSets(), reps: this.commonReps(), weight: this.commonWeight(), restSeconds: this.commonRest(), notes: '' }));
    this.catalogSelection.set(new Set()); this.touchWorkout(workout); this.toast.success(`${chosen.length} ejercicios agregados.`);
  }
  applyPreset(preset:TrainingPreset):void{this.commonSets.set(preset.sets);this.commonReps.set(preset.reps);this.commonWeight.set(preset.weight);this.commonRest.set(preset.rest);}
  applyPresetToSelected(preset:TrainingPreset):void{const block=this.selectedBlock(),workout=this.selectedWorkout();if(!block||!workout)return;const selected=block.exercises.filter(e=>e.selected);if(!selected.length){this.applyPreset(preset);this.toast.success(`Preset ${preset.name} preparado.`);return;}selected.forEach(e=>{e.sets=preset.sets;e.reps=preset.reps;e.weight=preset.weight;e.restSeconds=preset.rest;});this.touchWorkout(workout);this.toast.success(`Preset aplicado a ${selected.length} ejercicios.`);}
  toggleFavorite(templateId:number):void{const next=new Set(this.favoriteTemplateIds());next.has(templateId)?next.delete(templateId):next.add(templateId);this.favoriteTemplateIds.set(next);localStorage.setItem(this.favoriteStorageKey,JSON.stringify([...next]));}
  duplicateExercise(exercise: BuilderExercise): void { this.clipboard.set([{ ...structuredClone(exercise), selected: false }]); this.persist(); this.toast.success('Ejercicio copiado. Podés pegarlo en otro bloque.'); }
  removeExercise(exercise: BuilderExercise): void { const block = this.selectedBlock(), workout = this.selectedWorkout(); if (!block || !workout) return; block.exercises = block.exercises.filter(e => e.clientKey !== exercise.clientKey).map((e, i) => ({ ...e, sortOrder: i + 1 })); this.touchWorkout(workout); }
  copySelectedExercises(): void { const selected = this.selectedBlock()?.exercises.filter(e => e.selected) ?? []; if (!selected.length) { this.toast.error('Seleccioná al menos un ejercicio del bloque.'); return; } this.clipboard.set(structuredClone(selected).map(e => ({ ...e, selected: false }))); this.persist(); this.toast.success(`${selected.length} ejercicios copiados.`); }
  pasteExercises(): void {
    const block = this.selectedBlock(), workout = this.selectedWorkout(); if (!block || !workout || !this.clipboard().length) return;
    const duplicates = this.clipboard().filter(e => block.exercises.some(x => x.exerciseId === e.exerciseId));
    const apply = (policy: 'omit' | 'replace') => { this.duplicatePolicy = policy; let added = 0, replaced = 0, omitted = 0; for (const source of this.clipboard()) { const index = block.exercises.findIndex(e => e.exerciseId === source.exerciseId); if (index < 0) { block.exercises.push({ ...structuredClone(source), clientKey: this.key(), sortOrder: block.exercises.length + 1 }); added++; } else if (policy === 'replace') { block.exercises[index] = { ...structuredClone(source), clientKey: block.exercises[index].clientKey, sortOrder: block.exercises[index].sortOrder }; replaced++; } else omitted++; } this.touchWorkout(workout); this.toast.success(`${added} agregados · ${replaced} reemplazados · ${omitted} omitidos.`); };
    if (!duplicates.length || this.duplicatePolicy) { apply(this.duplicatePolicy ?? 'omit'); return; }
    this.dialog.open(ConfirmDialogComponent, { width: 'min(500px, calc(100vw - 32px))', disableClose: true, data: { title: 'Ejercicios repetidos', message: `${duplicates.length} ejercicios ya existen en el bloque. ¿Querés reemplazar su configuración?`, confirmLabel: 'Reemplazar', cancelLabel: 'Omitir', tone: 'primary' } }).afterClosed().subscribe(replace => apply(replace ? 'replace' : 'omit'));
  }

  addTemplate(template: RoutineTemplate): void { const plan = this.selectedPlan(); if (!plan) return; const workout = this.fromTemplate(template, plan.workouts.length + 1); plan.workouts.push(workout); this.touch(); this.select({ kind: 'workout', planKey: plan.clientKey, workoutKey: workout.clientKey }); }
  addTemplateBlock(template: RoutineTemplate, blockIndex: number): void { const workout = this.selectedWorkout(); if (!workout) return; const source = template.blocks[blockIndex]; if (!source) return; const block = this.blockFromTemplate(source, workout.blocks.length + 1); workout.blocks.push(block); this.touchWorkout(workout); const plan = this.selectedPlan()!; this.select({ kind: 'block', planKey: plan.clientKey, workoutKey: workout.clientKey, blockKey: block.clientKey }); }
  copyTemplateExercise(exercise: RoutineTemplate['exercises'][number]): void { const next = this.clipboard().filter(e => e.exerciseId !== exercise.exerciseId); next.push({ clientKey: this.key(), exerciseId: exercise.exerciseId, name: exercise.exerciseName, muscleGroup: exercise.muscleGroup, sortOrder: next.length + 1, sets: exercise.sets ?? null, reps: exercise.reps ?? null, weight: exercise.weight ?? null, restSeconds: exercise.restSeconds ?? null, notes: exercise.notes ?? '' }); this.clipboard.set(next); this.persist(); this.toast.success(`${next.length} ejercicios preparados para pegar.`); }

  dropPlan(event: CdkDragDrop<BuilderPlan[]>): void { const value = [...this.plans()]; moveItemInArray(value, event.previousIndex, event.currentIndex); this.plans.set(value.map((p, i) => ({ ...p, sortOrder: i + 1 }))); this.persist(); }
  dropWorkout(plan: BuilderPlan, event: CdkDragDrop<BuilderWorkout[]>): void { moveItemInArray(plan.workouts, event.previousIndex, event.currentIndex); plan.workouts = plan.workouts.map((w, i) => ({ ...w, sortOrder: i + 1 })); this.touch(); }
  dropBlock(workout: BuilderWorkout, event: CdkDragDrop<BuilderBlock[]>): void { moveItemInArray(workout.blocks, event.previousIndex, event.currentIndex); workout.blocks = workout.blocks.map((b, i) => ({ ...b, sortOrder: i + 1 })); this.touchWorkout(workout); }
  dropExercise(block: BuilderBlock, event: CdkDragDrop<BuilderExercise[], BuilderExercise[] | Exercise[]>): void {
    const workout = this.selectedWorkout();
    if (!workout) return;
    if (event.previousContainer === event.container) {
      moveItemInArray(block.exercises, event.previousIndex, event.currentIndex);
      block.exercises = block.exercises.map((exercise, index) => ({ ...exercise, sortOrder: index + 1 }));
      this.touchWorkout(workout);
      return;
    }
    const source = event.item.data as Exercise;
    if (!source?.id) return;
    if (block.exercises.some(exercise => exercise.exerciseId === source.id)) {
      this.toast.error(`${source.name} ya está agregado en este bloque.`);
      return;
    }
    block.exercises.splice(event.currentIndex, 0, {
      clientKey: this.key(), exerciseId: source.id, name: source.name,
      muscleGroup: source.primaryMuscleGroupName || source.muscleGroup,
      sortOrder: event.currentIndex + 1, sets: this.commonSets(), reps: this.commonReps(),
      weight: this.commonWeight(), restSeconds: this.commonRest(), notes: ''
    });
    block.exercises = block.exercises.map((exercise, index) => ({ ...exercise, sortOrder: index + 1 }));
    this.touchWorkout(workout);
    this.toast.success(`${source.name} agregado al bloque.`);
  }
  move<T>(items: T[], index: number, delta: -1 | 1): void { const target = index + delta; if (target < 0 || target >= items.length) return; moveItemInArray(items, index, target); items.forEach((item, i) => (item as { sortOrder: number }).sortOrder = i + 1); this.touch(); }

  save(): void {
    const issues = this.issues(); if (issues.length) { this.selectIssue(issues[0]); this.toast.error(`Hay ${issues.length} campos o secciones para revisar.`); return; }
    this.loading.set(true);
    if (this.mode === 'workouts') {
      const workouts = this.plans()[0].workouts;
      this.service.createRoutinesBatch(workouts.map(w => ({ ...this.toRoutine(w), clientKey: w.clientKey }))).subscribe({ next: r => this.saved(Object.keys(r.routineIds).length, 'workouts'), error: () => this.failed() });
      return;
    }
    const payload: TrainingPlanCompositionBatchPayload = { plans: this.plans().map(plan => ({ clientKey: plan.clientKey, name: plan.name, description: plan.description || null, level: plan.level, goal: plan.goal, workouts: plan.workouts.map(w => ({ clientKey: w.clientKey, routineId: w.sourceRoutineId && !w.isModified ? w.sourceRoutineId : null, routine: w.sourceRoutineId && !w.isModified ? null : this.toRoutine(w), sortOrder: w.sortOrder, dayLabel: w.dayLabel || null, notes: w.notes || null, suggestedDayOfWeek: w.suggestedDayOfWeek })) })) };
    this.service.composeTrainingPlansBatch(payload).subscribe({ next: r => this.saved(r.plansCreated, 'planes'), error: () => this.failed() });
  }
  discard(): void { this.confirmDelete('Descartar borrador', 'Se eliminará todo el lote preparado.', () => { localStorage.removeItem(this.storageKey); this.startFresh(); }); }

  @HostListener('window:beforeunload', ['$event']) beforeUnload(event: BeforeUnloadEvent): void { if (this.totals().workouts) event.preventDefault(); }
  @HostListener('document:keydown', ['$event']) shortcuts(event: KeyboardEvent): void {
    if (!(event.ctrlKey || event.metaKey) && event.key !== 'Delete') return;
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); this.libraryOpen.set(true); return; }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'd') { event.preventDefault(); const s = this.selection(); if (s?.kind === 'plan' && this.selectedPlan()) this.duplicatePlan(this.selectedPlan()!); else if (s?.kind === 'workout') this.duplicateWorkout(); else if (s?.kind === 'block') this.duplicateBlock(); }
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') { event.preventDefault(); this.selection()?.kind === 'block' ? this.addBlock() : this.addWorkout(); }
    if (event.key === 'Delete' && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) { const s = this.selection(); if (s?.kind === 'plan' && this.selectedPlan() && this.mode === 'plans') this.removePlan(this.selectedPlan()!); else if (s?.kind === 'workout' && this.selectedPlan() && this.selectedWorkout()) this.removeWorkout(this.selectedPlan()!, this.selectedWorkout()!); else if (s?.kind === 'block' && this.selectedWorkout() && this.selectedBlock()) this.removeBlock(this.selectedWorkout()!, this.selectedBlock()!); }
  }

  private validate(): BuilderIssue[] { const result: BuilderIssue[] = []; for (const plan of this.plans()) { const ps: BuilderSelection = { kind: 'plan', planKey: plan.clientKey }; if (this.mode === 'plans' && !plan.name.trim()) result.push({ message: 'El plan necesita un nombre.', selection: ps }); if (!plan.workouts.length) result.push({ message: 'El plan necesita al menos un workout.', selection: ps }); for (const workout of plan.workouts) { const ws: BuilderSelection = { kind: 'workout', planKey: plan.clientKey, workoutKey: workout.clientKey }; if (!workout.name.trim()) result.push({ message: 'El workout necesita un nombre.', selection: ws }); if (workout.sourceRoutineId && workout.isModified && this.normalize(workout.name) === this.normalize(workout.sourceRoutineName ?? '')) result.push({ message: 'Si modificás un workout existente, tenés que asignarle un nombre nuevo.', selection: ws }); if (!workout.blocks.length) result.push({ message: `${workout.name || 'Workout'} necesita al menos un bloque.`, selection: ws }); for (const block of workout.blocks) { const bs: BuilderSelection = { kind: 'block', planKey: plan.clientKey, workoutKey: workout.clientKey, blockKey: block.clientKey }; if (!block.name.trim()) result.push({ message: 'El bloque necesita un nombre.', selection: bs }); if (block.cycles < 1) result.push({ message: `${block.name || 'Bloque'} debe tener al menos un ciclo.`, selection: bs }); if (!block.exercises.length) result.push({ message: `${block.name || 'Bloque'} necesita ejercicios.`, selection: bs }); } } } return result; }
  private toRoutine(w: BuilderWorkout): RoutinePayload { return { name: w.name, description: w.description || null, level: w.level, goal: w.goal, clientIds: [], scheduleDays: [], exercises: [], blocks: w.blocks.map(b => ({ clientKey: b.clientKey, name: b.name, cycles: b.cycles, notes: b.notes || null, sortOrder: b.sortOrder, exercises: b.exercises.map(e => ({ exerciseId: e.exerciseId, sortOrder: e.sortOrder, sets: e.sets, reps: e.reps, weight: e.weight, restSeconds: e.restSeconds, notes: e.notes || null })) })) }; }
  private startFresh(): void { const plan = this.newPlan(1); if (this.mode === 'workouts') plan.name = 'Workouts preparados'; this.plans.set([plan]); this.selection.set({ kind: 'plan', planKey: plan.clientKey }); this.clipboard.set([]); this.blockClipboard.set(null); this.persist(); }
  private restoreOrStart(): void { try { const raw = localStorage.getItem(this.storageKey); if (!raw) { this.startFresh(); return; } const draft = JSON.parse(raw) as BuilderDraft; this.dialog.open(ConfirmDialogComponent, { width: 'min(480px, calc(100vw - 32px))', disableClose: true, data: { title: this.mode === 'plans' ? 'Planes sin confirmar' : 'Workouts sin confirmar', message: 'Encontramos un borrador guardado. ¿Querés continuar donde lo dejaste?', confirmLabel: 'Recuperar', cancelLabel: 'Descartar', tone: 'primary' } }).afterClosed().subscribe(recover => { if (!recover) { localStorage.removeItem(this.storageKey); this.startFresh(); return; } const restored=(draft.plans??[]).map(plan=>({...plan,workouts:plan.workouts.map(workout=>{if(!workout.sourceRoutineId||workout.sourceRoutineName)return workout;const originalName=workout.name.replace(/\s*-\s*copia$/i,'').trim();return{...workout,name:originalName,sourceRoutineName:originalName,isModified:false};})}));this.plans.set(restored); this.selection.set(draft.selection); this.clipboard.set(draft.clipboard ?? []); this.blockClipboard.set(draft.blockClipboard ?? null); if (!this.plans().length) this.startFresh(); }); } catch { localStorage.removeItem(this.storageKey); this.startFresh(); } }
  private persist(): void { localStorage.setItem(this.storageKey, JSON.stringify({ plans: this.plans(), selection: this.selection(), clipboard: this.clipboard(), blockClipboard: this.blockClipboard() } satisfies BuilderDraft)); this.savedAt.set(new Date()); }
  private confirmDelete(title: string, message: string, action: () => void): void { this.dialog.open(ConfirmDialogComponent, { width: 'min(460px, calc(100vw - 32px))', data: { title, message, confirmLabel: 'Eliminar', cancelLabel: 'Cancelar', tone: 'danger' } }).afterClosed().subscribe(ok => { if (ok) action(); }); }
  private saved(count: number, noun: string): void { this.loading.set(false); localStorage.removeItem(this.storageKey); this.toast.success(`${count} ${noun} creados correctamente.`); this.router.navigate(['/student-platform'], { queryParams: { tab: this.mode === 'plans' ? 'planes' : 'workouts' } }); }
  private failed(): void { this.loading.set(false); this.toast.error('No se creó ningún elemento. El lote completo fue revertido.'); }
  private newPlan(order: number): BuilderPlan { return { clientKey: this.key(), name: `Plan ${order}`, description: '', level: 'General', goal: 'General', sortOrder: order, collapsed: false, workouts: [] }; }
  private newWorkout(order: number): BuilderWorkout { return { clientKey: this.key(), name: `Workout ${order}`, description: '', level: 'General', goal: 'General', dayLabel: `Día ${order}`, notes: '', suggestedDayOfWeek: null, sortOrder: order, collapsed: false, blocks: [] }; }
  private newBlock(order: number): BuilderBlock { return { clientKey: this.key(), name: `Bloque ${order}`, cycles: 1, notes: '', sortOrder: order, collapsed: false, exercises: [] }; }
  private clonePlan(p: BuilderPlan): BuilderPlan { return { ...structuredClone(p), clientKey: this.key(), sortOrder: this.plans().length + 1, workouts: p.workouts.map((w, i) => ({ ...this.cloneWorkout(w), sortOrder: i + 1 })) }; }
  private cloneWorkout(w: BuilderWorkout): BuilderWorkout { return { ...structuredClone(w), clientKey: this.key(), sourceRoutineId: undefined, sourceRoutineName: undefined, isModified: undefined, blocks: w.blocks.map((b, i) => ({ ...this.cloneBlock(b), sortOrder: i + 1 })) }; }
  private cloneBlock(b: BuilderBlock): BuilderBlock { return { ...structuredClone(b), clientKey: this.key(), exercises: b.exercises.map((e, i) => ({ ...structuredClone(e), clientKey: this.key(), sortOrder: i + 1, selected: false })) }; }
  private fromTemplate(t: RoutineTemplate, order: number): BuilderWorkout { const blocks = t.blocks.length ? t.blocks : [{ id: 0, name: 'Bloque general', sortOrder: 1, cycles: 1, notes: null, exercises: t.exercises }]; return { clientKey: this.key(), sourceRoutineId: t.id, sourceRoutineName: t.name, isModified: false, name: t.name, description: t.description ?? '', level: t.level, goal: t.goal, dayLabel: `Día ${order}`, notes: '', suggestedDayOfWeek: null, sortOrder: order, collapsed: false, blocks: blocks.map((b, i) => this.blockFromTemplate(b, i + 1)) }; }
  private blockFromTemplate(b: RoutineTemplate['blocks'][number], order: number): BuilderBlock { return { clientKey: this.key(), name: b.name, cycles: b.cycles, notes: b.notes ?? '', sortOrder: order, collapsed: false, exercises: b.exercises.map((e, i) => ({ clientKey: this.key(), exerciseId: e.exerciseId, name: e.exerciseName, muscleGroup: e.muscleGroup, sortOrder: i + 1, sets: e.sets ?? null, reps: e.reps ?? null, weight: e.weight ?? null, restSeconds: e.restSeconds ?? null, notes: e.notes ?? '' })) }; }
  private get storageKey(): string { return `gym:training-batch-builder:v3:${this.userStorageSuffix}:${this.mode}`; }
  private get favoriteStorageKey():string{return `gym:training-favorites:v1:${this.userStorageSuffix}`;}
  private key(): string { return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`; }
  private normalize(v: string): string { return v.trim().toLocaleLowerCase('es'); }
}
