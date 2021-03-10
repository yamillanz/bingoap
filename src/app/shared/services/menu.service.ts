import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../src/environments/environment';
import { MenuModel } from '../models/menu';
/* import { NotificacionesModel } from '../models/notificaciones'; */
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
}) 
export class MenuService {
  private url : string;
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { 
    this.url = environment.apiUrlDashoard +  'menu-users';
  }

  dataCliente: any; 

  getMenuByIdRol(idRol:number) : Observable<MenuModel[]>{
    const url = `${this.url}/rol/${idRol}`;
    return this.httpClient.get<MenuModel[]>(url)      
  }

}