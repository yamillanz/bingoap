import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NotificacionesModel } from '../models/notificaciones';
import { NotificacionesService } from '../services/notificaciones.service';
import { MenuService } from '../services/menu.service';
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
	cantidadNotificaciones: NotificacionesModel[];
	mensajeDialog: boolean;
	submitted: boolean;
	selectedMensaje: NotificacionesModel[];

	constructor(private router: Router, public notificacionesService: NotificacionesService,  
		private messageService: MessageService, private confirmationService: ConfirmationService) { }

	ngOnInit(): void {
		this.notif.idUsuarioRecibe = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
		console.log('este es el id del usuario quien recibe las notif:', this.notif.idUsuarioRecibe);
		this.loadNotificacion(this.notif.idUsuarioRecibe);
		

	}


	loadNotificacion(idUsuarioRecibe) {
		this.notif.idUsuarioRecibe = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
		this.notificacionesService.getNotificationsByUser(this.notif.idUsuarioRecibe).subscribe(data => {
			 this.notificaciones = data;
			 /* sessionStorage.setItem('MisNotificaciones', JSON.stringify(data)); */
			})
		
	}

	
	logout() {
		//console.log("dalio del beta");
		this.router.navigate(['/logout'])
		// this.svrAuth.logOut();
	}

	/* updateMensaje(idNotificacion: number, mensaje: string, fechaEnvio: string) {
		console.log("mensaje leido:", this.mensajesData.leido);
		this.idNotificacion = idNotificacion;
		/* console.log("ID Notificacion:", this.idNotificacion); */
		/* if(window.confirm('Esta seguro de marcar el mensaje como leido')) {
		  this.notificacionesService.updateNotificacion(this.notificaciones[0].idNotificacion, this.mensajesData.leido)
			.subscribe(data => this.mensajesData = data)
		} */
	

	  /* updateMensaje() {
		const mensajesData = this.mensajesData.leido=1;
		this.mensajesData.idNotificacion = JSON.parse(sessionStorage.getItem('MisNotificaciones')).idNotificacion;
		
		console.log("Este es el numero de la notificacion:", this.mensajesData.idNotificacion);
        if(window.confirm('Esta seguro de eliminar este mensaje?')) {
				this.notificacionesService.updateMensaje(this.mensajesData.idNotificacion, mensajesData).subscribe(data => {
					this.mensajesData = data;
            })
        } 
	  } */
	  

	  confirm() {
		const mensajesData = this.mensajesData.leido=1;
		console.log("leido:::", mensajesData)
		const idNotificacion = JSON.parse(sessionStorage.getItem('MisNotificaciones'))[0].idNotificacion
		console.log("id Notificacion:::", idNotificacion)
        this.confirmationService.confirm({
            message: 'Esta seguro de eliminar el mensaje?',
            accept: () => {
                this.notificacionesService.updateMensaje(idNotificacion, mensajesData).subscribe(data => {
					this.mensajesData = data;
            })
            }
        });
    }

	  editMensaje( ) {

		  const mensajesData = this.mensajesData.leido=1;
		  this.notificacionesService.updateMensaje(this.Notificaciones.idNotificacion, mensajesData)
		  .subscribe(data => { console.log('actualizarSMS:', data);
				  this.router.navigate(['/notificaciones'])
				})
		this.mensajesData = {...this.mensajesData};
        this.mensajeDialog = true;
        
        
	}
	
	saveMensaje() {
        this.submitted = true;

        if (this.Notificaciones.mensaje.trim()) {
            if (this.Notificaciones.idNotificacion) {
                this.Notificaciones[this.findIndexById(this.Notificaciones.idNotificacion)] = this.Notificaciones;                
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Mensaje Updated', life: 3000});
            }
            

            this.Notificaciones = [...this.Notificaciones];
            this.mensajeDialog = false;
            this.Notificaciones = {};
        }
	}
	

	findIndexById(idNotificacion: string): number {
        let index = -1;
        for (let i = 0; i < this.Notificaciones.length; i++) {
            if (this.Notificaciones[i].idNotificacion === idNotificacion) {
                index = i;
                break;
            }
        }

        return index;
	}
	

	createId(): string {
        let idNotificacion = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( var i = 0; i < 5; i++ ) {
            idNotificacion += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return idNotificacion;
	}
	

	
	  onPreUpdateBook(idNotificacion: NotificacionesModel): void {
		this.notificacionesService.selectedMensaje = Object.assign({}, idNotificacion);
	  }


}
