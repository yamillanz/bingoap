import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Salas } from 'src/app/salas/models/salas';
import { SalasService } from 'src/app/salas/services/salas.service';
import { Partidas } from '../../../models/partidas';
import { PartidasService } from '../../../services/partidas.service';

@Component({
  selector: 'app-nueva-partida',
  templateUrl: './nueva-partida.component.html',
  styleUrls: ['./nueva-partida.component.scss'],
  providers: [MessageService, DatePipe]
})
export class NuevaPartidaComponent implements OnInit {
  displayModal: boolean;
  salas: Salas[];
  idSala: any;
  idDealer: any;
  id: any;
  partidas: Partidas[];
  estatus:any [];
  programDate: any;
  dateToTransform: Date;

  sala: Salas  = {
		id: 0,
		idDealer: 0 ,
		nombre: '',
		descripcion: '',
		fechaCreacion:new Date(),
		activo: 0,
		nro_participantes: 0,
		monto: 0,
		estatus: 0,
		nro_partidas_max: 0,
    nro_cartones: 0
  };

  partida: Partidas = {
    id: 0,
    fechaCreacion: new Date,
    valor: 0,
    activa: 0,
    fechaPrograma: new Date(),
    monto: 0,
    limiteCartones: 0,
    idSala: 0,
    idEstatus: 0,
    observaciones: '',
    nombre: '',
    idDealerPartida: 0,
  };


  constructor(public datepipe: DatePipe, private messageService: MessageService, private salasService: SalasService, private partidasService: PartidasService, private router: Router) { }

  ngOnInit(): void {
    this.idDealer = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
    this.displayModal = true;
    this.getSalas();
    this.getEstatusPartidas();
    this.partida.activa= 0;
  }

  getSalas(){
    this.salasService.getSalasDelDealer(this.idDealer)
      .subscribe(
        res => {
          this.salas = res;
          this.idSala = res[0].id;
          console.log('data de las salas', this.salas)

        },
        err => console.error(err)
      )
  }

  getEstatusPartidas(){
    this.partidasService.findAllEstatusPartidas()
      .subscribe(
        res => {
          this.estatus = res;

        },
        err => console.error(err)
      )
  }

  savePartida() {
    delete this.partida.id;
    this.partida.fechaCreacion = new Date();
    /* const isoDate = new Date(this.partida.fechaPrograma);
    const mySQLDateString = isoDate.toJSON().slice(0, 19).replace('T', ' ');
    this.partida.fechaPrograma = mySQLDateString;
    console.log('programDate', this.partida.fechaPrograma); */
    /* this.programDate = this.datepipe.transform(this.partida.fechaPrograma, 'yyyy-MM-dd HH:MM:SS');
    console.log(this.programDate);
    this.partida.fechaPrograma = this.programDate; */
    /* delete this.partida.fechaCreacion;
    delete this.partida.fechaPrograma; */

   /*  this.dateToTransform = this.partida.fechaPrograma;
    this.programDate = this.datepipe.transform(this.dateToTransform, 'yyyy-MM-dd HH:MM:SS');
    this.partida.fechaPrograma = this.programDate; */

    this.partida.fechaPrograma  = this.datepipe.transform(this.partida.fechaPrograma, 'yyyy-MM-dd HH:MM:SS');
    this.partida.idEstatus = 1;
    this.partida.idSala = this.id;
    this.partida.idDealerPartida = this.idDealer;
    console.log(this.partida.fechaPrograma );
    console.log(this.partida.activa)
    if (this.partida.activa == false)
    {
      this.partida.activa= 0;
    }
    if (this.partida.activa == true)
    {
      this.partida.activa= 1;
    }


    this.partidasService.savePartida(this.partida)
      .subscribe((data: {}) => {
        this.addSingle();
      });
      console.log(this.partida);

  }

  onSalaSelected(event) {
    this.id = parseInt(event.target.value, 10);
    console.log('id de la sala seleccionada', event.target.value);
  }

  addSingle() {
    this.messageService.add({key: 't1', severity:'success', summary:'Excelente 👏🏻', detail:'Se creó la partida'});
  }

  close(){
		this.router.navigate(['dashboard/mybingo/admin-partidas'],{
			skipLocationChange: true
      });

  }

  redirect() {
		this.router.navigate(['dashboard/mybingo/admin-partidas']);
	}



}
