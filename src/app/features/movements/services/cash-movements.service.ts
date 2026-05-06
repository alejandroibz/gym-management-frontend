import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PagedResponse } from '../../../core/models/paged-response.model';
import {
  CashBalanceResponse,
  CashMovement,
  CashMovementCategoryMonthlySummary,
  CashMovementCreatePayload,
  CashMovementFilters
} from '../models/cash-movement.model';

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
export class CashMovementsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/CashMovements`;

  getPaged(pageNumber: number, pageSize: number, filters: CashMovementFilters = {}): Observable<PagedResponse<CashMovement>> {
    let params = new HttpParams()
      .set('PageNumber', pageNumber)
      .set('PageSize', pageSize);

    if (filters.tipo) {
      params = params.set('Tipo', filters.tipo);
    }

    if (filters.categoryId) {
      params = params.set('CategoryId', filters.categoryId);
    }

    if (filters.fechaMovimientoDesde) {
      params = params.set('FechaMovimientoDesde', filters.fechaMovimientoDesde);
    }

    if (filters.fechaMovimientoHasta) {
      params = params.set('FechaMovimientoHasta', filters.fechaMovimientoHasta);
    }

    return this.http
      .get<RawPagedResponse<CashMovement> | CashMovement[]>(this.apiUrl, { params })
      .pipe(map(response => this.normalizePagedResponse(response, pageNumber, pageSize)));
  }

  create(payload: CashMovementCreatePayload): Observable<void> {
    return this.http.post<void>(this.apiUrl, payload);
  }

  update(id: number, payload: CashMovementCreatePayload): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getMonthlyByCategories(year: number, month: number, categoryIds: number[] = []): Observable<CashMovementCategoryMonthlySummary[]> {
    let params = new HttpParams()
      .set('year', year)
      .set('month', month);

    for (const categoryId of categoryIds) {
      params = params.append('categoryIds', categoryId);
    }

    return this.http.get<CashMovementCategoryMonthlySummary[]>(`${this.apiUrl}/monthly-by-categories`, { params });
  }

  getBalance(): Observable<CashBalanceResponse> {
    return this.http.get<CashBalanceResponse>(`${this.apiUrl}/balance`);
  }

  private normalizePagedResponse(
    response: RawPagedResponse<CashMovement> | CashMovement[],
    pageNumber: number,
    pageSize: number
  ): PagedResponse<CashMovement> {
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
