import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy,Component,inject,signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {ClientContract} from '../../models/contract.model';
import {ContractsService} from '../../services/contracts.service';

@Component({selector:'app-my-contracts-page',standalone:true,imports:[CommonModule,MatButtonModule,MatIconModule,RouterLink],templateUrl:'./my-contracts-page.html',styleUrl:'./my-contracts-page.scss',changeDetection:ChangeDetectionStrategy.OnPush})
export class MyContractsPageComponent{
  private readonly service=inject(ContractsService);readonly contracts=signal<ClientContract[]>([]);readonly loading=signal(true);readonly error=signal('');
  constructor(){this.service.getMine().subscribe({next:items=>{this.contracts.set(items);this.loading.set(false)},error:()=>{this.error.set('No pudimos cargar tus contratos.');this.loading.set(false)}})}
  download(item:ClientContract):void{this.service.download(this.service.pdfUrl(item.id)).subscribe(blob=>{const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=`contrato-${item.templateVersion}.pdf`;link.click();URL.revokeObjectURL(url)})}
  label(status:string):string{return({Signed:'Firmado',PendingSignature:'Pendiente de firma',Superseded:'Reemplazado',Voided:'Anulado'}as Record<string,string>)[status]??status}
}
