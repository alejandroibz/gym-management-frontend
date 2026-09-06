import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, TemplateRef, ViewChild, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog';
import { RoleService } from '../../../../core/auth/role';
import { ToastService } from '../../../../core/services/toast.service';
import { environment } from '../../../../../environments/environment';
import { Client } from '../../../clients/models/client.model';
import { ClientsService } from '../../../clients/services/clients.service';
import { AchievementTemplate, AttendanceLog, BranchAttendanceSettings, Exercise, ExerciseProgressHistory, GamificationMetrics, HabitDefinition, MuscleGroup, PointRule, RankingResponse, RoutineAssignment, RoutineTemplate, TrainingPlan, TrainingPlanAssignment, WorkoutSession } from '../../models/student-platform.model';
import { StudentPlatformService } from '../../services/student-platform.service';
import { WeeklySchedulesPageComponent } from '../../../weekly-schedules/pages/weekly-schedules-page/weekly-schedules-page';

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

interface MuscleGroupDialogData {
  group?: MuscleGroup;
  suggestedCoordinates?: string[];
}

interface MuscleDialogData {
  groupId?: number;
  groupName?: string;
  muscle?: MuscleGroup['muscles'][number];
  groups: MuscleGroup[];
}

interface CalibrationPoint {
  x: number;
  y: number;
}

interface WorkoutSessionBlockGroup {
  key: string;
  name: string;
  exercises: WorkoutSession['exercises'];
  seriesCount: number;
}

interface BodyZoneDefinition {
  key: string;
  label: string;
  paths: string[];
  synonyms: string[];
  muscleGroupId?: number;
  muscleId?: number;
}

@Component({
  selector: 'app-muscle-group-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule],
  styles: [`
    .catalog-dialog { background: var(--app-surface); border-radius: 10px; color: var(--app-text); display: grid; gap: 1rem; padding: 1rem; }
    .catalog-dialog header { display: grid; gap: .35rem; }
    .catalog-dialog h2, .catalog-dialog p { margin: 0; }
    .catalog-dialog p, .catalog-dialog small, .select-field span { color: var(--app-text-muted); }
    .catalog-dialog h2, .catalog-dialog h3, .catalog-dialog strong { color: var(--app-text); }
    .eyebrow { color: var(--app-accent); font-size: .72rem; font-weight: 800; text-transform: uppercase; }
    .form-grid { display: grid; gap: .75rem; grid-template-columns: 1fr 1fr; }
    .wide { grid-column: 1 / -1; }
    .body-map-editor { background: var(--app-surface-muted); border: 1px solid var(--app-border); border-radius: 12px; color: var(--app-text); display: grid; gap: 1rem; grid-column: 1 / -1; padding: 1rem; }
    .map-editor-header { align-items: center; display: flex; gap: 1rem; justify-content: space-between; }
    .map-editor-header div { display: grid; gap: .2rem; }
    .map-editor-header strong { color: var(--app-text); }
    .map-editor-header small { color: var(--app-text-muted); }
    .drawing-help { background: color-mix(in srgb, var(--app-accent) 7%, var(--app-surface)); border: 1px solid color-mix(in srgb, var(--app-accent) 28%, var(--app-border)); border-radius: 9px; color: var(--app-text-muted); line-height: 1.45; padding: .75rem; }
    .map-editor-canvas { aspect-ratio: 1664 / 1248; background: #f8fafc; border: 1px solid var(--app-border); border-radius: 10px; cursor: crosshair; overflow: hidden; position: relative; width: 100%; }
    .map-editor-canvas img, .map-editor-canvas svg { display: block; inset: 0; position: absolute; width: 100%; }
    .map-editor-canvas img { height: auto; position: static; }
    .map-editor-canvas svg { height: 100%; }
    .saved-shape { fill: rgba(201, 42, 31, .46); stroke: #a51f18; stroke-width: 4; }
    .active-shape { fill: rgba(93, 143, 240, .24); stroke: #2563eb; stroke-width: 4; }
    .active-point { fill: #ef4444; stroke: #fff; stroke-width: 3; }
    .drawing-toolbar { align-items: center; display: flex; flex-wrap: wrap; gap: .5rem; }
    .drawing-toolbar .danger-action { color: var(--app-accent-strong); }
    .drawing-status { color: var(--app-text-muted); font-size: .78rem; margin-left: auto; }
    mat-form-field { width: 100%; }
    :host ::ng-deep .catalog-dialog .mat-mdc-text-field-wrapper { background: var(--app-surface-muted); border-radius: 8px; }
    :host ::ng-deep .catalog-dialog .mdc-notched-outline__leading,
    :host ::ng-deep .catalog-dialog .mdc-notched-outline__notch,
    :host ::ng-deep .catalog-dialog .mdc-notched-outline__trailing { border-color: var(--app-border) !important; }
    :host ::ng-deep .catalog-dialog mat-form-field:focus-within .mat-mdc-text-field-wrapper { box-shadow: 0 0 0 4px var(--app-accent-shadow); }
    :host ::ng-deep .catalog-dialog mat-form-field:focus-within .mdc-notched-outline__leading,
    :host ::ng-deep .catalog-dialog mat-form-field:focus-within .mdc-notched-outline__notch,
    :host ::ng-deep .catalog-dialog mat-form-field:focus-within .mdc-notched-outline__trailing { border-color: var(--app-accent) !important; }
    .dialog-actions { display: flex; gap: .5rem; justify-content: flex-end; }
    @media (max-width: 760px) { .form-grid { grid-template-columns: 1fr; } .map-editor-header { align-items: flex-start; flex-direction: column; } .drawing-status { margin-left: 0; width: 100%; } }
  `],
  template: `
    <section class="catalog-dialog">
      <header>
        <span class="eyebrow">Grupos musculares</span>
        <h2>{{ data.group ? 'Editar grupo' : 'Nuevo grupo' }}</h2>
        <p>Los grupos son zonas del mapa corporal como Pectorales, Trapecios, Hombros o Cuadriceps.</p>
      </header>
      <form [formGroup]="form" (ngSubmit)="submit()" class="form-grid">
        <mat-form-field appearance="outline">
          <mat-label>Nombre</mat-label>
          <input matInput formControlName="name">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Orden</mat-label>
          <input matInput type="number" formControlName="sortOrder">
        </mat-form-field>
        <mat-form-field appearance="outline" class="wide">
          <mat-label>Descripcion</mat-label>
          <input matInput formControlName="description">
        </mat-form-field>
        <section class="body-map-editor">
          <div class="map-editor-header"><div><strong>Delimitá la zona sobre el mapa</strong><small>El mapa usa la misma calibración que el resto de la plataforma.</small></div></div>
          <div class="drawing-help"><strong>Cómo dibujar:</strong> hacé clic alrededor de todo el contorno muscular para agregar puntos. Cuando tengas al menos tres, usá <b>Cerrar polígono</b>. Podés guardar varios polígonos para un mismo grupo.</div>
          <div class="map-editor-canvas">
            <img src="/images/body-muscle-map.png" alt="Mapa corporal para delimitar una zona muscular punto por punto">
            <svg viewBox="0 0 1664 1248" aria-label="Calibrador de zona muscular" (click)="addDrawingPoint($event)" (dblclick)="$event.preventDefault(); closeCurrentPath()" (mousemove)="updateDrawingCoordinates($event)">
              <g transform="translate(0 155)" stroke-linejoin="round">
                @for (path of savedPaths(); track path) { <path class="saved-shape" [attr.d]="path"></path> }
                <polyline class="active-shape" [attr.points]="activePolylinePoints()"></polyline>
                @for (point of activePoints; track $index) { <circle class="active-point" [attr.cx]="point.x" [attr.cy]="point.y" r="9"></circle> }
              </g>
            </svg>
          </div>
          <div class="drawing-toolbar">
            <button mat-flat-button color="primary" type="button" [disabled]="activePoints.length < 3" (click)="$event.stopPropagation(); closeCurrentPath()"><mat-icon>gesture</mat-icon> Cerrar polígono</button>
            <button mat-stroked-button type="button" [disabled]="!activePoints.length" (click)="undoDrawingPoint()"><mat-icon>undo</mat-icon> Deshacer punto</button>
            <button mat-stroked-button type="button" [disabled]="!activePoints.length" (click)="startNewPath()"><mat-icon>restart_alt</mat-icon> Cancelar trazado</button>
            <button mat-stroked-button type="button" [disabled]="!savedPaths().length" (click)="deleteLastPath()"><mat-icon>backspace</mat-icon> Borrar último polígono</button>
            <button mat-stroked-button class="danger-action" type="button" [disabled]="!savedPaths().length && !activePoints.length" (click)="clearMapSelection()"><mat-icon>layers_clear</mat-icon> Borrar todo</button>
            <span class="drawing-status">{{ drawingCoordinates }} · {{ activePoints.length }} puntos actuales · {{ savedPaths().length }} polígonos guardados</span>
          </div>
        </section>
        <div class="dialog-actions wide">
          <button mat-stroked-button type="button" (click)="dialogRef.close()">Cancelar</button>
          <button mat-flat-button color="primary" type="submit">
            <mat-icon>save</mat-icon>
            Guardar
          </button>
        </div>
      </form>
    </section>
  `
})
export class MuscleGroupDialogComponent {
  readonly data = inject<MuscleGroupDialogData>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<MuscleGroupDialogComponent>);
  private readonly formBuilder = inject(FormBuilder);
  readonly drawingOffsetY = 155;
  activePoints: CalibrationPoint[] = [];
  drawingCoordinates = 'x: -, y: -';

  readonly form = this.formBuilder.nonNullable.group({
    id: [this.data.group?.id ?? 0],
    name: [this.data.group?.name ?? '', Validators.required],
    description: [this.data.group?.description ?? ''],
    sortOrder: [this.data.group?.sortOrder ?? 0],
    bodyMapCoordinates: [(this.data.group?.bodyMapCoordinates?.length ? this.data.group.bodyMapCoordinates : this.data.suggestedCoordinates ?? []).join('\n')]
  });

  clearMapSelection(): void {
    this.setPaths([]);
    this.activePoints = [];
  }

  addDrawingPoint(event: MouseEvent): void {
    if (event.detail > 1) return;
    const point = this.toDrawingPoint(event);
    this.activePoints = [...this.activePoints, point];
    this.drawingCoordinates = `x: ${point.x}, y: ${point.y}`;
  }

  updateDrawingCoordinates(event: MouseEvent): void {
    const point = this.toDrawingPoint(event);
    this.drawingCoordinates = `x: ${point.x}, y: ${point.y}`;
  }

  closeCurrentPath(): void {
    if (this.activePoints.length < 3) return;
    this.setPaths([...this.savedPaths(), this.pointsToPath(this.activePoints)]);
    this.activePoints = [];
  }

  undoDrawingPoint(): void {
    this.activePoints = this.activePoints.slice(0, -1);
  }

  startNewPath(): void {
    this.activePoints = [];
  }

  deleteLastPath(): void {
    this.setPaths(this.savedPaths().slice(0, -1));
  }

  activePolylinePoints(): string {
    return this.activePoints.map(point => `${point.x},${point.y}`).join(' ');
  }

  savedPaths(): string[] {
    return this.currentPaths();
  }

  private currentPaths(): string[] {
    return this.form.controls.bodyMapCoordinates.value.split(/\r?\n/).map(path => path.trim()).filter(Boolean);
  }

  private setPaths(paths: string[]): void {
    this.form.controls.bodyMapCoordinates.setValue(paths.join('\n'));
    this.form.controls.bodyMapCoordinates.markAsDirty();
  }

  private toDrawingPoint(event: MouseEvent): CalibrationPoint {
    const overlay = event.currentTarget as SVGSVGElement;
    const point = overlay.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const transformed = point.matrixTransform(overlay.getScreenCTM()!.inverse());
    return { x: Math.round(transformed.x), y: Math.round(transformed.y - this.drawingOffsetY) };
  }

  private pointsToPath(points: CalibrationPoint[]): string {
    return `M${points.map(point => `${point.x} ${point.y}`).join(' L')} Z`;
  }

  submit(): void {
    if (this.form.invalid) return;
    const raw = this.form.getRawValue();
    this.dialogRef.close({ ...raw, bodyMapCoordinates: raw.bodyMapCoordinates.split(/\r?\n/).map(path => path.trim()).filter(Boolean) });
  }
}

