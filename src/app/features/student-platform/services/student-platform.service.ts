import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Exercise, ExercisePayload, RankingResponse, RoutineAssignment, RoutinePayload } from '../models/student-platform.model';

@Injectable({ providedIn: 'root' })
export class StudentPlatformService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api`;

  getExercises(search = ''): Observable<Exercise[]> {
    let params = new HttpParams();
    if (search.trim()) params = params.set('search', search.trim());
    return this.http.get<Exercise[]>(`${this.apiUrl}/Exercises`, { params });
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

  getRoutines(clientId?: number): Observable<RoutineAssignment[]> {
    let params = new HttpParams();
    if (clientId) params = params.set('clientId', clientId);
    return this.http.get<RoutineAssignment[]>(`${this.apiUrl}/Routines`, { params });
  }

  createRoutine(payload: RoutinePayload): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${this.apiUrl}/Routines`, payload);
  }

  getRanking(metric: 'attendance' | 'achievements', period: 'monthly' | 'annual'): Observable<RankingResponse> {
    const params = new HttpParams().set('metric', metric).set('period', period);
    return this.http.get<RankingResponse>(`${this.apiUrl}/Rankings`, { params });
  }
}
