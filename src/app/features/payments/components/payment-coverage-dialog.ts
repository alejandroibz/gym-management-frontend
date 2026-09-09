import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Client, ClientMembership } from '../../clients/models/client.model';
import { membershipEnd, nextDay } from '../utils/membership-dates';
import { activeContracts, availableBalance, PaymentPeriod } from '../utils/payment-checkout';

@Component({
  selector: 'app-payment-coverage',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  template: ` <section aria-label="Períodos a cobrar">
    <h3>¿Qué período paga?</h3>
    @if (!memberships.length) {
      <p role="alert">
        Primero creá la contratación desde la ficha del cliente, con el plan y la fecha de inicio
        acordados.
      </p>
    }
    @for (m of memberships; track m.id) {
      @if (balance(m) > 0) {
        <mat-checkbox
          [ngModel]="selectedIds.includes(m.id!)"
          (ngModelChange)="toggle(m.id!, $event)"
          [ngModelOptions]="{ standalone: true }"
        >
          {{ m.planNameSnapshot || m.plan?.nombre }} · {{ m.fechaInicio | date: 'dd/MM/yyyy' }}–{{
            m.fechaFin | date: 'dd/MM/yyyy'
          }}
          · Pendiente: {{ balance(m) | currency: 'ARS' }}
        </mat-checkbox>
      }
    }
    @if (memberships.length && !hasDebt) {
      <p>
        No hay períodos pendientes de cobro. Los pagos pendientes de confirmar también reservan el
        importe.
      </p>
    }
    @if (selectedIds.length) {
      <p>Los períodos seleccionados se pagan completos y conservan su vencimiento.</p>
    }
    @if (memberships.length) {
      <mat-checkbox [(ngModel)]="renew" [ngModelOptions]="{ standalone: true }"
        >¿Renueva?</mat-checkbox
      >
      @if (renew) {
        <mat-checkbox [(ngModel)]="payRenewalNow" [ngModelOptions]="{ standalone: true }">
          ¿Registra pago ahora?
        </mat-checkbox>
        <mat-form-field appearance="outline"
          ><mat-label>Plan a renovar</mat-label>
          <mat-select
            [(ngModel)]="sourceId"
            (ngModelChange)="resetPrice()"
            [ngModelOptions]="{ standalone: true }"
          >
            @for (m of memberships; track m.id) {
              <mat-option [value]="m.id"
                >{{ m.planNameSnapshot || m.plan?.nombre }} · {{ m.fechaFin.slice(0, 10) < paymentDate ? 'venció' : 'vence' }}
                {{ m.fechaFin | date: 'dd/MM/yyyy' }}</mat-option
              >
            }
          </mat-select>
        </mat-form-field>
        <mat-checkbox [(ngModel)]="specificDate" [ngModelOptions]="{ standalone: true }"
          >Elegir otra fecha de inicio</mat-checkbox
        >
        @if (specificDate) {
          <mat-form-field appearance="outline"
            ><mat-label>Fecha de inicio</mat-label
            ><input
              matInput
              type="date"
              [(ngModel)]="chosenDate"
              [ngModelOptions]="{ standalone: true }"
          /></mat-form-field>
        }
        <p>
          Inicio {{ specificDate ? 'elegido' : 'sugerido' }}:
          <strong>{{ start | date: 'dd/MM/yyyy' }}</strong
          >.
        </p>
        @if (source && source.fechaFin.slice(0, 10) < paymentDate) {
          <p>
            Para mantener continuidad desde el vencimiento anterior, elegí
            {{ nextStart | date: 'dd/MM/yyyy' }} como inicio.
          </p>
        }
        <div class="fields">
          <mat-form-field appearance="outline"
            ><mat-label>Precio completo del nuevo período</mat-label
            ><input
              matInput
              type="number"
              min="0.01"
              step="0.01"
              [(ngModel)]="price"
              [ngModelOptions]="{ standalone: true }"
            /><mat-hint>{{ payRenewalNow ? 'Se suma completo al cobro de hoy.' : 'Queda pendiente de pago; no se suma al cobro de hoy.' }}</mat-hint></mat-form-field
          >
        </div>
      }
    }
    @if (error) {
      <p role="alert">{{ error }}</p>
    }
    <div class="summary" aria-live="polite">
      <strong>Total a cobrar: {{ total | currency: 'ARS' }}</strong>
      @for (line of periods; track $index) {
        <p>
          {{ line.coverageMode === 'Existing' ? 'Paga período' : 'Nuevo período' }}:
          {{ line.membershipStartDate | date: 'dd/MM/yyyy' }}–{{
            line.membershipEndDate | date: 'dd/MM/yyyy'
          }}
          · {{ line.monto | currency: 'ARS' }}
        </p>
      }
      @if (unpaidRenewal; as pending) {
        <p>Nuevo período pendiente de pago: {{ pending.fechaInicio | date:'dd/MM/yyyy' }}–{{ pending.fechaFin | date:'dd/MM/yyyy' }}
          · {{ pending.precioFinal | currency:'ARS' }}. No se cobra ahora.</p>
      }
      <p>
        {{
          renew
            ? 'Se agrega un solo período. La próxima renovación se confirma nuevamente.'
            : 'El vencimiento no cambia.'
        }}
      </p>
      <small
        >No se aceptan pagos parciales. Una transferencia pendiente debe confirmarse para quedar
        pagada.</small
      >
    </div>
  </section>`,
  styles: [
    `
      :host {
        display: block;
        min-width: 0;
      }
      section {
        padding: 16px;
        border: 1px solid var(--mat-sys-outline-variant, #ddd);
        border-radius: 12px;
      }
      h3 {
        margin-top: 0;
      }
      mat-checkbox {
        display: block;
        margin: 8px 0;
        overflow-wrap: anywhere;
      }
      mat-form-field {
        display: block;
        width: 100%;
        margin-top: 12px;
      }
      .fields {
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
      }
      .summary {
        margin-top: 16px;
        padding: 14px;
        background: var(--mat-sys-surface-container, #f5f5f5);
        border-radius: 8px;
      }
      p {
        line-height: 1.5;
      }
      p[role='alert'] {
        color: var(--mat-sys-error, #b3261e);
      }
      @media (max-width: 540px) {
        .fields {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class PaymentCoverageComponent implements OnChanges {
  @Input() client: Client | null = null;
  @Input() paymentDate = '';
  selectedIds: number[] = [];
  sourceId?: number;
  renew = false;
  specificDate = false;
  chosenDate = '';
  payRenewalNow = false;
  price = 0;
  private previousClient: Client | null = null;
  get memberships() {
    return activeContracts(this.client);
  }
  get source() {
    return this.memberships.find((m) => m.id === this.sourceId);
  }
  balance(m: ClientMembership) {
    return availableBalance(this.client, m);
  }
  get hasDebt() {
    return this.memberships.some((m) => this.balance(m) > 0);
  }
  ngOnChanges() {
    if (this.client !== this.previousClient) {
      this.previousClient = this.client;
      this.renew = false;
      this.specificDate = false;
      this.payRenewalNow = false;
      this.sourceId = this.memberships.at(-1)?.id;
      const first = this.memberships.find((m) => this.balance(m) > 0);
      this.selectedIds = first?.id ? [first.id] : [];
      this.chosenDate = this.paymentDate;
      this.resetPrice();
    }
  }
  resetPrice() {
    this.price = this.source?.plan?.precio ?? this.source?.precioFinal ?? 0;
  }
  toggle(id: number, checked: boolean) {
    this.selectedIds = checked
      ? [...this.selectedIds, id]
      : this.selectedIds.filter((x) => x !== id);
  }
  get nextStart() {
    return this.source ? nextDay(this.source.fechaFin) : this.paymentDate;
  }
  get start() {
    return this.specificDate
      ? this.chosenDate
      : this.nextStart > this.paymentDate
        ? this.nextStart
        : this.paymentDate;
  }
  get periods(): PaymentPeriod[] {
    const lines: PaymentPeriod[] = this.memberships
      .filter((m) => this.selectedIds.includes(m.id!))
      .map((m) => ({
        clientMembershipId: m.id!,
        coverageMode: 'Existing',
        membershipStartDate: m.fechaInicio.slice(0, 10),
        membershipEndDate: m.fechaFin.slice(0, 10),
        contractAmount: m.precioFinal,
        monto: this.balance(m),
      }));
    if (this.renew && this.payRenewalNow && this.newPeriod) lines.push(this.newPeriod);
    return lines;
  }
  get newPeriod(): PaymentPeriod | null {
    const m = this.source;
    if (!this.renew || !m?.plan || !this.start) return null;
    const continuity = this.start === this.nextStart;
    const anchor = continuity ? m.renewalAnchorDay ?? Number(m.fechaInicio.slice(8, 10)) : Number(this.start.slice(8, 10));
    try {
      return {
        clientMembershipId: m.id!, coverageMode: continuity ? 'Continuity' : 'Restart',
        membershipStartDate: this.start,
        membershipEndDate: membershipEnd(this.start, m.plan.durationUnit ?? 'Days', m.plan.durationQuantity ?? m.plan.duracionDias, anchor),
        contractAmount: Number(this.price), monto: Number(this.price)
      };
    } catch { return null; }
  }
  get unpaidRenewal() {
    const period = this.newPeriod;
    return this.renew && !this.payRenewalNow && period ? {
      clientId: this.client!.id, membershipId: period.clientMembershipId,
      fechaInicio: period.membershipStartDate, fechaFin: period.membershipEndDate,
      precioFinal: period.contractAmount
    } : undefined;
  }
  get total() {
    return Math.round(this.periods.reduce((sum, p) => sum + p.monto, 0) * 100) / 100;
  }
  get error() {
    if (!this.memberships.length) return '';
    if (
      this.renew &&
      (!this.source?.plan ||
        !this.start ||
        !this.newPeriod ||
        this.start < this.nextStart ||
        !Number.isFinite(this.price) ||
        this.price <= 0)
    )
      return 'Revisá el plan, la fecha y el precio completo del nuevo período.';
    if (this.periods.length > 36) return 'Podés cobrar hasta 36 períodos en una operación.';
    if (this.periods.some((p) => p.monto <= 0))
      return 'Ese período ya tiene un pago registrado. Revisá los pagos pendientes de confirmar.';
    if (
      (this.newPeriod ? [this.newPeriod] : [])
        .some((p) =>
          this.memberships.some(
            (m) =>
              m.fechaInicio.slice(0, 10) <= p.membershipEndDate &&
              m.fechaFin.slice(0, 10) >= p.membershipStartDate,
          ),
        )
    )
      return 'El período nuevo se superpone con uno existente. Elegí una fecha posterior a su vencimiento.';
    return '';
  }
  get valid() {
    return (this.periods.length > 0 || !!this.unpaidRenewal) && !this.error;
  }
}
