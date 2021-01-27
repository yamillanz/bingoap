import { Component, OnInit } from '@angular/core';
import { DatePipe, WeekDay } from '@angular/common';
import { MenuService } from '../services/menu.service';
import {  MenuModel } from '../models/menu';
import { client } from '../../users/models/client';
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
  DataCliente: client;
  PaisCliente: MenuModel[];
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
  largoArray: any;
  id: number;
  /* cliente:Cliente; */
  submitted=false;
  clientes: any = [];

  constructor(private actroute: ActivatedRoute, private router: Router, private datePipe: DatePipe, 
    public menuService: MenuService, private perfilService: PerfilService ) { 
    this.myDate[0] = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.weekday = this.myDate.getDay();
    console.log('fecha:', this.myDate[0]);
   

  }

  ngOnInit(): void {
    const params = this.actroute.snapshot.params; 
    console.log('params:', params);


    this.id = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
    console.log('id', this.id );
    this.perfilService.getCliente(this.id).subscribe(res =>{
      this.DataCliente = res;
      this.largoArray = this.DataCliente
      console.log('array', this.largoArray );
      if (this.largoArray.length >0)
      {
        this.nickname = res[0].nickname;
        console.log('nickname', this.nickname );
        this.nombreCompleto = res[0].nombreCompleto;
        console.log('Data--->:', this.DataCliente)
        this.nombre = res[0].nombre;
        this.iso = res[0].iso;
        this.direccion = res[0].direccion;
        this.telefono = res[0].numeroTelefono;
        this.idCliente = res[0].idCliente;
        const cadena = this.nombreCompleto;
        this.primeraLetra = cadena.charAt(0);
        console.log ('primera letra:', this.primeraLetra );
      }
      
      
      
    });
  }

  

    

}
