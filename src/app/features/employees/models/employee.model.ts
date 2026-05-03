export type EmployeeAppRole = 'Admin' | 'SuperAdmin';

export interface EmployeeAppAccessPayload {
  createAccess?: boolean;
  role?: EmployeeAppRole | null;
}

export interface Employee {
  id: number;
  branchId: number;
  employeeCategoryId: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  fechaNacimiento: string;
  fechaIngreso: string;
  sueldo: number;
  fechaCreacion?: string;
  hasAppAccess?: boolean;
  appRole?: string | null;
}

export interface EmployeeCreatePayload {
  branchId: number;
  employeeCategoryId: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  fechaNacimiento: string;
  fechaIngreso: string;
  sueldo: number;
  appAccess?: EmployeeAppAccessPayload | null;
}

export interface EmployeeUpdatePayload extends EmployeeCreatePayload {
  id: number;
}

export interface EmployeeFilters {
  nombre?: string;
  apellido?: string;
  dni?: string;
  employeeCategoryId?: number;
}
