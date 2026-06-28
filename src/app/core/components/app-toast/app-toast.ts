import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

export type ToastTone = 'success' | 'error' | 'info' | 'warning';

export interface AppToastData {
  message: string;
  tone: ToastTone;
}

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './app-toast.html',
  styleUrl: './app-toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppToastComponent {
  readonly data = inject<AppToastData>(MAT_SNACK_BAR_DATA);
  private readonly snackBarRef = inject(MatSnackBarRef<AppToastComponent>);

  get icon(): string {
    switch (this.data.tone) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  }

  close(): void {
    this.snackBarRef.dismiss();
  }
}
