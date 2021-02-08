import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NotificacionesModel } from '../../models/notificaciones';
import { NotificacionesService } from '../../services/notificaciones.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-notificacionedit',
  templateUrl: './notificacionedit.component.html',
  styleUrls: ['./notificacionedit.component.scss'],
  providers: [MessageService, DatePipe]
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
  dateLatest: any;

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
    

  constructor(public datepipe: DatePipe, private actroute: ActivatedRoute, private router: Router, 
	public notificacionesService: NotificacionesService,  private messageService: MessageService,
		) { }
 
  ngOnInit(): void {
 
	this.showDialog()
	const params = this.actroute.snapshot.params;
		if (params.id) {
			this.notificacionesService.getNotification(params.id)
			  .subscribe(
				res => {
				  this.mensajes = res[0];
				  this.edit = true;
				},
				err => console.log(err)
			  )
		  }
		
    
		this.notificacionesService.getNotification(params.id).subscribe(data => {
			this.notificaciones = data
			this.fechaEnvio = data[0].fechaEnvio
			this.dateLatest = this.datepipe.transform(this.fechaEnvio, 'yyyy-MM-dd');
			this.idNotificacion = data [0].idNotificacion
			this.leido = data [0].leido
			});
			
		}

		showDialog() {
				this.displayModal = true;

		}

		updateMensaje() {
			this.mensajes.leido =1;
			this.mensajes.fechaLectura = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:MM:SS');
			/* this.mensajes.fechaLectura = new Date(); */
			console.log(this.mensajes.fechaLectura);
			/* delete this.mensajes.fechaLectura; */
			delete this.mensajes.fechaEnvio;
			console.log(this.mensajes.fechaLectura);
			this.notificacionesService.updateMensaje(this.mensajes.idNotificacion, this.mensajes)
			.subscribe(
				res => { 
					this.messageService.add({
						key: 't1',
						severity: 'success',
						summary: '👍',
						detail: 'Good! mensaje eliminado',
					  });
					  
				/* console.log('eliminado');
				console.log(res); */
				},
				err => console.error(err)
			)
			
		}


		addSingle() {
			this.messageService.add({
				key: 't1',
				severity: 'success',
				summary: '💃',
				detail: 'Good! mensaje eliminado',
			  });
			  this.router.navigate(['dashboard/notificaciones'],{
				skipLocationChange: true
			}); 
			
		}


		close(){
			this.router.navigate(['dashboard/notificaciones'],{
				skipLocationChange: true
			}); 
		} 

}
