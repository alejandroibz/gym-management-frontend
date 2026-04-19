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
}

export interface PaymentFilters {
  clientId?: number;
  periodYear?: number;
  periodMonth?: number;
}

export interface PaymentCreatePayload {
  clientId: number;
  clientMembershipId: number;
  fechaPago: string;
  monto: number;
  confirmado: boolean;
  paymentMethodId: number;
  cashMovementCategoryId: number;
  periodYear: number;
  periodMonth: number;
}
