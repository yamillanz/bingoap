import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../src/environments/environment';
import { MenuModel } from '../models/menu';
import { NotificacionesModel } from '../models/notificaciones';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
}) 
export class MenuService {
  /* apiUrl = environment.apiUrlDashoard; */
  private url : string;
  private url1 : string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { 
    this.url = environment.apiUrlDashoard +  'menu-users';
    this.url1 = environment.apiUrlDashoard +  'notificaciones';
  }

  /* getMenusPorRol(idRolUsuario): Observable<MenuModel[]> {
    return this.httpClient.get<MenuModel[]>(this.url1 + 'rol/' + idRolUsuario);
  } */


  getMenuByIdRol(idRol:number) : Observable<MenuModel[]>{
    const url = `${this.url}/rol/${idRol}`;
    console.log(url);
    return this.httpClient.get<MenuModel[]>(url)      
  }

  getClientUsersData(idCliente:number) : Observable<MenuModel[]>{
    const url = `${this.url1}/client/${idCliente}`;
    console.log(url);
    return this.httpClient.get<MenuModel[]>(url)      
  }

 

 
}
