import { MembershipPlan } from '../../membership-plans/models/membership-plan.model';

export interface ClientRelationRecord {
  [key: string]: unknown;
}

export interface ClientMembership {
  id?: number;
  membershipPlanId: number;
  fechaInicio: string;
  fechaFin: string;
  estado?: string;
  precioFinal: number;
  plan?: MembershipPlan | null;
}

export interface ClientAppAccessPayload {
  createAccess: boolean;
}

export interface Client {
  id: number;
  branchId: number;
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: string;
  telefono: string;
  email: string;
  direccion: string;
  fechaAlta?: string;
  membership?: ClientMembership | null;
  membershipsHistory?: ClientMembership[];
  payments: ClientRelationRecord[];
  debePago: boolean;
  ultimoPagoFecha?: string | null;
  membresiaProximaAVencer?: boolean;
  membresiaVencimientoNotificado?: boolean;
}

export interface ClientCreatePayload {
  branchId: number;
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: string;
  telefono: string;
  email: string;
  direccion: string;
  appAccess?: ClientAppAccessPayload | null;
  membership: ClientMembership;
}

export interface ClientUpdatePayload extends ClientCreatePayload {
  id: number;
}

export interface ClientFilters {
  nombre?: string;
  apellido?: string;
  dni?: string;
}
