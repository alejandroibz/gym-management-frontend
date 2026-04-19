export type CashMovementType = 1 | 2;

export interface CashMovementCategory {
  id: number;
  gymId: number;
  nombre: string;
  descripcion: string;
  tipoMovimiento: CashMovementType;
}

export interface CashMovementCategoryUpsertPayload {
  gymId: number;
  nombre: string;
  descripcion: string;
  tipoMovimiento: CashMovementType;
}
