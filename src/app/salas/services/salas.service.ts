import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Salas } from '../models/salas';

@Injectable({
  providedIn: 'root'
}) 
export class SalasService {
  private url : string;
  constructor(private http: HttpClient) { 
    this.url = environment.apiUrlDashoard;
  } 

  getSalas() : Observable<Salas[]>{
    const url = `${this.url}salas`;
    return this.http.get<Salas[]>(url);  
    console.log('url salas', url );    
  }

  getSala(id:number) : Observable<Salas[]>{
    const url = `${this.url}salas/${id}`;
    return this.http.get<Salas[]>(url);      
  }

  getDealers() : Observable<Salas[]>{
    const url = `${this.url}salas/dealers/2`;
    return this.http.get<Salas[]>(url);      
  }

  updateSala(id: string|number, updatedSala: Salas): Observable<Salas> {
    return this.http.put(`${this.url}salas/${id}`, updatedSala);
  }

  /* saveSala(id: string|number, updatedSala: Salas): Observable<Salas> {
    return this.http.put(`${this.url}salas/${id}`, updatedSala);
  } */

  saveSala(newSala): Observable<Salas> { 
    return this.http.post(`${this.url}salas`, newSala);
  }

  deleteSala(id: number) {
    return this.http.delete(`${this.url}salas/${id}`);
  }


}