@Component({
  selector: 'app-muscle-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule],
  styles: [`
    .catalog-dialog { background: var(--app-surface); border-radius: 10px; color: var(--app-text); display: grid; gap: 1rem; padding: 1rem; }
    .catalog-dialog header { display: grid; gap: .35rem; }
    .catalog-dialog h2, .catalog-dialog p { margin: 0; }
    .catalog-dialog p, .select-field span { color: var(--app-text-muted); }
    .catalog-dialog h2 { color: var(--app-text); }
    .eyebrow { color: var(--app-accent); font-size: .72rem; font-weight: 800; text-transform: uppercase; }
    .form-grid { display: grid; gap: .75rem; grid-template-columns: 1fr 1fr; }
    .wide { grid-column: 1 / -1; }
    .select-field { display: grid; gap: .35rem; }
    .select-field select { background: var(--app-surface-muted); border: 1px solid var(--app-border); border-radius: 8px; color: var(--app-text); min-height: 48px; padding: 0 .75rem; }
    .select-field select:focus { border-color: var(--app-accent); box-shadow: 0 0 0 4px var(--app-accent-shadow); outline: 0; }
    .body-map-editor { background: var(--app-surface-muted); border: 1px solid var(--app-border); border-radius: 12px; display: grid; gap: 1rem; padding: 1rem; }
    .drawing-help { color: var(--app-text-muted); line-height: 1.45; }
    .map-editor-canvas { aspect-ratio: 1664 / 1248; background: #f8fafc; border: 1px solid var(--app-border); border-radius: 10px; cursor: crosshair; overflow: hidden; position: relative; width: 100%; }
    .map-editor-canvas img, .map-editor-canvas svg { display: block; inset: 0; position: absolute; width: 100%; }
    .map-editor-canvas img { height: auto; position: static; }
    .map-editor-canvas svg { height: 100%; }
    .saved-shape { fill: rgba(201, 42, 31, .46); stroke: #a51f18; stroke-width: 4; }
    .active-shape { fill: rgba(93, 143, 240, .24); stroke: #2563eb; stroke-width: 4; }
    .active-point { fill: #ef4444; stroke: #fff; stroke-width: 3; }
    .drawing-toolbar { align-items: center; display: flex; flex-wrap: wrap; gap: .5rem; }
    .drawing-status { color: var(--app-text-muted); font-size: .78rem; margin-left: auto; }
    mat-form-field { width: 100%; }
    :host ::ng-deep .catalog-dialog .mat-mdc-text-field-wrapper { background: var(--app-surface-muted); border-radius: 8px; }
    :host ::ng-deep .catalog-dialog .mdc-notched-outline__leading,
    :host ::ng-deep .catalog-dialog .mdc-notched-outline__notch,
    :host ::ng-deep .catalog-dialog .mdc-notched-outline__trailing { border-color: var(--app-border) !important; }
    :host ::ng-deep .catalog-dialog mat-form-field:focus-within .mat-mdc-text-field-wrapper { box-shadow: 0 0 0 4px var(--app-accent-shadow); }
    :host ::ng-deep .catalog-dialog mat-form-field:focus-within .mdc-notched-outline__leading,
    :host ::ng-deep .catalog-dialog mat-form-field:focus-within .mdc-notched-outline__notch,
    :host ::ng-deep .catalog-dialog mat-form-field:focus-within .mdc-notched-outline__trailing { border-color: var(--app-accent) !important; }
    .dialog-actions { display: flex; gap: .5rem; justify-content: flex-end; }
    @media (max-width: 640px) { .form-grid { grid-template-columns: 1fr; } }
  `],
  template: `
    <section class="catalog-dialog">
      <header>
        <span class="eyebrow">Grupos musculares</span>
        <h2>{{ data.muscle ? 'Editar musculo' : 'Nuevo musculo' }}</h2>
        <p>Los musculos viven dentro de un grupo. Ejemplo: Biceps y Triceps dentro de Brazo.</p>
      </header>
      <form [formGroup]="form" (ngSubmit)="submit()" class="form-grid">
        <label class="select-field wide">
          <span>Grupo</span>
          <select formControlName="muscleGroupId">
            @for (group of data.groups; track group.id) {
              <option [value]="group.id">{{ group.name }}</option>
            }
          </select>
        </label>
        <mat-form-field appearance="outline">
          <mat-label>Nombre</mat-label>
          <input matInput formControlName="name">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Orden</mat-label>
          <input matInput type="number" formControlName="sortOrder">
        </mat-form-field>
        <mat-form-field appearance="outline" class="wide">
          <mat-label>Descripcion</mat-label>
          <input matInput formControlName="description">
        </mat-form-field>
        <section class="body-map-editor wide">
          <div><strong>Delimitá este músculo en el mapa</strong><div class="drawing-help">Marcá punto por punto su contorno. Cerrá el polígono al terminar; podés crear varios para zonas simétricas o separadas.</div></div>
          <div class="map-editor-canvas">
            <img src="/images/body-muscle-map.png" alt="Mapa corporal para delimitar el músculo">
            <svg viewBox="0 0 1664 1248" (click)="addDrawingPoint($event)" (dblclick)="$event.preventDefault(); closeCurrentPath()" (mousemove)="updateDrawingCoordinates($event)">
              <g transform="translate(0 155)" stroke-linejoin="round">
                @for (path of savedPaths(); track path) { <path class="saved-shape" [attr.d]="path"></path> }
                <polyline class="active-shape" [attr.points]="activePolylinePoints()"></polyline>
                @for (point of activePoints; track $index) { <circle class="active-point" [attr.cx]="point.x" [attr.cy]="point.y" r="9"></circle> }
              </g>
            </svg>
          </div>
          <div class="drawing-toolbar">
            <button mat-flat-button color="primary" type="button" [disabled]="activePoints.length < 3" (click)="closeCurrentPath()"><mat-icon>gesture</mat-icon> Cerrar polígono</button>
            <button mat-stroked-button type="button" [disabled]="!activePoints.length" (click)="undoDrawingPoint()"><mat-icon>undo</mat-icon> Deshacer punto</button>
            <button mat-stroked-button type="button" [disabled]="!activePoints.length" (click)="cancelDrawing()"><mat-icon>restart_alt</mat-icon> Cancelar trazado</button>
            <button mat-stroked-button type="button" [disabled]="!savedPaths().length" (click)="deleteLastPath()"><mat-icon>backspace</mat-icon> Borrar último</button>
            <button mat-stroked-button type="button" [disabled]="!savedPaths().length && !activePoints.length" (click)="clearMapSelection()"><mat-icon>layers_clear</mat-icon> Borrar todo</button>
            <span class="drawing-status">{{ drawingCoordinates }} · {{ activePoints.length }} puntos · {{ savedPaths().length }} polígonos</span>
          </div>
        </section>
        <div class="dialog-actions wide">
          <button mat-stroked-button type="button" (click)="dialogRef.close()">Cancelar</button>
          <button mat-flat-button color="primary" type="submit">
            <mat-icon>save</mat-icon>
            Guardar
          </button>
        </div>
      </form>
    </section>
  `
})
export class MuscleDialogComponent {
  readonly data = inject<MuscleDialogData>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<MuscleDialogComponent>);
  private readonly formBuilder = inject(FormBuilder);
  readonly drawingOffsetY = 155;
  activePoints: CalibrationPoint[] = [];
  drawingCoordinates = 'x: -, y: -';

  readonly form = this.formBuilder.nonNullable.group({
    id: [this.data.muscle?.id ?? 0],
    muscleGroupId: [this.data.muscle?.muscleGroupId ?? this.data.groupId ?? this.data.groups[0]?.id ?? 0, Validators.min(1)],
    name: [this.data.muscle?.name ?? '', Validators.required],
    description: [this.data.muscle?.description ?? ''],
    sortOrder: [this.data.muscle?.sortOrder ?? 0],
    bodyMapCoordinates: [(this.data.muscle?.bodyMapCoordinates ?? []).join('\n')]
  });

  addDrawingPoint(event: MouseEvent): void { if (event.detail > 1) return; const point = this.toDrawingPoint(event); this.activePoints = [...this.activePoints, point]; this.drawingCoordinates = `x: ${point.x}, y: ${point.y}`; }
  updateDrawingCoordinates(event: MouseEvent): void { const point = this.toDrawingPoint(event); this.drawingCoordinates = `x: ${point.x}, y: ${point.y}`; }
  closeCurrentPath(): void { if (this.activePoints.length < 3) return; this.setPaths([...this.savedPaths(), this.pointsToPath(this.activePoints)]); this.activePoints = []; }
  undoDrawingPoint(): void { this.activePoints = this.activePoints.slice(0, -1); }
  cancelDrawing(): void { this.activePoints = []; }
  deleteLastPath(): void { this.setPaths(this.savedPaths().slice(0, -1)); }
  clearMapSelection(): void { this.setPaths([]); this.activePoints = []; }
  activePolylinePoints(): string { return this.activePoints.map(point => `${point.x},${point.y}`).join(' '); }
  savedPaths(): string[] { return this.form.controls.bodyMapCoordinates.value.split(/\r?\n/).map(path => path.trim()).filter(Boolean); }
  private setPaths(paths: string[]): void { this.form.controls.bodyMapCoordinates.setValue(paths.join('\n')); this.form.controls.bodyMapCoordinates.markAsDirty(); }
  private toDrawingPoint(event: MouseEvent): CalibrationPoint { const overlay = event.currentTarget as SVGSVGElement; const point = overlay.createSVGPoint(); point.x = event.clientX; point.y = event.clientY; const transformed = point.matrixTransform(overlay.getScreenCTM()!.inverse()); return { x: Math.round(transformed.x), y: Math.round(transformed.y - this.drawingOffsetY) }; }
  private pointsToPath(points: CalibrationPoint[]): string { return `M${points.map(point => `${point.x} ${point.y}`).join(' L')} Z`; }

  submit(): void {
    if (this.form.invalid) return;
    const raw = this.form.getRawValue();
    this.dialogRef.close({ ...raw, bodyMapCoordinates: raw.bodyMapCoordinates.split(/\r?\n/).map(path => path.trim()).filter(Boolean) });
  }
}

