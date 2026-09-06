import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ClientCreatePayload } from '../clients/models/client.model';
export interface Applicant {
  id: number; firstName: string; lastName: string; documentNumber: string; whatsapp: string; email: string;
  desiredStartDate: string; weeklyFrequency: string; preferredShift: string; receivedAtUtc: string;
  status: string; clientId: number | null;
}
export interface ClientMatch { id: number; nombre: string; apellido: string; dni: string; activo: boolean; }
export interface ApplicantDetail extends Applicant {
  version: string; birthDate: string; address: string; goalsAndBackground: string; healthConsiderations: string;
  consent: boolean; sensitiveDataConsent: boolean; consentVersion: string; source: string; followUpNotes: string;
  updatedAtUtc: string | null; updatedBy: string | null; matchingClients: ClientMatch[];
  original: Record<string, unknown>;
  history: { id: number; changedAtUtc: string; changedBy: string; action: string; data: Record<string, unknown> }[];
}
export interface ApplicantPage { items: Applicant[]; totalCount: number; pageNumber: number; pageSize: number; }
export const statusLabel = (status: string) => ({ Pending: 'Pendiente', Contacted: 'Contactado', Enrolled: 'Inscripto', Discarded: 'Descartado' }[status] ?? status);
@Injectable({ providedIn: 'root' })
export class PreregistrationsService {
  private readonly http = inject(HttpClient);
  private readonly api = `${environment.apiUrl}/api/preregistrations`;
  get(id: number) { return this.http.get<ApplicantDetail>(`${this.api}/${id}`); }
  list(search: string, status: string, pageNumber: number, pageSize: number) { return this.http.get<ApplicantPage>(this.api, { params: { search, status, pageNumber, pageSize } }); }
  edit(id: number, version: string, data: Record<string, string>) { return this.http.put<void>(`${this.api}/${id}`, { ...data, version }); }
  link(id: number, version: string, clientId: number) { return this.http.post<{ clientId: number }>(`${this.api}/${id}/link`, { version, clientId }); }
  enroll(id: number, version: string, client: ClientCreatePayload) { return this.http.post<{ clientId: number }>(`${this.api}/${id}/enroll`, { version, client }); }
  branches() { return this.http.get<{ id: number; nombre: string }[]>(`${this.api}/branches`); }
}