export interface Payment {
  id: number;
  clientId: number;
  clientMembershipId: number;
  fechaPago: string;
  monto: number;
  estado: string;
  paymentMethodId: number;
  paymentMethodNombre?: string | null;
  cashMovementCategoryId?: number | null;
  cashMovementCategoryNombre?: string | null;
  membershipPlanNombre?: string | null;
  periodYear?: number | null;
  periodMonth?: number | null;
  collectedByEmployeeId?: number | null;
  collectedByEmployeeEmail?: string | null;
  collectedByEmployeeNombre?: string | null;
}

export interface PaymentFilters {
  clientId?: number;
  periodYear?: number;
  periodMonth?: number;
}

export interface PaymentCreatePayload {
  clientId: number;
  clientMembershipId?: number | null;
  fechaPago: string;
  monto: number;
  paymentMethodId: number;
  cashMovementCategoryId: number;
  periodYear: number;
  periodMonth: number;
  collectedByEmployeeEmail: string;
}

export interface PaymentUpdatePayload {
  id: number;
  clientId: number;
  clientMembershipId?: number | null;
  fechaPago: string;
  monto: number;
  medioPago: string;
  estado: string;
  paymentMethodId: number;
  periodYear: number;
  periodMonth: number;
  collectedByEmployeeEmail: string;
}
