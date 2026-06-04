import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  DashboardActiveMembershipByPlan,
  DashboardBirthdayItem,
  DashboardEmployeeCountResponse,
  DashboardFinancialSummaryResponse,
  DashboardMonthlyPaymentsResponse,
  DashboardNewClientsResponse,
  DashboardPendingPayment,
  DashboardRecentPayment,
  DashboardSnapshot,
  DashboardSummaryResponse,
  DashboardUpcomingExpiration
} from '../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/Dashboard`;

  getSummary(): Observable<DashboardSummaryResponse> {
    return this.http.get<DashboardSummaryResponse>(`${this.apiUrl}/summary`);
  }

  getUpcomingBirthdays(): Observable<DashboardBirthdayItem[]> {
    return this.http.get<DashboardBirthdayItem[]>(`${this.apiUrl}/upcoming-birthdays`);
  }

  getActiveMembershipsByPlan(): Observable<DashboardActiveMembershipByPlan[]> {
    return this.http.get<DashboardActiveMembershipByPlan[]>(`${this.apiUrl}/active-memberships-by-plan`);
  }

  getNewClients(): Observable<DashboardNewClientsResponse> {
    return this.http.get<DashboardNewClientsResponse>(`${this.apiUrl}/new-clients`);
  }

  getRecentPayments(): Observable<DashboardRecentPayment[]> {
    return this.http.get<DashboardRecentPayment[]>(`${this.apiUrl}/recent-payments`);
  }

  getFinancialSummary(): Observable<DashboardFinancialSummaryResponse> {
    return this.http.get<DashboardFinancialSummaryResponse>(`${this.apiUrl}/financial-summary`);
  }

  getMonthlyPayments(months = 6): Observable<DashboardMonthlyPaymentsResponse> {
    const params = new HttpParams().set('Months', months);
    return this.http.get<DashboardMonthlyPaymentsResponse>(`${this.apiUrl}/monthly-payments`, { params });
  }

  getEmployeeCount(): Observable<DashboardEmployeeCountResponse> {
    return this.http.get<DashboardEmployeeCountResponse>(`${this.apiUrl}/employee-count`);
  }

  getUpcomingExpirations(days = 40): Observable<DashboardUpcomingExpiration[]> {
    const params = new HttpParams().set('Days', days);
    return this.http.get<DashboardUpcomingExpiration[]>(`${this.apiUrl}/upcoming-expirations`, { params });
  }

  getPendingPayments(): Observable<DashboardPendingPayment[]> {
    return this.http.get<DashboardPendingPayment[]>(`${this.apiUrl}/pending-payments`);
  }

  getSnapshot(): Observable<DashboardSnapshot> {
    return forkJoin({
      summary: this.getSummary(),
      upcomingBirthdays: this.getUpcomingBirthdays(),
      activeMembershipsByPlan: this.getActiveMembershipsByPlan(),
      newClients: this.getNewClients(),
      recentPayments: this.getRecentPayments(),
      financialSummary: this.getFinancialSummary(),
      monthlyPayments: this.getMonthlyPayments(),
      employeeCount: this.getEmployeeCount(),
      upcomingExpirations: this.getUpcomingExpirations(),
      pendingPayments: this.getPendingPayments()
    });
  }
}
