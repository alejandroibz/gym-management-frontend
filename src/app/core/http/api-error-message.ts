import { HttpErrorResponse } from '@angular/common/http';

export interface ApiErrorMessage {
  title: string;
  message: string;
}

interface ValidationItem {
  field?: unknown;
  message?: unknown;
}

export function getApiErrorMessage(error: unknown): ApiErrorMessage {
  if (!(error instanceof HttpErrorResponse)) {
    return { title: 'Ocurrió un error', message: 'No pudimos completar la operación. Intentá nuevamente.' };
  }

  if (error.status === 0) {
    return {
      title: 'Sin conexión con el sistema',
      message: 'No pudimos comunicarnos con el servidor. Revisá tu conexión e intentá nuevamente.'
    };
  }

  const payload = error.error;
  const details = extractValidationMessages(payload);
  const payloadMessage = extractText(payload, 'message') || extractText(payload, 'detail');
  const title = extractText(payload, 'title') || getStatusTitle(error.status);
  const referenceId = extractText(payload, 'referenceId');

  let message = details.length > 0
    ? details.slice(0, 4).join('\n')
    : payloadMessage || extractStringPayload(payload) || getStatusMessage(error.status);

  if (details.length > 4) message += `\nY ${details.length - 4} observación(es) más.`;
  if (referenceId && !message.includes(referenceId) && error.status >= 500) message += `\nCódigo: ${referenceId}`;

  return { title, message };
}

function extractValidationMessages(payload: unknown): string[] {
  if (!payload || typeof payload !== 'object') return [];
  const errors = (payload as Record<string, unknown>)['errors'];

  if (Array.isArray(errors)) {
    return errors
      .map(item => typeof item === 'string' ? translateValidation('', item) : translateValidationItem(item))
      .filter((value): value is string => !!value);
  }

  if (errors && typeof errors === 'object') {
    return Object.entries(errors as Record<string, unknown>).flatMap(([field, messages]) => {
      const values = Array.isArray(messages) ? messages : [messages];
      return values
        .filter((value): value is string => typeof value === 'string')
        .map(message => translateValidation(field, message));
    });
  }

  return [];
}

function translateValidationItem(item: unknown): string | null {
  if (!item || typeof item !== 'object') return null;
  const validation = item as ValidationItem;
  return typeof validation.message === 'string'
    ? translateValidation(typeof validation.field === 'string' ? validation.field : '', validation.message)
    : null;
}

function translateValidation(field: string, message: string): string {
  const label = getFieldLabel(field);
  let detail = message
    .replace(/^'[^']+'\s*/, '')
    .replace(/must be between (\d+) and (\d+)\.?/i, 'debe estar entre $1 y $2.')
    .replace(/must not be empty\.?/i, 'es obligatorio.')
    .replace(/must be a valid email address\.?/i, 'debe ser un correo válido.')
    .replace(/must match[^.]*\.?/i, 'debe coincidir con el período seleccionado.');

  detail = detail.charAt(0).toLocaleLowerCase('es-AR') + detail.slice(1);
  return label ? `${label}: ${detail}` : capitalize(detail);
}

function getFieldLabel(field: string): string {
  const normalized = field.replace(/[^a-z0-9]/gi, '').toLowerCase();
  const labels: Record<string, string> = {
    membershipperiodyear: 'Año del período de la membresía',
    membershipperiodmonth: 'Mes del período de la membresía',
    initialpaymentperiodyear: 'Año del período del pago',
    initialpaymentperiodmonth: 'Mes del período del pago',
    nombre: 'Nombre',
    apellido: 'Apellido',
    dni: 'DNI',
    email: 'Correo electrónico',
    telefono: 'Teléfono',
    direccion: 'Dirección'
  };
  return labels[normalized] ?? field.replace(/\./g, ' ');
}

function extractText(payload: unknown, key: string): string {
  if (!payload || typeof payload !== 'object') return '';
  const value = (payload as Record<string, unknown>)[key];
  return typeof value === 'string' ? value.trim() : '';
}

function extractStringPayload(payload: unknown): string {
  return typeof payload === 'string' && !payload.trimStart().startsWith('<') ? payload.trim() : '';
}

function getStatusTitle(status: number): string {
  if (status === 400 || status === 422) return 'Revisá los datos ingresados';
  if (status === 401) return 'Tu sesión venció';
  if (status === 403) return 'No tenés permiso para esta acción';
  if (status === 404) return 'No encontramos el dato solicitado';
  if (status === 409) return 'La información entró en conflicto';
  return status >= 500 ? 'El servidor no pudo completar la operación' : 'No se pudo completar';
}

function getStatusMessage(status: number): string {
  if (status === 400 || status === 422) return 'Hay datos incorrectos o incompletos. Revisalos e intentá nuevamente.';
  if (status === 401) return 'Volvé a iniciar sesión para continuar.';
  if (status === 403) return 'Tu usuario no tiene autorización para realizar esta operación.';
  if (status === 404) return 'El registro pudo haber sido eliminado o ya no estar disponible.';
  if (status === 409) return 'Actualizá la pantalla y volvé a intentarlo.';
  return 'Intentá nuevamente. Si el problema continúa, comunicate con soporte.';
}

function capitalize(value: string): string {
  return value ? value.charAt(0).toLocaleUpperCase('es-AR') + value.slice(1) : value;
}
