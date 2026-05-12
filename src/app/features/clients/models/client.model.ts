import { MembershipPlan } from '../../membership-plans/models/membership-plan.model';
import { HealthPatientDetail } from '../../health/models/health.model';

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

export interface ClientInitialPaymentPayload {
  fechaPago: string;
  monto: number;
  paymentMethodId: number;
  cashMovementCategoryId?: number | null;
  collectedByEmployeeEmail: string;
  periodYear: number;
  periodMonth: number;
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
  tieneLesion: boolean;
  observaciones?: string | null;
  fechaAlta?: string;
  membership?: ClientMembership | null;
  membershipsHistory?: ClientMembership[];
  payments: ClientRelationRecord[];
  healthProfile?: HealthPatientDetail | null;
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
  tieneLesion: boolean;
  observaciones: string;
  appAccess?: ClientAppAccessPayload | null;
  membership?: ClientMembership | null;
  initialPayment?: ClientInitialPaymentPayload | null;
}

export interface ClientUpdatePayload extends ClientCreatePayload {
  id: number;
}

export interface ClientFilters {
  nombre?: string;
  apellido?: string;
  dni?: string;
}

export interface ClientImportError {
  rowNumber: number;
  message: string;
}

export interface ClientImportResult {
  totalRows: number;
  importedCount: number;
  skippedCount: number;
  errors: ClientImportError[];
}
