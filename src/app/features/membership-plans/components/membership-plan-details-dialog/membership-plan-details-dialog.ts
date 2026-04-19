import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MembershipPlan } from '../../models/membership-plan.model';

export interface MembershipPlanDetailsDialogData {
  plan: MembershipPlan;
}

@Component({
  selector: 'app-membership-plan-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, CurrencyPipe, DatePipe],
  templateUrl: './membership-plan-details-dialog.html',
  styleUrl: './membership-plan-details-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembershipPlanDetailsDialogComponent {
  private readonly dialogRef =
    inject(MatDialogRef<MembershipPlanDetailsDialogComponent, void>);
  readonly data = inject<MembershipPlanDetailsDialogData>(MAT_DIALOG_DATA);

  close(): void {
    this.dialogRef.close();
  }
}
