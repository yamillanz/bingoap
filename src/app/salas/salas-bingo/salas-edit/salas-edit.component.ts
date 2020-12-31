import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { SalasService } from '../../services/salas.service';
import { Salas } from '../../models/salas';

@Component({
  selector: 'app-salas-edit',
  templateUrl: './salas-edit.component.html',
  styleUrls: ['./salas-edit.component.scss'],
  providers: [ConfirmationService, MessageService]
})

export class SalasEditComponent implements OnInit {
  displayModal: boolean;
  dealers: Salas [];
  idDealer:any;

 /*  salas: Salas[] = []; */

	/* nombre: any;
	descripcion: any;
	activo: any;
	nro_participantes: any;
	monto: any;
	estatus: any;
  nro_partidas_max: any; */
  
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

  constructor(private messageService: MessageService, private salasService: SalasService, private router: Router, 
    private activatedRoute: ActivatedRoute, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getDealers();
    this.displayModal = true;
    const params = this.activatedRoute.snapshot.params;
    console.log('params id sala',params.id );
    if (params.id) {
      this.salasService.getSala(params.id)
     
        .subscribe(
          res => {
            this.sala = res[0];
            console.log('data sala', this.sala)
            /* this.nombre = res[0].nombre;
            this.descripcion = res[0].descripcion;
            this.activo = res[0].activo;
            this.nro_participantes = res[0].nro_participantes;
            this.monto = res[0].monto;
            this.estatus = res[0].estatus;
            this.nro_partidas_max = res[0].nro_partidas_max;
            console.log('salas data', this.salas) */
          },
          err => console.log(err)
        )
    } 
  }

  onSalaSelected(event) {
    this.sala.idDealer = parseInt(event.target.value, 10);
    console.log('id dealer de la sala', event.target.value);
  }

  updateSala() {
    /* delete this.salas.fechaCreacion;
    delete this.usuario.emailValido; */
    delete this.sala.fechaCreacion;
    this.salasService.updateSala(this.sala.id, this.sala)
      .subscribe( 
        res => { 
          console.log('data modificada', res)
          this.addSingle();
        },
        err => console.error(err)
      )
      
  }

  getDealers(){
    this.salasService.getDealers()
      .subscribe( 
        res => { 
          this.dealers = res;
          this.idDealer = res[0].idDealer;
          console.log('data de los dealers', this.dealers)
          
        },
        err => console.error(err)
      )
  }

  

  addSingle() {
    this.messageService.add({severity:'success', summary:'Excelente', detail:'Sala Modificada'});
  }

  close(){
		this.router.navigate(['dashboard/salas'],{
			skipLocationChange: true
      }); 
      
  }

  /* confirm() {
    this.confirmationService.confirm({
        message: 'Estas seguro de eliminar la sala?',
        accept: () => {
              this.eliminarSala(this.sala.id);

        }
    });
} */


deleteSala(id: number) {
  this.salasService.deleteSala(id)
    .subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
    )
}

confirm() {
  this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
          //Actual logic to perform a confirmation
          this.deleteSala(this.sala.id);
          console.log('esta es la salaa eliminar desde confirm', this.sala.id)
      }
  });
}

}
