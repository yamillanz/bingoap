import { Component, OnInit } from '@angular/core';
import { DatePipe, WeekDay } from '@angular/common';
import { MenuService } from '../services/menu.service';
import { ApiResponse, MenuModel } from '../models/menu';
import { Cliente } from '../models/clientes';
import { ActivatedRoute, Router } from '@angular/router';

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
  DataCliente: Cliente[];
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
  
  id: number;
  cliente:Cliente;
  submitted=false;
  clientes: any = [];

  constructor(private actroute: ActivatedRoute, private router: Router, private datePipe: DatePipe, 
    public menuService: MenuService) { 
    this.myDate[0] = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.weekday = this.myDate.getDay();
    console.log('fecha:', this.myDate[0]);
   

  }

  ngOnInit(): void {
    const params = this.actroute.snapshot.params; 
    console.log('params:', params);


    this.id = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
    
    this.menuService.getClient(this.id).subscribe(res =>{
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
      const cadena = this.nombreCompleto;
      this.primeraLetra = cadena.charAt(0);
      console.log ('primera letra:', this.primeraLetra );
      
    });
  }

  

    

}
