import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilCliente } from '../../models/perfil';
import { PerfilService } from '../../services/perfil.service';
import {MessageService} from 'primeng/api';
import {Message} from 'primeng//api';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [MessageService], 
})

export class EditComponent implements OnInit {
  displayModal: boolean;
  edit: boolean = false; 

  perfil: PerfilCliente = {
    id: 0,
    nombreCompleto: '',
    direccion: '',
    nickname: '',
    fechaCreacion: new Date(),
    idUsuario: 0,
    idPais: 0,
    fechaNacimiento: Date(),
    genero: '',
    tarjetaDeCredito: '',
    numeroTelefono: '',
  };

  constructor(private messageService: MessageService, private perfilService: PerfilService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.displayModal = true;
    const params = this.activatedRoute.snapshot.params;
    console.log('params', params);
    if (params.id) {
      this.perfilService.getCliente(params.id)
        .subscribe(
          res => {
            console.log(res);
            this.perfil = res[0];
             
            this.edit = true;
          },
          err => console.log(err)
        )
    }
  }

  showModalDialog() {
    this.displayModal = true;
}


updatePerfil() {
  /* delete this.perfil.created_at; */
  
  this.perfilService.updateCliente(this.perfil.id, this.perfil)
    .subscribe(
      res => { 
        console.log(res);
        /* this.router.navigate(['/perfil']); */
        this.addSingle();
      },
      err => console.error(err)
    )
    
}

close(){
  this.router.navigate(['dashboard/perfil'],{
    skipLocationChange: true
  });
  
}

addSingle() {
  this.messageService.add({severity:'success', summary:'Excelente', detail:'Modificaste tu perfil'});
}

}
