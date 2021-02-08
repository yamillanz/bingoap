import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Partidas } from '../../models/partidas';
import { Salas } from '../../../salas/models/salas'

import { SalasService } from '../../../salas/services/salas.service'
import { PartidasService } from '../../services/partidas.service';
import { ConfirmationService, MessageService} from 'primeng/api';


@Component({
  selector: 'app-admin-partidas',
  templateUrl: './admin-partidas.component.html',
  styleUrls: ['./admin-partidas.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AdminPartidasComponent implements OnInit {
  partidas: Partidas[];
  idPartida: any;
  idDealer: any;

  partida: Partidas = {
    id: 0,
    fechaCreacion: new Date,
    valor: 0,
    activa: 0,
    fechaPrograma: new Date,
    monto: 0,
    limiteCartones: 0,
    idSala: 0,
    idEstatus: 0,
    observaciones: '',
    nombre: ''
  };

  constructor(private partidasService: PartidasService,
    private router: Router, private activatedRoute: ActivatedRoute, private salasService: SalasService) { }

  ngOnInit(): void {
    /* this.loadSalas(); */
    this.idDealer = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
    this.loadPartidas(this.idDealer);

  }

  loadPartidas(idDealerPartida) {
		this.partidasService.findAllByDealer(this.idDealer).subscribe(data => {
       this.partidas = data;
       console.log(this.partidas);


       /* if (this.partidas.length > 0)
       {
        this.partidas = data[0].id
       } */
    })

  }

  /* loadSalas() {
		this.salasService.getSala(this.salaUsuario).subscribe(data => {
       this.salas = data;
       console.log(this.salas);
    })

  } */

  /* goToEditarSala(id) {
    this.router.navigate(['dashboard/salas/editar-sala', id],{
      skipLocationChange: true
    });

  } */

  goToNewPartida() {
    this.router.navigate(['dashboard/mybingo/nueva-partida'],{
      skipLocationChange: true
    });

  }

}
