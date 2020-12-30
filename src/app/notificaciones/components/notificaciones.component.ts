import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificacionesModel } from '../models/notificaciones';
import { NotificacionesService } from '../services/notificaciones.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';


@Component({
	selector: 'app-notificaciones',
	templateUrl: './notificaciones.component.html',
	styleUrls: ['./notificaciones.component.scss'],
  	providers: [MessageService, ConfirmationService]
})

export class NotificacionesComponent implements OnInit {
	Notificaciones: any = [];
	notif: any = [];
	notificaciones: NotificacionesModel[] = [];
	displayModal: boolean = false;
	cantidadNotificaciones: NotificacionesModel[];
	idUsuarioRecibe:any;

	constructor(private router: Router, public notificacionesService: NotificacionesService) { }

	ngOnInit() {
		this.notif.idUsuarioRecibe = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
		this.idUsuarioRecibe = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
		this.loadNotificacion(this.notif.idUsuarioRecibe);
		this.loadCantNotificacion(this.idUsuarioRecibe);

	}


	loadNotificacion(idUsuarioRecibe) {
		this.notif.idUsuarioRecibe = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
		this.notificacionesService.getNotificationsByUser(this.notif.idUsuarioRecibe).subscribe(data => {
		this.notificaciones = data;
		})
		
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

	  

}
