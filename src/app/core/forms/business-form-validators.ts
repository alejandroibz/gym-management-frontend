import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export const PERIOD_YEAR_MIN = 2000;
export const PERIOD_YEAR_MAX = 2100;
export const positiveMoneyValidators = [Validators.required, Validators.min(0.01)];
export const periodMonthValidators = [Validators.required, Validators.min(1), Validators.max(12)];
export const periodYearValidators = [Validators.required, Validators.min(PERIOD_YEAR_MIN), Validators.max(PERIOD_YEAR_MAX)];
export const employeeEmailValidators = [Validators.required, Validators.email, Validators.maxLength(150)];

export const nonWhitespaceValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
  typeof control.value === 'string' && control.value.trim().length === 0 ? { whitespace: true } : null;

export const notFutureDateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) return null;
  const value = parseLocalDate(control.value);
  if (!value) return { invalidDate: true };
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return value > today ? { futureDate: true } : null;
};

export function dateOrderValidator(startField: string, endField: string, enabledField?: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (enabledField && control.get(enabledField)?.value !== true) return null;
    const start = parseLocalDate(control.get(startField)?.value);
    const end = parseLocalDate(control.get(endField)?.value);
    return start && end && end < start ? { dateOrder: true } : null;
  };
}

export const paymentDiscountValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (control.get('aplicarDescuento')?.value !== true) return null;
  const original = toOptionalNumber(control.get('montoOriginal')?.value);
  const discount = Number(control.get('descuentoMonto')?.value ?? 0);
  const percentage = toOptionalNumber(control.get('descuentoPorcentaje')?.value);
  const finalAmount = Number(control.get('monto')?.value ?? 0);
  if (original === null || original <= 0) return { originalAmountRequired: true };
  if (discount < 0) return { discountAmountNegative: true };
  if (discount > original) return { discountGreaterThanOriginal: true };
  if (percentage !== null && (percentage < 0 || percentage > 100)) return { discountPercentageRange: true };
  if (Math.abs(finalAmount - (original - discount)) > 0.009) return { inconsistentFinalAmount: true };
  return null;
};

export function markAndFocusFirstInvalid(form: FormGroup, host: HTMLElement): void {
  form.markAllAsTouched();
  queueMicrotask(() => {
    const invalid = host.querySelector<HTMLElement>('[formControlName].ng-invalid');
    invalid?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    invalid?.focus({ preventScroll: true });
  });
}

function parseLocalDate(value: unknown): Date | null {
  if (typeof value !== 'string' || !value) return null;
  const date = new Date(`${value.slice(0, 10)}T12:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function toOptionalNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}
