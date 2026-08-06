import { WritableSignal, signal } from '@angular/core';

/**
 * Keeps existing inline error banners. HTTP failures are notified once by the
 * API interceptor, while local validation stays close to the affected form.
 */
export function createNotifiedErrorSignal(): WritableSignal<string> {
  return signal('');
}
