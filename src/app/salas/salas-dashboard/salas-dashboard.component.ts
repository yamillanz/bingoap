import { Component, OnInit } from '@angular/core';
import { client } from '../../users/models/client';
import { PerfilService } from '../../users/services/perfil.service';
import { BankingService } from '../../banking/services/banking.service';
import { Totales } from '../../banking/models/totales';
import { SalasService } from '../../salas/services/salas.service';
import { Salas } from '../../salas/models/salas';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-salas-dashboard',
  templateUrl: './salas-dashboard.component.html',
  styleUrls: ['./salas-dashboard.component.scss']
})
export class SalasDashboardComponent implements OnInit {
  usuarios = [];
  constructor(private svrAuth: AuthService, private router: Router, private svrUsers: UsersService,
		public perfilService: PerfilService, private bankingService: BankingService, private salasService: SalasService) { }


    DataSaldoUsuario: Totales[];
	dataCliente: any = [];
	DataCliente: client[];
	dataDealer:client[];
	rol: any = [];
	nickname: any = [];
	idCliente: any = [];
	idDealer: any;
	DataSala: Salas[];
	imagen: any;
	saldo1: any;
  nombreDealer: any;
  
  ngOnInit(): void {
    this.dataCliente.id= JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
		this.loadDataUser(this.dataCliente.id);
		this.loadSaldo();
  }

  loadDataUser(idCliente) {
		
		this.perfilService.getClient(this.dataCliente.id).subscribe(data => {
			this.DataCliente = data;
			this.nickname = data[0].nickname;
			
			this.rol = data[0].idRolUsuario;
			this.idCliente = data[0].idCliente;
			console.log(this.rol);
			console.log(this.DataCliente);
		});
	}

	loadSaldo() {
		
		this.bankingService.getSaldoUsuario(this.dataCliente.id).subscribe(data => {
			this.DataSaldoUsuario = data;
			this.idDealer = data[0].idDealer;
			this.saldo1 = data[0].saldo;
			console.log('data usuario saldo', this.DataSaldoUsuario);
			console.log('data idDealer', this.idDealer);
			this.salasService.getSalaByUser(this.dataCliente.id).subscribe(data => {
				this.DataSala = data;
				console.log('Estas son las salas del usuario', this.DataSala);
				this.perfilService.getClient(this.idDealer).subscribe(data => {
					this.dataDealer = data;
					this.nombreDealer = data[0].nombreCompleto;
					
					console.log('data dealer:', this.dataDealer);
				});
			});
		});
	}

	/* getNombreDealer(){
		this.perfilService.getClient(this.idDealer).subscribe(data => {
			this.dataDealer = data;
			this.nombreDealer = data[0].nombreCompleto;
			
			console.log('data dealer:', this.dataDealer);
		});
	} */

	loadSalasByUser() {
		this.salasService.getSalaByUser(this.dataCliente.id).subscribe(data => {
			this.DataSala = data;
			console.log('Estas son las salas del usuario', this.DataSala);
		});
	}

}
