import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { CashMovementCategory } from '../../../cash-movement-categories/models/cash-movement-category.model';
import { CashMovementCategoriesService } from '../../../cash-movement-categories/services/cash-movement-categories.service';
import { PaymentMethod } from '../../../payment-methods/models/payment-method.model';
import { PaymentMethodsService } from '../../../payment-methods/services/payment-methods.service';
import { PaymentCreatePayload } from '../../../payments/models/payment.model';

export interface RegisterClientPaymentDialogData {
  clientId: number;
  clientMembershipId: number;
  defaultAmount: number;
}

@Component({
  selector: 'app-register-client-payment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
  templateUrl: './register-client-payment-dialog.html',
  styleUrl: './register-client-payment-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterClientPaymentDialogComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<RegisterClientPaymentDialogComponent, PaymentCreatePayload>);
  private readonly paymentMethodsService = inject(PaymentMethodsService);
  private readonly cashMovementCategoriesService = inject(CashMovementCategoriesService);
  readonly data = inject<RegisterClientPaymentDialogData>(MAT_DIALOG_DATA);

  readonly isLoading = signal(true);
  readonly errorMessage = signal('');
  readonly paymentMethods = signal<PaymentMethod[]>([]);
  readonly cashMovementCategories = signal<CashMovementCategory[]>([]);
  readonly today = new Date();

  readonly form = this.formBuilder.nonNullable.group({
    paymentMethodId: [null as number | null, [Validators.required]],
    cashMovementCategoryId: [null as number | null, [Validators.required]],
    fechaPago: [this.today.toISOString().slice(0, 10), [Validators.required]],
    monto: [this.data.defaultAmount || 0, [Validators.required, Validators.min(0)]],
    periodYear: [this.today.getFullYear(), [Validators.required, Validators.min(2000)]],
    periodMonth: [this.today.getMonth() + 1, [Validators.required, Validators.min(1), Validators.max(12)]]
  });

  readonly incomeCategories = computed(() =>
    this.cashMovementCategories().filter(category => category.tipoMovimiento === 1)
  );

  constructor() {
    this.loadOptions();
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    this.dialogRef.close({
      clientId: this.data.clientId,
      clientMembershipId: this.data.clientMembershipId,
      fechaPago: new Date(`${value.fechaPago}T00:00:00`).toISOString(),
      monto: Number(value.monto),
      confirmado: false,
      paymentMethodId: Number(value.paymentMethodId),
      cashMovementCategoryId: Number(value.cashMovementCategoryId),
      periodYear: Number(value.periodYear),
      periodMonth: Number(value.periodMonth)
    });
  }

  getPaymentMethodLabel(method: PaymentMethod): string {
    return method.nombre ?? method.descripcion ?? `Metodo #${method.id}`;
  }

  private loadOptions(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.paymentMethodsService.getPaged(1, 200).subscribe({
      next: response => {
        this.paymentMethods.set(response.items);
        this.loadCategories();
      },
      error: () => {
        this.paymentMethods.set([]);
        this.cashMovementCategories.set([]);
        this.isLoading.set(false);
        this.errorMessage.set('No se pudieron cargar los metodos de pago.');
      }
    });
  }

  private loadCategories(): void {
    this.cashMovementCategoriesService.getPaged(1, 200).subscribe({
      next: response => {
        this.cashMovementCategories.set(response.items);
        this.isLoading.set(false);
      },
      error: () => {
        this.cashMovementCategories.set([]);
        this.isLoading.set(false);
        this.errorMessage.set('No se pudieron cargar las categorias de movimientos.');
      }
    });
  }
}
