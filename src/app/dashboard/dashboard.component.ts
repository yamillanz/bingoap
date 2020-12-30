import { UsersService } from './../users/services/users.service';
import { Router } from '@angular/router';
import { User } from '../users/models/user';
import { AuthService } from './../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../shared/services/sidebar.service';
import { client } from '../users/models/client';
import { PerfilService } from '../users/services/perfil.service';


@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	usuarios = [];
	constructor(private svrAuth: AuthService, private router: Router, private svrUsers: UsersService,
		private sidebarService: SidebarService,  public perfilService: PerfilService) { }
	dataUser: User;
	dataCliente: any = [];
	DataCliente: client[];
	rol: any = [];
	nickname: any = [];
	idCliente: any = [];



	async ngOnInit() {
		/* this.svrAuth.getObservableBevior().subscribe((data) => {
			this.dataUser = { ...data }; console.log(data);
		});
 */
		//this.usuarios = await this.svrUsers.getAllUsers().toPromise();
		//console.log("usuarios", this.usuarios);

		//this.loadDataUser(this.dataCliente.idCliente);

	}
	loadDataUser(idCliente) {
		this.dataCliente.id= JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
		this.perfilService.getClient(this.dataCliente.id).subscribe(data => {
			this.DataCliente = data;
			this.nickname = data[0].nickname;
			this.rol = data[0].rol;
			this.idCliente = data[0].idCliente;
		});
	}


}
