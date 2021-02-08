import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { MessageService } from 'primeng/api';
import { user, Perfil, Actividad, SesionActiva } from './../../models/user.model';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
  providers: [MessageService], 
})
export class EditarUsuarioComponent implements OnInit {
  edit: boolean = false;
  id:any;
  displayModal: boolean;
  usuarios: user[] = [];
  users: user[] = [];
  idRolUsuario: number;
  usuarioActivo: Actividad[];
  sesionesActivas: SesionActiva[];
  perfiles: Perfil[];
  
  usuario: user = {
    id: 0,
    pass: '',
    email: '',
    fechaCreacion: new Date(),
    idRolUsuario: 0,
    activo: 0,
    tipo: 0,
    sesionActiva: 0,
    idCliente: 0,
    emailValido: 0,
    idPais: '',
    rol: '',
    idRol: 0,
  };

 

  constructor(private usersService: UsersService, private messageService: MessageService, 
    private router: Router, private activatedRoute: ActivatedRoute) { 

      this.perfiles = [
        {name: 'Administrador', code: '1'},
        {name: 'Dealer', code: '2'},
        {name: 'Usuario', code: '3'}
       ];

      /* this.usuarioActivo = [
        {name: 'Si', code: '1'},
        {name: 'No', code: '0'}
      ];

      this.sesionesActivas = [
      {name: 'Si', code: '1'},
      {name: 'No', code: '0'}
       ]; */

    }

  ngOnInit(): void {
    this.displayModal = true;
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.usersService.getDataOneUser(params.id)
        .subscribe(
          res => {
            this.usuario = res;
            this.edit = true;
          },
          err => console.log(err)
        )
    }
    
     
  }

  

  onPerfilSelected(event) {
    this.usuario.idRolUsuario = parseInt(event.target.value, 10);
  }

  onActivoSelected(event) {
    this.usuario.activo = parseInt(event.target.value, 10);
  }

  onSesionActivaSelected(event) {
    this.usuario.sesionActiva = parseInt(event.target.value, 10);
  }

  updateUsuario() {
    delete this.usuario.pass;
    delete this.usuario.emailValido;
    this.usersService.updateUsuario(this.usuario.id, this.usuario)
      .subscribe( 
        res => { 
          this.addSingle();
        },
        err => console.error(err)
      )
      
  }
 
  addSingle() {
    this.messageService.add({ key: "t1", severity: 'success', summary: 'Atención', detail: 'Usuario Actualizado' });
  }

  close(){
		this.router.navigate(['dashboard/perfil/admin-users'],{
			skipLocationChange: true
      }); 
      
  }  

  redirect() {
    this.router.navigate(['dashboard/perfil/admin-users']), {
      skipLocationChange: true
    }
  }

  


}
