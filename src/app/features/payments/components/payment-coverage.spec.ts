import { describe, it, expect } from 'vitest';
import { PaymentCoverageComponent } from './payment-coverage-dialog';
import { Client } from '../../clients/models/client.model';
import { isMembershipIncome } from '../utils/payment-checkout';

function setup(paid = false, end = '2026-09-08') {
  const component = new PaymentCoverageComponent();
  component.paymentDate = '2026-09-08';
  component.client = {
    id: 1,
    payments: paid ? [{ clientMembershipId: 1, monto: 65000, activo: true }] : [],
    membershipsHistory: [
      {
        id: 1,
        membershipPlanId: 1,
        estado: 'Active',
        activo: true,
        precioFinal: 65000,
        fechaInicio: '2026-08-09',
        fechaFin: end,
        plan: {
          id: 1,
          precio: 65000,
          nombre: 'Mensual',
          durationUnit: 'Months',
          durationQuantity: 1,
          duracionDias: 30,
        },
      },
    ],
  } as unknown as Client;
  component.ngOnChanges();
  return component;
}
describe('Cobro integrado de membresías', () => {
  it('paga una deuda completa sin extender las fechas', () => {
    const c = setup();
    expect(c.valid).toBe(true);
    expect(c.total).toBe(65000);
    expect(c.periods[0].coverageMode).toBe('Existing');
    expect(c.periods[0].membershipEndDate).toBe('2026-09-08');
  });
  it('no renueva automáticamente una membresía pagada', () => {
    const c = setup(true);
    expect(c.renew).toBe(false);
    expect(c.valid).toBe(false);
  });
  it('renueva al día siguiente del último día incluido', () => {
    const c = setup(true);
    c.renew = true; c.payRenewalNow = true;
    expect(c.start).toBe('2026-09-09');
    expect(c.periods[0].coverageMode).toBe('Continuity');
  });
  it('sugiere la fecha del cobro al regresar y permite continuidad explícita', () => {
    const c = setup(true, '2026-09-01');
    c.renew = true; c.payRenewalNow = true;
    expect(c.start).toBe('2026-09-08');
    expect(c.periods[0].coverageMode).toBe('Restart');
    c.specificDate = true;
    c.chosenDate = '2026-09-02';
    expect(c.periods[0].coverageMode).toBe('Continuity');
  });
  it('renueva pendiente sin sumar el precio y permite pagarlo al marcar la segunda casilla', () => {
    const c = setup(); c.renew = true;
    expect(c.payRenewalNow).toBe(false);
    expect(c.total).toBe(65000); expect(c.unpaidRenewal?.precioFinal).toBe(65000);
    c.payRenewalNow = true;
    expect(c.total).toBe(130000); expect(c.unpaidRenewal).toBeUndefined();
    expect(c.periods).toHaveLength(2);
    c.renew = false;
    expect(c.total).toBe(65000); expect(c.unpaidRenewal).toBeUndefined();
  });
  it('permite renovar sin ningún cobro y bloquea superposiciones también sin pagar', () => {
    const c = setup(true); c.renew = true;
    expect(c.total).toBe(0); expect(c.valid).toBe(true); expect(c.periods).toHaveLength(0);
    expect(c.unpaidRenewal?.fechaInicio).toBe('2026-09-09');
    c.specificDate = true; c.chosenDate = '2026-09-08';
    expect(c.valid).toBe(false);
  });
  it('reinicia elecciones al cambiar de alumno', () => {
    const c = setup();
    c.renew = true; c.payRenewalNow = true;
    c.client = { id: 2, payments: [], membershipsHistory: [] } as unknown as Client;
    c.ngOnChanges();
    expect(c.valid).toBe(false);
    expect(c.renew).toBe(false);
    expect(c.total).toBe(0);
  });
  it('el pase diario no es un cobro de membresías', () => {
    expect(isMembershipIncome('Pase diario')).toBe(false);
    expect(isMembershipIncome('Cobro membresías')).toBe(true);
  });
});

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@auth0/auth0-angular';
import { ClientsService } from '../../clients/services/clients.service';
import { ToastService } from '../../../core/services/toast.service';
import { RegisterPaymentDialogComponent } from '../../movements/components/register-payment-dialog/register-payment-dialog';

