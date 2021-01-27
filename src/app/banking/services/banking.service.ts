import { HttpClient } from '@angular/common/http';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { user } from 'src/app/users/models/user.model';
import { environment } from 'src/environments/environment';
import { Totales } from '../models/totales';
import { Transacciones } from '../models/transacciones';

@Injectable({
  providedIn: 'root'
})
export class BankingService {

  constructor(private http: HttpClient) { }
  messageError:any;

  getAllUsers() {
		return this.http.get<user[]>(`${environment.apiUrlAuth}users`)

	}
  
  getSaldoUsuario(idUsuario:number) : Observable<Totales[]>{
    
    const url = `${environment.apiUrlBalance}totales/usuario/${idUsuario}`;
    return this.http.get<Totales[]>(url);
    
  } 

  getSaldoUsuarioVsDealer(idUsuario: number, idDealer: number) : Observable<Totales[]>{
    
    const url = `${environment.apiUrlBalance}totales/usuario/${idUsuario}/dealer/${idDealer}`;
    return this.http.get<Totales[]>(url);  
    
  }

  getSaldoUsuarioById(id:number) : Observable<Totales[]>{
    
    const url = `${environment.apiUrlBalance}totales/${id}`;
    return this.http.get<Totales[]>(url);  
    
  }

  getSaldoGlobalUsuario(idUsuario:number) : Observable<Totales[]>{
    
    const url = `${environment.apiUrlBalance}totales/saldo-usuario/${idUsuario}`;
    return this.http.get<Totales[]>(url);  
    
  }

  saveTransaction(idUsuario: number, idDealer: number, transaccion: Transacciones) { 
    
    return this.http.post(`${environment.apiUrlBalance}transacciones/usuario/${idUsuario}/dealer/${idDealer}`, transaccion);
  } 


  /* saveTransactionSalida(transaccion: Transacciones) { 
    
    return this.http.post(`${environment.apiUrlBalance}transacciones/salida`, transaccion);
  }

  saveTransactionIfNoDealer(transaccion: Transacciones) { 
    return this.http.post(`${environment.apiUrlBalance}totales/entrada`, transaccion);
  }
 */
  /* updateSaldo(idUsuario: string|number, updatedSaldo: Totales): Observable<Totales> {
    return this.http.put<Totales>(`${environment.apiUrlBalance}totales/${idUsuario}`, updatedSaldo);
  } */

  /* updateSaldo(id: string|number, updatedSaldo: Totales): Observable<Totales> {
    return this.http.put<Totales>(`${environment.apiUrlBalance}totales/${id}`, updatedSaldo);
  } */
  
}
