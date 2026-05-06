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
import { Employee } from '../../../employees/models/employee.model';
import { PaymentMethod } from '../../../payment-methods/models/payment-method.model';
import { Payment, PaymentCreatePayload } from '../../../payments/models/payment.model';

export interface RegisterPaymentDialogData {
  clients: Client[];
  employees: Employee[];
  paymentMethods: PaymentMethod[];
  incomeCategories: CashMovementCategory[];
  defaultDate: string;
  defaultMonth: number;
  defaultYear: number;
  defaultEmployeeEmail?: string | null;
  payment?: Payment;
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

  readonly isEditing = !!this.data.payment;
  readonly selectedClient = signal<Client | null>(this.getInitialClient());

  readonly form = this.formBuilder.group({
    clientId: [this.data.payment?.clientId ?? (null as number | null), [Validators.required]],
    clientMembershipId: [this.data.payment?.clientMembershipId ?? 0, [Validators.required, Validators.min(1)]],
    fechaPago: [this.toDateInputValue(this.data.payment?.fechaPago ?? this.data.defaultDate), [Validators.required]],
    monto: [this.data.payment?.monto ?? 0, [Validators.required, Validators.min(0)]],
    paymentMethodId: [this.data.payment?.paymentMethodId ?? (null as number | null), [Validators.required]],
    cashMovementCategoryId: [this.data.payment?.cashMovementCategoryId ?? this.data.incomeCategories[0]?.id ?? null, [Validators.required]],
    periodYear: [this.data.payment?.periodYear ?? this.data.defaultYear, [Validators.required, Validators.min(2000)]],
    periodMonth: [this.data.payment?.periodMonth ?? this.data.defaultMonth, [Validators.required, Validators.min(1), Validators.max(12)]],
    collectedByEmployeeEmail: [this.getInitialEmployeeEmail(), [Validators.required]]
  });

  readonly title = this.isEditing ? 'Editar cobro de cliente' : 'Registrar cobro de cliente';
  readonly subtitle = this.isEditing
    ? 'Actualiza los datos del cobro seleccionado.'
    : 'Carga un cobro realizado por un alumno o cliente. Esto no crea un movimiento manual de caja.';
  readonly submitLabel = this.isEditing ? 'Guardar cambios' : 'Registrar cobro';

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
      paymentMethodId: Number(raw.paymentMethodId),
      cashMovementCategoryId: Number(raw.cashMovementCategoryId),
      periodYear: Number(raw.periodYear),
      periodMonth: Number(raw.periodMonth),
      collectedByEmployeeEmail: raw.collectedByEmployeeEmail ?? ''
    });
  }

  getClientLabel(client: Client): string {
    return `${client.nombre} ${client.apellido}`;
  }

  getPaymentMethodLabel(method: PaymentMethod): string {
    return method.nombre ?? method.descripcion ?? `Metodo #${method.id}`;
  }

  getEmployeeLabel(employee: Employee): string {
    return `${employee.nombre} ${employee.apellido} - ${employee.email || 'Sin email'}`;
  }

  canSelectEmployee(employee: Employee): boolean {
    return !!employee.email?.trim();
  }

  private getInitialClient(): Client | null {
    const clientId = this.data.payment?.clientId;
    return clientId ? this.data.clients.find(item => item.id === clientId) ?? null : null;
  }

  private toDateInputValue(value: string): string {
    return value.slice(0, 10);
  }

  private getInitialEmployeeEmail(): string {
    const paymentEmail = this.data.payment?.collectedByEmployeeEmail?.trim();
    const defaultEmail = this.data.defaultEmployeeEmail?.trim().toLowerCase();
    const matchedDefault = defaultEmail
      ? this.data.employees.find(employee => employee.email?.trim().toLowerCase() === defaultEmail)
      : null;

    return paymentEmail || matchedDefault?.email || this.data.employees.find(employee => employee.email?.trim())?.email || '';
  }
}
