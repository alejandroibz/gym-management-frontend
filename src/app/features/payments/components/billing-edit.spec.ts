import { MembershipPlansService } from '../../membership-plans/services/membership-plans.service';
import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@auth0/auth0-angular';
import { of } from 'rxjs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ClientMembershipDialogComponent } from '../../clients/components/client-membership-dialog/client-membership-dialog';
import { RegisterPaymentDialogComponent } from '../../movements/components/register-payment-dialog/register-payment-dialog';
import { ClientsService } from '../../clients/services/clients.service';
import { ToastService } from '../../../core/services/toast.service';

afterEach(() => TestBed.resetTestingModule());

describe('Corrección desde la ficha del alumno', () => {
  it('exige motivo, valida fechas y permite corregir el plan en el payload', () => {
    const close = vi.fn();
    TestBed.configureTestingModule({ providers: [
        { provide: MembershipPlansService, useValue: { getPaged: () => of({ items: [], totalPages: 1 }) } },
      { provide: MatDialogRef, useValue: { close } },
      { provide: MAT_DIALOG_DATA, useValue: { clientId: 297, membershipPlans: [], membership: {
        id: 431, membershipPlanId: 2, fechaInicio: '2026-08-06', fechaFin: '2026-10-06', precioFinal: 50000, periodYear: 2026, periodMonth: 8
      } } }
    ] });
    const fixture = TestBed.createComponent(ClientMembershipDialogComponent);
    const c = fixture.componentInstance;
    c.submit(); expect(close).not.toHaveBeenCalled();
    c.form.patchValue({ changeReason: 'Corrección del período', fechaFin: '2026-08-01' });
    expect(c.form.hasError('invalidDates')).toBe(true);
    c.form.patchValue({ fechaFin: '2026-09-06' });
    fixture.detectChanges();
    c.submit();
    expect(close).toHaveBeenCalledWith(expect.objectContaining({ membershipPlanId: 2, fechaFin: '2026-09-06', changeReason: 'Corrección del período' }));
  });

  it('permite cambiar el importe del pago 74 y conserva el vínculo elegido', () => {
    const close = vi.fn();
    TestBed.configureTestingModule({ providers: [
        { provide: MembershipPlansService, useValue: { getPaged: () => of({ items: [], totalPages: 1 }) } },
      { provide: MatDialogRef, useValue: { close } },
      { provide: ClientsService, useValue: {} },
      { provide: AuthService, useValue: { user$: of({ email: 'admin@example.com' }) } },
      { provide: ToastService, useValue: { warning: vi.fn() } },
      { provide: MAT_DIALOG_DATA, useValue: {
        clients: [{ id: 113, nombre: 'Alumno', apellido: 'Prueba', payments: [], membershipsHistory: [{id:273, membershipPlanId:2, fechaInicio:'2026-06-06',fechaFin:'2026-07-05',precioFinal:55000}] }], employees: [],
        paymentMethods: [{ id: 1, nombre: 'Efectivo' }], incomeCategories: [{ id: 1, nombre: 'Cobro membresias' }],
        defaultDate: '2026-06-05', defaultMonth: 6, defaultYear: 2026,
        payment: { id: 74, clientId: 113, clientMembershipId: 273, monto: 55000, fechaPago: '2026-06-05', paymentMethodId: 1,
          cashMovementCategoryId: 1, periodMonth: 6, periodYear: 2026, collectedByEmployeeEmail: 'admin@example.com' }
      } }
    ] });
    const fixture = TestBed.createComponent(RegisterPaymentDialogComponent);
    const c = fixture.componentInstance;
    expect(c.form.controls.monto.enabled).toBe(true);
    expect(c.clientSearchControl.enabled).toBe(true);
    expect(c.form.controls.cashMovementCategoryId.enabled).toBe(true);
    c.form.patchValue({fechaPago:'2026-06-06',monto:60000,changeReason:'Corregir importe mal cargado'});
    fixture.detectChanges(); c.submit();
    expect(close).toHaveBeenCalledWith(expect.objectContaining({ clientId: 113, clientMembershipId: 273, monto: 60000, cashMovementCategoryId: 1, changeReason: 'Corregir importe mal cargado' }));
  });
});
