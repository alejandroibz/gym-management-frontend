export interface Payment {
  id: number;
  clientId: number;
  clientMembershipId: number;
  fechaPago: string;
  monto: number;
  montoOriginal?: number | null;
  descuentoMonto?: number | null;
  descuentoPorcentaje?: number | null;
  descuentoMotivo?: string | null;
  tieneDescuento?: boolean;
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
  hasDiscount?: boolean;
}

export interface PaymentCreatePayload {
  clientId: number;
  clientMembershipId?: number | null;
  fechaPago: string;
  monto: number;
  montoOriginal?: number | null;
  descuentoMonto: number;
  descuentoPorcentaje?: number | null;
  descuentoMotivo?: string | null;
  paymentMethodId: number;
  cashMovementCategoryId: number;
  periodYear: number;
  periodMonth: number;
  collectedByEmployeeEmail: string;
}

export interface PaymentUpdatePayload extends PaymentCreatePayload {
  id: number;
}
