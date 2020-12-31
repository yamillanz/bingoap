import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { uniqueNamesGenerator, Config, adjectives, colors, animals, names, countries    } from 'unique-names-generator';
import { Salas } from '../../models/salas';
import { SalasService } from '../../services/salas.service';

@Component({
  selector: 'app-sala-nueva',
  templateUrl: './sala-nueva.component.html',
  styleUrls: ['./sala-nueva.component.scss'],
  providers: [MessageService]
})
export class SalaNuevaComponent implements OnInit {
  nombreSala: any;
  dealers: Salas [];
  idDealer:any;
  salas: Salas[];
  displayModal: boolean;

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

  constructor(private messageService: MessageService, private salasService: SalasService, private router: Router) { }

  ngOnInit(): void {
    this.displayModal = true;
    this.getDealers();
    const customConfig: Config = {
      dictionaries: [countries, colors],
      separator: '-',
      length: 2,
    };
     
    const randomName: string = uniqueNamesGenerator({
      dictionaries: [countries,  colors]
    }); // big_red_donkey
     
    const shortName: string = uniqueNamesGenerator(customConfig); // big-donkey
    this.nombreSala = shortName;
    console.log(shortName);
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

  onSalaSelected(event) {
    this.idDealer = parseInt(event.target.value, 10);
    console.log('id dealer de la sala', event.target.value);
  }



  saveSala() {
    this.sala.idDealer = this.idDealer;
    this.sala.nombre = this.nombreSala;
    this.sala.fechaCreacion = new Date();
    this.salasService.saveSala(this.sala)
      .subscribe((data: {}) => {
        this.addSingle();
      });
      
  }


  addSingle() {
    this.messageService.add({severity:'success', summary:'Excelente', detail:'Se creó la sala'});
  }

  close(){
		this.router.navigate(['dashboard/salas'],{
			skipLocationChange: true
      }); 
      
  }

  redirect() {
    
		this.router.navigate(['dashboard/salas']);
	}

  

}
