import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthLoadGuard implements CanLoad {
	constructor(private router: Router){}
	canLoad()
	/* 	segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean */ {
		let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
		//let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            // loggcaned in so return true
            return true;
        }
		this.router.navigate(['/login']);
		return false;
	}
}
