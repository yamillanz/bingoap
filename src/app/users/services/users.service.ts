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

	/* accionarSesion(user : User){
		return this.http.post(`${environment.apiUrlAuth}users/accionarsesion`, user.userData);
	} */
}
