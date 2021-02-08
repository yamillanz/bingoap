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
  private url3 : string;
  private url4 : string;

  

  constructor(private httpClient: HttpClient) { 
    this.url = environment.apiUrlDashoard;
    this.url1 = environment.apiUploadImgs;
    this.url2 = environment.apiUrlAuth;
   /*  this.url3 = 'http://api.ipstack.com/check?access_key=85530e6f61079b13519a5c0cdd766c36';
    this.url4 = 'https://api.ipify.org?format=json'; */
  }

  getCliente(id: number) { 
    return this.httpClient.get(`${this.url}clientes/${id}`);
  }

  agregarCliente(perfil: PerfilCliente) {
		return this.httpClient.post(`${environment.apiUrlClientes}/new-cliente`, perfil);
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

  /* getPais() : Observable<PerfilCliente[]>{
    const url = `${this.url}clientes/pais`;
    return this.httpClient.get<PerfilCliente[]>(url);      
  }  */

  getPais() : Observable<PerfilCliente[]>{
    /* const url = `http://api.ipstack.com/check?access_key=85530e6f61079b13519a5c0cdd766c36&security=1`; */
    const url = `http://api.ipstack.com/check?access_key=85530e6f61079b13519a5c0cdd766c36&output=json`
    return this.httpClient.get<PerfilCliente[]>(url);      
  } 
  

 /*  getPais() {
    return this.httpClient.get<any>(this.url3); 
  } */



  

  getIp() : Observable<PerfilCliente[]>{
    const url4 = `${this.url4}`;
    return this.httpClient.get<PerfilCliente[]>(url4);      
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
