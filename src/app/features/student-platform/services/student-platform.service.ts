import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AchievementPayload, AchievementTemplate, AssignRoutinePayload, AssignTrainingPlanPayload, AttendanceLog, BranchAttendanceSettings, Exercise, ExercisePayload, ExerciseProgressHistory, GamificationMetrics, HabitDefinition, HabitDefinitionPayload, Muscle, MuscleGroup, PointRule, RankingResponse, RoutineAssignment, RoutinePayload, RoutineTemplate, TrainingPlan, TrainingPlanAssignment, TrainingPlanCompositionBatchPayload, TrainingPlanCompositionBatchResult, TrainingPlanCompositionPayload, TrainingPlanCompositionResult, TrainingPlanPayload, WorkoutSession, WorkoutSessionPayload, WorkoutSessionProfessionalReviewPayload } from '../models/student-platform.model';

interface UploadedFile {
  url: string;
  downloadUrl: string;
}

export interface ExerciseFilters {
  search?: string;
  muscleGroupId?: number;
  muscleId?: number;
}

@Injectable({ providedIn: 'root' })
export class StudentPlatformService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api`;

  getBranchAttendanceSettings(): Observable<BranchAttendanceSettings[]> {
    return this.http.get<BranchAttendanceSettings[]>(`${this.apiUrl}/admin/student-experience/branches`);
  }

  saveBranchAttendanceSettings(id: number, payload: { latitude: number; longitude: number; radiusMeters: number }): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/admin/student-experience/branches/${id}/attendance`, payload);
  }

  getPointRules(): Observable<PointRule[]> {
    return this.http.get<PointRule[]>(`${this.apiUrl}/Achievements/point-rules`);
  }

  savePointRule(id: number, points: number, isActive: boolean): Observable<PointRule> {
    return this.http.put<PointRule>(`${this.apiUrl}/Achievements/point-rules/${id}`, { points, isActive });
  }

  getExercises(filters: string | ExerciseFilters = ''): Observable<Exercise[]> {
    let params = new HttpParams();
    if (typeof filters === 'string') {
      if (filters.trim()) params = params.set('search', filters.trim());
    } else {
      if (filters.search?.trim()) params = params.set('search', filters.search.trim());
      if (filters.muscleGroupId) params = params.set('muscleGroupId', filters.muscleGroupId);
      if (filters.muscleId) params = params.set('muscleId', filters.muscleId);
    }
    return this.http.get<Exercise[]>(`${this.apiUrl}/Exercises`, { params });
  }

  getExercise(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.apiUrl}/Exercises/${id}`);
  }

  createExercise(payload: ExercisePayload): Observable<Exercise> {
    return this.http.post<Exercise>(`${this.apiUrl}/Exercises`, payload);
  }

  updateExercise(id: number, payload: ExercisePayload): Observable<Exercise> {
    return this.http.put<Exercise>(`${this.apiUrl}/Exercises/${id}`, payload);
  }

  deleteExercise(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Exercises/${id}`);
  }

  getMuscleGroups(): Observable<MuscleGroup[]> {
    return this.http.get<MuscleGroup[]>(`${this.apiUrl}/MuscleGroups`);
  }

  saveMuscleGroup(payload: Partial<MuscleGroup>): Observable<MuscleGroup> {
    return payload.id
      ? this.http.put<MuscleGroup>(`${this.apiUrl}/MuscleGroups/${payload.id}`, payload)
      : this.http.post<MuscleGroup>(`${this.apiUrl}/MuscleGroups`, payload);
  }

  deleteMuscleGroup(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/MuscleGroups/${id}`);
  }

  saveMuscle(muscleGroupId: number, payload: Partial<Muscle>): Observable<Muscle> {
    return payload.id
      ? this.http.put<Muscle>(`${this.apiUrl}/MuscleGroups/${muscleGroupId}/muscles/${payload.id}`, payload)
      : this.http.post<Muscle>(`${this.apiUrl}/MuscleGroups/${muscleGroupId}/muscles`, payload);
  }

  deleteMuscle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/MuscleGroups/muscles/${id}`);
  }

  uploadExerciseImage(file: File): Observable<UploadedFile> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UploadedFile>(`${this.apiUrl}/files`, formData, {
      params: new HttpParams().set('folder', 'student-platform/exercises')
    });
  }

  uploadBadgeImage(file: File): Observable<UploadedFile> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UploadedFile>(`${this.apiUrl}/files`, formData, {
      params: new HttpParams().set('folder', 'student-platform/badges')
    });
  }

  getRoutines(clientId?: number): Observable<RoutineAssignment[]> {
    let params = new HttpParams();
    if (clientId) params = params.set('clientId', clientId);
    return this.http.get<RoutineAssignment[]>(`${this.apiUrl}/Routines`, { params });
  }

  getRoutineTemplates(): Observable<RoutineTemplate[]> {
    return this.http.get<RoutineTemplate[]>(`${this.apiUrl}/Routines/templates`);
  }

  createRoutine(payload: RoutinePayload): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${this.apiUrl}/Routines`, payload);
  }

  createRoutinesBatch(items: Array<RoutinePayload & { clientKey: string }>): Observable<{ routineIds: Record<string, number> }> {
    return this.http.post<{ routineIds: Record<string, number> }>(`${this.apiUrl}/Routines/batch`, { items });
  }

  updateRoutine(id: number, payload: RoutinePayload): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/Routines/${id}`, payload);
  }

  deleteRoutine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Routines/${id}`);
  }

  assignRoutine(routineId: number, payload: AssignRoutinePayload): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/Routines/${routineId}/assign`, payload);
  }

  getTrainingPlans(): Observable<TrainingPlan[]> {
    return this.http.get<TrainingPlan[]>(`${this.apiUrl}/TrainingPlans`);
  }

  getTrainingPlan(id: number): Observable<TrainingPlan> {
    return this.http.get<TrainingPlan>(`${this.apiUrl}/TrainingPlans/${id}`);
  }

  getTrainingPlanAssignments(clientId?: number, includeInactive = false): Observable<TrainingPlanAssignment[]> {
    let params = new HttpParams();
    if (clientId) params = params.set('clientId', clientId);
    if (includeInactive) params = params.set('includeInactive', true);
    return this.http.get<TrainingPlanAssignment[]>(`${this.apiUrl}/TrainingPlans/assignments`, { params });
  }

  createTrainingPlan(payload: TrainingPlanPayload): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${this.apiUrl}/TrainingPlans`, payload);
  }

  composeTrainingPlan(payload: TrainingPlanCompositionPayload): Observable<TrainingPlanCompositionResult> {
    return this.http.post<TrainingPlanCompositionResult>(`${this.apiUrl}/TrainingPlans/compose`, payload);
  }

  composeTrainingPlansBatch(payload: TrainingPlanCompositionBatchPayload): Observable<TrainingPlanCompositionBatchResult> {
    return this.http.post<TrainingPlanCompositionBatchResult>(`${this.apiUrl}/TrainingPlans/compose-batch`, payload);
  }

  updateTrainingPlan(id: number, payload: TrainingPlanPayload): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/TrainingPlans/${id}`, payload);
  }

  deleteTrainingPlan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/TrainingPlans/${id}`);
  }

  assignTrainingPlan(trainingPlanId: number, payload: AssignTrainingPlanPayload): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/TrainingPlans/${trainingPlanId}/assign`, payload);
  }

  unassignTrainingPlan(assignmentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/TrainingPlans/assignments/${assignmentId}`);
  }

  getWorkoutSessions(clientId?: number, from?: string, to?: string): Observable<WorkoutSession[]> {
    let params = new HttpParams();
    if (clientId) params = params.set('clientId', clientId);
    if (from) params = params.set('from', from);
    if (to) params = params.set('to', to);
    return this.http.get<WorkoutSession[]>(`${this.apiUrl}/Training/sessions`, { params });
  }

  saveWorkoutSession(payload: WorkoutSessionPayload): Observable<WorkoutSession> {
    return this.http.post<WorkoutSession>(`${this.apiUrl}/Training/sessions`, payload);
  }

  saveWorkoutSessionProfessionalReview(sessionId: number, payload: WorkoutSessionProfessionalReviewPayload): Observable<WorkoutSession> {
    return this.http.put<WorkoutSession>(`${this.apiUrl}/Training/sessions/${sessionId}/professional-review`, payload);
  }

  getAttendance(clientId?: number, from?: string, to?: string): Observable<AttendanceLog[]> {
    let params = new HttpParams();
    if (clientId) params = params.set('clientId', clientId);
    if (from) params = params.set('from', from);
    if (to) params = params.set('to', to);
    return this.http.get<AttendanceLog[]>(`${this.apiUrl}/Training/attendance`, { params });
  }

  saveAttendance(clientId: number, date: string, notes?: string): Observable<AttendanceLog> {
    return this.http.post<AttendanceLog>(`${this.apiUrl}/Training/attendance`, { clientId, date, source: 'Manual', notes: notes || null });
  }

  getExerciseProgress(exerciseId: number, clientId?: number): Observable<ExerciseProgressHistory> {
    let params = new HttpParams();
    if (clientId) params = params.set('clientId', clientId);
    return this.http.get<ExerciseProgressHistory>(`${this.apiUrl}/Training/progress/${exerciseId}`, { params });
  }

  getRanking(metric: 'attendance' | 'achievements' | 'habits' | 'total', period: 'monthly' | 'annual', year?: number, month?: number): Observable<RankingResponse> {
    const params = new HttpParams().set('metric', metric).set('period', period);
    let nextParams = params;
    if (year) nextParams = nextParams.set('year', year);
    if (month) nextParams = nextParams.set('month', month);
    return this.http.get<RankingResponse>(`${this.apiUrl}/Rankings`, { params: nextParams });
  }

  getAchievements(): Observable<AchievementTemplate[]> {
    return this.http.get<AchievementTemplate[]>(`${this.apiUrl}/Achievements`);
  }

  getGamificationMetrics(): Observable<GamificationMetrics> {
    return this.http.get<GamificationMetrics>(`${this.apiUrl}/Achievements/metrics`);
  }

  createAchievement(payload: AchievementPayload): Observable<AchievementTemplate> {
    return this.http.post<AchievementTemplate>(`${this.apiUrl}/Achievements`, payload);
  }

  updateAchievement(id: number, payload: AchievementPayload): Observable<AchievementTemplate> {
    return this.http.put<AchievementTemplate>(`${this.apiUrl}/Achievements/${id}`, payload);
  }

  deleteAchievement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Achievements/${id}`);
  }

  getHabitDefinitions(): Observable<HabitDefinition[]> {
    return this.http.get<HabitDefinition[]>(`${this.apiUrl}/Habits`, {
      params: new HttpParams().set('includeInactive', 'true')
    });
  }

  createHabitDefinition(payload: HabitDefinitionPayload): Observable<HabitDefinition> {
    return this.http.post<HabitDefinition>(`${this.apiUrl}/Habits`, payload);
  }

  updateHabitDefinition(id: number, payload: HabitDefinitionPayload): Observable<HabitDefinition> {
    return this.http.put<HabitDefinition>(`${this.apiUrl}/Habits/${id}`, payload);
  }

  deleteHabitDefinition(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Habits/${id}`);
  }
}
