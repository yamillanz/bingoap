import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { user } from '../models/user.models';
import { UserResponse } from '../models/userResponse.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {
  usuario: user;
private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  get isLogged(): Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  loging(usuario: user): Observable<UserResponse | void>{
    return this.http.post<UserResponse>(`${environment.apiUrlReg}`, usuario)
    .pipe(
      map((res) => {
        this.loggedIn.next(true);
        return res
      }
    ));
  }
/*   
  private saveUser(user: user): void {
    localStorage.getItem('user loged', user);
  }
 */

}

