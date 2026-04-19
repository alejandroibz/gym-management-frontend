import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PagedResponse } from '../../../core/models/paged-response.model';
import {
  MembershipPlan,
  MembershipPlanCreatePayload,
  MembershipPlanFilters,
  MembershipPlanUpdatePayload
} from '../models/membership-plan.model';

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
export class MembershipPlansService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/MembershipPlans`;

  getPaged(
    pageNumber: number,
    pageSize: number,
    filters: MembershipPlanFilters = {}
  ): Observable<PagedResponse<MembershipPlan>> {
    let params = new HttpParams()
      .set('PageNumber', pageNumber)
      .set('PageSize', pageSize);

    if (filters.nombre) {
      params = params.set('Nombre', filters.nombre);
    }

    return this.http
      .get<RawPagedResponse<MembershipPlan> | MembershipPlan[]>(this.apiUrl, { params })
      .pipe(map(response => this.normalizePagedResponse(response, pageNumber, pageSize)));
  }

  getById(id: number): Observable<MembershipPlan> {
    return this.http.get<MembershipPlan>(`${this.apiUrl}/${id}`);
  }

  create(payload: MembershipPlanCreatePayload): Observable<void> {
    return this.http.post<void>(this.apiUrl, payload);
  }

  update(id: number, payload: MembershipPlanUpdatePayload): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private normalizePagedResponse(
    response: RawPagedResponse<MembershipPlan> | MembershipPlan[],
    pageNumber: number,
    pageSize: number
  ): PagedResponse<MembershipPlan> {
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
