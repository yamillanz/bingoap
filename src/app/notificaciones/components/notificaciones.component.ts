import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionesModel } from '../models/notificaciones';
import { NotificacionesService } from '../services/notificaciones.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';


@Component({
	selector: 'app-notificaciones',
	templateUrl: './notificaciones.component.html',
	styleUrls: ['./notificaciones.component.scss'],
	styles: [`
	/* Column Priorities */
	@media only all {
		th.ui-p-6,
		td.ui-p-6,
		th.ui-p-5,
		td.ui-p-5,
		th.ui-p-4,
		td.ui-p-4,
		th.ui-p-3,
		td.ui-p-3,
		th.ui-p-2,
		td.ui-p-2,
		th.ui-p-1,
		td.ui-p-1 {
			display: none;
		}
	}
	
	/* Show priority 1 at 320px (20em x 16px) */
	@media screen and (min-width: 20em) {
		th.ui-p-1,
		td.ui-p-1 {
			display: table-cell;
		}
	}
	
	/* Show priority 2 at 480px (30em x 16px) */
	@media screen and (min-width: 30em) {
		th.ui-p-2,
		td.ui-p-2 {
			display: table-cell;
		}
	}
	
	/* Show priority 3 at 640px (40em x 16px) */
	@media screen and (min-width: 40em) {
		th.ui-p-3,
		td.ui-p-3 {
			display: table-cell;
		}
	}
	
	/* Show priority 4 at 800px (50em x 16px) */
	@media screen and (min-width: 50em) {
		th.ui-p-4,
		td.ui-p-4 {
			display: table-cell;
		}
	}
	
	/* Show priority 5 at 960px (60em x 16px) */
	@media screen and (min-width: 60em) {
		th.ui-p-5,
		td.ui-p-5 {
			display: table-cell;
		}
	}
	
	/* Show priority 6 at 1,120px (70em x 16px) */
	@media screen and (min-width: 70em) {
		th.ui-p-6,
		td.ui-p-6 {
			display: table-cell;
		}
	}
  `],
  providers: [MessageService, ConfirmationService]
})
export class NotificacionesComponent implements OnInit {
	Notificaciones: any = [];
	mensajesData: NotificacionesModel= {}; 
	notif: any = [];
	notificaciones: NotificacionesModel[] = [];
	displayModal: boolean = false;
	cantidadNotificaciones: NotificacionesModel[];
	mensajeDialog: boolean;
	submitted: boolean;
	selectedMensaje: NotificacionesModel[];
	idUsuarioRecibe:any;
	idNotifi:any;
	fechaEnvio:string;
	mensaje:any;

	constructor(private actroute: ActivatedRoute, private router: Router, public notificacionesService: NotificacionesService,  
		private messageService: MessageService, private confirmationService: ConfirmationService) { }

	ngOnInit() {
		


		this.notif.idUsuarioRecibe = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
		this.idUsuarioRecibe = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
		console.log('este es el id del usuario quien recibe las notif:', this.notif.idUsuarioRecibe);
		this.loadNotificacion(this.notif.idUsuarioRecibe);
		this.loadCantNotificacion(this.idUsuarioRecibe);

	}


	loadNotificacion(idUsuarioRecibe) {
		this.notif.idUsuarioRecibe = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
		//this.notif.idUsuarioRecibe = JSON.parse(localStorage.getItem('currentUser')).userData.id;
		this.notificacionesService.getNotificationsByUser(this.notif.idUsuarioRecibe).subscribe(data => {
			 this.notificaciones = data;
			 /* this.idNotifi =data[0].idNotificacion; */
			
			 /* sessionStorage.setItem('MisNotificaciones', JSON.stringify(data)); */
			})
		
	}

	
	logout() {
		//console.log("dalio del beta");
		this.router.navigate(['/logout'])
		// this.svrAuth.logOut();
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
		  console.log('Cantidad de  notificaciones:', data[0].cantidadNotificaciones);
		  this.cantidadNotificaciones = data[0].cantidadNotificaciones;
		 
		});
	  }

	  
	  /* updateMensaje(idNotificacion: number){
		this.router.navigate(['/notificaciones/edit/', this.idNotifi]);
	  } */
	
	

	
	

	
	

	
	  

}
