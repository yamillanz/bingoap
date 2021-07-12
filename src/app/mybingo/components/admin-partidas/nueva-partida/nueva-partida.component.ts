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
  salaData: Salas[];
  FechaActual: string;
  partidaData: Partidas[];
  modifiedTimestamp: any;

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
    fechaProgramNoHour: new Date(),
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
    this.FechaActual= this.datepipe.transform(Date.now(), 'yyyy-MM-dd');
    console.log(this.FechaActual)
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
          console.log(this.salas);
          /* this.idSala = res[0].id; */
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

  myDateParser(dateStr : string) : string {
    // 2018-01-01T12:12:12.123456; - converting valid date format like this

    let date = dateStr.substring(0, 10);
    let time = dateStr.substring(11, 19);
    let millisecond = dateStr.substring(20)

    let validDate = date + 'T' + time + '.' + millisecond;
    console.log(validDate)
    return validDate
  }

  savePartida() {
    
    delete this.partida.id;
    this.partida.fechaCreacion = new Date();
    this.partida.fechaPrograma  = this.datepipe.transform(this.partida.fechaPrograma, 'yyyy-MM-dd HH:MM:SS');
    this.modifiedTimestamp = this.myDateParser(this.partida.fechaPrograma);
    this.partida.fechaPrograma = this.modifiedTimestamp;
    /* this.partida.fechaProgramNoHour  = this.datepipe.transform(this.partida.fechaPrograma, 'yyyy-MM-dd HH:MM:SS'); */
    this.partida.fechaProgramNoHour  = this.modifiedTimestamp;
    this.partidasService.countPartidas(this.partida.fechaPrograma).subscribe(res => {
      this.partidaData = res;
      console.log('data-partida', this.partidaData);
    });

    this.partida.idEstatus = 1;
    this.partida.idSala = this.id;
    this.partida.idDealerPartida = this.idDealer;
    /* console.log('cantidad', this.partidaData[0].cantidadPartidas); */
    console.log('partidas max', this.salaData[0].nro_partidas_max);
    if (this.salaData[0].nro_partidas_max <= this.partidaData[0].cantidadPartidas  )
    {
      console.log('no puedes crear mas partidas para esta fecha');
      this.messageService.add({key: 't3', severity:'warn', summary:'Ups😢', detail:'No puedes crear mas partidas para esa fecha'});
    }
    console.log(this.partida.fechaProgramNoHour );
    console.log(this.partida.activa)
    if (this.partida.activa == false)
    {
      this.partida.activa= 0;
    }
    if (this.partida.activa == true)
    {
      this.partida.activa= 1;
    }

    if (this.partida.limiteCartones > this.salaData[0].nro_cartones)
    {
      this.mensajeNumCartones();
    }

    if (this.partidaData[0].cantidadPartidas <= this.salaData[0].nro_partidas_max)
    {
      this.partidasService.savePartida(this.partida)
      .subscribe((data: {}) => {
        this.addSingle();
      });
     
    }
   

  }
  
  onSalaSelected(event) {
    
    this.id = parseInt(event.target.value, 10);
    console.log('id de la sala seleccionada', event.target.value);
    this.salasService.getSala(event.target.value).subscribe(res => {
      this.salaData = res;
      console.log('sala data', this.salaData);
    });
    this.partidasService.countPartidas(this.partida.fechaPrograma).subscribe(res => {
      this.partidaData = res;
      console.log('data-partida', this.partidaData);
    });
    
  }

  addSingle() {
    this.messageService.add({key: 't1', severity:'success', summary:'Excelente 👏🏻', detail:'Se creó la partida'});
  }

  mensajeNumCartones() {
    this.messageService.add({key: 't2', severity:'warn', summary:'Ups😢', detail:'Tienes limitado el numero de cartones por usuario'});
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
