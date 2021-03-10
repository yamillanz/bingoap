import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificacionesModel } from '../models/notificaciones';
import { NotificacionesService } from '../services/notificaciones.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { BankingService } from 'src/app/banking/services/banking.service';
import { user } from 'src/app/users/models/user.model';
import { DatePipe } from '@angular/common'

@Component({
	selector: 'app-notificaciones',
	templateUrl: './notificaciones.component.html',
	styleUrls: ['./notificaciones.component.scss'],
  	providers: [MessageService, ConfirmationService, DatePipe]
})

export class NotificacionesComponent implements OnInit {
	Notificaciones: any = [];
	notif: any = [];
	notificaciones: NotificacionesModel[] = [];
	displayModal: boolean = false;
	cantidadNotificaciones: NotificacionesModel[];
	idUsuarioRecibe:any;
	filteredUsers: any;
	usuarios: user[];
	rol: any;
	usuario: any = {};
	idUsuarioEnvia: any;

	notificacion: NotificacionesModel = {
		idNotificacion: 0,
		idUsuarioEnvia: 0,
		idUsuarioRecibe: 0,
		mensaje: '',
		leido: 0,
		fechaEnvio: new Date(),
		fechaLectura: Date,
		mensajeForAll: 0,
		email: '',
	  };
	

	constructor(public datepipe: DatePipe, private router: Router, public notificacionesService: NotificacionesService,
		private bankingService: BankingService, private messageService: MessageService) { }

	ngOnInit() {
		this.notif.idUsuarioRecibe = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
		this.idUsuarioRecibe = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
		this.idUsuarioEnvia = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
		this.rol = JSON.parse(sessionStorage.getItem('currentUser')).userData.idRolUsuario;
		this.loadNotificacion(this.notif.idUsuarioRecibe);
		this.loadCantNotificacion(this.idUsuarioRecibe);

		this.bankingService.getAllUsers().subscribe((usuarios) => {
			this.usuarios = usuarios;
		  });

	}


	loadNotificacion(idUsuarioRecibe) {
		this.notif.idUsuarioRecibe = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
		this.notificacionesService.getNotificationsByUser(this.notif.idUsuarioRecibe).subscribe(data => {
		this.notificaciones = data;
		console.log(this.notificaciones);
		})
		
	}

	enviarMensaje (notificacion) {
		delete this.notificacion.idNotificacion;
		this.notificacion.leido = 0;
		/* delete this.notificacion.fechaEnvio; */
		delete this.notificacion.fechaLectura;
		/* delete this.notificacion.fechaEnvio; */
		delete this.notificacion.mensajeForAll;
		this.notificacion.fechaEnvio = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:MM');
		console.log(this.notificacion.fechaEnvio);
		this.usuario = this.notificacion.idUsuarioRecibe;
		this.notificacion.idUsuarioRecibe = this.usuario.id;
		this.notificacion.idUsuarioEnvia = this.notif.idUsuarioRecibe;
		this.notificacionesService.enviarMensaje(this.notificacion).subscribe((data: {}) => {
			this.messageService.add({
				key: 't1',
				severity: 'success',
				summary: '💃',
				detail: 'Good! mensaje enviado',
			  });
		  });;

		
	}

	showDialog() {
        this.displayModal = true; 
    }

	goToUpdateNotificacion(idNotificacion) {
		this.router.navigate(['dashboard/notificaciones/editar', idNotificacion],{
		skipLocationChange: true
		  });
	  }
	  
	loadCantNotificacion(idUsuarioRecibe) {
		this.notificacionesService.getCantNotificationsByUser(this.idUsuarioRecibe).subscribe(data =>{
		this.cantidadNotificaciones = data;
		this.cantidadNotificaciones = data[0].cantidadNotificaciones;
		 
		});
	  }

	filterUser(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.usuarios.length; i++) {
      let user = this.usuarios[i];
      if (user.email.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(user);
      }
    }

    this.filteredUsers = filtered;
  } 

  redirect() {
	
    this.ngOnInit();
  }

}
