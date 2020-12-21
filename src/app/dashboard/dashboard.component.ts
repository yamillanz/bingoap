import { UsersService } from './../users/services/users.service';
import { Router } from '@angular/router';
import { User } from '../users/models/user';
import { AuthService } from './../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../shared/services/sidebar.service';
import { MenuModel } from '../shared/models/menu';
import { MenuService } from '../shared/services/menu.service';


@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	usuarios = [];
	constructor(private svrAuth: AuthService, private router: Router, private svrUsers : UsersService,
		private sidebarService : SidebarService, public menuService: MenuService) { }
	dataUser: User;
	dataCliente: any = [];
	DataCliente: MenuModel[];
	rol: any = [];
	nickname: any = [];
	idCliente: any = [];

	  

	async ngOnInit(){
		/* this.svrAuth.getObservableBevior().subscribe((data) => {
			this.dataUser = { ...data }; console.log(data);
		});
 */
		//this.usuarios = await this.svrUsers.getAllUsers().toPromise();
		//console.log("usuarios", this.usuarios);
		
		this.loadDataUser(this.idCliente);

	}
	loadDataUser(idCliente) {
		this.dataCliente.idCliente = JSON.parse(sessionStorage.getItem('currentUser')).userData.idCliente;
		
		this.menuService.getClientUsersData(this.dataCliente.idCliente).subscribe(data =>{
		  this.DataCliente = data;
		  console.log('idcliente:', this.DataCliente)
		  /* this.nickname= data[0].nickname; */
		  console.log('nickname', this.nickname);
		  /* this.rol= data[0].rol; */
		  /* console.log('rol:', data[0].rol); */
		  /* this.idCliente= data[0].idCliente; */
		});
		}
	



}
