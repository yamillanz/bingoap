import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../src/environments/environment';
import { MenuModel } from '../models/menu';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  /* apiUrl = environment.apiUrlDashoard; */
  private url : string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { 
    this.url = environment.apiUrlDashoard +  'rol';
  }

  /* getMemusPorRol(idRol): Observable<MenuModel[]> {
    return this.httpClient.get<MenuModel[]>(this.apiUrl + 'rol/' + idRol);
  } */


  getMenuByIdRol(idRol:number) : Observable<MenuModel[]>{
    const url = `${this.url}/${idRol}`;
    console.log(url);
    return this.httpClient.get<MenuModel[]>(url)      
  }

 
}
