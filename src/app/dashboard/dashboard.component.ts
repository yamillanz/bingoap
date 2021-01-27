import { Component, OnInit } from '@angular/core';


@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	idRol:any;

	constructor() { }
	

	async ngOnInit() {
		this.idRol = JSON.parse(sessionStorage.getItem('currentUser')).userData.idRolUsuario;
	}
	
	

}
