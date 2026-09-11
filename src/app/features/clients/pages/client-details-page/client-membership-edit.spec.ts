import { describe, it, expect } from 'vitest';
import { HttpErrorResponse } from '@angular/common/http';
import { signal } from '@angular/core';
import { throwError } from 'rxjs';
import { ClientDetailsPageComponent } from './client-details-page';
import { getApiErrorMessage } from '../../../../core/http/api-error-message';

describe('Edición del plan vigente desde la ficha', () => {
  const methods = ClientDetailsPageComponent.prototype as any;
  it('envía el ID original al extender el fin de septiembre al primero de octubre', () => {
    const context = {
      currentMembership: () => ({ id: 468 }),
      form: { getRawValue: () => ({
        nombre: 'Dalia', apellido: 'Quezada', dni: '', fechaNacimiento: '2000-01-01',
        telefono: '', email: '', direccion: '', tieneLesion: false, observaciones: '',
        hasMembership: true, membershipPlanId: 2, fechaInicio: '2026-09-01', fechaFin: '2026-10-01',
        membershipPeriodYear: 2026, membershipPeriodMonth: 9, precioFinal: 60000
      }) }
    };
    const payload = methods.buildUpdatePayload.call(context, 334, 1);
    expect(payload.membershipId).toBe(468);
    expect(new Date(payload.membership.fechaFin).getMonth()).toBe(9);
    expect(new Date(payload.membership.fechaFin).getDate()).toBe(1);
  });
  it('muestra el conflicto real tanto en el formulario como en la notificación', () => {
    const message = 'La cobertura se superpone con otra contratación.';
    const error = new HttpErrorResponse({ status: 400, error: { message } });
    const context = {
      isSaving: signal(false), errorMessage: signal(''),
      buildUpdatePayload: () => ({}), getApiErrorMessage: methods.getApiErrorMessage,
      clientsService: { update: () => throwError(() => error) }
    };
    methods.saveChanges.call(context, 334, 1);
    expect(context.isSaving()).toBe(false);
    expect(context.errorMessage()).toBe(message);
    expect(getApiErrorMessage(error).message).toBe(message);
    expect(getApiErrorMessage(new HttpErrorResponse({ status: 400, error: { error: message } })).message).toBe(message);
  });
});
