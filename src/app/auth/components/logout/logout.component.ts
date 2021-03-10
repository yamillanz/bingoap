import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

	constructor(private srvAuth: AuthService, private router: Router) { }

	ngOnInit(): void {
		this.srvAuth.logOut();
		this.router.navigate(['/login']);
	}

}
