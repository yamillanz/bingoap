import { environment } from './../environments/environment';
import { AuthService } from './auth/services/auth.service';
import { Component, OnDestroy } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

	title = 'bingo';

	constructor(private srvAuth: AuthService) { }

	// Keep me Signed in
	public doUnload(): void {
		//this.doBeforeUnload();
	}

	// Keep me Signed in
	public doBeforeUnload(): void {
		// Clear localStorage
		//localStorage.removeItem('username_key');
		if (environment.production) {
			this.srvAuth.logOut(); 
		}		
	}

	ngOnDestroy(): void {
		this.srvAuth.logOut();
		//throw new Error('Method not implemented.');
	}
}
