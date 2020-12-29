import { MessageResponse } from './../../models/message-response';
import { User } from './../models/user';
import { user } from '../models/user.model'
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 


@Injectable({
	providedIn: 'root'
})
export class UsersService {

	constructor(private http: HttpClient) { }

	getAllUsers() {
		return this.http.get<User[]>(`${environment.apiUrlAuth}users`);
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

	

	/* accionarSesion(user : User){
		return this.http.post(`${environment.apiUrlAuth}users/accionarsesion`, user.userData);
	} */
}
