import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ToastService } from '../services/toast.service';
import { getApiErrorMessage } from './api-error-message';

export function apiNotificationInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const toast = inject(ToastService);
  const initialToastRevision = toast.currentRevision;
  const isApiRequest = request.url.startsWith(environment.apiUrl);

  if (!isApiRequest) return next(request);

  return next(request).pipe(
    tap(event => {
      if (!(event instanceof HttpResponse) || !isMutation(request.method)) return;
      queueMicrotask(() => toast.successIfUnchanged(getSuccessMessage(request.method), initialToastRevision));
    }),
    catchError((error: unknown) => {
      const notification = getApiErrorMessage(error);
      queueMicrotask(() => toast.show(notification.message, 'error', 20000, notification.title));
      return throwError(() => error instanceof HttpErrorResponse ? error : new Error(notification.message));
    })
  );
}

function isMutation(method: string): boolean {
  return method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE';
}

function getSuccessMessage(method: string): string {
  if (method === 'DELETE') return 'El registro se eliminó correctamente.';
  if (method === 'POST') return 'La información se guardó correctamente.';
  return 'Los cambios se guardaron correctamente.';
}
