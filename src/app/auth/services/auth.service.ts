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


	private userData$: BehaviorSubject<User> = new BehaviorSubject<User>(this._initBehavior());

	constructor(private http: HttpClient) {
		/* if (!this.userData$) {
			this.userData$ = new BehaviorSubject<User>(this._initBehavior());
		} */
	}

	login(user: LoginUser) {
		return this.http.post<User>(`${environment.apiUrlAuth}auth/login`, user);
	}

	_initBehavior() {
		let initUser: User = { userData: { id: "", email: "", activo: "", sesionActiva: "" }, accessToken: "" };
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

	logOut() {
		this.unsetUserSubjet();
		sessionStorage.removeItem('currentUser');
	}

}