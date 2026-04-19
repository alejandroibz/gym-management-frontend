export interface EmployeeCategory {
  id: number;
  nombre: string;
  descripcion: string;
  gymId: number;
}

export interface EmployeeCategoryUpsertPayload {
  nombre: string;
  descripcion: string;
  gymId: number;
}
