import { Injectable } from '@angular/core';
import { client } from '../models/client';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { user } from '../models/user.model';

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

updateUser(user: user){
  return this.http.put(`${environment.apiUrlAuth}users/`+ user.id,  user)
}
getnickname(client: client){
  return this.http.get(`${environment.apiUrlAuth}clientes/nickname`, client.nickname);
}


}
