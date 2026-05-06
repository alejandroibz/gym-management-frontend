import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PagedResponse } from '../../../core/models/paged-response.model';
import { Payment, PaymentCreatePayload, PaymentFilters, PaymentUpdatePayload } from '../models/payment.model';

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
export class PaymentsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/Payments`;

  getPaged(pageNumber: number, pageSize: number, filters: PaymentFilters = {}): Observable<PagedResponse<Payment>> {
    let params = new HttpParams()
      .set('PageNumber', pageNumber)
      .set('PageSize', pageSize);

    if (filters.clientId) {
      params = params.set('ClientId', filters.clientId);
    }

    if (filters.periodYear) {
      params = params.set('PeriodYear', filters.periodYear);
    }

    if (filters.periodMonth) {
      params = params.set('PeriodMonth', filters.periodMonth);
    }

    return this.http
      .get<RawPagedResponse<Payment> | Payment[]>(this.apiUrl, { params })
      .pipe(map(response => this.normalizePagedResponse(response, pageNumber, pageSize)));
  }

  create(payload: PaymentCreatePayload): Observable<void> {
    return this.http.post<void>(this.apiUrl, payload);
  }

  update(id: number, payload: PaymentUpdatePayload): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  confirm(id: number, cashMovementCategoryId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/confirm`, cashMovementCategoryId);
  }

  private normalizePagedResponse(
    response: RawPagedResponse<Payment> | Payment[],
    pageNumber: number,
    pageSize: number
  ): PagedResponse<Payment> {
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
