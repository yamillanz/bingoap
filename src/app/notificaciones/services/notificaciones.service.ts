import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../src/environments/environment';
import { NotificacionesModel } from '../models/notificaciones';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';
import { TransaccionesModel } from '../../users/models/transacciones';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private url : string;
  private url1 : string;
  dialogData: any;

  /* httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } */

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) { 
    this.url = environment.apiUrlDashoard +  'notificaciones';
    this.url1 = environment.apiUrlDashoard +  'transacciones';
    
  }

  notificaciones: Observable<any>;
  notificacion: Observable<any>;

  public selectedMensaje: NotificacionesModel = {
    idNotificacion: null,
    idUsuarioRecibe: '',
    idUsuarioEnvia: '',
    mensaje: '',
    leido: '',
    fechaEnvio: '',
    fechaLectura: '',
    
  };

  
  getNotificationsByUser(idUsuarioRecibe:number) : Observable<NotificacionesModel[]>{
    /* const url = `${this.url}/usuario/${idUsuarioRecibe}`; */
    const url = `${this.url}/mensaje/${idUsuarioRecibe}`;
    console.log('Esta es la URL: ', url);
    return this.httpClient.get<NotificacionesModel[]>(url)      
  }


  getNotification(idNotificacion:number) : Observable<NotificacionesModel[]>{
    /* const url = `${this.url}/usuario/${idUsuarioRecibe}`; */
    const url = `${this.url}/notif/${idNotificacion}`;
    console.log('Esta es la URL: ', url);
    return this.httpClient.get<NotificacionesModel[]>(url)      
  }

  

  getCantNotificationsByUser(idUsuarioRecibe:number) : Observable<NotificacionesModel[]>{
    const url = `${this.url}/usuario/cant/${idUsuarioRecibe}`;
    console.log('Esta es la URL: ', url);
    return this.httpClient.get<NotificacionesModel[]>(url)      
  }

  getBalanceByUser(idUsuarioRecibe:number) : Observable<TransaccionesModel[]>{
    const url1 = `${this.url1}/usuario/${idUsuarioRecibe}`;
    console.log('Esta es la URL: ', url1);
    return this.httpClient.get<TransaccionesModel[]>(url1)       
  }

  updateMensaje(idNotificacion: number, mensaje: NotificacionesModel): Observable<NotificacionesModel> {
    return this.httpClient.put(`${this.url}/mensaje/${idNotificacion}`, mensaje);
  }

  


}
