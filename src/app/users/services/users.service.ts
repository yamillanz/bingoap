import { MessageResponse } from './../../models/message-response';
import { User } from './../models/user';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from './../models/user.model';

@Injectable({
	providedIn: 'root'
})
export class UsersService {
	private url : string;
	constructor(private http: HttpClient) {
		this.url = environment.apiUrlAuth;
	 }

	getUser(id: string) {
		return this.http.get(`${this.url}users/user/${id}`);

	} 

	getDataOneUser(id: string) {
		return this.http.get(`${this.url}users/${id}`);

	}

	getAllUsers() {
		return this.http.get<user[]>(`${environment.apiUrlAuth}users`);

	}

	updateUsuario(id: number, updatedUsuario: user): Observable<user> {
		return this.http.put(`${this.url}users/${id}`, updatedUsuario);
	
	}

	createUser(user: user) {
		return this.http.post<user>(`${environment.apiUrlUsuarios}/register`, user);
	}

	checkEmail(email: string) {
		return this.http.get<MessageResponse>(`${environment.apiUrlUsuarios}/check-email/${email}`);
	}

	mailer(mensaje: any) {
		return this.http.post(`${environment.apiUrlUsuarios}/sendmail`, mensaje)
	}

	actualizarUser(usuario : user){
		return this.http.put(`${environment.apiUrlUsuarios}/${usuario.id}`, usuario)
	}

	getUsuario(id : number){
		return this.http.get<user>(`${environment.apiUrlUsuarios}/by-email/${id}`)
	}

	changePass(usuario : user){
		return this.http.post(`${environment.apiUrlUsuarios}/change-password`, usuario)
	}

	

	/* accionarSesion(user : User){
		return this.http.post(`${environment.apiUrlAuth}users/accionarsesion`, user.userData);
	} */
}
