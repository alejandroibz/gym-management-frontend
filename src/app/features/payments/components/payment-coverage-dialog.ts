import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Client, ClientMembership } from '../../clients/models/client.model';
import { PaymentCreatePayload } from '../models/payment.model';
import { membershipEnd, nextDay } from '../utils/membership-dates';

@Component({standalone:true, imports:[CommonModule, FormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
template: `
<h2 mat-dialog-title>Confirmar cobertura del cobro</h2>
<mat-dialog-content>
  <p>Fecha del cobro: {{data.payload.fechaPago | date:'dd/MM/yyyy'}} · Importe: {{data.payload.monto | currency:'ARS'}}</p>
  <mat-form-field appearance="outline"><mat-label>Contratación / plan</mat-label><mat-select [(ngModel)]="membershipId" (selectionChange)="reset()">@for(m of memberships; track m.id){<mat-option [value]="m.id">{{m.planNameSnapshot || m.plan?.nombre}} · {{m.fechaInicio | date:'dd/MM/yyyy'}}–{{m.fechaFin | date:'dd/MM/yyyy'}}</mat-option>}</mat-select></mat-form-field>
  @if(membership){<p><strong>Válida hasta: {{membership.fechaFin | date:'dd/MM/yyyy'}}</strong> (último día incluido)</p>}
  <mat-form-field appearance="outline"><mat-label>Cómo aplicar el pago — obligatorio</mat-label><mat-select [(ngModel)]="mode" (selectionChange)="recalculate()"><mat-option value="Existing">Pagar saldo de la contratación elegida</mat-option><mat-option value="Continuity">Renovar con continuidad</mat-option><mat-option value="Restart">Nueva cobertura desde una fecha</mat-option><mat-option value="Custom">Fechas personalizadas con motivo</mat-option></mat-select></mat-form-field>
  @if(mode){
    @if(mode === 'Existing'){<p>Saldo disponible para registrar: <strong>{{availableBalance | currency:'ARS'}}</strong>. Los pagos pendientes de confirmar también reservan saldo.</p>}
    @if(overlaps){<p role="alert">Estas fechas se superponen con una contratación existente. Elegí fechas posteriores o revisá primero esa contratación.</p>}
    @if(mode !== 'Existing'){<mat-form-field appearance="outline"><mat-label>Precio total contratado</mat-label><input matInput type="number" [(ngModel)]="contractAmount" [min]="data.payload.monto" required><mat-hint>Si este pago es parcial, indicá el total: el resto quedará como saldo pendiente.</mat-hint></mat-form-field>}
    <mat-form-field appearance="outline"><mat-label>Válido desde</mat-label><input matInput type="date" [(ngModel)]="start" (ngModelChange)="updateEnd()" [readonly]="mode === 'Existing' || mode === 'Continuity'" required></mat-form-field>
    <mat-form-field appearance="outline"><mat-label>Válido hasta (incluido)</mat-label><input matInput type="date" [(ngModel)]="end" [readonly]="mode !== 'Custom'" required></mat-form-field>
    @if(mode === 'Custom'){<mat-form-field appearance="outline"><mat-label>Motivo del ajuste</mat-label><textarea matInput [(ngModel)]="reason" maxlength="500" required></textarea></mat-form-field>}
    <p>{{mode === 'Existing' ? 'Este pago no extiende fechas. Se aplica al saldo de la contratación elegida.' : 'Se conservará la contratación anterior y se registrará una nueva con estas fechas.'}}</p>
    <p>Los pagos pendientes de confirmar no habilitan por sí solos la cobertura como pagada.</p>
  }
</mat-dialog-content><mat-dialog-actions><button mat-button mat-dialog-close>Volver</button><button mat-flat-button [disabled]="!valid" (click)="confirm()">Confirmar fechas y registrar cobro</button></mat-dialog-actions>
`,styles:[`mat-form-field{display:block;width:100%}mat-dialog-content{min-width:280px}`]})
export class PaymentCoverageDialogComponent {
  readonly data = inject<{client:Client,payload:PaymentCreatePayload}>(MAT_DIALOG_DATA);
  private readonly ref = inject(MatDialogRef<PaymentCoverageDialogComponent>);
  readonly memberships = (this.data.client.membershipsHistory?.length ? this.data.client.membershipsHistory : [this.data.client.membership]).filter((m):m is ClientMembership => !!m && m.activo !== false && m.estado === 'Active');
  membershipId = this.data.payload.clientMembershipId ?? this.data.client.membership?.id;
  contractAmount = this.data.payload.monto;
  mode = ''; start = ''; end = ''; reason = '';
  get membership(){ return this.memberships.find(m=>m.id===this.membershipId); }
  get availableBalance(){const m=this.membership;if(!m)return 0;return Math.max(0,m.precioFinal-(this.data.client.payments ?? []).filter(p=>Number(p['clientMembershipId'])===m.id && p['activo']!==false).reduce((sum,p)=>sum+Number(p['monto'] ?? 0),0));}
  get overlaps(){return this.mode !== 'Existing' && !!this.start && !!this.end && this.memberships.some(m=>m.fechaInicio.slice(0,10)<=this.end && m.fechaFin.slice(0,10)>=this.start);}
  get valid(){return !this.overlaps && (this.mode !== 'Existing' || this.data.payload.monto <= this.availableBalance) && !!this.membership && (this.mode === 'Existing' || this.contractAmount >= this.data.payload.monto) && !!this.mode && !!this.start && !!this.end && this.end >= this.start && (this.mode !== 'Custom' || !!this.reason.trim());}
  reset(){this.mode='';this.start='';this.end='';this.reason='';}
  recalculate(){const m=this.membership;if(!m)return;
    this.start=this.mode==='Existing'?m.fechaInicio.slice(0,10):this.mode==='Continuity'?nextDay(m.fechaFin):this.data.payload.fechaPago.slice(0,10);
    this.end=this.mode==='Existing'?m.fechaFin.slice(0,10):'';this.updateEnd();
  }
  updateEnd(){const m=this.membership;if(!m || !this.start || this.mode==='Existing')return;
    if(this.mode!=='Custom' || !this.end)this.end=membershipEnd(this.start,m.plan?.durationUnit ?? 'Days',m.plan?.durationQuantity ?? m.plan?.duracionDias ?? 1,this.mode==='Continuity' ? m.renewalAnchorDay ?? Number(m.fechaInicio.slice(8,10)):undefined);
  }
  confirm(){if(this.valid)this.ref.close({...this.data.payload,clientMembershipId:this.membershipId,coverageMode:this.mode,contractAmount:this.contractAmount,coverageReason:this.reason.trim(),membershipStartDate:this.start,membershipEndDate:this.end});}
}
