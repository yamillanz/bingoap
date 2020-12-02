import { UsersService } from './../users/services/users.service';
import { Router } from '@angular/router';
import { User } from '../users/models/user';
import { AuthService } from './../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	usuarios = [];
	constructor(private svrAuth: AuthService, private router: Router, private svrUsers : UsersService) { }
	dataUser: User;

	async ngOnInit(){
		this.svrAuth.getObservableBevior().subscribe((data) => {
			this.dataUser = { ...data }; console.log(data);
		});

		this.usuarios = await this.svrUsers.getAllUsers().toPromise();
		console.log("usuarios", this.usuarios);
		

	}

	logout() {
		console.log("dalio del beta");
		this.router.navigate(['/logout'])
		// this.svrAuth.logOut();
	}

}
