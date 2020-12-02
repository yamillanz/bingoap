import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	constructor() { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

		if (currentUser) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${currentUser.accessToken}`
				}
			});
		}
		return next.handle(request); 
	}
}
