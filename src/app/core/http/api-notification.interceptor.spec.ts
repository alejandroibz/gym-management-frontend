import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, throwError } from 'rxjs';
import { vi } from 'vitest';
import { environment } from '../../../environments/environment';
import { ToastService } from '../services/toast.service';
import { apiNotificationInterceptor } from './api-notification.interceptor';

describe('apiNotificationInterceptor profile errors', () => {
  const show = vi.fn();

  beforeEach(() => {
    show.mockClear();
    TestBed.configureTestingModule({
      providers: [{ provide: ToastService, useValue: { currentRevision: 0, show } }]
    });
  });

  for (const scenario of [
    { method: 'GET', path: '/api/Profile/me', status: 404, notified: false },
    { method: 'GET', path: '/api/Profile/me', status: 500, notified: true },
    { method: 'GET', path: '/api/Profile/me', status: 401, notified: true },
    { method: 'GET', path: '/api/Clients/missing', status: 404, notified: true },
    { method: 'PUT', path: '/api/Profile/me', status: 404, notified: true }
  ]) {
    it(`${scenario.method} ${scenario.path} ${scenario.status}: notified=${scenario.notified}`, async () => {
      const request = new HttpRequest(scenario.method, environment.apiUrl + scenario.path, null);
      const error = new HttpErrorResponse({ status: scenario.status });
      const result = TestBed.runInInjectionContext(() =>
        apiNotificationInterceptor(request, () => throwError(() => error))
      );

      await expect(firstValueFrom(result)).rejects.toBe(error);
      await Promise.resolve();
      expect(show).toHaveBeenCalledTimes(scenario.notified ? 1 : 0);
    });
  }
});
