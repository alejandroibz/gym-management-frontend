import { CashMovementType } from '../../cash-movement-categories/models/cash-movement-category.model';

export interface CashMovement {
  id: number;
  gymId: number;
  branchId: number;
  cashMovementCategoryId: number;
  tipoMovimiento: CashMovementType;
  monto: number;
  fechaMovimiento: string;
  descripcion: string;
  metodoPago?: string | null;
  relatedEmployeeId?: number | null;
  relatedEmployeeNombre?: string | null;
  registeredByEmployeeId?: number | null;
  registeredByEmployeeEmail?: string | null;
  registeredByEmployeeNombre?: string | null;
  paymentId?: number | null;
}

export interface CashMovementFilters {
  tipo?: CashMovementType;
  categoryId?: number;
  fechaMovimientoDesde?: string;
  fechaMovimientoHasta?: string;
}

export interface CashMovementCreatePayload {
  gymId: number;
  branchId: number;
  cashMovementCategoryId: number;
  tipoMovimiento: CashMovementType;
  monto: number;
  fechaMovimiento: string;
  descripcion: string;
  metodoPago?: string | null;
  relatedEmployeeId?: number | null;
  registeredByEmployeeEmail: string;
}

export interface CashMovementCategoryMonthlySummary {
  cashMovementCategoryId: number;
  categoryName: string;
  totalIngresos: number;
  totalEgresos: number;
  net: number;
}

export interface CashBalanceResponse {
  balance: number;
  netoMes: number;
}
