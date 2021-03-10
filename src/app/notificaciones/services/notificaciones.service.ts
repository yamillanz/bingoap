import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../src/environments/environment';
import { NotificacionesModel } from '../models/notificaciones';
import { HttpClient,  HttpHeaders} from '@angular/common/http';
import { TransaccionesModel } from '../../users/models/transacciones';

@Injectable({
  providedIn: 'root'
})

export class NotificacionesService {
  private url : string;
  private url1 : string;
  dialogData: any;

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
    idNotificacion: 0,
    idUsuarioRecibe: '',
    idUsuarioEnvia: '',
    mensaje: '',
    leido: '',
    fechaEnvio: '',
    fechaLectura: '',
    
  };

  getNotificationsByUser(idUsuarioRecibe:number) : Observable<NotificacionesModel[]>{
    const url = `${this.url}/usuario/${idUsuarioRecibe}`;
    return this.httpClient.get<NotificacionesModel[]>(url)      
  }

  getNotification(idNotificacion:number) : Observable<NotificacionesModel[]>{
    const url = `${this.url}/notif/${idNotificacion}`;
    return this.httpClient.get<NotificacionesModel[]>(url)      
  }

  getCantNotificationsByUser(idUsuarioRecibe:number) : Observable<NotificacionesModel[]>{
    const url = `${this.url}/usuario/cant/${idUsuarioRecibe}`;
    return this.httpClient.get<NotificacionesModel[]>(url)      
  }

  getBalanceByUser(idUsuarioRecibe: number) : Observable<TransaccionesModel>{
    const url1 = `${this.url1}/usuario/${idUsuarioRecibe}`;
    return this.httpClient.get<TransaccionesModel>(url1)       
  }

  updateMensaje(idNotificacion: number, mensaje: NotificacionesModel): Observable<NotificacionesModel> {
    console.log(mensaje);
    return this.httpClient.put(`${this.url}/mensaje/${idNotificacion}`, mensaje);
  }

  enviarMensaje(notificacion) : Observable<NotificacionesModel> {
    console.log(notificacion);
    return this.httpClient.post(`${this.url}`, notificacion);
  }

}
