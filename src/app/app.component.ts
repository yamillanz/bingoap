import { Subscription } from 'rxjs';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { environment } from './../environments/environment';
import { AuthService } from './auth/services/auth.service';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

	title = 'bingo';
	eventosGenerales$: Subscription;
	navegacion: boolean = false;


	constructor(
		private srvAuth: AuthService,
		private router: Router,
		private location: Location) {
		/* 	this.eventosGenerales$ = this.router.events
				.pipe(filter(e => e instanceof NavigationEnd || e instanceof NavigationStart))
				.subscribe((eventos) => {
					if (eventos instanceof NavigationStart) {
						this.navegacion = true;
						console.log("navegacion Start ", this.navegacion);
					}
	
					if (eventos instanceof NavigationEnd) {
						this.navegacion = false;
						console.log("navegacion End", this.navegacion);
					}
	
					//this.navegacion = false;
	
				}); */
		/* 
				this.location.onUrlChange((url: string, state: unknown) => {
					this.navegacion = true;
					console.log("cambio nav ", this.navegacion, state);
		
				}) */
	}

	ngOnInit() {
		let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
		if (currentUser?.accessToken) {
			this.navegacion = true;
		}
	}

	/* 	public doUnload(e): void {
			this.doBeforeUnload(e);
			//this.srvAuth.logOut(); 
		}
	
		// Keep me Signed in
		public doBeforeUnload(e): void {
			e.preventDefault();
			alert("Window Closed");
			// Clear localStorage
			//localStorage.removeItem('username_key');
			//if (environment.production) {
			//this.srvAuth.logOut();
			//}		
		}
	 */
	ngOnDestroy(): void {
		//sessionStorage.setItem('currentUser', JSON.stringify(dataUser));
		//this.eventosGenerales$.unsubscribe();
	}

	/* @HostListener('window:unload', ['$event'])
	unloadHandler(event) {
		event.preventDefault();
		alert("Window Upload!!!");
		return false;
	} */

	@HostListener('window:unload', ['$event'])
	beforeUpload(event) {
		this.srvAuth.logOut();

		/* if (!this.navegacion) {
			this.srvAuth.logOut();
		} */
		/* 	event.preventDefault();
			if ((event.clientX < 0) || (event.clientY < 0)) // close button
			{
				alert("Window Closed");
				this.srvAuth.logOut();
			}
			else if (event.altKey == true) // ALT + F4
			{
				alert("Window Closed");
				this.srvAuth.logOut();
			} */
		//event.preventDefault();
	}
}
