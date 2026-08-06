import { ErrorHandler, Injectable, inject } from '@angular/core';

import { ToastService } from '../services/toast.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private readonly toast = inject(ToastService);

  handleError(error: unknown): void {
    console.error(error);
    this.toast.show(
      'Ocurrió un error inesperado en la pantalla. Recargá la página e intentá nuevamente.',
      'error',
      20000,
      'La pantalla encontró un problema'
    );
  }
}
