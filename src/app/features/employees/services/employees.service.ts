import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PagedResponse } from '../../../core/models/paged-response.model';
import {
  Employee,
  EmployeeCreatePayload,
  EmployeeFilters,
  EmployeeUpdatePayload
} from '../models/employee.model';

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
export class EmployeesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/Employees`;

  getPaged(
    pageNumber: number,
    pageSize: number,
    filters: EmployeeFilters = {}
  ): Observable<PagedResponse<Employee>> {
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

    if (filters.employeeCategoryId !== undefined && filters.employeeCategoryId !== null) {
      params = params.set('EmployeeCategoryId', filters.employeeCategoryId);
    }

    return this.http
      .get<RawPagedResponse<Employee> | Employee[]>(this.apiUrl, { params })
      .pipe(map(response => this.normalizePagedResponse(response, pageNumber, pageSize)));
  }

  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  create(payload: EmployeeCreatePayload): Observable<void> {
    return this.http.post<void>(this.apiUrl, payload);
  }

  update(id: number, payload: EmployeeUpdatePayload): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private normalizePagedResponse(
    response: RawPagedResponse<Employee> | Employee[],
    pageNumber: number,
    pageSize: number
  ): PagedResponse<Employee> {
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
