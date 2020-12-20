import { Injectable } from '@angular/core';
import { client } from '../models/client';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientAdminService {

  constructor(private http: HttpClient) { }

registerClient(client: client){
 return this.http.post<client>(`${environment.apiUrlAuth}clientes/register`, client);
}

getCountryConde(){
 return this.http.get(`${environment.apiUrlAuth}clientes/country`);
}



}
