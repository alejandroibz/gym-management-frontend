export interface HealthPagedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages?: number;
}

export interface HealthProfessional {
  id: number;
  employeeId: number;
  healthProfessionalTypeId?: number | null;
  professionalTypeName?: string | null;
  employeeName: string;
  employeeEmail?: string | null;
  specialty: string;
  licenseNumber?: string | null;
  notes?: string | null;
  activo: boolean;
}

export interface HealthService {
  id: number;
  healthProfessionalTypeId?: number | null;
  professionalTypeName?: string | null;
  name: string;
  description?: string | null;
  price: number;
  defaultDurationMinutes: number;
  isMonthlyPlan: boolean;
  sessionsPerWeek?: number | null;
  activo: boolean;
}

export interface HealthPatientProfile {
  id: number;
  clientId: number;
  clientName: string;
  dni?: string | null;
  phone?: string | null;
  email?: string | null;
  primaryProfessionalId?: number | null;
  primaryProfessionalName?: string | null;
  healthInsuranceName?: string | null;
  healthInsuranceNumber?: string | null;
  clinicalNotes?: string | null;
  activo: boolean;
}

export interface ArchiveHealthPatientPayload {
  cancelPendingAppointments: boolean;
  finishActiveSubscriptions: boolean;
}

export interface HealthAppointment {
  id: number;
  healthPatientProfileId: number;
  patientName: string;
  healthProfessionalId: number;
  professionalName: string;
  healthServiceId?: number | null;
  serviceName?: string | null;
  startsAt: string;
  endsAt: string;
  status: string;
  isWalkIn: boolean;
  isBillable?: boolean | null;
  cancellationReason?: string | null;
  notes?: string | null;
  rescheduledFromAppointmentId?: number | null;
}

export interface HealthEvaluation {
  id: number;
  healthPatientProfileId: number;
  healthProfessionalId: number;
  healthAppointmentId?: number | null;
  evaluationDate: string;
  diagnosis?: string | null;
  nextSteps?: string | null;
  privateNotes?: string | null;
}

export interface HealthTrainerNote {
  id: number;
  healthPatientProfileId: number;
  healthProfessionalId: number;
  title: string;
  restrictions?: string | null;
  trainingIndications?: string | null;
  alertNotes?: string | null;
  visibleFrom?: string | null;
  visibleUntil?: string | null;
}

export interface HealthPayment {
  id: number;
  healthPatientProfileId: number;
  patientName: string;
  healthProfessionalId?: number | null;
  professionalName?: string | null;
  healthProfessionalTypeId?: number | null;
  professionalTypeName?: string | null;
  healthAppointmentId?: number | null;
  healthEvaluationId?: number | null;
  healthPlanSubscriptionId?: number | null;
  paymentMethodId: number;
  paymentMethodName?: string | null;
  cashMovementCategoryId?: number | null;
  cashMovementId?: number | null;
  fechaPago: string;
  monto: number;
  montoOriginal?: number | null;
  descuentoMonto?: number | null;
  descuentoPorcentaje?: number | null;
  descuentoMotivo?: string | null;
  tieneDescuento?: boolean;
  concepto: string;
  estado: string;
  confirmado: boolean;
  collectedByEmployeeEmail?: string | null;
  periodYear: number;
  periodMonth: number;
}

export interface ConfirmHealthPaymentPayload {
  cashMovementCategoryId: number;
  registeredByEmployeeEmail: string;
}

export interface HealthPlanSubscription {
  id: number;
  healthPatientProfileId: number;
  patientName?: string | null;
  healthProfessionalId: number;
  professionalName?: string | null;
  healthServiceId: number;
  serviceName?: string | null;
  startDate: string;
  endDate: string;
  monthlyAmount: number;
  sessionsPerWeek: number;
  status: string;
  notes?: string | null;
}

export interface HealthProfessionalType {
  id: number;
  name: string;
  description?: string | null;
  activo: boolean;
}

export interface HealthPaymentSummaryGroup {
  id?: number | null;
  name: string;
  totalAmount: number;
  paymentCount: number;
}

export interface HealthPaymentSummary {
  totalAmount: number;
  paymentCount: number;
  byProfessionalType: HealthPaymentSummaryGroup[];
  byProfessional: HealthPaymentSummaryGroup[];
}

export interface HealthPatientDetail {
  patient: HealthPatientProfile;
  appointments: HealthAppointment[];
  evaluations: HealthEvaluation[];
  trainerNotes: HealthTrainerNote[];
  payments: HealthPayment[];
  subscriptions: HealthPlanSubscription[];
}

export interface HealthServicePayload {
  healthProfessionalTypeId?: number | null;
  name: string;
  description?: string | null;
  price: number;
  defaultDurationMinutes: number;
  isMonthlyPlan: boolean;
  sessionsPerWeek?: number | null;
}

export interface HealthProfessionalPayload {
  employeeId: number;
  healthProfessionalTypeId?: number | null;
  specialty: string;
  licenseNumber?: string | null;
  notes?: string | null;
}

export interface HealthProfessionalTypePayload {
  name: string;
  description?: string | null;
}
export type HealthPatientPayload = Omit<HealthPatientProfile, 'id' | 'clientName' | 'dni' | 'phone' | 'email' | 'primaryProfessionalName' | 'activo'>;
export type HealthAppointmentPayload = Omit<HealthAppointment, 'id' | 'patientName' | 'professionalName' | 'serviceName' | 'endsAt'> & {
  endsAt?: string | null;
};
export type HealthEvaluationPayload = Omit<HealthEvaluation, 'id'>;
export type HealthTrainerNotePayload = Omit<HealthTrainerNote, 'id'>;
export type HealthPaymentPayload = Omit<HealthPayment, 'id' | 'patientName' | 'paymentMethodName' | 'cashMovementId' | 'estado' | 'confirmado'>;
export type HealthPlanSubscriptionPayload = Omit<HealthPlanSubscription, 'id'>;
