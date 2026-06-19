import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppToastComponent, ToastTone } from '../components/app-toast/app-toast';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly snackBar = inject(MatSnackBar);

  show(message: string, tone: ToastTone = 'info', duration = 4200): void {
    if (!message.trim()) return;
    this.snackBar.openFromComponent(AppToastComponent, {
      data: { message, tone },
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
    this.show(message, 'error', 5200);
  }

  warning(message: string): void {
    this.show(message, 'warning');
  }

  info(message: string): void {
    this.show(message, 'info');
  }
}
