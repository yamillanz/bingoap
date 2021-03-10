import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Partidas } from 'src/app/mybingo/models/partidas';
import { PartidasService } from 'src/app/mybingo/services/partidas.service';
import { Salas } from 'src/app/salas/models/salas';
import { SalasService } from 'src/app/salas/services/salas.service';

@Component({
  selector: 'app-edit-partida',
  templateUrl: './edit-partida.component.html',
  styleUrls: ['./edit-partida.component.scss'],
  providers: [ConfirmationService, MessageService, DatePipe],
})
export class EditPartidaComponent implements OnInit {
  displayModal: boolean;
  salas: Salas[];
  idSala: any;
  idDealer: any;
  id: any;
  partidas: Partidas[];
  estatus:any [];
  /* programDate: any; */
  /* dateToTransform: Date; */
  salaData: Salas[];
  /* FechaActual: string; */
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


  constructor(private activatedRoute: ActivatedRoute, public datepipe: DatePipe, private messageService: MessageService, private salasService: SalasService, private partidasService: PartidasService, private router: Router) { }


  ngOnInit(): void {
    this.displayModal = true;
    this.getSalas();
    this.getEstatusPartidas();

    

    this.idDealer = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
    const params = this.activatedRoute.snapshot.params;
    console.log('params id sala', params.id);
    if (params.id) {
      this.partidasService
        .findToPlay(params.id)

        .subscribe(
          (res) => {
            this.partida = res[0];
            this.modifiedTimestamp = this.myDateParser(this.partida.fechaPrograma);
            this.partida.fechaPrograma = this.modifiedTimestamp;
            console.log('data partida', this.partida.fechaPrograma);
          },
          (err) => console.log(err)
        );
    }
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

  close(){
		this.router.navigate(['dashboard/mybingo/admin-partidas'],{
			skipLocationChange: true
      });

  }

}
