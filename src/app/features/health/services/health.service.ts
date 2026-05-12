import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  HealthAppointment,
  HealthAppointmentPayload,
  ConfirmHealthPaymentPayload,
  HealthEvaluation,
  HealthEvaluationPayload,
  HealthPagedResponse,
  HealthPatientPayload,
  HealthPatientProfile,
  HealthPayment,
  HealthPaymentPayload,
  HealthPaymentSummary,
  HealthPatientDetail,
  HealthPlanSubscription,
  HealthPlanSubscriptionPayload,
  HealthProfessional,
  HealthProfessionalPayload,
  HealthProfessionalType,
  HealthProfessionalTypePayload,
  HealthService,
  HealthServicePayload,
  HealthTrainerNote,
  HealthTrainerNotePayload
} from '../models/health.model';

@Injectable({ providedIn: 'root' })
export class HealthServiceApi {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/health`;

  getProfessionalTypes(): Observable<HealthPagedResponse<HealthProfessionalType>> {
    return this.http.get<HealthPagedResponse<HealthProfessionalType>>(`${this.apiUrl}/professional-types`, {
      params: new HttpParams().set('pageSize', 200)
    });
  }

  createProfessionalType(payload: HealthProfessionalTypePayload): Observable<HealthProfessionalType> {
    return this.http.post<HealthProfessionalType>(`${this.apiUrl}/professional-types`, payload);
  }

  updateProfessionalType(id: number, payload: HealthProfessionalTypePayload): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/professional-types/${id}`, payload);
  }

  deleteProfessionalType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/professional-types/${id}`);
  }

  getServices(professionalTypeId?: number | null): Observable<HealthPagedResponse<HealthService>> {
    let params = new HttpParams().set('pageSize', 200);
    if (professionalTypeId) {
      params = params.set('professionalTypeId', professionalTypeId);
    }
    return this.http.get<HealthPagedResponse<HealthService>>(`${this.apiUrl}/services`, {
      params
    });
  }

  createService(payload: HealthServicePayload): Observable<HealthService> {
    return this.http.post<HealthService>(`${this.apiUrl}/services`, payload);
  }

  updateService(id: number, payload: HealthServicePayload): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/services/${id}`, payload);
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/services/${id}`);
  }

  getProfessionals(professionalTypeId?: number | null): Observable<HealthPagedResponse<HealthProfessional>> {
    let params = new HttpParams().set('pageSize', 200);
    if (professionalTypeId) {
      params = params.set('professionalTypeId', professionalTypeId);
    }
    return this.http.get<HealthPagedResponse<HealthProfessional>>(`${this.apiUrl}/professionals`, {
      params
    });
  }

  createProfessional(payload: HealthProfessionalPayload): Observable<HealthProfessional> {
    return this.http.post<HealthProfessional>(`${this.apiUrl}/professionals`, payload);
  }

  updateProfessional(id: number, payload: HealthProfessionalPayload): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/professionals/${id}`, payload);
  }

  deleteProfessional(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/professionals/${id}`);
  }

  getPatients(search = '', pageNumber = 1, pageSize = 10): Observable<HealthPagedResponse<HealthPatientProfile>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    if (search.trim()) {
      params = params.set('search', search.trim());
    }
    return this.http.get<HealthPagedResponse<HealthPatientProfile>>(`${this.apiUrl}/patients`, { params });
  }

  createPatient(payload: HealthPatientPayload): Observable<HealthPatientProfile> {
    return this.http.post<HealthPatientProfile>(`${this.apiUrl}/patients`, payload);
  }

  updatePatient(id: number, payload: HealthPatientPayload): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/patients/${id}`, payload);
  }

  getPatientDetail(id: number): Observable<HealthPatientDetail> {
    return this.http.get<HealthPatientDetail>(`${this.apiUrl}/patients/${id}/detail`);
  }

  getAppointments(from: string, to: string, professionalId?: number | null): Observable<HealthPagedResponse<HealthAppointment>> {
    let params = new HttpParams().set('from', from).set('to', to).set('pageSize', 500);
    if (professionalId) {
      params = params.set('professionalId', professionalId);
    }
    return this.http.get<HealthPagedResponse<HealthAppointment>>(`${this.apiUrl}/appointments`, { params });
  }

  createAppointment(payload: HealthAppointmentPayload): Observable<HealthAppointment> {
    return this.http.post<HealthAppointment>(`${this.apiUrl}/appointments`, payload);
  }

  updateAppointment(id: number, payload: HealthAppointmentPayload): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/appointments/${id}`, payload);
  }

  updateAppointmentStatus(id: number, status: string, isBillable?: boolean | null, cancellationReason?: string | null): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/appointments/${id}/status`, { status, isBillable, cancellationReason });
  }

  getEvaluations(patientProfileId?: number): Observable<HealthPagedResponse<HealthEvaluation>> {
    let params = new HttpParams().set('pageSize', 100);
    if (patientProfileId) {
      params = params.set('patientProfileId', patientProfileId);
    }
    return this.http.get<HealthPagedResponse<HealthEvaluation>>(`${this.apiUrl}/evaluations`, { params });
  }

  createEvaluation(payload: HealthEvaluationPayload): Observable<HealthEvaluation> {
    return this.http.post<HealthEvaluation>(`${this.apiUrl}/evaluations`, payload);
  }

  getTrainerNotes(patientProfileId?: number): Observable<HealthPagedResponse<HealthTrainerNote>> {
    let params = new HttpParams().set('pageSize', 100);
    if (patientProfileId) {
      params = params.set('patientProfileId', patientProfileId);
    }
    return this.http.get<HealthPagedResponse<HealthTrainerNote>>(`${this.apiUrl}/trainer-notes`, { params });
  }

  createTrainerNote(payload: HealthTrainerNotePayload): Observable<HealthTrainerNote> {
    return this.http.post<HealthTrainerNote>(`${this.apiUrl}/trainer-notes`, payload);
  }

  updateTrainerNote(id: number, payload: HealthTrainerNotePayload): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/trainer-notes/${id}`, payload);
  }

  deleteTrainerNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/trainer-notes/${id}`);
  }

  getPayments(filters: { patientProfileId?: number | null; professionalTypeId?: number | null; professionalId?: number | null; from?: string; to?: string } = {}): Observable<HealthPagedResponse<HealthPayment>> {
    let params = new HttpParams().set('pageSize', 100);
    if (filters.patientProfileId) {
      params = params.set('patientProfileId', filters.patientProfileId);
    }
    if (filters.professionalTypeId) {
      params = params.set('professionalTypeId', filters.professionalTypeId);
    }
    if (filters.professionalId) {
      params = params.set('professionalId', filters.professionalId);
    }
    if (filters.from) {
      params = params.set('from', filters.from);
    }
    if (filters.to) {
      params = params.set('to', filters.to);
    }
    return this.http.get<HealthPagedResponse<HealthPayment>>(`${this.apiUrl}/payments`, { params });
  }

  getPaymentSummary(filters: { professionalTypeId?: number | null; professionalId?: number | null; from?: string; to?: string } = {}): Observable<HealthPaymentSummary> {
    let params = new HttpParams();
    if (filters.professionalTypeId) {
      params = params.set('professionalTypeId', filters.professionalTypeId);
    }
    if (filters.professionalId) {
      params = params.set('professionalId', filters.professionalId);
    }
    if (filters.from) {
      params = params.set('from', filters.from);
    }
    if (filters.to) {
      params = params.set('to', filters.to);
    }
    return this.http.get<HealthPaymentSummary>(`${this.apiUrl}/payments/summary`, { params });
  }

  createPayment(payload: HealthPaymentPayload): Observable<HealthPayment> {
    return this.http.post<HealthPayment>(`${this.apiUrl}/payments`, payload);
  }

  updatePayment(id: number, payload: HealthPaymentPayload): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/payments/${id}`, payload);
  }

  deletePayment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/payments/${id}`);
  }

  confirmPayment(id: number, payload: ConfirmHealthPaymentPayload): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/payments/${id}/confirm`, payload);
  }

  getSubscriptions(patientProfileId?: number): Observable<HealthPagedResponse<HealthPlanSubscription>> {
    let params = new HttpParams().set('pageSize', 100);
    if (patientProfileId) {
      params = params.set('patientProfileId', patientProfileId);
    }
    return this.http.get<HealthPagedResponse<HealthPlanSubscription>>(`${this.apiUrl}/subscriptions`, { params });
  }

  createSubscription(payload: HealthPlanSubscriptionPayload): Observable<HealthPlanSubscription> {
    return this.http.post<HealthPlanSubscription>(`${this.apiUrl}/subscriptions`, payload);
  }

  updateSubscription(id: number, payload: HealthPlanSubscriptionPayload): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/subscriptions/${id}`, payload);
  }

  deleteSubscription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/subscriptions/${id}`);
  }
}
