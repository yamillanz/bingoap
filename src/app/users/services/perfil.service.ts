import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PerfilCliente } from '../models/perfil';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PerfilService {
  private url : string;
  private url1 : string;
  private url2 : string;

  constructor(private httpClient: HttpClient) { 
    this.url = environment.apiUrlDashoard;
    this.url1 = environment.apiUploadImgs;
    this.url2 = environment.apiUrlAuth;
  }

  getCliente(id: string) {
    return this.httpClient.get(`${this.url}clientes/${id}`);
  } 

  updateCliente(id: string|number, updatedPerfil: PerfilCliente): Observable<PerfilCliente> {
    return this.httpClient.put(`${this.url}clientes/${id}`, updatedPerfil);
  }

  getFilesUploads(id: string) : Observable<any>{
    return this.httpClient.get(`${this.url1}img/${id}`);    
  }

  getClient(id:number) : Observable<PerfilCliente[]>{
    const url2 = `${this.url2}users/user/${id}`;
    return this.httpClient.get<PerfilCliente[]>(url2);      
  }

  getPaises() : Observable<PerfilCliente[]>{
    const url = `${this.url}/paises`;
    return this.httpClient.get<PerfilCliente[]>(url);      
  }

  getPerfiles() : Observable<PerfilCliente[]>{
    const url = `${this.url}menu-users/perfiles`;
    return this.httpClient.get<PerfilCliente[]>(url);      
  }

  getClientUsersData(idCliente:number) : Observable<PerfilCliente[]>{
    const url2 = `${this.url2}clientes/${idCliente}`;
    return this.httpClient.get<PerfilCliente[]>(url2);      
  }

  
}
