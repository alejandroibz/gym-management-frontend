import { describe, expect, it } from 'vitest';
import { hasMembershipPaymentForPeriod } from './membership-payment-period';

describe('hasMembershipPaymentForPeriod', () => {
  const criteria = { periodYear: 2026, periodMonth: 8, categoryId: 3 };

  it('detecta otro cobro de membresía del mismo período', () => {
    expect(hasMembershipPaymentForPeriod([
      { periodYear: 2026, periodMonth: 8, cashMovementCategoryNombre: 'Cobro membresías', estado: 'Confirmado' }
    ], criteria)).toBe(true);
  });

  it('no bloquea un cobro de otra categoría en el mismo período', () => {
    expect(hasMembershipPaymentForPeriod([
      { periodYear: 2026, periodMonth: 8, cashMovementCategoryId: 9, cashMovementCategoryNombre: 'Venta de productos' }
    ], criteria)).toBe(false);
  });

  it('ignora cobros anulados', () => {
    expect(hasMembershipPaymentForPeriod([
      { periodYear: 2026, periodMonth: 8, cashMovementCategoryId: 3, estado: 'Anulado' }
    ], criteria)).toBe(false);
  });
});