@Component({
  selector: 'app-student-platform-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule,
    WeeklySchedulesPageComponent
  ],
  templateUrl: './student-platform-page.html',
  styleUrl: './student-platform-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentPlatformPageComponent implements AfterViewInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly platformService = inject(StudentPlatformService);
  private readonly clientsService = inject(ClientsService);
  private readonly dialog = inject(MatDialog);
  private readonly roleService = inject(RoleService);
  private readonly toast = inject(ToastService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private viewReady = false;
  private lastHandledDeepLink = '';

  @ViewChild('exerciseEditorDialog') private exerciseEditorDialog?: TemplateRef<unknown>;

  readonly exercises = signal<Exercise[]>([]);
  readonly clients = signal<Client[]>([]);
  readonly routineTemplates = signal<RoutineTemplate[]>([]);
  readonly trainingPlans = signal<TrainingPlan[]>([]);
  readonly trainingPlanAssignments = signal<TrainingPlanAssignment[]>([]);
  readonly trackingPlanAssignments = signal<TrainingPlanAssignment[]>([]);
  readonly routines = signal<RoutineAssignment[]>([]);
  readonly muscleGroups = signal<MuscleGroup[]>([]);
  readonly attendance = signal<AttendanceLog[]>([]);
  readonly workoutSessions = signal<WorkoutSession[]>([]);
  readonly trackingRoutines = signal<RoutineAssignment[]>([]);
  readonly expandedWorkoutSessionId = signal<number | null>(null);
  readonly expandedSessionBlockKeys = signal<string[]>([]);
  readonly sessionReviewDraft = signal<Record<number, { weight: number | null; reps: number | null; notes: string }>>({});
  readonly savingSessionReview = signal(false);
  readonly professionalBlockCycles = signal<Record<string, number>>({});
  readonly professionalWorkoutDraft = signal<Record<string, { weight: number | null; reps: number | null }>>({});
  readonly expandedProfessionalBlockId = signal<number | null>(null);
  readonly progressHistory = signal<ExerciseProgressHistory | null>(null);
  readonly ranking = signal<RankingResponse | null>(null);
  readonly achievements = signal<AchievementTemplate[]>([]);
  readonly habits = signal<HabitDefinition[]>([]);
  readonly gamificationMetrics = signal<GamificationMetrics | null>(null);
  readonly branchAttendanceSettings = signal<BranchAttendanceSettings[]>([]);
  readonly pointRules = signal<PointRule[]>([]);
  readonly selectedAttendanceBranchId = signal(0);
  readonly feedback = { set: (message: string) => this.showToast(message) };
  readonly isLoading = signal(false);
  readonly selectedTabIndex = signal(0);
  readonly imagePreviewUrl = signal<string | null>(null);
  readonly selectedQrExercise = signal<Exercise | null>(null);
  readonly routineBuilderExercises = signal<RoutineBuilderExercise[]>([]);
  readonly expandedRoutineIds = signal<number[]>([]);
  readonly expandedTrainingPlanIds = signal<number[]>([]);
  readonly selectedAssignmentPlanId = signal(0);
  readonly assignmentListPage = signal(1);
  readonly assignmentListPageSize = 6;

  private selectedExerciseImage: File | null = null;
  readonly isAdminOrSuperAdmin$: Observable<boolean> = this.roleService.hasAnyRole(['Admin', 'SuperAdmin']);

  readonly exerciseSearch = this.formBuilder.nonNullable.control('');
  readonly exerciseGroupFilter = this.formBuilder.nonNullable.control(0);
  readonly exerciseMuscleFilter = this.formBuilder.nonNullable.control(0);
  readonly planSearch = this.formBuilder.nonNullable.control('');
  readonly assignmentListPlanId = this.formBuilder.nonNullable.control(0);
  readonly assignmentListPlanSearch = this.formBuilder.nonNullable.control('');
  readonly routineSearch = this.formBuilder.nonNullable.control('');
  readonly assignmentPlanSearch = this.formBuilder.nonNullable.control('');
  readonly planAssignmentClientSearch = this.formBuilder.nonNullable.control('');
  readonly assignmentRoutineSearch = this.formBuilder.nonNullable.control('');
  readonly assignmentClientSearch = this.formBuilder.nonNullable.control('');
  readonly builderExerciseSearch = this.formBuilder.nonNullable.control('');
  readonly catalogSearch = this.formBuilder.nonNullable.control('');
  readonly trackingClientSearch = this.formBuilder.nonNullable.control('');
  readonly achievementSearch = this.formBuilder.nonNullable.control('');
  readonly habitSearch = this.formBuilder.nonNullable.control('');
  readonly rankingMetric = this.formBuilder.nonNullable.control<'attendance' | 'achievements' | 'habits' | 'total'>('total');
  readonly rankingMonth = this.formBuilder.nonNullable.control(new Date().toISOString().slice(0, 7));
  readonly rankingMonthDate = this.formBuilder.nonNullable.control(this.currentMonthDate());
  readonly trackingFrom = this.formBuilder.nonNullable.control(new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().slice(0, 10));
  readonly trackingTo = this.formBuilder.nonNullable.control(new Date().toISOString().slice(0, 10));
  readonly selectedExerciseMuscleIds = signal<number[]>([]);
  readonly showExerciseBodyMap = signal(false);
  readonly pendingBodyZoneKeys = signal<string[]>([]);
  readonly selectedBodyZoneKeys = signal<string[]>([]);
  readonly selectedScheduleDays = signal<number[]>([]);
  readonly selectedMuscleGroupId = signal(0);
  readonly showEmptyMuscleGroupsOnly = signal(false);
  readonly trackingClientPickerOpen = signal(false);
  readonly planAssignmentPlanPickerOpen = signal(false);
  readonly planAssignmentClientPickerOpen = signal(false);
  readonly assignmentListPlanPickerOpen = signal(false);
  readonly achievementDrawerOpen = signal(false);
  readonly habitDrawerOpen = signal(false);
  readonly badgePreviewUrl = signal<string | null>(null);
  readonly isUploadingBadge = signal(false);
  private selectedBadgeFile: File | null = null;

  readonly exerciseForm = this.formBuilder.nonNullable.group({
    id: [0],
    name: ['', Validators.required],
    description: ['', Validators.required],
    muscleGroup: ['', Validators.required],
    musclesInvolved: [''],
    primaryMuscleGroupId: [0],
    secondaryMuscleGroupId: [0],
    photoUrl: [''],
    videoUrl: ['']
  });

  readonly muscleGroupForm = this.formBuilder.nonNullable.group({
    id: [0],
    name: ['', Validators.required],
    description: [''],
    sortOrder: [0]
  });

  readonly muscleForm = this.formBuilder.nonNullable.group({
    id: [0],
    muscleGroupId: [0, Validators.min(1)],
    name: ['', Validators.required],
    description: [''],
    sortOrder: [0]
  });

  readonly routineForm = this.formBuilder.nonNullable.group({
    id: [0],
    name: ['', Validators.required],
    description: [''],
    level: ['General'],
    goal: ['General', Validators.required]
  });

  readonly routineExerciseForm = this.formBuilder.nonNullable.group({
    exerciseId: [0, Validators.min(1)],
    sets: [3],
    reps: [10],
    weight: [0],
    restSeconds: [60],
    notes: ['']
  });

  readonly assignmentForm = this.formBuilder.nonNullable.group({
    routineId: [0, Validators.min(1)],
    clientId: [0, Validators.min(1)],
    startsAt: [''],
    endsAt: ['']
  });

  readonly planAssignmentForm = this.formBuilder.nonNullable.group({
    trainingPlanId: [0, Validators.min(1)],
    clientId: [0, Validators.min(1)]
  });

  readonly trackingForm = this.formBuilder.nonNullable.group({
    clientId: [0, Validators.min(1)],
    exerciseId: [0, Validators.min(1)],
    attendanceDate: [new Date().toISOString().slice(0, 10)],
    attendanceNotes: ['']
  });

  readonly professionalSessionForm = this.formBuilder.nonNullable.group({
    routineAssignmentId: [0, Validators.min(1)],
    trainingDate: [new Date().toISOString().slice(0, 10), Validators.required],
    notes: ['']
  });

  readonly achievementForm = this.formBuilder.nonNullable.group({
    id: [0],
    code: ['', Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    routineId: [0, Validators.min(1)],
    requiredCount: [10, Validators.min(1)],
    tier: ['Bronze', Validators.required],
    points: [100],
    triggerType: ['WorkoutCompletions', Validators.required],
    badgeImageUrl: [''],
    icon: ['emoji_events']
  });

  readonly habitForm = this.formBuilder.nonNullable.group({
    id: [0],
    code: ['', Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    category: ['Hydration', Validators.required],
    frequency: ['Daily', Validators.required],
    pointsPerEntry: [5, Validators.min(0)],
    dailyLimit: [5, Validators.min(0)],
    weeklyLimit: [35, Validators.min(0)],
    countsForStreak: [true],
    addsToRanking: [true],
    isActive: [true]
  });

  readonly branchAttendanceForm = this.formBuilder.nonNullable.group({
    latitude: [0, [Validators.required, Validators.min(-90), Validators.max(90)]],
    longitude: [0, [Validators.required, Validators.min(-180), Validators.max(180)]],
    radiusMeters: [150, [Validators.required, Validators.min(25), Validators.max(2000)]]
  });

  filteredExercises(): Exercise[] {
    const term = this.normalize(this.exerciseSearch.value);
    const groupId = Number(this.exerciseGroupFilter.value);
    const muscleId = Number(this.exerciseMuscleFilter.value);

    return this.exercises().filter(exercise => {
      const matchesText = !term || this.matchesExercise(exercise, term);
      const matchesGroup = !groupId ||
        exercise.primaryMuscleGroupId === groupId ||
        exercise.secondaryMuscleGroupId === groupId ||
        exercise.muscles.some(muscle => muscle.muscleGroupId === groupId);
      const matchesMuscle = !muscleId || exercise.muscles.some(muscle => muscle.id === muscleId);
      const matchesBodyZone = this.matchesSelectedBodyZones(exercise);
      return matchesText && matchesGroup && matchesMuscle && matchesBodyZone;
    });
  }

  exerciseMuscleOptions(): MuscleGroup['muscles'] {
    return this.muscleGroups()
      .flatMap(group => group.muscles)
      .sort((left, right) => left.name.localeCompare(right.name));
  }

  bodyZoneDefinitions(): BodyZoneDefinition[] {
    const configuredMuscles = this.muscleGroups().flatMap(group => group.muscles
      .filter(muscle => muscle.bodyMapCoordinates?.length)
      .map(muscle => ({
        key: `muscle-${muscle.id}`,
        label: muscle.name,
        paths: muscle.bodyMapCoordinates,
        synonyms: [muscle.name],
        muscleGroupId: group.id,
        muscleId: muscle.id
      })));
    const configuredGroups = this.muscleGroups()
      .filter(group => group.bodyMapCoordinates?.length)
      .map(group => ({
        key: `group-${group.id}`,
        label: group.name,
        paths: group.bodyMapCoordinates,
        synonyms: [group.name, ...group.muscles.map(muscle => muscle.name)],
        muscleGroupId: group.id
      }));
    const configured = [...configuredMuscles, ...configuredGroups];
    return configured;
  }

  pendingBodyZones(): BodyZoneDefinition[] {
    const keys = this.pendingBodyZoneKeys();
    return this.bodyZoneDefinitions().filter(zone => keys.includes(zone.key));
  }

  selectedBodyZones(): BodyZoneDefinition[] {
    const keys = this.selectedBodyZoneKeys();
    return this.bodyZoneDefinitions().filter(zone => keys.includes(zone.key));
  }

  toggleBodyZone(key: string): void {
    const nextKeys = this.pendingBodyZoneKeys().includes(key)
      ? this.pendingBodyZoneKeys().filter(item => item !== key)
      : [...this.pendingBodyZoneKeys(), key];
    this.pendingBodyZoneKeys.set(nextKeys);
    this.selectedBodyZoneKeys.set(nextKeys);
    this.exerciseGroupFilter.setValue(0);
    this.exerciseMuscleFilter.setValue(0);
  }

  setPendingBodyZones(keys: string[]): void {
    this.pendingBodyZoneKeys.set(keys);
    this.selectedBodyZoneKeys.set(keys);
    this.exerciseGroupFilter.setValue(0);
    this.exerciseMuscleFilter.setValue(0);
  }

  applyBodyZoneFilters(): void {
    this.selectedBodyZoneKeys.set(this.pendingBodyZoneKeys());
    this.exerciseGroupFilter.setValue(0);
    this.exerciseMuscleFilter.setValue(0);
  }

  clearBodyZoneFilters(): void {
    this.pendingBodyZoneKeys.set([]);
    this.selectedBodyZoneKeys.set([]);
  }

  isBodyZonePending(key: string): boolean {
    return this.pendingBodyZoneKeys().includes(key);
  }

  filteredRoutineTemplates(): RoutineTemplate[] {
    const term = this.normalize(this.routineSearch.value);
    if (!term) return this.routineTemplates();
    return this.routineTemplates().filter(routine =>
      this.normalize(`${routine.name} ${routine.goal} ${routine.level}`).includes(term)
    );
  }

  filteredTrainingPlans(): TrainingPlan[] {
    const term = this.normalize(this.planSearch.value);
    if (!term) return this.trainingPlans();
    return this.trainingPlans().filter(plan =>
      this.normalize(`${plan.name} ${plan.goal} ${plan.level} ${plan.description ?? ''} ${plan.workouts.map(workout => workout.routineName).join(' ')}`).includes(term)
    );
  }

  filteredAchievements(): AchievementTemplate[] {
    const term = this.normalize(this.achievementSearch.value);
    if (!term) return this.achievements();
    return this.achievements().filter(achievement =>
      this.normalize(`${achievement.name} ${achievement.code} ${achievement.tier} ${achievement.routineName ?? ''}`).includes(term)
    );
  }

  filteredHabits(): HabitDefinition[] {
    const term = this.normalize(this.habitSearch.value);
    if (!term) return this.habits();
    return this.habits().filter(habit =>
      this.normalize(`${habit.name} ${habit.code} ${habit.category} ${habit.frequency}`).includes(term)
    );
  }

  rankingPodium() {
    return (this.ranking()?.items ?? []).slice(0, 3);
  }

  rankingList() {
    return (this.ranking()?.items ?? []).slice(3);
  }

  achievementRequirement(achievement: AchievementTemplate): string {
    if (achievement.triggerType === 'WorkoutCompletions') return `${achievement.requiredCount} veces ${achievement.routineName || 'workout'}`;
    if (achievement.triggerType === 'Attendance') return `${achievement.requiredCount} asistencias`;
    if (achievement.triggerType === 'Habit') return `${achievement.requiredCount} habitos registrados`;
    if (achievement.triggerType === 'Streak') return `${achievement.requiredCount} dias de racha`;
    return `${achievement.requiredCount} acciones`;
  }

  habitCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
      Hydration: 'Hidratacion',
      Nutrition: 'Alimentacion',
      Sleep: 'Sueno',
      Mobility: 'Movilidad',
      Wellbeing: 'Bienestar',
      Other: 'Otro'
    };
    return labels[category] ?? category;
  }

  totalTrainingPlanAssignments(): number {
    return this.trainingPlanAssignments().length || this.trainingPlans().reduce((total, plan) => total + (plan.assignmentCount || 0), 0);
  }

  shouldShowAssignmentResults(): boolean {
    return this.selectedAssignmentPlanId() > 0;
  }

  filteredTrainingPlanAssignments(): TrainingPlanAssignment[] {
    if (!this.shouldShowAssignmentResults()) return [];

    const selectedPlanId = this.selectedAssignmentPlanId();
    return this.trainingPlanAssignments().filter(assignment => assignment.trainingPlanId === selectedPlanId);
  }

  pagedTrainingPlanAssignments(): TrainingPlanAssignment[] {
    const start = (this.assignmentListPage() - 1) * this.assignmentListPageSize;
    return this.filteredTrainingPlanAssignments().slice(start, start + this.assignmentListPageSize);
  }

  assignmentListTotalPages(): number {
    return Math.max(1, Math.ceil(this.filteredTrainingPlanAssignments().length / this.assignmentListPageSize));
  }

  filteredTrackingClients(): Client[] {
    const term = this.normalize(this.trackingClientSearch.value);
    if (!term) return this.clients();
    return this.clients().filter(client =>
      this.normalize(`${client.apellido} ${client.nombre} ${client.dni} ${client.email}`).includes(term)
    );
  }

  selectedTrackingClient(): Client | undefined {
    const clientId = this.trackingForm.controls.clientId.value;
    return this.clients().find(client => client.id === clientId);
  }

  selectedTrackingClientPlanAssignments(): TrainingPlanAssignment[] {
    return this.trackingPlanAssignments().filter(assignment => this.isActivePlanAssignment(assignment));
  }

  selectedTrackingClientPlanHistory(): TrainingPlanAssignment[] {
    return this.trackingPlanAssignments().filter(assignment => !this.isActivePlanAssignment(assignment));
  }

  isActivePlanAssignment(assignment: TrainingPlanAssignment): boolean {
    return assignment.status.toLowerCase() === 'active';
  }

  openAssignedTrainingPlan(trainingPlanId: number): void {
    void this.router.navigate(['/student-platform/training-plans', trainingPlanId]);
  }

  filteredMuscleGroups(): MuscleGroup[] {
    const term = this.normalize(this.catalogSearch.value);
    return this.muscleGroups().filter(group => {
      const matchesText = !term || this.normalize(`${group.name} ${group.description ?? ''} ${group.muscles.map(muscle => muscle.name).join(' ')}`).includes(term);
      const matchesEmpty = !this.showEmptyMuscleGroupsOnly() || group.muscles.length === 0;
      return matchesText && matchesEmpty;
    });
  }

  selectedMuscleGroup(): MuscleGroup | undefined {
    const selectedId = this.selectedMuscleGroupId();
    return this.muscleGroups().find(group => group.id === selectedId) ?? this.filteredMuscleGroups()[0];
  }

  selectMuscleGroup(group: MuscleGroup): void {
    this.selectedMuscleGroupId.set(group.id);
  }

  constructor() {
    this.loadAll();
    this.assignmentListPlanSearch.valueChanges.subscribe(value => {
      const selectedPlan = this.trainingPlans().find(plan => plan.id === this.selectedAssignmentPlanId());
      if (selectedPlan && value !== selectedPlan.name) {
        this.selectedAssignmentPlanId.set(0);
        this.assignmentListPlanId.setValue(0, { emitEvent: false });
      }
      this.assignmentListPage.set(1);
    });
    this.catalogSearch.valueChanges.subscribe(() => this.ensureSelectedMuscleGroup());
    this.route.queryParamMap.subscribe(params => {
      const tab = (params.get('tab') ?? '').toLowerCase();
      const tabs: Record<string, number> = {
        planes: 0,
        rutinas: 1,
        workouts: 1,
        seguimiento: 2,
        turnos: 3,
        ejercicios: 4,
        catalogos: 5,
        'grupos-musculares': 5,
        ranking: 6,
        logros: 6,
        asistencia: 7
      };
      this.selectedTabIndex.set(tabs[tab] ?? 0);
      this.handleDeepLink();
    });
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.handleDeepLink();
  }

  loadAll(): void {
    this.isLoading.set(true);
    this.feedback.set('');

    this.platformService.getExercises().subscribe({
      next: exercises => {
        this.exercises.set(exercises);
        this.isLoading.set(false);
        this.handleDeepLink();
      },
      error: () => {
        this.isLoading.set(false);
        this.feedback.set('No se pudo cargar la biblioteca de ejercicios.');
      }
    });

    this.clientsService.getPaged(1, 250, { clientStatus: 'active' }).subscribe({
      next: response => this.clients.set(response.items),
      error: () => this.feedback.set('No se pudo cargar la lista de alumnos.')
    });

    this.platformService.getMuscleGroups().subscribe({
      next: groups => {
        this.setMuscleGroups(groups);
      },
      error: () => this.feedback.set('No se pudo cargar el catalogo muscular.')
    });

    this.refreshRoutines();
    this.refreshTrainingPlans();
    this.refreshAchievements();
    this.refreshHabits();
    this.refreshGamificationMetrics();
    this.refreshBranchAttendanceSettings();
    this.refreshPointRules();
    this.loadRanking('total');
  }

  refreshRoutines(): void {
    this.platformService.getRoutineTemplates().subscribe({
      next: routines => {
        this.routineTemplates.set(routines);
        this.expandedRoutineIds.set([]);
        this.handleDeepLink();
      },
      error: () => this.feedback.set('No se pudieron cargar los workouts.')
    });

    this.platformService.getRoutines().subscribe({
      next: routines => this.routines.set(routines),
      error: () => this.feedback.set('No se pudieron cargar los workouts asignados.')
    });
  }

  refreshTrainingPlans(): void {
    this.platformService.getTrainingPlans().subscribe({
      next: plans => {
        this.trainingPlans.set(plans);
        this.expandedTrainingPlanIds.set([]);
      },
      error: () => this.feedback.set('No se pudieron cargar los planes de entrenamiento.')
    });

    this.refreshTrainingPlanAssignments();
  }

  refreshTrainingPlanAssignments(): void {
    this.platformService.getTrainingPlanAssignments().subscribe({
      next: assignments => this.trainingPlanAssignments.set(assignments),
      error: () => this.feedback.set('No se pudieron cargar las asignaciones de planes.')
    });
  }

  refreshAchievements(): void {
    this.platformService.getAchievements().subscribe({
      next: achievements => this.achievements.set(achievements),
      error: () => this.feedback.set('No se pudieron cargar los logros.')
    });
  }

  refreshHabits(): void {
    this.platformService.getHabitDefinitions().subscribe({
      next: habits => this.habits.set(habits),
      error: () => this.feedback.set('No se pudieron cargar los habitos.')
    });
  }

  refreshGamificationMetrics(): void {
    this.platformService.getGamificationMetrics().subscribe({
      next: metrics => this.gamificationMetrics.set(metrics),
      error: () => this.feedback.set('No se pudieron cargar las metricas de gamificacion.')
    });
  }

  saveAchievement(): void {
    if (this.achievementForm.invalid) {
      this.achievementForm.markAllAsTouched();
      this.feedback.set('Completa los datos del logro.');
      return;
    }

    const raw = this.achievementForm.getRawValue();
    const payload = {
      code: raw.code.trim(),
      name: raw.name.trim(),
      description: raw.description.trim(),
      points: raw.points || 0,
      icon: raw.icon || null,
      routineId: raw.triggerType === 'WorkoutCompletions' ? raw.routineId : null,
      triggerType: raw.triggerType as 'Attendance' | 'WorkoutCompletions' | 'CompletedWorkouts' | 'Streak' | 'Habit' | 'Manual',
      requiredCount: raw.requiredCount,
      tier: raw.tier.trim(),
      badgeImageUrl: raw.badgeImageUrl || null
    };

    const request = raw.id
      ? this.platformService.updateAchievement(raw.id, payload)
      : this.platformService.createAchievement(payload);

    request.subscribe({
      next: () => {
        this.feedback.set(raw.id ? 'Logro actualizado.' : 'Logro creado.');
        this.resetAchievementForm();
        this.achievementDrawerOpen.set(false);
        this.refreshAchievements();
        this.refreshGamificationMetrics();
      },
      error: () => this.feedback.set('No se pudo guardar el logro.')
    });
  }

  openAchievementDrawer(): void {
    this.resetAchievementForm();
    this.achievementDrawerOpen.set(true);
  }

  closeAchievementDrawer(): void {
    this.achievementDrawerOpen.set(false);
    this.selectedBadgeFile = null;
    this.badgePreviewUrl.set(null);
  }

  editAchievement(achievement: AchievementTemplate): void {
    this.achievementForm.setValue({
      id: achievement.id,
      code: achievement.code,
      name: achievement.name,
      description: achievement.description,
      routineId: achievement.routineId ?? 0,
      requiredCount: achievement.requiredCount,
      tier: achievement.tier,
      points: achievement.points,
      triggerType: achievement.triggerType,
      badgeImageUrl: achievement.badgeImageUrl ?? '',
      icon: achievement.icon ?? 'emoji_events'
    });
    this.badgePreviewUrl.set(achievement.badgeImageUrl ?? null);
    this.achievementDrawerOpen.set(true);
  }

  duplicateAchievement(achievement: AchievementTemplate): void {
    this.achievementForm.setValue({
      id: 0,
      code: `${achievement.code}_COPY`,
      name: `${achievement.name} copia`,
      description: achievement.description,
      routineId: achievement.routineId ?? 0,
      requiredCount: achievement.requiredCount,
      tier: achievement.tier,
      points: achievement.points,
      triggerType: achievement.triggerType,
      badgeImageUrl: achievement.badgeImageUrl ?? '',
      icon: achievement.icon ?? 'emoji_events'
    });
    this.badgePreviewUrl.set(achievement.badgeImageUrl ?? null);
    this.achievementDrawerOpen.set(true);
  }

  resetAchievementForm(): void {
    this.achievementForm.reset({
      id: 0,
      code: '',
      name: '',
      description: '',
      routineId: 0,
      requiredCount: 10,
      tier: 'Bronze',
      points: 100,
      triggerType: 'WorkoutCompletions',
      badgeImageUrl: '',
      icon: 'emoji_events'
    });
    this.selectedBadgeFile = null;
    this.badgePreviewUrl.set(null);
  }

  onBadgeSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    const isPng = file.type === 'image/png' && file.name.toLowerCase().endsWith('.png');
    if (!isPng) {
      this.feedback.set('El badge debe ser un archivo PNG.');
      return;
    }
    this.selectedBadgeFile = file;
    const preview = URL.createObjectURL(file);
    this.badgePreviewUrl.set(preview);
    this.isUploadingBadge.set(true);
    this.platformService.uploadBadgeImage(file).subscribe({
      next: uploaded => {
        this.isUploadingBadge.set(false);
        this.achievementForm.controls.badgeImageUrl.setValue(uploaded.downloadUrl || uploaded.url);
      },
      error: () => {
        this.isUploadingBadge.set(false);
        this.feedback.set('No se pudo subir el badge.');
      }
    });
  }

  removeBadgeImage(): void {
    this.selectedBadgeFile = null;
    this.badgePreviewUrl.set(null);
    this.achievementForm.controls.badgeImageUrl.setValue('');
  }

  deleteAchievement(achievement: AchievementTemplate): void {
    this.confirmDelete('Eliminar logro', `Se eliminara el logro "${achievement.name}" (${achievement.tier}).`).subscribe(confirmed => {
      if (!confirmed) return;
      this.platformService.deleteAchievement(achievement.id).subscribe({
        next: () => {
          this.feedback.set('Logro eliminado.');
          this.refreshAchievements();
          this.refreshGamificationMetrics();
        },
        error: () => this.feedback.set('No se pudo eliminar el logro.')
      });
    });
  }

  openHabitDrawer(): void {
    this.resetHabitForm();
    this.habitDrawerOpen.set(true);
  }

  closeHabitDrawer(): void {
    this.habitDrawerOpen.set(false);
  }

  editHabit(habit: HabitDefinition): void {
    this.habitForm.setValue({
      id: habit.id,
      code: habit.code,
      name: habit.name,
      description: habit.description,
      category: habit.category,
      frequency: habit.frequency,
      pointsPerEntry: habit.pointsPerEntry,
      dailyLimit: habit.dailyLimit,
      weeklyLimit: habit.weeklyLimit,
      countsForStreak: habit.countsForStreak,
      addsToRanking: habit.addsToRanking,
      isActive: habit.isActive
    });
    this.habitDrawerOpen.set(true);
  }

  resetHabitForm(): void {
    this.habitForm.reset({
      id: 0,
      code: '',
      name: '',
      description: '',
      category: 'Hydration',
      frequency: 'Daily',
      pointsPerEntry: 5,
      dailyLimit: 5,
      weeklyLimit: 35,
      countsForStreak: true,
      addsToRanking: true,
      isActive: true
    });
  }

  saveHabitDefinition(): void {
    if (this.habitForm.invalid) {
      this.habitForm.markAllAsTouched();
      this.feedback.set('Completa los datos del habito.');
      return;
    }
    const raw = this.habitForm.getRawValue();
    const payload = {
      code: raw.code.trim(),
      name: raw.name.trim(),
      description: raw.description.trim(),
      category: raw.category as HabitDefinition['category'],
      frequency: raw.frequency as HabitDefinition['frequency'],
      pointsPerEntry: raw.pointsPerEntry || 0,
      dailyLimit: raw.dailyLimit || 0,
      weeklyLimit: raw.weeklyLimit || 0,
      countsForStreak: raw.countsForStreak,
      addsToRanking: raw.addsToRanking,
      isActive: raw.isActive
    };
    const request = raw.id
      ? this.platformService.updateHabitDefinition(raw.id, payload)
      : this.platformService.createHabitDefinition(payload);

    request.subscribe({
      next: () => {
        this.feedback.set(raw.id ? 'Habito actualizado.' : 'Habito creado.');
        this.habitDrawerOpen.set(false);
        this.resetHabitForm();
        this.refreshHabits();
        this.refreshGamificationMetrics();
      },
      error: () => this.feedback.set('No se pudo guardar el habito.')
    });
  }

  deleteHabit(habit: HabitDefinition): void {
    this.confirmDelete('Desactivar habito', `Se desactivara "${habit.name}" y se conservara su historial.`).subscribe(confirmed => {
      if (!confirmed) return;
      this.platformService.deleteHabitDefinition(habit.id).subscribe({
        next: () => {
          this.feedback.set('Habito desactivado.');
          this.refreshHabits();
          this.refreshGamificationMetrics();
        },
        error: () => this.feedback.set('No se pudo desactivar el habito.')
      });
    });
  }

  openTemplate(template: TemplateRef<unknown>, width = '760px'): void {
    this.dialog.open(template, {
      width,
      maxWidth: 'calc(100vw - 2rem)',
      maxHeight: 'calc(100vh - 2rem)',
      autoFocus: false
    });
  }

  closeDialogs(): void {
    this.dialog.closeAll();
  }

  editExercise(exercise: Exercise): void {
    this.exerciseForm.setValue({
      id: exercise.id,
      name: exercise.name,
      description: exercise.description,
      muscleGroup: exercise.muscleGroup,
      musclesInvolved: exercise.musclesInvolved ?? '',
      primaryMuscleGroupId: exercise.primaryMuscleGroupId ?? 0,
      secondaryMuscleGroupId: exercise.secondaryMuscleGroupId ?? 0,
      photoUrl: exercise.photoUrl ?? '',
      videoUrl: exercise.videoUrl ?? ''
    });
    this.selectedExerciseMuscleIds.set((exercise.muscles ?? []).map(muscle => muscle.id));
    this.imagePreviewUrl.set(exercise.photoUrl ?? null);
    this.selectedExerciseImage = null;
  }

  onExerciseImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.feedback.set('Selecciona una imagen valida para el ejercicio.');
      input.value = '';
      return;
    }

    this.selectedExerciseImage = file;
    this.imagePreviewUrl.set(URL.createObjectURL(file));
  }

  saveExercise(): void {
    if (this.exerciseForm.invalid) return;

    if (this.selectedExerciseImage) {
      this.isLoading.set(true);
      this.platformService.uploadExerciseImage(this.selectedExerciseImage).subscribe({
        next: file => {
          this.exerciseForm.patchValue({ photoUrl: file.downloadUrl || file.url });
          this.selectedExerciseImage = null;
          this.persistExercise();
        },
        error: () => {
          this.isLoading.set(false);
          this.feedback.set('No se pudo subir la imagen del ejercicio.');
        }
      });
      return;
    }

    this.persistExercise();
  }

  resetExerciseForm(): void {
    this.exerciseForm.reset({ id: 0, name: '', description: '', muscleGroup: '', musclesInvolved: '', primaryMuscleGroupId: 0, secondaryMuscleGroupId: 0, photoUrl: '', videoUrl: '' });
    this.selectedExerciseMuscleIds.set([]);
    this.imagePreviewUrl.set(null);
    this.selectedExerciseImage = null;
  }

  private persistExercise(): void {
    const raw = this.exerciseForm.getRawValue();
    const payload = {
      name: raw.name,
      description: raw.description,
      muscleGroup: raw.muscleGroup,
      musclesInvolved: raw.musclesInvolved || null,
      primaryMuscleGroupId: raw.primaryMuscleGroupId || null,
      secondaryMuscleGroupId: raw.secondaryMuscleGroupId || null,
      muscleIds: this.selectedExerciseMuscleIds(),
      photoUrl: raw.photoUrl || null,
      videoUrl: raw.videoUrl || null
    };

    const request = raw.id
      ? this.platformService.updateExercise(raw.id, payload)
      : this.platformService.createExercise(payload);

    request.subscribe({
      next: () => {
        this.isLoading.set(false);
        this.dialog.closeAll();
        this.feedback.set('Ejercicio guardado.');
        this.resetExerciseForm();
        this.platformService.getExercises().subscribe(exercises => this.exercises.set(exercises));
      },
      error: () => {
        this.isLoading.set(false);
        this.feedback.set('No se pudo guardar el ejercicio.');
      }
    });
  }

  deleteExercise(exercise: Exercise): void {
    this.confirmDelete('Eliminar ejercicio', `Se eliminara "${exercise.name}" del catalogo de ejercicios.`).subscribe(confirmed => {
      if (!confirmed) return;
      this.platformService.deleteExercise(exercise.id).subscribe({
        next: () => {
          this.feedback.set('Ejercicio eliminado.');
          this.exercises.update(items => items.filter(item => item.id !== exercise.id));
        },
        error: () => this.feedback.set('No se pudo eliminar el ejercicio.')
      });
    });
  }

  duplicateExercise(exercise: Exercise): void {
    this.platformService.createExercise({
      name: `${exercise.name} - copia`,
      description: exercise.description,
      muscleGroup: exercise.muscleGroup,
      musclesInvolved: exercise.musclesInvolved,
      primaryMuscleGroupId: exercise.primaryMuscleGroupId,
      secondaryMuscleGroupId: exercise.secondaryMuscleGroupId,
      muscleIds: exercise.muscles.map(muscle => muscle.id),
      media: exercise.media.map(media => ({ ...media, id: undefined })),
      photoUrl: exercise.photoUrl,
      videoUrl: exercise.videoUrl
    }).subscribe({
      next: created => {
        this.exercises.update(items => [...items, created]);
        this.feedback.set(`Se creó "${created.name}" como un ejercicio independiente.`);
      },
      error: () => this.feedback.set('No se pudo duplicar el ejercicio.')
    });
  }

  saveMuscleGroup(): void {
    if (this.muscleGroupForm.invalid) return;
    const raw = this.muscleGroupForm.getRawValue();
    this.platformService.saveMuscleGroup({
      id: raw.id || undefined,
      name: raw.name,
      description: raw.description || null,
      sortOrder: raw.sortOrder,
      bodyMapCoordinates: []
    }).subscribe({
      next: () => {
        this.feedback.set('Grupo muscular guardado.');
        this.muscleGroupForm.reset({ id: 0, name: '', description: '', sortOrder: 0 });
        this.platformService.getMuscleGroups().subscribe(groups => this.setMuscleGroups(groups));
      },
      error: () => this.feedback.set('No se pudo guardar el grupo muscular.')
    });
  }

  openMuscleGroupDialog(group?: MuscleGroup): void {
    const dialogRef = this.dialog.open(MuscleGroupDialogComponent, {
      width: '1040px',
      maxWidth: 'calc(100vw - 2rem)',
      maxHeight: 'calc(100vh - 2rem)',
      data: { group, suggestedCoordinates: [] }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.platformService.saveMuscleGroup({
        id: result.id || undefined,
        name: result.name,
        description: result.description || null,
        sortOrder: result.sortOrder,
        bodyMapCoordinates: result.bodyMapCoordinates
      }).subscribe({
        next: () => {
          this.feedback.set('Grupo muscular guardado.');
          this.platformService.getMuscleGroups().subscribe(groups => this.setMuscleGroups(groups));
        },
        error: () => this.feedback.set('No se pudo guardar el grupo muscular.')
      });
    });
  }

  editMuscleGroup(group: MuscleGroup): void {
    this.openMuscleGroupDialog(group);
  }

  deleteMuscleGroup(group: MuscleGroup): void {
    this.confirmDelete('Eliminar grupo muscular', `Se eliminara "${group.name}" y sus musculos asociados.`).subscribe(confirmed => {
      if (!confirmed) return;
      this.platformService.deleteMuscleGroup(group.id).subscribe({
        next: () => {
          this.feedback.set('Grupo muscular eliminado.');
          this.setMuscleGroups(this.muscleGroups().filter(item => item.id !== group.id));
        },
        error: () => this.feedback.set('No se pudo eliminar el grupo muscular.')
      });
    });
  }

  saveMuscle(): void {
    if (this.muscleForm.invalid) return;
    const raw = this.muscleForm.getRawValue();
    this.platformService.saveMuscle(raw.muscleGroupId, {
      id: raw.id || undefined,
      muscleGroupId: raw.muscleGroupId,
      name: raw.name,
      description: raw.description || null,
      sortOrder: raw.sortOrder
    }).subscribe({
      next: () => {
        this.feedback.set('Musculo guardado.');
        this.muscleForm.reset({ id: 0, muscleGroupId: raw.muscleGroupId, name: '', description: '', sortOrder: 0 });
        this.platformService.getMuscleGroups().subscribe(groups => this.setMuscleGroups(groups));
      },
      error: () => this.feedback.set('No se pudo guardar el musculo.')
    });
  }

  openMuscleDialog(group?: MuscleGroup, muscle?: MuscleGroup['muscles'][number]): void {
    if (!this.muscleGroups().length) {
      this.feedback.set('Primero crea un grupo muscular.');
      return;
    }

    const dialogRef = this.dialog.open(MuscleDialogComponent, {
      width: '1040px',
      maxWidth: 'calc(100vw - 2rem)',
      maxHeight: 'calc(100vh - 2rem)',
      data: { groupId: group?.id, groupName: group?.name, muscle, groups: this.muscleGroups() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.platformService.saveMuscle(result.muscleGroupId, {
        id: result.id || undefined,
        muscleGroupId: result.muscleGroupId,
        name: result.name,
        description: result.description || null,
        sortOrder: result.sortOrder,
        bodyMapCoordinates: result.bodyMapCoordinates
      }).subscribe({
        next: () => {
          this.feedback.set('Musculo guardado.');
          this.platformService.getMuscleGroups().subscribe(groups => this.setMuscleGroups(groups));
        },
        error: () => this.feedback.set('No se pudo guardar el musculo.')
      });
    });
  }

  openSelectedMuscleDialog(): void {
    this.openMuscleDialog(this.selectedMuscleGroup());
  }

  editMuscle(groupId: number, muscleId: number): void {
    const group = this.muscleGroups().find(item => item.id === groupId);
    const muscle = group?.muscles.find(item => item.id === muscleId);
    if (!muscle) return;
    this.openMuscleDialog(group, muscle);
  }

  deleteMuscle(group: MuscleGroup, muscle: MuscleGroup['muscles'][number]): void {
    this.confirmDelete('Eliminar musculo', `Se eliminara "${muscle.name}" del grupo ${group.name}.`).subscribe(confirmed => {
      if (!confirmed) return;
      this.platformService.deleteMuscle(muscle.id).subscribe({
        next: () => {
          this.feedback.set('Musculo eliminado.');
          this.setMuscleGroups(this.muscleGroups().map(item =>
            item.id === group.id
              ? { ...item, muscles: item.muscles.filter(current => current.id !== muscle.id) }
              : item
          ));
        },
        error: () => this.feedback.set('No se pudo eliminar el musculo.')
      });
    });
  }

  toggleEmptyMuscleGroupsFilter(): void {
    this.showEmptyMuscleGroupsOnly.update(value => !value);
    this.ensureSelectedMuscleGroup();
  }

  totalMuscleCount(): number {
    return this.muscleGroups().reduce((total, group) => total + group.muscles.length, 0);
  }

  emptyMuscleGroupCount(): number {
    return this.muscleGroups().filter(group => !group.muscles.length).length;
  }

  trackMuscleGroup(index: number, group: MuscleGroup): number {
    return group.id;
  }

  private setMuscleGroups(groups: MuscleGroup[]): void {
    this.muscleGroups.set(groups);
    this.ensureSelectedMuscleGroup();
  }

  private ensureSelectedMuscleGroup(): void {
    const visibleGroups = this.filteredMuscleGroups();
    const selectedId = this.selectedMuscleGroupId();
    if (visibleGroups.some(group => group.id === selectedId)) return;
    this.selectedMuscleGroupId.set(visibleGroups[0]?.id ?? 0);
  }

  toggleExerciseMuscle(muscleId: number): void {
    this.selectedExerciseMuscleIds.update(ids =>
      ids.includes(muscleId) ? ids.filter(id => id !== muscleId) : [...ids, muscleId]
    );
  }

  toggleScheduleDay(day: number): void {
    this.selectedScheduleDays.update(days =>
      days.includes(day) ? days.filter(item => item !== day) : [...days, day].sort()
    );
  }

  selectBuilderExercise(exercise: Exercise): void {
    this.routineExerciseForm.patchValue({ exerciseId: exercise.id });
    this.builderExerciseSearch.setValue(`${exercise.name} - ${exercise.muscleGroup}`);
  }

  addExerciseToRoutine(): void {
    const raw = this.routineExerciseForm.getRawValue();
    const exercise = this.exercises().find(item => item.id === raw.exerciseId);
    if (!exercise) {
      this.feedback.set('Busca y selecciona un ejercicio para agregarlo al workout.');
      return;
    }

    if (this.routineBuilderExercises().some(item => item.exerciseId === exercise.id)) {
      this.feedback.set('Ese ejercicio ya esta en el workout.');
      return;
    }

    this.routineBuilderExercises.update(items => [
      ...items,
      {
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        muscleGroup: exercise.muscleGroup,
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

  isRoutineExpanded(routineId: number): boolean {
    return this.expandedRoutineIds().includes(routineId);
  }

  toggleRoutine(routineId: number): void {
    this.expandedRoutineIds.update(ids =>
      ids.includes(routineId) ? ids.filter(id => id !== routineId) : [...ids, routineId]
    );
  }

  isTrainingPlanExpanded(planId: number): boolean {
    return this.expandedTrainingPlanIds().includes(planId);
  }

  toggleTrainingPlan(planId: number): void {
    this.expandedTrainingPlanIds.update(ids =>
      ids.includes(planId) ? ids.filter(id => id !== planId) : [...ids, planId]
    );
  }

  showAssignmentsForPlan(plan: TrainingPlan): void {
    this.selectedAssignmentPlanId.set(plan.id);
    this.assignmentListPlanId.setValue(plan.id, { emitEvent: false });
    this.assignmentListPlanSearch.setValue(plan.name, { emitEvent: false });
    this.assignmentListPlanPickerOpen.set(false);
    this.assignmentListPage.set(1);
  }

  clearAssignmentListSearch(): void {
    this.selectedAssignmentPlanId.set(0);
    this.assignmentListPlanId.setValue(0, { emitEvent: false });
    this.assignmentListPlanSearch.setValue('', { emitEvent: false });
    this.assignmentListPage.set(1);
  }

  setAssignmentListPage(direction: -1 | 1): void {
    const nextPage = this.assignmentListPage() + direction;
    if (nextPage < 1 || nextPage > this.assignmentListTotalPages()) return;
    this.assignmentListPage.set(nextPage);
  }

  deleteTrainingPlan(plan: TrainingPlan): void {
    this.confirmDelete('Eliminar plan', `Se eliminara el plan "${plan.name}". Los workouts asociados no se borran.`).subscribe(confirmed => {
      if (!confirmed) return;
      this.platformService.deleteTrainingPlan(plan.id).subscribe({
        next: () => {
          this.feedback.set('Plan eliminado.');
          this.trainingPlans.update(items => items.filter(item => item.id !== plan.id));
          this.expandedTrainingPlanIds.update(ids => ids.filter(id => id !== plan.id));
        },
        error: () => this.feedback.set('No se pudo eliminar el plan de entrenamiento.')
      });
    });
  }

  duplicateTrainingPlan(plan: TrainingPlan): void {
    this.platformService.createTrainingPlan({
      name: `${plan.name} - copia`,
      description: plan.description,
      level: plan.level,
      goal: plan.goal,
      workouts: plan.workouts.map(workout => ({
        routineId: workout.routineId,
        sortOrder: workout.sortOrder,
        dayLabel: workout.dayLabel,
        notes: workout.notes,
        suggestedDayOfWeek: workout.suggestedDayOfWeek
      }))
    }).subscribe({
      next: () => {
        this.feedback.set('Plan duplicado.');
        this.refreshTrainingPlans();
      },
      error: () => this.feedback.set('No se pudo duplicar el plan.')
    });
  }

  editRoutineTemplate(template: RoutineTemplate): void {
    this.routineForm.setValue({
      id: template.id,
      name: template.name,
      description: template.description ?? '',
      level: template.level,
      goal: template.goal
    });
    this.routineBuilderExercises.set(template.exercises.map(item => ({
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
  }

  saveRoutineTemplate(): void {
    if (this.routineForm.invalid || this.routineBuilderExercises().length === 0) {
      this.feedback.set('Completa el workout y agrega al menos un ejercicio.');
      return;
    }

    const raw = this.routineForm.getRawValue();
    const payload = {
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
    };

    const request: Observable<unknown> = raw.id
      ? this.platformService.updateRoutine(raw.id, payload)
      : this.platformService.createRoutine(payload);

    request.subscribe({
      next: () => {
        this.dialog.closeAll();
        this.feedback.set(raw.id ? 'Workout actualizado.' : 'Workout creado.');
        this.resetRoutineBuilder();
        this.refreshRoutines();
        this.refreshTrainingPlans();
      },
      error: () => this.feedback.set('No se pudo guardar el workout.')
    });
  }

  deleteRoutineTemplate(routine: RoutineTemplate): void {
    this.confirmDelete('Eliminar workout', `Se eliminara el workout "${routine.name}". Las asignaciones historicas no se borran.`).subscribe(confirmed => {
      if (!confirmed) return;
      this.platformService.deleteRoutine(routine.id).subscribe({
        next: () => {
          this.feedback.set('Workout eliminado.');
          this.routineTemplates.update(items => items.filter(item => item.id !== routine.id));
          this.expandedRoutineIds.update(ids => ids.filter(id => id !== routine.id));
          this.refreshTrainingPlans();
        },
        error: () => this.feedback.set('No se pudo eliminar el workout.')
      });
    });
  }

  resetRoutineBuilder(): void {
    this.routineForm.reset({ id: 0, name: '', description: '', level: 'General', goal: 'General' });
    this.routineBuilderExercises.set([]);
    this.builderExerciseSearch.setValue('');
  }

  selectPlanForAssignment(plan: TrainingPlan): void {
    this.planAssignmentForm.patchValue({ trainingPlanId: plan.id });
    this.assignmentPlanSearch.setValue(`${plan.name} - ${plan.goal}`);
    this.planAssignmentPlanPickerOpen.set(false);
  }

  selectClientForPlanAssignment(client: Client): void {
    this.planAssignmentForm.patchValue({ clientId: client.id });
    this.planAssignmentClientSearch.setValue(`${client.apellido}, ${client.nombre} - DNI ${client.dni}`);
    this.planAssignmentClientPickerOpen.set(false);
  }

  selectRoutineForAssignment(routine: RoutineTemplate): void {
    this.assignmentForm.patchValue({ routineId: routine.id });
    this.assignmentRoutineSearch.setValue(`${routine.name} - ${routine.goal}`);
  }

  selectClientForAssignment(client: Client): void {
    this.assignmentForm.patchValue({ clientId: client.id });
    this.assignmentClientSearch.setValue(`${client.apellido}, ${client.nombre} - DNI ${client.dni}`);
  }

  selectClientForTracking(client: Client): void {
    this.trackingForm.patchValue({ clientId: client.id });
    this.trackingClientSearch.setValue(`${client.apellido}, ${client.nombre} - DNI ${client.dni}`);
    this.trackingClientPickerOpen.set(false);
    this.attendance.set([]);
    this.workoutSessions.set([]);
    this.progressHistory.set(null);
    this.trackingPlanAssignments.set([]);
    this.loadStudentTracking(false);
  }

  openTrackingFromSchedule(clientId: number): void {
    this.selectedTabIndex.set(2);
    const loadedClient = this.clients().find(client => client.id === clientId);
    if (loadedClient) {
      this.selectClientForTracking(loadedClient);
      return;
    }

    this.clientsService.getById(clientId).subscribe({
      next: client => {
        this.clients.update(clients => clients.some(item => item.id === client.id) ? clients : [...clients, client]);
        this.selectClientForTracking(client);
      },
      error: () => this.feedback.set('No se pudo abrir el seguimiento del alumno.')
    });
  }

  closeTrackingClientPickerSoon(): void {
    setTimeout(() => this.trackingClientPickerOpen.set(false), 120);
  }

  closePlanAssignmentPlanPickerSoon(): void {
    setTimeout(() => this.planAssignmentPlanPickerOpen.set(false), 120);
  }

  closePlanAssignmentClientPickerSoon(): void {
    setTimeout(() => this.planAssignmentClientPickerOpen.set(false), 120);
  }

  closeAssignmentListPlanPickerSoon(): void {
    setTimeout(() => this.assignmentListPlanPickerOpen.set(false), 120);
  }

  assignTrainingPlan(): void {
    const raw = this.planAssignmentForm.getRawValue();
    if (raw.trainingPlanId <= 0 || raw.clientId <= 0) {
      this.feedback.set('Selecciona un plan y un alumno para asignar.');
      return;
    }

    this.platformService.assignTrainingPlan(raw.trainingPlanId, {
      clientIds: [raw.clientId]
    }).subscribe({
      next: () => {
        this.dialog.closeAll();
        this.feedback.set('Plan asignado al alumno.');
        this.planAssignmentForm.reset({ trainingPlanId: 0, clientId: 0 });
        this.assignmentPlanSearch.setValue('');
        this.planAssignmentClientSearch.setValue('');
        this.refreshTrainingPlans();
        if (raw.clientId === this.trackingForm.controls.clientId.value) {
          this.loadTrackingPlanAssignments(raw.clientId);
        }
      },
      error: () => this.feedback.set('No se pudo asignar el plan.')
    });
  }

  assignRoutine(): void {
    const raw = this.assignmentForm.getRawValue();
    if (raw.routineId <= 0 || raw.clientId <= 0) {
      this.feedback.set('Selecciona un workout y un alumno para asignar.');
      return;
    }

    this.platformService.assignRoutine(raw.routineId, {
      clientIds: [raw.clientId],
      startsAt: raw.startsAt || null,
      endsAt: raw.endsAt || null,
      scheduleDays: this.selectedScheduleDays()
    }).subscribe({
      next: () => {
        this.dialog.closeAll();
        this.feedback.set('Workout asignado al alumno.');
        this.assignmentForm.reset({ routineId: 0, clientId: 0, startsAt: '', endsAt: '' });
        this.selectedScheduleDays.set([]);
        this.assignmentRoutineSearch.setValue('');
        this.assignmentClientSearch.setValue('');
        this.refreshRoutines();
      },
      error: () => this.feedback.set('No se pudo asignar el workout.')
    });
  }

  loadRanking(metric: 'attendance' | 'achievements' | 'habits' | 'total' = this.rankingMetric.value): void {
    this.rankingMetric.setValue(metric, { emitEvent: false });
    const [year, month] = this.rankingMonth.value.split('-').map(Number);
    this.platformService.getRanking(metric, 'monthly', year, month).subscribe({
      next: ranking => this.ranking.set(ranking),
      error: () => this.feedback.set('No se pudo cargar el ranking.')
    });
  }

  chooseRankingMonth(month: Date, datepicker: MatDatepicker<Date>): void {
    const selectedMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    this.rankingMonthDate.setValue(selectedMonth);
    this.rankingMonth.setValue(`${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, '0')}`);
    datepicker.close();
    this.loadRanking();
  }

  loadStudentTracking(showMissingStudentMessage = true): void {
    const raw = this.trackingForm.getRawValue();
    if (raw.clientId <= 0) {
      if (showMissingStudentMessage) {
        this.feedback.set('Selecciona un alumno para ver seguimiento.');
      }
      return;
    }

    this.platformService.getAttendance(raw.clientId, this.trackingFrom.value || undefined, this.trackingTo.value || undefined).subscribe({
      next: attendance => this.attendance.set(attendance),
      error: () => this.feedback.set('No se pudo cargar la asistencia.')
    });

    this.platformService.getWorkoutSessions(raw.clientId, this.trackingFrom.value || undefined, this.trackingTo.value || undefined).subscribe({
      next: sessions => {
        this.workoutSessions.set(sessions);
        if (this.expandedWorkoutSessionId() && !sessions.some(session => session.id === this.expandedWorkoutSessionId())) {
          this.expandedWorkoutSessionId.set(null);
          this.sessionReviewDraft.set({});
        }
      },
      error: () => this.feedback.set('No se pudo cargar el historial de sesiones.')
    });
    this.platformService.getRoutines(raw.clientId).subscribe({
      next: routines => {
        this.trackingRoutines.set(routines);
        if (!routines.some(routine => routine.id === this.professionalSessionForm.controls.routineAssignmentId.value)) {
          this.professionalSessionForm.controls.routineAssignmentId.setValue(routines[0]?.id ?? 0);
        }
      },
      error: () => this.feedback.set('No se pudieron cargar los workouts asignados al alumno.')
    });
    this.loadTrackingPlanAssignments(raw.clientId);

    if (raw.exerciseId > 0) {
      this.loadExerciseProgress(false);
    } else {
      this.progressHistory.set(null);
    }
  }

  loadExerciseProgress(showMissingMessage = true): void {
    const raw = this.trackingForm.getRawValue();
    if (raw.clientId <= 0 || raw.exerciseId <= 0) {
      this.progressHistory.set(null);
      if (showMissingMessage) {
        this.feedback.set('Selecciona alumno y ejercicio para ver el progreso.');
      }
      return;
    }

    this.platformService.getExerciseProgress(raw.exerciseId, raw.clientId).subscribe({
      next: history => this.progressHistory.set(history),
      error: () => this.feedback.set('No se pudo cargar el historial del ejercicio.')
    });
  }

  saveManualAttendance(): void {
    const raw = this.trackingForm.getRawValue();
    if (raw.clientId <= 0 || !raw.attendanceDate) {
      this.feedback.set('Selecciona alumno y fecha para registrar asistencia.');
      return;
    }

    this.platformService.saveAttendance(raw.clientId, raw.attendanceDate, raw.attendanceNotes).subscribe({
      next: attendance => {
        this.dialog.closeAll();
        this.feedback.set('Asistencia registrada.');
        this.attendance.update(items => {
          const existing = items.filter(item => item.id !== attendance.id);
          return [attendance, ...existing].sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime());
        });
        this.loadStudentTracking();
        this.loadRanking('attendance');
      },
      error: () => this.feedback.set('No se pudo registrar la asistencia.')
    });
  }

  getDayLabel(day: number): string {
    return ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'][day] ?? `${day}`;
  }

  getBuilderExerciseMatches(): Exercise[] {
    const term = this.normalize(this.builderExerciseSearch.value);
    if (!term) return this.exercises().slice(0, 8);
    return this.exercises().filter(exercise => this.matchesExercise(exercise, term)).slice(0, 8);
  }

  getAssignmentPlanMatches(): TrainingPlan[] {
    const term = this.normalize(this.assignmentPlanSearch.value);
    if (!term) return this.trainingPlans().slice(0, 6);
    return this.trainingPlans().filter(plan =>
      this.normalize(`${plan.name} ${plan.goal} ${plan.level} ${plan.workouts.map(workout => workout.routineName).join(' ')}`).includes(term)
    ).slice(0, 6);
  }

  getAssignmentListPlanMatches(): TrainingPlan[] {
    const term = this.normalize(this.assignmentListPlanSearch.value);
    if (!term) return this.trainingPlans().slice(0, 8);
    return this.trainingPlans().filter(plan =>
      this.normalize(`${plan.name} ${plan.goal} ${plan.level}`).includes(term)
    ).slice(0, 8);
  }

  getAssignmentRoutineMatches(): RoutineTemplate[] {
    const term = this.normalize(this.assignmentRoutineSearch.value);
    if (!term) return this.routineTemplates().slice(0, 8);
    return this.routineTemplates().filter(routine =>
      this.normalize(`${routine.name} ${routine.goal} ${routine.level}`).includes(term)
    ).slice(0, 8);
  }

  getAssignmentClientMatches(): Client[] {
    const term = this.normalize(this.assignmentClientSearch.value);
    if (!term) return this.clients().slice(0, 8);
    return this.clients().filter(client =>
      this.normalize(`${client.apellido} ${client.nombre} ${client.dni} ${client.email}`).includes(term)
    ).slice(0, 8);
  }

  getPlanAssignmentClientMatches(): Client[] {
    const term = this.normalize(this.planAssignmentClientSearch.value);
    if (!term) return this.clients().slice(0, 8);
    return this.clients().filter(client =>
      this.normalize(`${client.apellido} ${client.nombre} ${client.dni} ${client.email}`).includes(term)
    ).slice(0, 8);
  }

  getExerciseQrDestination(exercise: Exercise): string {
    return `${environment.studentAppUrl.replace(/\/$/, '')}${exercise.qrUrl}`;
  }

  getExerciseQrImageUrl(exercise: Exercise | null): string {
    if (!exercise) return '';
    return `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=12&data=${encodeURIComponent(this.getExerciseQrDestination(exercise))}`;
  }

  openExerciseQr(exercise: Exercise, template: TemplateRef<unknown>): void {
    this.selectedQrExercise.set(exercise);
    this.openTemplate(template, '520px');
  }

  copyExerciseQr(exercise: Exercise): void {
    const url = this.getExerciseQrDestination(exercise);
    if (!navigator.clipboard) {
      this.feedback.set(url);
      return;
    }

    navigator.clipboard.writeText(url)
      .then(() => this.feedback.set('Link QR copiado.'))
      .catch(() => this.feedback.set(url));
  }

  downloadExerciseQr(exercise: Exercise): void {
    const imageUrl = this.getExerciseQrImageUrl(exercise);
    const filename = `qr-${this.slugifyFileName(exercise.name)}.png`;

    fetch(imageUrl)
      .then(response => {
        if (!response.ok) throw new Error('QR download failed');
        return response.blob();
      })
      .then(blob => {
        const objectUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = objectUrl;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(objectUrl);
        this.feedback.set('QR descargado.');
      })
      .catch(() => {
        window.open(imageUrl, '_blank', 'noopener');
        this.feedback.set('No se pudo descargar automaticamente. Abrimos el QR para guardarlo manualmente.');
      });
  }

  private slugifyFileName(value: string): string {
    const normalized = value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    return normalized || 'ejercicio';
  }

  isExerciseVideoValid(): boolean {
    const value = this.exerciseForm.controls.videoUrl.value.trim();
    if (!value) return true;
    return /^https?:\/\/.+/i.test(value);
  }

  canSaveExercise(): boolean {
    return this.exerciseForm.valid && this.isExerciseVideoValid();
  }

  canSaveRoutine(): boolean {
    return this.routineForm.valid && this.routineBuilderExercises().length > 0;
  }

  hasExerciseFilters(): boolean {
    return !!this.exerciseSearch.value.trim() ||
      Number(this.exerciseGroupFilter.value) > 0 ||
      Number(this.exerciseMuscleFilter.value) > 0 ||
      this.pendingBodyZoneKeys().length > 0 ||
      this.selectedBodyZoneKeys().length > 0;
  }

  prepareTrackingPlanAssignment(): void {
    const client = this.selectedTrackingClient();
    if (!client) return;
    this.planAssignmentForm.reset({ trainingPlanId: 0, clientId: client.id });
    this.assignmentPlanSearch.setValue('');
    this.planAssignmentClientSearch.setValue(`${client.apellido}, ${client.nombre} - DNI ${client.dni}`);
    this.planAssignmentPlanPickerOpen.set(false);
  }

  unassignTrackingPlan(assignment: TrainingPlanAssignment): void {
    this.confirmDelete(
      'Finalizar asignacion',
      `El plan "${assignment.trainingPlanName}" dejara de estar activo, pero permanecera en el historial del alumno.`
    ).subscribe(confirmed => {
      if (!confirmed) return;
      this.platformService.unassignTrainingPlan(assignment.id).subscribe({
        next: () => {
          this.feedback.set('Plan finalizado. Se conservo en el historial.');
          this.loadTrackingPlanAssignments(assignment.clientId);
          this.refreshTrainingPlans();
        },
        error: () => this.feedback.set('No se pudo finalizar la asignacion del plan.')
      });
    });
  }

  private loadTrackingPlanAssignments(clientId: number): void {
    this.platformService.getTrainingPlanAssignments(clientId, true).subscribe({
      next: assignments => this.trackingPlanAssignments.set(assignments),
      error: () => this.feedback.set('No se pudieron cargar los planes del alumno.')
    });
  }

  attendanceSourceLabel(source: string): string {
    const labels: Record<string, string> = {
      StudentManual: 'Informada por el alumno',
      Workout: 'Workout completado',
      Manual: 'Registrada por el personal',
      Qr: 'Ingreso con QR',
      Geolocation: 'Ingreso verificado'
    };
    return labels[source] ?? source;
  }

  attendanceSourceIcon(source: string): string {
    if (source === 'Workout') return 'fitness_center';
    if (source === 'StudentManual') return 'person';
    if (source === 'Qr') return 'qr_code_2';
    return 'event_available';
  }

  toggleWorkoutSession(session: WorkoutSession): void {
    if (this.expandedWorkoutSessionId() === session.id) {
      this.expandedWorkoutSessionId.set(null);
      this.expandedSessionBlockKeys.set([]);
      this.sessionReviewDraft.set({});
      return;
    }

    const draft: Record<number, { weight: number | null; reps: number | null; notes: string }> = {};
    session.exercises.forEach(exercise => exercise.sets.forEach(set => {
      draft[set.id] = {
        weight: set.professionalWeight ?? set.weight ?? null,
        reps: set.professionalReps ?? set.reps ?? null,
        notes: set.professionalNotes ?? ''
      };
    }));
    this.sessionReviewDraft.set(draft);
    this.expandedWorkoutSessionId.set(session.id);
    const firstBlock = this.getSessionBlocks(session)[0];
    this.expandedSessionBlockKeys.set(firstBlock ? [this.sessionBlockStateKey(session.id, firstBlock.key)] : []);
  }

  getSessionBlocks(session: WorkoutSession): WorkoutSessionBlockGroup[] {
    const groups = new Map<string, WorkoutSessionBlockGroup>();
    session.exercises.forEach(exercise => {
      const key = exercise.routineBlockId ? `id-${exercise.routineBlockId}` : `name-${exercise.blockName || 'sin-bloque'}`;
      const current = groups.get(key) ?? {
        key,
        name: exercise.blockName || 'Sin bloque',
        exercises: [],
        seriesCount: 0
      };
      current.exercises.push(exercise);
      current.seriesCount += exercise.sets.length;
      groups.set(key, current);
    });
    return [...groups.values()];
  }

  isSessionBlockExpanded(sessionId: number, blockKey: string): boolean {
    return this.expandedSessionBlockKeys().includes(this.sessionBlockStateKey(sessionId, blockKey));
  }

  toggleSessionBlock(sessionId: number, blockKey: string): void {
    const key = this.sessionBlockStateKey(sessionId, blockKey);
    this.expandedSessionBlockKeys.update(keys => keys.includes(key) ? keys.filter(item => item !== key) : [...keys, key]);
  }

  private sessionBlockStateKey(sessionId: number, blockKey: string): string {
    return `${sessionId}:${blockKey}`;
  }

  updateSessionReviewDraft(setEntryId: number, field: 'weight' | 'reps' | 'notes', value: string): void {
    this.sessionReviewDraft.update(current => ({
      ...current,
      [setEntryId]: {
        ...(current[setEntryId] ?? { weight: null, reps: null, notes: '' }),
        [field]: field === 'notes' ? value : (value === '' ? null : Number(value))
      }
    }));
  }

  saveSessionReview(session: WorkoutSession): void {
    const draft = this.sessionReviewDraft();
    const sets = session.exercises.flatMap(exercise => exercise.sets.map(set => ({
      setEntryId: set.id,
      weight: draft[set.id]?.weight ?? null,
      reps: draft[set.id]?.reps ?? null,
      notes: draft[set.id]?.notes?.trim() || null
    })));
    if (!sets.length) return;

    this.savingSessionReview.set(true);
    this.platformService.saveWorkoutSessionProfessionalReview(session.id, { sets }).subscribe({
      next: updated => {
        this.workoutSessions.update(items => items.map(item => item.id === updated.id ? updated : item));
        this.savingSessionReview.set(false);
        this.toggleWorkoutSession(updated);
        this.toggleWorkoutSession(updated);
        this.feedback.set('Pesos y repeticiones reales guardados con la revisión profesional.');
      },
      error: () => {
        this.savingSessionReview.set(false);
        this.feedback.set('No se pudo guardar la revisión de la sesión.');
      }
    });
  }

  saveProfessionalWorkoutSession(): void {
    const clientId = this.trackingForm.controls.clientId.value;
    const raw = this.professionalSessionForm.getRawValue();
    const assignment = this.trackingRoutines().find(item => item.id === Number(raw.routineAssignmentId));
    if (clientId <= 0 || !assignment || !raw.trainingDate) {
      this.feedback.set('Selecciona un alumno, un workout y una fecha.');
      return;
    }

    let sortOrder = 0;
    const hasBlocks = !!assignment.blocks?.length;
    const sourceBlocks = hasBlocks ? assignment.blocks : [{ id: 0, name: 'Workout', cycles: 1, exercises: assignment.exercises }];
    const exercises = sourceBlocks.flatMap(block => block.exercises.map((exercise, exerciseIndex) => ({
      exerciseId: exercise.exerciseId,
      routineBlockId: block.id,
      routineExerciseId: exercise.id,
      cycleNumber: null,
      sortOrder: ++sortOrder,
      notes: exercise.notes ?? null,
      sets: Array.from({ length: hasBlocks ? this.professionalBlockCycleCount(block.id, block.cycles) : Math.max(1, exercise.sets ?? 1) }, (_, index) => {
        const actual = this.professionalWorkoutDraft()[this.professionalSetDraftKey(block.id, exerciseIndex, index + 1)];
        return {
        setNumber: index + 1,
        reps: actual?.reps ?? exercise.reps ?? null,
        weight: actual?.weight ?? exercise.weight ?? null,
        restSeconds: exercise.restSeconds ?? null,
        notes: null
        };
      })
    })));

    this.savingSessionReview.set(true);
    this.platformService.saveWorkoutSession({
      clientId,
      routineAssignmentId: assignment.id,
      trainingDate: raw.trainingDate,
      notes: raw.notes.trim() || null,
      exercises
    }).subscribe({
      next: session => {
        const sets = session.exercises.flatMap(exercise => exercise.sets.map(set => ({ setEntryId: set.id, weight: set.weight ?? null, reps: set.reps ?? null, notes: null })));
        this.platformService.saveWorkoutSessionProfessionalReview(session.id, { sets }).subscribe({
          next: reviewed => {
            this.savingSessionReview.set(false);
            this.dialog.closeAll();
            this.workoutSessions.update(items => [reviewed, ...items.filter(item => item.id !== reviewed.id)]);
            this.feedback.set('Workout registrado por el profesional. Ya puedes ajustar cada serie desde el historial.');
            this.loadStudentTracking(false);
          },
          error: () => {
            this.savingSessionReview.set(false);
            this.feedback.set('El workout se guardó, pero no se pudo registrar la auditoría profesional.');
            this.loadStudentTracking(false);
          }
        });
      },
      error: () => {
        this.savingSessionReview.set(false);
        this.feedback.set('No se pudo registrar el workout para el alumno.');
      }
    });
  }

  openProfessionalSessionDialog(template: TemplateRef<unknown>): void {
    if (!this.professionalSessionForm.controls.routineAssignmentId.value && this.trackingRoutines().length) {
      this.professionalSessionForm.controls.routineAssignmentId.setValue(this.trackingRoutines()[0].id);
    }
    this.resetProfessionalSessionDraft();
    this.openTemplate(template, '860px');
  }

  selectedProfessionalRoutine(): RoutineAssignment | undefined {
    return this.trackingRoutines().find(item => item.id === Number(this.professionalSessionForm.controls.routineAssignmentId.value));
  }

  resetProfessionalSessionDraft(): void {
    const assignment = this.selectedProfessionalRoutine();
    const cycleDraft: Record<string, number> = {};
    const setDraft: Record<string, { weight: number | null; reps: number | null }> = {};
    assignment?.blocks.forEach(block => {
      const cycles = Math.max(1, block.cycles ?? 1);
      cycleDraft[String(block.id)] = cycles;
      block.exercises.forEach((exercise, exerciseIndex) => {
        for (let cycle = 1; cycle <= cycles; cycle++) {
          setDraft[this.professionalSetDraftKey(block.id, exerciseIndex, cycle)] = {
            weight: exercise.weight ?? null,
            reps: exercise.reps ?? null
          };
        }
      });
    });
    this.professionalBlockCycles.set(cycleDraft);
    this.professionalWorkoutDraft.set(setDraft);
    this.expandedProfessionalBlockId.set(assignment?.blocks[0]?.id ?? null);
  }

  toggleProfessionalBlock(blockId: number): void {
    this.expandedProfessionalBlockId.update(current => current === blockId ? null : blockId);
  }

  updateProfessionalBlockCycles(blockId: number, value: string): void {
    const cycles = Math.min(20, Math.max(1, Number(value) || 1));
    this.professionalBlockCycles.update(current => ({ ...current, [String(blockId)]: cycles }));
    const assignment = this.selectedProfessionalRoutine();
    const block = assignment?.blocks.find(item => item.id === blockId);
    if (!block) return;
    this.professionalWorkoutDraft.update(current => {
      const next = { ...current };
      block.exercises.forEach((exercise, exerciseIndex) => {
        for (let cycle = 1; cycle <= cycles; cycle++) {
          const key = this.professionalSetDraftKey(blockId, exerciseIndex, cycle);
          next[key] ??= { weight: exercise.weight ?? null, reps: exercise.reps ?? null };
        }
      });
      return next;
    });
  }

  professionalBlockCycleCount(blockId: number, fallback = 1): number {
    return this.professionalBlockCycles()[String(blockId)] ?? Math.max(1, fallback ?? 1);
  }

  professionalCycles(blockId: number, fallback = 1): number[] {
    return Array.from({ length: this.professionalBlockCycleCount(blockId, fallback) }, (_, index) => index + 1);
  }

  updateProfessionalSetDraft(blockId: number, exerciseIndex: number, cycle: number, field: 'weight' | 'reps', value: string): void {
    const key = this.professionalSetDraftKey(blockId, exerciseIndex, cycle);
    this.professionalWorkoutDraft.update(current => ({
      ...current,
      [key]: { ...(current[key] ?? { weight: null, reps: null }), [field]: value === '' ? null : Number(value) }
    }));
  }

  professionalSetDraftKey(blockId: number, exerciseIndex: number, cycle: number): string {
    return `${blockId}:${exerciseIndex}:${cycle}`;
  }

  clearExerciseFilters(): void {
    this.exerciseSearch.setValue('');
    this.exerciseGroupFilter.setValue(0);
    this.exerciseMuscleFilter.setValue(0);
    this.clearBodyZoneFilters();
  }

  private handleDeepLink(): void {
    if (!this.viewReady) return;

    const params = this.route.snapshot.queryParamMap;
    const routineId = Number(params.get('routineId'));
    const exerciseId = Number(params.get('exerciseId'));
    const key = `${params.get('tab') ?? ''}:${routineId || ''}:${exerciseId || ''}`;
    if (key === this.lastHandledDeepLink) return;

    if (routineId > 0) {
      const routine = this.routineTemplates().find(item => item.id === routineId);
      if (!routine) return;

      this.lastHandledDeepLink = key;
      this.expandedRoutineIds.update(ids => ids.includes(routineId) ? ids : [...ids, routineId]);
      this.routineSearch.setValue(routine.name, { emitEvent: false });
      setTimeout(() => document.getElementById(`routine-card-${routineId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
      return;
    }

    if (exerciseId > 0) {
      const exercise = this.exercises().find(item => item.id === exerciseId);
      if (!exercise || !this.exerciseEditorDialog) return;

      this.lastHandledDeepLink = key;
      this.clearExerciseFilters();
      this.exerciseSearch.setValue(exercise.name, { emitEvent: false });
      this.editExercise(exercise);
      this.openTemplate(this.exerciseEditorDialog, '980px');
      setTimeout(() => document.getElementById(`exercise-row-${exerciseId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    }
  }

  private confirmDelete(title: string, message: string): Observable<boolean | undefined> {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 1rem)',
      autoFocus: false,
      data: {
        title,
        message,
        confirmLabel: 'Eliminar',
        cancelLabel: 'Cancelar',
        tone: 'danger'
      }
    }).afterClosed();
  }

  private matchesExercise(exercise: Exercise, term: string): boolean {
    return this.exerciseSearchText(exercise).includes(term);
  }

  private matchesSelectedBodyZones(exercise: Exercise): boolean {
    const zones = this.selectedBodyZones();
    if (!zones.length) return true;

    const text = this.exerciseBodyZoneText(exercise);
    return zones.some(zone => zone.muscleId
      ? exercise.muscles.some(muscle => muscle.id === zone.muscleId)
      : zone.muscleGroupId
      ? exercise.primaryMuscleGroupId === zone.muscleGroupId || exercise.secondaryMuscleGroupId === zone.muscleGroupId || exercise.muscles.some(muscle => muscle.muscleGroupId === zone.muscleGroupId)
      : zone.synonyms.some(synonym => text.includes(this.normalize(synonym))));
  }

  private exerciseSearchText(exercise: Exercise): string {
    return this.normalize(`${exercise.name} ${exercise.muscleGroup} ${exercise.description} ${exercise.musclesInvolved ?? ''} ${exercise.primaryMuscleGroupName ?? ''} ${exercise.secondaryMuscleGroupName ?? ''} ${exercise.muscles.map(muscle => `${muscle.name} ${muscle.muscleGroupName}`).join(' ')}`);
  }

  private exerciseBodyZoneText(exercise: Exercise): string {
    return this.normalize(`${exercise.muscleGroup} ${exercise.musclesInvolved ?? ''} ${exercise.primaryMuscleGroupName ?? ''} ${exercise.secondaryMuscleGroupName ?? ''} ${exercise.muscles.map(muscle => `${muscle.name} ${muscle.muscleGroupName}`).join(' ')}`);
  }

  private normalize(value: string): string {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
  }

  refreshBranchAttendanceSettings(): void {
    this.platformService.getBranchAttendanceSettings().subscribe({
      next: branches => {
        this.branchAttendanceSettings.set(branches);
        const selected = branches.find(item => item.id === this.selectedAttendanceBranchId()) ?? branches[0];
        if (selected) this.selectAttendanceBranch(selected);
      },
      error: () => this.feedback.set('No se pudo cargar la configuracion de asistencia.')
    });
  }

  refreshPointRules(): void {
    this.platformService.getPointRules().subscribe({ next: rules => this.pointRules.set(rules), error: () => this.feedback.set('No se pudieron cargar las reglas de puntos.') });
  }

  updatePointRuleValue(rule: PointRule, event: Event): void {
    const points = Math.max(0, Number((event.target as HTMLInputElement).value));
    this.pointRules.update(items => items.map(item => item.id === rule.id ? { ...item, points } : item));
  }

  savePointRule(rule: PointRule): void {
    this.platformService.savePointRule(rule.id, rule.points, rule.isActive).subscribe({
      next: saved => { this.pointRules.update(items => items.map(item => item.id === saved.id ? saved : item)); this.feedback.set('Regla de puntos actualizada.'); },
      error: () => this.feedback.set('No se pudo actualizar la regla de puntos.')
    });
  }

  togglePointRule(rule: PointRule): void {
    this.pointRules.update(items => items.map(item => item.id === rule.id ? { ...item, isActive: !item.isActive } : item));
  }

  selectAttendanceBranch(branch: BranchAttendanceSettings): void {
    this.selectedAttendanceBranchId.set(branch.id);
    this.branchAttendanceForm.setValue({ latitude: branch.latitude ?? 0, longitude: branch.longitude ?? 0, radiusMeters: branch.attendanceRadiusMeters || 150 });
  }

  selectedAttendanceBranch(): BranchAttendanceSettings | undefined {
    return this.branchAttendanceSettings().find(item => item.id === this.selectedAttendanceBranchId());
  }

  saveAttendanceBranch(): void {
    if (this.branchAttendanceForm.invalid || !this.selectedAttendanceBranchId()) return;
    this.platformService.saveBranchAttendanceSettings(this.selectedAttendanceBranchId(), this.branchAttendanceForm.getRawValue()).subscribe({
      next: () => { this.feedback.set('Configuracion de asistencia guardada.'); this.refreshBranchAttendanceSettings(); },
      error: () => this.feedback.set('No se pudo guardar la configuracion de asistencia.')
    });
  }

  attendanceQrDestination(branch: BranchAttendanceSettings): string {
    return `${environment.studentAppUrl}/asistencia/${branch.attendanceQrToken}`;
  }

  attendanceQrImage(branch: BranchAttendanceSettings): string {
    return `https://api.qrserver.com/v1/create-qr-code/?size=360x360&margin=16&data=${encodeURIComponent(this.attendanceQrDestination(branch))}`;
  }

  private currentMonthDate(): Date {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  }

  private showToast(message: string): void {
    const text = message.trim();
    if (!text) return;

    if (/^(no se pudo|no hay|primero|selecciona|completa|busca|ese ejercicio|usa una url)/i.test(text)) {
      this.toast.error(text);
      return;
    }

    if (/^(link qr copiado|.*guardad|.*eliminad|.*actualizad|.*cread|.*asignad|.*registrad)/i.test(text)) {
      this.toast.success(text);
      return;
    }

    this.toast.info(text);
  }
}
