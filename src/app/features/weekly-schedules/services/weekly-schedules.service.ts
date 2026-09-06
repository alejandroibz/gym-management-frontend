import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BulkAssignmentPayload, BulkAssignmentPreview, TrainerSchedule, WeeklyAssignment } from '../models/weekly-schedule.model';

@Injectable({ providedIn: 'root' })
export class WeeklySchedulesService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/api/weekly-schedules`;
  getTrainers(branchId?: number) { const params = branchId ? new HttpParams().set('BranchId', branchId) : undefined; return this.http.get<TrainerSchedule[]>(`${this.url}/trainers`, { params }); }
  saveTrainer(employeeId: number, slots: { dayOfWeek: number; shift: number }[]) { return this.http.put<void>(`${this.url}/trainers/${employeeId}`, { employeeId, slots }); }
  getAssignments() { return this.http.get<WeeklyAssignment[]>(`${this.url}/students`); }
  preview(payload: BulkAssignmentPayload) { return this.http.post<BulkAssignmentPreview>(`${this.url}/assignments/preview`, payload); }
  apply(payload: BulkAssignmentPayload) { return this.http.post<BulkAssignmentPreview>(`${this.url}/assignments`, payload); }
  delete(clientIds: number[], days?: number[]) { return this.http.delete<void>(`${this.url}/assignments`, { body: { clientIds, days } }); }
}
