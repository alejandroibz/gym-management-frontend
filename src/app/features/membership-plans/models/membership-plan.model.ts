export interface MembershipPlan {
  id: number;
  gymId: number;
  nombre: string;
  descripcion: string;
  precio: number;
  duracionDias: number;
  durationUnit?: string;
  durationQuantity?: number;
  fechaCreacion?: string;
}

export interface MembershipPlanCreatePayload {
  gymId: number;
  nombre: string;
  descripcion: string;
  precio: number;
  duracionDias: number;
  durationUnit?: string;
  durationQuantity?: number;
}

export interface MembershipPlanUpdatePayload extends MembershipPlanCreatePayload {
  id: number;
}

export interface MembershipPlanFilters {
  nombre?: string;
}
