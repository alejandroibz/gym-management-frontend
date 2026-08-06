import '@angular/compiler';
import { FormControl, FormGroup } from '@angular/forms';
import { describe, expect, it } from 'vitest';
import { dateOrderValidator, nonWhitespaceValidator, notFutureDateValidator, paymentDiscountValidator } from './business-form-validators';

describe('business form validators', () => {
  it('rechaza textos compuestos solamente por espacios', () => {
    expect(nonWhitespaceValidator(new FormControl('   '))).toEqual({ whitespace: true });
    expect(nonWhitespaceValidator(new FormControl(' Valentina '))).toBeNull();
  });
  it('rechaza fechas futuras', () => {
    expect(notFutureDateValidator(new FormControl('2999-01-01'))).toEqual({ futureDate: true });
    expect(notFutureDateValidator(new FormControl('2000-01-01'))).toBeNull();
  });
  it('rechaza una fecha final anterior al inicio', () => {
    const form = new FormGroup({ start: new FormControl('2026-08-10'), end: new FormControl('2026-08-09') });
    expect(dateOrderValidator('start', 'end')(form)).toEqual({ dateOrder: true });
  });
  it('valida la coherencia completa del descuento', () => {
    const form = new FormGroup({ aplicarDescuento: new FormControl(true), montoOriginal: new FormControl(100), descuentoMonto: new FormControl(20), descuentoPorcentaje: new FormControl(20), monto: new FormControl(80) });
    expect(paymentDiscountValidator(form)).toBeNull();
    form.controls.monto.setValue(90);
    expect(paymentDiscountValidator(form)).toEqual({ inconsistentFinalAmount: true });
  });
});
