import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CashMovementCategory } from '../../../cash-movement-categories/models/cash-movement-category.model';
import { Client } from '../../../clients/models/client.model';
import { PaymentMethod } from '../../../payment-methods/models/payment-method.model';
import { PaymentCreatePayload } from '../../../payments/models/payment.model';

export interface RegisterPaymentDialogData {
  clients: Client[];
  paymentMethods: PaymentMethod[];
  incomeCategories: CashMovementCategory[];
  defaultDate: string;
  defaultMonth: number;
  defaultYear: number;
}

@Component({
  selector: 'app-register-payment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './register-payment-dialog.html',
  styleUrl: './register-payment-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPaymentDialogComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<RegisterPaymentDialogComponent, PaymentCreatePayload>);
  readonly data = inject<RegisterPaymentDialogData>(MAT_DIALOG_DATA);

  readonly selectedClient = signal<Client | null>(null);

  readonly form = this.formBuilder.group({
    clientId: [null as number | null, [Validators.required]],
    clientMembershipId: [0, [Validators.required, Validators.min(1)]],
    fechaPago: [this.data.defaultDate, [Validators.required]],
    monto: [0, [Validators.required, Validators.min(0)]],
    confirmado: [true],
    paymentMethodId: [null as number | null, [Validators.required]],
    cashMovementCategoryId: [this.data.incomeCategories[0]?.id ?? null, [Validators.required]],
    periodYear: [this.data.defaultYear, [Validators.required, Validators.min(2000)]],
    periodMonth: [this.data.defaultMonth, [Validators.required, Validators.min(1), Validators.max(12)]]
  });

  readonly membershipLabel = computed(() => {
    const client = this.selectedClient();
    return client?.membership?.plan?.nombre ?? (client?.membership ? `Plan #${client.membership.membershipPlanId}` : 'Sin membresia activa');
  });

  close(): void {
    this.dialogRef.close();
  }

  onClientChange(): void {
    const clientId = Number(this.form.controls.clientId.value);
    const client = this.data.clients.find(item => item.id === clientId) ?? null;

    this.selectedClient.set(client);

    if (!client?.membership?.id) {
      this.form.patchValue({
        clientMembershipId: 0,
        monto: 0
      });
      return;
    }

    this.form.patchValue({
      clientMembershipId: client.membership.id,
      monto: client.membership.precioFinal
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    this.dialogRef.close({
      clientId: Number(raw.clientId),
      clientMembershipId: Number(raw.clientMembershipId),
      fechaPago: new Date(`${raw.fechaPago}T00:00:00`).toISOString(),
      monto: Number(raw.monto),
      confirmado: !!raw.confirmado,
      paymentMethodId: Number(raw.paymentMethodId),
      cashMovementCategoryId: Number(raw.cashMovementCategoryId),
      periodYear: Number(raw.periodYear),
      periodMonth: Number(raw.periodMonth)
    });
  }

  getClientLabel(client: Client): string {
    return `${client.nombre} ${client.apellido}`;
  }

  getPaymentMethodLabel(method: PaymentMethod): string {
    return method.nombre ?? method.descripcion ?? `Metodo #${method.id}`;
  }
}
