import { Injectable } from '@angular/core';
import { Saldo } from '../models/balance';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private http: HttpClient) { }

  /* registerSaldoCero(newBalance): Observable<Saldo> {
		return this.http.post(`${environment.apiUrlBalance}totales/first-balance`, newBalance);
  } */

  
  getBalance(id: string) {
    return this.http.get(`${environment.apiUrlBalance}totales/usuario/${id}`);    
  }

  updateBalance(id: string|number, updatedSaldo: Saldo): Observable<Saldo> {
    return this.http.put(`${environment.apiUrlBalance}totales/${id}`, updatedSaldo);
  }

  registerSaldoCero(saldos): Observable<Saldo> {
		return this.http.post(`${environment.apiUrlBalance}totales/first-balance`, saldos);
	}

  
}
