import { BehaviorSubject } from 'rxjs';
import { User } from './../../users/models/user';
import { LoginUser } from './../models/login-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	isLogged: boolean = false;
	private userData$: BehaviorSubject<User> = new BehaviorSubject<User>(this._initBehavior());

	constructor(private http: HttpClient) {
		/* if (!this.userData$) {
			this.userData$ = new BehaviorSubject<User>(this._initBehavior());
		} */
	}

	login(user: LoginUser) {
		try {
			this.isLogged = true;
			return this.http.post<User>(`${environment.apiUrlAuth}auth/login`, user);
		} catch (error) {
			this.isLogged = false;
			return error;
		}

	}
	get isUserLogged() { return this.isLogged }

	_initBehavior() {
		let initUser: User = { userData: { id: "", email: "", activo: true, sesionActiva: "" }, accessToken: "" };
		return initUser
	}

	setUserSubject(data: User) {
		//console.log("set Obser", data);
		/* if (!this.userData$) {
			this.userData$ = new BehaviorSubject<User>(this._initBehavior());
		} */
		this.userData$.next(data);
	}

	unsetUserSubjet() {
		this.userData$.next(this._initBehavior());
	}

	getObservableBevior() {
		return this.userData$.asObservable();
	}

	accionarSesion(user: User) {

		return this.http.post(`${environment.apiUrlAuth}users/accionarsesion`, user.userData);
	}

	async logOut() {
		let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
		//let currentUser = JSON.parse(localStorage.getItem('currentUser'));
		/* if(currentUser && currentUser.userData.sesionActiva === 1){
			await this.accionarSesion(currentUser).toPromise();
			sessionStorage.removeItem('currentUser');
		} */
		//this.unsetUserSubjet();
		//if (environment.production) {
		if (currentUser) {
			await this.accionarSesion(currentUser).toPromise();
			sessionStorage.removeItem('currentUser');
			this.isLogged = false;
		}

		//localStorage.removeItem('currentUser');

		//}
	}

}