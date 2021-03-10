import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { SalasService } from '../../services/salas.service';
import { Salas } from '../../models/salas';

@Component({
  selector: 'app-salas-edit',
  templateUrl: './salas-edit.component.html',
  styleUrls: ['./salas-edit.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class SalasEditComponent implements OnInit {
  displayModal: boolean;
  dealers: Salas[];
  idDealer: any;
  id: any;

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

  constructor(
    private messageService: MessageService,
    private salasService: SalasService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getDealers();
    this.displayModal = true;
    const params = this.activatedRoute.snapshot.params;
    console.log('params id sala', params.id);
    if (params.id) {
      this.salasService
        .getSala(params.id)

        .subscribe(
          (res) => {
            this.sala = res[0];
            console.log('data sala', this.sala);
          },
          (err) => console.log(err)
        );
    }
  }

  onSalaSelected(event) {
    this.sala.idDealer = parseInt(event.target.value, 10);
    console.log('id dealer de la sala', event.target.value);
  }

  updateSala() {
    delete this.sala.fechaCreacion;
    this.salasService.updateSala(this.sala.id, this.sala).subscribe(
      (res) => {
        console.log('data modificada', res);
        this.addSingle();
      },
      (err) => console.error(err)
    );
  }

  getDealers() {
    this.salasService.getDealers().subscribe(
      (res) => {
        this.dealers = res;
        this.idDealer = res[0].idDealer;
        console.log('data de los dealers', this.dealers);
      },
      (err) => console.error(err)
    );
  }

  addSingle() {
    this.messageService.add({ key: "t1", severity: 'success', summary: 'Atención', detail: 'Sala modificada' });
  }

  close() {
    this.router.navigate(['dashboard/salas'], {
      skipLocationChange: true,
    });
  }

  

  confirm() {
    this.id = this.sala.id;
    this.confirmationService.confirm({
      message: 'Estas seguro de eliminar esta sala?',
      accept: () => {
        this.salasService.deleteSala(this.id).subscribe(
          (res) => {
            this.messageService.add({ key: "t1", severity: 'success', summary: 'Muy bien 😉', detail: 'Sala eliminada' });
            
          },
          (err) => console.error(err)
        );
        
      },
      reject: () => {
        this.messageService.add({
          key: "t2",
          severity: 'info',
          summary: 'Sin cambios 😊',
          detail: 'No eliminaste la sala',
          
        });
        
        this.router.navigate(['dashboard/salas/editar-sala', this.sala.id],{
          skipLocationChange: true
        });
      },
    });
  }

  redirect() {
    this.router.navigate(['dashboard/salas']), {
      skipLocationChange: true
    }
  }


}


