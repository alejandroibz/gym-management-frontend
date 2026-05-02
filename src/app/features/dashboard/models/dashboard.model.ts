export interface DashboardSummaryResponse {
  totalClients: number;
  activeClients: number;
  activeMemberships: number;
  expiredMemberships: number;
  membershipsExpiringSoon: number;
  pendingPayments: number;
  todayIncome: number;
  monthIncome: number;
  totalEmployees: number;
  recentPayments: DashboardRecentPayment[];
  upcomingExpirations: DashboardUpcomingExpiration[];
  pendingPaymentsPreview: DashboardPendingPayment[];
}

export interface DashboardBirthdayItem {
  id: number;
  tipo: string;
  nombreCompleto: string;
  fechaNacimiento: string;
  fechaEvento: string;
  dias: number;
}

export interface DashboardActiveMembershipByPlan {
  membershipPlanId: number;
  planName: string;
  durationDays: number;
  planPrice: number;
  activeMembershipsCount: number;
  currentRevenueEstimate: number;
}

export interface DashboardDailyCount {
  date: string;
  count: number;
}

export interface DashboardNewClientsResponse {
  from: string;
  to: string;
  totalNewClients: number;
  dailyCounts: DashboardDailyCount[];
}

export interface DashboardRecentPayment {
  paymentId: number;
  clientId: number;
  clientFullName: string;
  paymentDate: string;
  amount: number;
  status?: string;
  paymentMethodName: string;
  membershipPlanName: string;
}

export interface DashboardFinancialSummaryResponse {
  from: string;
  to: string;
  confirmedIncome: number;
  confirmedPaymentsCount: number;
  pendingConfirmationAmount: number;
  pendingConfirmationCount: number;
  projectedIncome: number;
  averageConfirmedTicket: number;
}

export interface DashboardEmployeeCountResponse {
  totalEmployees: number;
}

export interface DashboardUpcomingExpiration {
  membershipId: number;
  clientId: number;
  clientFullName: string;
  planName: string;
  endDate: string;
  daysRemaining: number;
  price: number;
}

export interface DashboardPendingPayment {
  clientId: number;
  membershipId: number;
  clientFullName: string;
  planName: string;
  membershipEndDate: string;
  daysUntilExpiration?: number;
  periodYear: number;
  periodMonth: number;
}

export interface DashboardSnapshot {
  summary: DashboardSummaryResponse;
  upcomingBirthdays: DashboardBirthdayItem[];
  activeMembershipsByPlan: DashboardActiveMembershipByPlan[];
  newClients: DashboardNewClientsResponse;
  recentPayments: DashboardRecentPayment[];
  financialSummary: DashboardFinancialSummaryResponse;
  employeeCount: DashboardEmployeeCountResponse;
  upcomingExpirations: DashboardUpcomingExpiration[];
  pendingPayments: DashboardPendingPayment[];
}