describe('Formulario de cobro', () => {
  it('muestra los períodos dentro del formulario y envía el importe completo', async () => {
    const client = setup().client!;
    const submitted: unknown[] = [];
    await TestBed.configureTestingModule({
      imports: [RegisterPaymentDialogComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            clients: [client],
            employees: [{ email: 'caja@example.com' }],
            paymentMethods: [{ id: 1, nombre: 'Efectivo' }],
            incomeCategories: [{ id: 1, nombre: 'Cobro membresias' }],
            defaultDate: '2026-09-08',
            defaultMonth: 9,
            defaultYear: 2026,
          },
        },
        { provide: MatDialogRef, useValue: { close: (value: unknown) => submitted.push(value) } },
        { provide: AuthService, useValue: { user$: of(null) } },
        { provide: ClientsService, useValue: { getById: () => of(client) } },
        { provide: ToastService, useValue: { warning: () => {} } },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(RegisterPaymentDialogComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('¿Renueva?');
    expect(fixture.nativeElement.textContent).not.toContain('Confirmar cobertura del cobro');
    fixture.componentInstance.form.controls.paymentMethodId.setValue(1);
    fixture.componentInstance.submit();
    expect(submitted).toHaveLength(1);
    expect(submitted[0]).toMatchObject({
      monto: 65000,
      periods: [{ monto: 65000, coverageMode: 'Existing' }],
    });
    fixture.componentInstance.coverage!.renew = true;
    fixture.componentInstance.coverage!.payRenewalNow = false;
    fixture.componentInstance.submit();
    expect(submitted[1]).toMatchObject({ monto: 65000, periods: [{ coverageMode: 'Existing' }],
      unpaidRenewal: { precioFinal: 65000 } });
    fixture.componentInstance.coverage!.selectedIds = [];
    fixture.componentInstance.form.controls.paymentMethodId.setValue(null);
    fixture.componentInstance.submit();
    expect(submitted[2]).toMatchObject({ monto: 0, periods: [], unpaidRenewal: { precioFinal: 65000 } });
    fixture.componentInstance.coverage!.payRenewalNow = true;
    fixture.componentInstance.form.controls.paymentMethodId.setValue(1);
    fixture.componentInstance.submit();
    expect(submitted[3]).toMatchObject({ monto: 65000, periods: [{ coverageMode: 'Continuity' }] });
    expect(fixture.nativeElement.textContent).not.toContain('Cantidad de períodos');
    fixture.destroy();
    TestBed.resetTestingModule();
  });
  it('cobra un ingreso diario sin membresía y sin datos de cobertura', async () => {
    const client = {
      id: 2,
      nombre: 'Visita',
      apellido: 'Diaria',
      payments: [],
      membershipsHistory: [],
    } as unknown as Client;
    const submitted: unknown[] = [];
    await TestBed.configureTestingModule({
      imports: [RegisterPaymentDialogComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            clients: [client],
            employees: [{ email: 'caja@example.com' }],
            paymentMethods: [{ id: 1, nombre: 'Efectivo' }],
            incomeCategories: [{ id: 2, nombre: 'Pase diario' }],
            defaultDate: '2026-09-08',
            defaultMonth: 9,
            defaultYear: 2026,
          },
        },
        { provide: MatDialogRef, useValue: { close: (value: unknown) => submitted.push(value) } },
        { provide: AuthService, useValue: { user$: of(null) } },
        { provide: ClientsService, useValue: { getById: () => of(client) } },
        { provide: ToastService, useValue: { warning: () => {} } },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(RegisterPaymentDialogComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).not.toContain('¿Renueva?');
    fixture.componentInstance.form.patchValue({ monto: 5000, paymentMethodId: 1 });
    fixture.componentInstance.submit();
    expect(submitted[0]).toMatchObject({ monto: 5000, clientMembershipId: null });
    fixture.destroy();
    TestBed.resetTestingModule();
  });
});

it('conserva el día de renovación después de febrero al renovar un período', () => {
  const c = setup(true);
  const m = c.client!.membershipsHistory![0];
  m.fechaInicio = '2026-01-31';
  m.fechaFin = '2026-02-27';
  m.renewalAnchorDay = 31;
  c.paymentDate = '2026-02-27';
  c.renew = true; c.payRenewalNow = true;
  expect(c.periods[0].membershipStartDate).toBe('2026-02-28');
  expect(c.periods[0].membershipEndDate).toBe('2026-03-30');
  expect(c.periods).toHaveLength(1);
});
