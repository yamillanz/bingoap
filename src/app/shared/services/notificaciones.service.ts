import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../src/environments/environment';
import { NotificacionesModel } from '../models/notificaciones';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private url : string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { 
    this.url = environment.apiUrlDashoard +  'notificaciones';
  }


  getNotificationsByUser(idUsuarioRecibe:number) : Observable<NotificacionesModel[]>{
    const url = `${this.url}/usuario/${idUsuarioRecibe}`;
    console.log('Esta es la URL: ', url);
    return this.httpClient.get<NotificacionesModel[]>(url)      
  }

  getCantNotificationsByUser(idUsuarioRecibe:number) : Observable<NotificacionesModel[]>{
    const url = `${this.url}/usuario/cant/${idUsuarioRecibe}`;
    console.log('Esta es la URL: ', url);
    return this.httpClient.get<NotificacionesModel[]>(url)      
  }

}
