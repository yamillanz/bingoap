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
  

  constructor(private httpClient: HttpClient) { 
    this.url = environment.apiUrlDashoard;
  }

  getCliente(id: string|number) {
    return this.httpClient.get(`${this.url}clientes/${id}`);
  } 

  updateCliente(id: string|number, updatedPerfil: PerfilCliente): Observable<PerfilCliente> {
    return this.httpClient.put(`${this.url}clientes/${id}`, updatedPerfil);
  }


}
