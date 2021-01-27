import { ClientAdminService } from './../services/client-admin.service';
import { client } from './../models/client';
import { Saldo } from './../models/balance';
import { UsersService } from './../services/users.service';
import { BalanceService } from './../services/balance.service'
import {
	Validators,
	FormBuilder,
	FormControl,
	FormGroup
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MyValidations } from './customValidator';
import { DatePipe } from '@angular/common';
import { user } from '../models/user.model';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { concatMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
	providers: [DatePipe, MessageService],
})

export class RegisterComponent implements OnInit {
	id:any;
	usuario: any;
	idUsuario: any;
	/* saldo: Saldo; */

	saldo: Saldo = {
		id: 0,
		idUsuario: 0,
		saldo: 0,
		idDealer: 0,
		idSala: 0,
		fechaCreacion: new Date,
		fechaActualizacion: new Date,
	}

	newUserForm = new FormGroup({});
	newClienteForm = new FormGroup({});
	confirmationCode: number;
	showPassword: boolean;
	newUser: user = {};
	myDate = new Date();
	sendEmail = {
		email: '',
		mensaje: ''
	};
	showForm: boolean = false;
	showFormUser: boolean = true;
	showFormCliente: boolean = false;

	receivedCode: number;
	currentUser: user;

	constructor(private fb: FormBuilder,
		private svrClientes: ClientAdminService,
		private srvUser: UsersService,
		private datePipe: DatePipe,
		private router: Router,
		private messageService: MessageService,
		private balanceService: BalanceService) {

		this.newUserForm = this.fb.group({
			email: new FormControl('', [Validators.required, Validators.email,], MyValidations.checkEmailTacked(this.srvUser)),
			pass: new FormControl('', [
				Validators.required, Validators.minLength(8),
				Validators.pattern(`^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$`)
			]),
			repeat_password: new FormControl('',),
			declaro: new FormControl('', Validators.required),
			codigoRecived: new FormControl(''),
		});
		this.newUserForm.get('repeat_password').setValidators(
			[
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(15),
				MyValidations.equalsValidator(this.newUserForm.get('pass')),
			]
		);
		this.newUserForm.get('repeat_password').updateValueAndValidity();


		this.newClienteForm = this.fb.group({
			nickname: new FormControl('', Validators.required),
			nombreCompleto: new FormControl(''),
			direccion: new FormControl('',),
			telefono: new FormControl(''),
		});
	}

	ngOnInit() {
		this.showForm = false;
	}

	get email() { return this.newUserForm.get('email'); }
	get pass() { return this.newUserForm.get('pass'); }
	get repeat_password() { return this.newUserForm.get('repeat_password'); }
	get declaro() { return this.newUserForm.get('declaro'); }
	get codigoRecived() { return this.newUserForm.get('codigoRecived'); }
	get nickname() { return this.newClienteForm.get('nickname'); }

	registarUsuario() {

		if (this.newUserForm.valid) {
			this.newUser.email = this.newUserForm.value.email;
			this.newUser.pass = this.newUserForm.value.pass;
			this.newUser.aceptoCondiciones = this.newUserForm.value.declaro ? 1 : 0;
			this.newUser.activo = 1;
			this.newUser.sesionActiva = 0;
			this.newUser.idRolUsuario = 3; //rol de usuario de la BD
			this.showForm = false;
			this.showFormUser = false;
			this.showFormCliente = true;
			//this.sendMail(); 
		}



	}

	

	generateCode() {
		let min = 100000;
		let max = 500000;
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	sendMail() {
		const codeGenerated: number = this.generateCode();
		this.confirmationCode = codeGenerated;
		this.sendEmail = {
			email: this.newUserForm.value.email,
			mensaje: `<p>Bienvenido a nuestra plataforma, la seguridad es primero. Copia el codigo a continuación:</p><br>
					<p><span><strong>Confirmation Code: ${codeGenerated} </strong></span></p><br> 
					<p>Moderna, segura y divertida; Bienvenido!!!</p>`
		};
		//this.showForm = true;
		// console.log(this.sendEmail);
		this.srvUser.mailer(this.sendEmail).toPromise()
			.then(res => {
				this.showForm = true;
				this.codigoRecived.setValidators([Validators.required, MyValidations.equalsCodigo(this.confirmationCode.toString())]);
				this.codigoRecived.updateValueAndValidity();
			})
			.catch((error) => {
				console.log("Problemas en el envío del correo!!!")
			});
	}

	goLogin() {
		this.router.navigate(['/login'])
	}
	registerNextStep() {
		this.router.navigate(['/cliente'])
	}

	aceptarCondi(event) {
		//console.log(this.repeat_password.valid);
		if (this.email.valid && this.repeat_password.valid && this.newUserForm.value.declaro) {
			//console.log("envio");
			this.showForm = true;
			this.sendMail();
		}
	}

	registrarFull() {
		if (this.newClienteForm.valid) {
			let newClient: client = {};
			newClient.nickname = this.newClienteForm.value.nickname;
			newClient.nombreCompleto = this.newClienteForm.value.nombreCompleto;
			newClient.direccion = this.newClienteForm.value.direccion;
			newClient.numeroTelefono = this.newClienteForm.value.telefono;
			this.srvUser.createUser(this.newUser).pipe(
				concatMap((resp) => {
					newClient.idUsuario = resp.id;
					this.newUser.id = resp.id;
					return this.svrClientes.registerClient(newClient);
				})
			)
				.subscribe((clientefinal) => {
					this.newUser.idCliente = clientefinal.id;
					delete this.newUser.pass;

					this.saldo.idUsuario = newClient.idUsuario;
					this.saldo.saldo =0;
					delete this.saldo.idDealer;
					delete this.saldo.idSala;
					console.log('saldo a registrar*****', this.saldo)
					this.balanceService.registerSaldoCero(this.saldo).subscribe(
						(res) => {
						  console.log(res);
						},
						(err) => console.error(err)
					  );
					  
					
			


					
					this.srvUser.actualizarUser(this.newUser).subscribe((respFinal) => {
						this.messageService.clear();
						this.messageService.add({ key: "t1", severity: 'success', summary: 'Felicidades!!!', detail: 'Ahora inicia sesión para disfrutar del bingo' });
						//this.router.navigate(['/login'])
						//await this.balanceServicio.registrarCero(idUsuairo).toPromise();
						//console.log("actualizado final", respFinal);
					});

				});
		}
	}

	

	redirect() {
		this.router.navigate(['/login']);
	}

	/* 
		async saveUser() {
	
			this.newUser.email = this.newUserForm.value.email;
			this.newUser.pass = this.newUserForm.value.pass;
			this.newUser.fechaCreacion = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');// arrreglar ese espanglish
			this.newUser.activo = 0;
			this.newUser.emailValido = true;
			this.newUser.idCliente = 0;
			this.newUser.sesionActiva = 0;
			this.newUser.idRolUsuario = 0;
			this.newUser.tipo = 0;
			//this.currentUser = await this.userAdmin.createUser(this.newUser).toPromise()
			if (this.currentUser.emailValido) {
				const data = sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser))
				//console.log('ladata que debeia estar en storage y retorna de guardar', data);
				this.registerNextStep();
			}
	
		}
	 */

}



