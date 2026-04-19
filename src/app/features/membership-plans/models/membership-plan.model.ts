export interface MembershipPlan {
  id: number;
  gymId: number;
  nombre: string;
  descripcion: string;
  precio: number;
  duracionDias: number;
  fechaCreacion?: string;
}

export interface MembershipPlanCreatePayload {
  gymId: number;
  nombre: string;
  descripcion: string;
  precio: number;
  duracionDias: number;
}

export interface MembershipPlanUpdatePayload extends MembershipPlanCreatePayload {
  id: number;
}

export interface MembershipPlanFilters {
  nombre?: string;
}
