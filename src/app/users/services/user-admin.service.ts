import { BehaviorSubject } from 'rxjs';
import { user } from '../models/user.model'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UserAdminService {

	constructor(private http: HttpClient) { }


	/* mailer(mensaje: any) {
		return this.http.post(`${environment.apiUrlUsuarios}/sendmail`, mensaje)
	} */

	/* useEmail(user: user){
	 
	 return this.http.get(`${environment.apiUrlUsuarios}/validate`, user.email);
	} */
}
