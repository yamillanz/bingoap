import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificacionesModel } from '../models/notificaciones';
import { NotificacionesService } from '../services/notificaciones.service';
import { MenuService } from '../services/menu.service';



@Component({
	selector: 'app-notificaciones',
	templateUrl: './notificaciones.component.html',
	styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

	notif: any = [];
	notificaciones: NotificacionesModel[] = [];
	cantidadNotificaciones: NotificacionesModel[];

	constructor(private router: Router, public notificacionesService: NotificacionesService) { }

	ngOnInit(): void {
		this.notif.idUsuarioRecibe = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
		console.log('este es el id del usuario quien recibe las notif:', this.notif.idUsuarioRecibe);
		this.loadNotificacion(this.notif.idUsuarioRecibe);


	}


	/* loadNotificacion(idUsuarioRecibe) {
	  this.notif.idUsuarioRecibe = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
	  console.log('esto es lo que hay en notif:', this.notif.idUsuarioRecibe);
	  return this.notificacionesService.getNotificationsByUser(this.notif.idUsuarioRecibe)
	  .subscribe( data => this.Notificaciones = data);
	 
	} */


	loadNotificacion(idUsuarioRecibe) {
		this.notif.idUsuarioRecibe = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
		this.notificacionesService.getNotificationsByUser(this.notif.idUsuarioRecibe).subscribe(data => {
			this.notificaciones = data;
			console.log('Estas son las notificaciones:', data);
		});
	}

	//handleClick() {
	//execute action al boton de leer todas las notificaciones
	//}

	logout() {
		//console.log("dalio del beta");
		this.router.navigate(['/logout'])
		// this.svrAuth.logOut();
	}


}
