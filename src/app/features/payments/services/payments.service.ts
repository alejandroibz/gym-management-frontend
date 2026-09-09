import { ConfirmDialogComponent } from '../../../core/components/confirm-dialog/confirm-dialog';
import { MatDialog } from '@angular/material/dialog';
import { switchMap, throwError } from 'rxjs';
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
  private readonly dialog = inject(MatDialog);
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

    if (filters.hasDiscount !== undefined) {
      params = params.set('hasDiscount', filters.hasDiscount);
    }

    return this.http
      .get<RawPagedResponse<Payment> | Payment[]>(this.apiUrl, { params })
      .pipe(map(response => this.normalizePagedResponse(response, pageNumber, pageSize)));
  }

  create(payload: PaymentCreatePayload): Observable<void> {
    payload.operationId ??= crypto.randomUUID();
    if (payload.periods?.length || payload.unpaidRenewal) {
      const { periods = [], unpaidRenewal, ...common } = payload;
      // Keep line identifiers stable when retrying this checkout.
      const payments = periods.map((period, index) => ({...common,...period,
        operationId: this.lineOperationId(payload.operationId!, index),
        montoOriginal: null, descuentoMonto: 0, descuentoPorcentaje: null, descuentoMotivo: null}));
      return this.http.post<void>(this.apiUrl + '/batch', {payments, unpaidRenewal});
    }
    return this.http.post<void>(this.apiUrl, payload);
  }

  private lineOperationId(id: string, index: number): string {
    const tail = (parseInt(id.slice(-8),16) + index) >>> 0;
    return id.slice(0,-8) + tail.toString(16).padStart(8,'0');
  }

  update(id: number, payload: PaymentUpdatePayload): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.dialog.open(ConfirmDialogComponent,{data:{title:'Anular cobro',message:'El cobro dejará de contar como ingreso. La contratación conserva sus fechas y vuelve a tener saldo pendiente. Si también se cancela el servicio, desactivá esa contratación por separado.',confirmText:'Anular cobro'}}).afterClosed().pipe(switchMap(confirmed=> confirmed ? this.http.delete<void>(`${this.apiUrl}/${id}`) : throwError(()=>({error:{message:'Anulación cancelada.'}}))));
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
