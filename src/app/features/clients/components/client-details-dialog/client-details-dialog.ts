import { CommonModule, DatePipe, KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Client, ClientMembership, ClientRelationRecord } from '../../models/client.model';

export interface ClientDetailsDialogData {
  client: Client;
}

@Component({
  selector: 'app-client-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, DatePipe, KeyValuePipe],
  templateUrl: './client-details-dialog.html',
  styleUrl: './client-details-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientDetailsDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<ClientDetailsDialogComponent, void>);
  readonly data = inject<ClientDetailsDialogData>(MAT_DIALOG_DATA);

  close(): void {
    this.dialogRef.close();
  }

  get whatsappLink(): string {
    return `https://wa.me/${this.data.client.telefono.replace(/\D/g, '')}`;
  }

  get mailLink(): string {
    return `mailto:${this.data.client.email}`;
  }

  get currentMembership(): ClientMembership | null {
    return this.data.client.membership ?? null;
  }

  get hasMembership(): boolean {
    return !!this.currentMembership;
  }

  get payments(): ClientRelationRecord[] {
    return this.data.client.payments ?? [];
  }

  formatValue(value: unknown): string {
    if (value === null || value === undefined || value === '') {
      return 'Sin dato';
    }

    if (typeof value === 'boolean') {
      return value ? 'Si' : 'No';
    }

    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return String(value);
  }
}
