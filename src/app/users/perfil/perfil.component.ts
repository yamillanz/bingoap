import { Component, OnInit } from '@angular/core';
import { DatePipe, WeekDay } from '@angular/common';
import {  PerfilCliente } from '../models/perfil';
import { client } from '../models/client';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from '../services/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  providers: [DatePipe],
})

export class PerfilComponent implements OnInit {
  myDate = new Date();
  profileImg: any;
  weekday: any;
  /* DataCliente: Cliente[]; */
  DataCliente: client[];
  PaisCliente: PerfilCliente[];
  dataCliente: any = [];
  primeraLetra:any = [];
  nickname: any = [];
  direccion:any = [];
  telefono: any = [];
  iso: any = [];
  idCliente: any = [];
  nombre: any = []; //Nombre del pais
  nombreCompleto: any = []; //Nombre del cliente
  displayModal: boolean;
  datosClientes: any = [];
  
  id: number;
  cliente:client;
  submitted=false;
  clientes: any = [];
  email: any;
  
  constructor(private actroute: ActivatedRoute, private router: Router, private datePipe: DatePipe, 
    public perfilService:PerfilService ) { 
    this.myDate[0] = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.weekday = this.myDate.getDay();
    console.log('fecha:', this.myDate[0]);
   

  }

  ngOnInit(): void {
    const params = this.actroute.snapshot.params; 
    console.log('params:', params);
    this.id = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
    this.perfilService.getClient(this.id).subscribe(res =>{
      this.DataCliente = res;
      console.log(res);
      this.nickname= res[0].nickname;
      this.nombreCompleto = res[0].nombreCompleto;
      console.log('Data--->:', this.DataCliente)
      this.nombre = res[0].nombre;
      this.iso = res[0].iso;
      this.direccion = res[0].direccion;
      this.telefono = res[0].numeroTelefono;
      this.idCliente = res[0].idCliente;
      this.email = res[0].email;
      const cadena = this.nombreCompleto;
      this.primeraLetra = cadena.charAt(0);
      console.log ('primera letra:', this.primeraLetra );
      
    });
  }

  goToEditar() {
    this.router.navigate(['dashboard/perfil/editar', this.idCliente],{
      skipLocationChange: true
    });
    
  } 

    

}