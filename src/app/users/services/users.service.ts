import { User } from './../models/user';
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
}
