import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ClientContract, ContractClause, ContractTemplate } from '../models/contract.model';
@Injectable({ providedIn: 'root' })
export class ContractsService {
  private readonly http=inject(HttpClient); private readonly url=`${environment.apiUrl}/api/contracts`;
  getTemplates():Observable<ContractTemplate[]>{return this.http.get<ContractTemplate[]>(`${this.url}/templates`)}
  saveTemplate(payload:{id?:number|null;name:string;acceptanceText:string;clauses:ContractClause[]}):Observable<ContractTemplate>{return this.http.post<ContractTemplate>(`${this.url}/templates`,payload)}
  activateTemplate(id:number):Observable<ContractTemplate>{return this.http.post<ContractTemplate>(`${this.url}/templates/${id}/activate`,{legalReviewed:true})}
  getContracts(clientId?:number):Observable<ClientContract[]>{return this.http.get<ClientContract[]>(this.url,{params:clientId?{clientId}:{}})}
  issue(clientId:number):Observable<ClientContract>{return this.http.post<ClientContract>(`${this.url}/clients/${clientId}/issue`,{})}
  get(id:number):Observable<ClientContract>{return this.http.get<ClientContract>(`${this.url}/${id}`)}
  sign(id:number,payload:{signerName:string;signerDni:string;signatureDataUrl:string;accepted:boolean}):Observable<ClientContract>{return this.http.post<ClientContract>(`${this.url}/${id}/sign`,payload)}
  uploadPaper(id:number,signerName:string,signerDni:string,files:File[]):Observable<ClientContract>{const data=new FormData();data.append('signerName',signerName);data.append('signerDni',signerDni);files.forEach(file=>data.append('files',file));return this.http.post<ClientContract>(`${this.url}/${id}/paper`,data)}
  void(id:number):Observable<void>{return this.http.post<void>(`${this.url}/${id}/void`,{})}
  pdfUrl(id:number):string{return `${this.url}/${id}/pdf`}
  documentUrl(contractId:number,documentId:number):string{return `${this.url}/${contractId}/documents/${documentId}`}
  download(url:string):Observable<Blob>{return this.http.get(url,{responseType:'blob'})}
}
