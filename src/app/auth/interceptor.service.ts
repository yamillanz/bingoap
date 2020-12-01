import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // throw new Error('Method not implemented.');
    console.log('por el interceptor');

    const reqClone = req.clone({
      // Headers
    });
    return next.handle(reqClone).pipe(
      catchError(this.handleError)

    );

  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = 'un error en el retorno de la data';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }

    return throwError(errorMessage);
  }

}