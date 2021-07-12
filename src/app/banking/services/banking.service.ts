import { TransPartida } from './../models/transPartida';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { user } from 'src/app/users/models/user.model';
import { environment } from 'src/environments/environment';
import { Totales } from '../models/totales';
import { Transacciones } from '../models/transacciones';
import { tap } from 'rxjs/operators';
@Injectable({
	providedIn: 'root'
})
export class BankingService {

	private _refreshBalance$ = new Subject<void>();

	constructor(private http: HttpClient) { }
	messageError: any;

	get refresh$(){ 
		return this._refreshBalance$;
	}

	getAllUsers() {
		return this.http.get<user[]>(`${environment.apiUrlAuth}users`)

	}
	//**********ESTE metod NO DEBEREIA ESTAR AQUI...SE LLAMA AL SERVCIO CORRESPONDIENTE

	getSaldoUsuario(idUsuario: number): Observable<Totales[]> {

		const url = `${environment.apiUrlBalance}totales/usuario/${idUsuario}`;
		return this.http.get<Totales[]>(url);

	}

	getSaldoUsuarioVsDealer(idUsuario: number, idDealer: number): Observable<Totales[]> {

		const url = `${environment.apiUrlBalance}totales/usuario/${idUsuario}/dealer/${idDealer}`;
		return this.http.get<Totales[]>(url);

	}

	getSaldoUsuarioById(id: number): Observable<Totales[]> {

		const url = `${environment.apiUrlBalance}totales/${id}`;
		return this.http.get<Totales[]>(url);

	}

	getSaldoGlobalUsuario(idUsuario: number): Observable<Totales[]> {
		const url = `${environment.apiUrlBalance}totales/saldo-usuario/${idUsuario}`;
		return this.http.get<Totales[]>(url)
		.pipe(
			tap(() => {
				this._refreshBalance$.next();
			})
		);
	} 

	saveTransaction(idUsuario: number, idDealer: number, transaccion: Transacciones) {
		console.log('servicio recarga', transaccion);
		return this.http.post(`${environment.apiUrlBalance}transacciones/recarga`, transaccion);
	}

	/* nuevaTransaction(transaccion: Transacciones) {
		return this.http.post(`${environment.apiUrlBalance}transacciones/recarga`, transaccion);
	} */

	transIngresoPartida(trans: TransPartida) {
		return this.http.post(`${environment.apiUrlBalance}transacciones/entrada`, trans);
	}

	transSalidaPartida(trans: TransPartida) {
		return this.http.post(`${environment.apiUrlBalance}transacciones/salida`, trans);
	}


}
