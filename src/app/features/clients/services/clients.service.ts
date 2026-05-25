import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PagedResponse } from '../../../core/models/paged-response.model';
import { Client, ClientCreatePayload, ClientFilters, ClientImportResult, ClientMembershipUpdatePayload, ClientUpdatePayload } from '../models/client.model';

interface RawPagedResponse<T> {
  items?: T[];
  data?: T[];
  results?: T[];
  pageNumber?: number;
  currentPage?: number;
  pageSize?: number;
  totalCount?: number;
  totalItems?: number;
  totalPages?: number;
}

@Injectable({ providedIn: 'root' })
export class ClientsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/Clients`;

  getPaged(
    pageNumber: number,
    pageSize: number,
    filters: ClientFilters = {}
  ): Observable<PagedResponse<Client>> {
    let params = new HttpParams()
      .set('PageNumber', pageNumber)
      .set('PageSize', pageSize);

    if (filters.nombre) {
      params = params.set('Nombre', filters.nombre);
    }

    if (filters.apellido) {
      params = params.set('Apellido', filters.apellido);
    }

    if (filters.dni) {
      params = params.set('Dni', filters.dni);
    }

    if (filters.search) {
      params = params.set('Search', filters.search);
    }

    if (filters.membershipPlanId) {
      params = params.set('MembershipPlanId', filters.membershipPlanId);
    }

    if (filters.paymentStatus) {
      params = params.set('PaymentStatus', filters.paymentStatus);
    }

    if (filters.clientStatus) {
      params = params.set('ClientStatus', filters.clientStatus);
    }

    return this.http
      .get<RawPagedResponse<Client> | Client[]>(this.apiUrl, { params })
      .pipe(map(response => this.normalizePagedResponse(response, pageNumber, pageSize)));
  }

  getById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  create(payload: ClientCreatePayload): Observable<void> {
    return this.http.post<void>(this.apiUrl, payload);
  }

  update(id: number, payload: ClientUpdatePayload): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  reactivate(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/reactivate`, {});
  }

  updateMembership(clientId: number, membershipId: number, payload: ClientMembershipUpdatePayload): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${clientId}/memberships/${membershipId}`, payload);
  }

  deleteMembership(clientId: number, membershipId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${clientId}/memberships/${membershipId}`);
  }

  importClients(file: File): Observable<ClientImportResult> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ClientImportResult>(`${this.apiUrl}/import`, formData);
  }

  private normalizePagedResponse(
    response: RawPagedResponse<Client> | Client[],
    pageNumber: number,
    pageSize: number
  ): PagedResponse<Client> {
    if (Array.isArray(response)) {
      return {
        items: response,
        pageNumber,
        pageSize,
        totalCount: response.length,
        totalPages: Math.max(1, Math.ceil(response.length / pageSize))
      };
    }

    const items = response.items ?? response.data ?? response.results ?? [];
    const totalCount = response.totalCount ?? response.totalItems ?? items.length;

    return {
      items,
      pageNumber: response.pageNumber ?? response.currentPage ?? pageNumber,
      pageSize: response.pageSize ?? pageSize,
      totalCount,
      totalPages: response.totalPages ?? Math.max(1, Math.ceil(totalCount / pageSize))
    };
  }
}
