import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilCliente } from '../../models/perfil';
import { PerfilService } from '../../services/perfil.service';
import { MessageService } from 'primeng/api';
import { client } from '../../models/client';
import { ClientAdminService } from '../../services/client-admin.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [MessageService],
})
export class EditComponent implements OnInit {
  
  displayModal: boolean;
  edit: boolean = false;
  nombreCompleto: any;
  nickname: any;
  direccion: any;
  numeroTelefono: any;
  id: any;
  newClient: client = {};
  currentUser: any;

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

  constructor(
    private messageService: MessageService,
    private perfilService: PerfilService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.showModalDialog();
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.perfilService.getCliente(params.id).subscribe(
        (res) => {
          this.perfil = res[0];
          this.edit = true;
          if (this.perfil.nombreCompleto === undefined) {
            this.nombreCompleto = 'Sin nombre';
            this.perfil.nombreCompleto = this.nombreCompleto;
          } else if (this.perfil.nombreCompleto !== undefined) {
            this.nombreCompleto = res[0].nombreCompleto;
            this.perfil.nombreCompleto = this.nombreCompleto;
          }
          if (this.perfil.nickname === undefined) {
            this.nickname = 'Sin nickname';
            this.perfil.nickname = this.nickname;
          } else if (this.perfil.nickname !== undefined) {
            this.nickname = res[0].nickname;
            this.perfil.nickname = this.nickname;
          }
          /* if (this.perfil.id === undefined) {
            this.id = params.id;
            this.perfil.id = this.id;
            console.log('id', this.id);
          } else if (this.id !== undefined) {
            this.perfil.id = this.id;
            this.id = res[0].id;
          } */
          if (this.perfil.direccion === undefined) {
            this.direccion = 'Sin direccion';
            this.perfil.direccion = this.direccion;
          } else if (this.perfil.direccion !== undefined) {
            this.direccion = res[0].direccion;
            this.perfil.direccion = this.direccion;
          }
          if (this.perfil.numeroTelefono === undefined) {
            this.numeroTelefono = 'Sin telefono';
            this.perfil.numeroTelefono = this.numeroTelefono;
          } else if (this.perfil.numeroTelefono !== undefined) {
            this.numeroTelefono = res[0].numeroTelefono;
            this.perfil.numeroTelefono = this.numeroTelefono;
          }
          console.log('perfil ', this.perfil);
        },
        (err) => console.log(err)
      );
    }
  }

  showModalDialog() {
    this.displayModal = true;
  }

  updatePerfil() {
    if (this.perfil === undefined) {
      this.saveChanges();
    } else if (this.perfil !== undefined) {
      delete this.perfil.fechaCreacion;
      delete this.perfil.fechaNacimiento;
      const params = this.activatedRoute.snapshot.params;
      this.id = params.id;
      console.log('params', params.id);
      this.perfilService.updateCliente(this.perfil.id, this.perfil).subscribe(
        () => {
          this.addSingle();
        },
        (err) => console.error(err)
      );
    }
  }

  close() {
    this.router.navigate(['dashboard/perfil'], {
      skipLocationChange: true,
    });
  }

  addSingle() {
    this.messageService.add({
      severity: 'success',
      summary: 'Excelente',
      detail: 'Modificaste tu perfil',
    });
  }

  saveChanges() {
    /* console.log(this.perfil); */
    delete this.perfil.id;
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
    console.log(this.currentUser);
    this.perfil.idUsuario = this.currentUser;
    console.log(this.perfil.idUsuario);
   this.perfilService.agregarCliente(this.perfil).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/dashboard']);
      },
      (err) => console.error(err)
    );
    
    /* this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.perfil.id = this.currentUser.id;
    console.log(this.perfil.id);
    this.perfil.nombreCompleto = this.nombreCompleto;
    this.perfil.nickname = this.nickname;
    this.perfil.numeroTelefono = this.numeroTelefono;
    console.log('perfil', this.perfil);
    this.perfilService.agregarCliente(this.perfil).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/dasboard/perfil']);
      },
      (err) => console.error(err)
    ); */
  }
}
