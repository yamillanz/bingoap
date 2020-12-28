import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NotificacionesModel } from '../../models/notificaciones';
import { NotificacionesService } from '../../services/notificaciones.service';

@Component({
  selector: 'app-notificacionedit',
  templateUrl: './notificacionedit.component.html',
  styleUrls: ['./notificacionedit.component.scss'],
  providers: [MessageService]
})

export class NotificacioneditComponent implements OnInit {
  display: boolean = false;
  idRecibeNot: any;
  notificaciones: NotificacionesModel[] = [];
  id:any;
  displayModal: boolean;
  edit: boolean = false;
  fechaEnvio: any;
  idNotificacion: any;
  leido:any;

  mensajes: NotificacionesModel  = {
		id: 0,
		idUsuarioEnvia:0 ,
		idUsuarioRecibe: 0,
		mensaje: '',
		leido: 0,
		fechaEnvio: Date,
		fechaLectura:new Date(),
		mensajeForAll: 0,
		email: '',
		cantidadNotificaciones: 0,
		idNotificacion: 0,
    };
    

  constructor(private actroute: ActivatedRoute, private router: Router, 
	public notificacionesService: NotificacionesService,  private messageService: MessageService,
		) { }

  ngOnInit(): void {
	this.showDialog()
	/* const params = this.actroute.snapshot.params;
		if (params.id) {
			this.notificacionesService.getNotification(params.id)
				.subscribe (
					res => {
					},
					err => console.error(err)
				)
		} */
		const params = this.actroute.snapshot.params;
		if (params.id) {
			this.notificacionesService.getNotification(params.id)
			  .subscribe(
				res => {
				  console.log(res);
				  this.mensajes = res[0];
				  this.edit = true;
				},
				err => console.log(err)
			  )
		  }
		

    
    this.notificacionesService.getNotification(params.id).subscribe(data => {
		this.notificaciones = data
		this.fechaEnvio = data[0].fechaEnvio
		/* this.mensajes = data [0].mensaje */
		this.idNotificacion = data [0].idNotificacion
		this.leido = data [0].leido
		console.log('leido:', this.leido);
	});
		
  }

  showDialog() {
		this.displayModal = true;
	}
	

	/* updateMensaje() {
		this.leido = 1;
		console.log('id notif:', this.idNotificacion);
		this.notificacionesService.updateMensaje(this.idNotificacion, this.leido)
		
		  .subscribe(
			res => { 
			console.log('id notif:', this.idNotificacion);
			console.log('leido:', this.leido);
			  console.log('res:', res);
			  this.router.navigate(['/notificaciones']);
			},
			err => console.error(err)
		  )
	  } */

	  updateMensaje() {
		/* delete this.perfil.created_at; */
		this.mensajes.leido=1;
		this.notificacionesService.updateMensaje(this.mensajes.idNotificacion, this.mensajes)
		  .subscribe(
			res => { 
			  this.addSingle();
			  
			},
			err => console.error(err)
		  )
		  this.close();
	  }

	  addSingle() {
		this.messageService.add({severity:'success', summary:':(', detail:'Mensaje eliminado'});
		
	  }

	  close(){
		this.router.navigate(['/notificaciones']);
	  }

}
