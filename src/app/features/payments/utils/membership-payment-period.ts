import { ClientRelationRecord } from '../../clients/models/client.model';

const MEMBERSHIP_CATEGORY_NAME = 'cobro membresias';

export interface MembershipPaymentPeriodCriteria {
  periodYear: number;
  periodMonth: number;
  categoryId: number | null;
}

export function hasMembershipPaymentForPeriod(payments: ClientRelationRecord[] | null | undefined, criteria: MembershipPaymentPeriodCriteria): boolean {
  if (!criteria.periodYear || !criteria.periodMonth) return false;

  return (payments ?? []).some(payment =>
    isActivePayment(payment) &&
    isMembershipPayment(payment, criteria.categoryId) &&
    readNumber(payment, 'periodYear', 'periodyear') === criteria.periodYear &&
    readNumber(payment, 'periodMonth', 'periodmonth') === criteria.periodMonth
  );
}

export function isMembershipCategoryName(value: string | null | undefined): boolean {
  return normalize(value) === MEMBERSHIP_CATEGORY_NAME;
}

function isMembershipPayment(payment: ClientRelationRecord, selectedCategoryId: number | null): boolean {
  const categoryName = readString(payment, 'cashMovementCategoryNombre', 'cashmovementcategorynombre');
  if (isMembershipCategoryName(categoryName)) return true;
  return selectedCategoryId !== null && readNumber(payment, 'cashMovementCategoryId', 'cashmovementcategoryid') === selectedCategoryId;
}

function isActivePayment(payment: ClientRelationRecord): boolean {
  if (readValue(payment, 'activo', 'active') === false) return false;
  const status = normalize(readString(payment, 'estado', 'status'));
  return status !== 'anulado' && status !== 'cancelado' && status !== 'inactive';
}

function readNumber(record: ClientRelationRecord, ...keys: string[]): number | null {
  const value = readValue(record, ...keys);
  if (value === null || value === undefined || value === '') return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function readString(record: ClientRelationRecord, ...keys: string[]): string {
  const value = readValue(record, ...keys);
  return typeof value === 'string' ? value : '';
}

function readValue(record: ClientRelationRecord, ...keys: string[]): unknown {
  const normalizedKeys = new Set(keys.map(key => key.toLowerCase()));
  const match = Object.keys(record).find(key => normalizedKeys.has(key.trim().toLowerCase()));
  return match ? record[match] : undefined;
}

function normalize(value: string | null | undefined): string {
  return (value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
}
