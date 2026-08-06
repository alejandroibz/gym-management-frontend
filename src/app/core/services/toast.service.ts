import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppToastComponent, ToastTone } from '../components/app-toast/app-toast';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly snackBar = inject(MatSnackBar);
  private revision = 0;

  get currentRevision(): number {
    return this.revision;
  }

  show(message: string, tone: ToastTone = 'info', duration = 5000, title?: string): void {
    if (!message.trim()) return;
    this.revision += 1;
    this.snackBar.openFromComponent(AppToastComponent, {
      data: { title, message, tone },
      duration,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['app-toast-panel'],
      politeness: tone === 'error' ? 'assertive' : 'polite'
    });
  }

  success(message: string): void {
    this.show(message, 'success');
  }

  error(message: string): void {
    this.show(message, 'error', 20000, 'No se pudo completar');
  }

  warning(message: string): void {
    this.show(message, 'warning');
  }

  info(message: string): void {
    this.show(message, 'info');
  }

  successIfUnchanged(message: string, expectedRevision: number): void {
    if (this.revision === expectedRevision) this.success(message);
  }
}
