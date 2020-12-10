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

  createUser(user: user){
		return this.http.post<user>(`${environment.apiUrlAuth}users/register/`, user)
  }
  
  mailer(mail: string){
    return this.http.post(`${environment.apiUrlAuth}users/sendmail`, mail)
  }
}
