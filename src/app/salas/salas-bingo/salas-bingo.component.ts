import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Salas } from '../models/salas';
import { SalasService } from '../services/salas.service';
import { ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-salas-bingo',
  templateUrl: './salas-bingo.component.html',
  styleUrls: ['./salas-bingo.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class SalasBingoComponent implements OnInit {
  
  salas: Salas[];
  idSala: any;

  sala: Salas = {
    id: 0,
    idDealer: 0,
    nombre: '',
    descripcion: '',
    nombreCompleto: '',
    activo: 0,
    fechaCreacion: new Date(),
    nro_participantes: 0,
    monto: 0,
    estatus: 0,
    nro_partidas_max: 0,
  };


  constructor(private salasService: SalasService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.loadSalas()  
    
    
  }

  loadSalas() {
		this.salasService.getSalas().subscribe(data => {
       this.salas = data;
       if (this.salas.length > 0)
       {
        this.idSala = data[0].id
       }
    })

  }

  goToEditarSala(id) {
    this.router.navigate(['dashboard/salas/editar-sala', id],{
      skipLocationChange: true
    });
    
  } 

  goToNewSala() {
    this.router.navigate(['dashboard/salas/sala-nueva'],{
      skipLocationChange: true
    });
    
  } 

       

}
