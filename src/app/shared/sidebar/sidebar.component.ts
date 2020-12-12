import { ViewportScroller } from '@angular/common';
import { Component,  OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { MenuModel } from '../models/menu';
import { PrimeNGConfig } from 'primeng/api';
import { SidebarService } from '../services/sidebar.service';
import { NotificacionesModel } from '../models/notificaciones';
import { NotificacionesService } from '../services/notificaciones.service';


@Component({
  selector: 'app-sidebar', 
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'] 
})



export class SidebarComponent implements OnInit {

    visibleSidebar1;

    visibleSidebar2;

    visibleSidebar3;

    visibleSidebar4;

    visibleSidebar5;

  @ViewChild('navBurger') navBurger: ElementRef;
	@ViewChild('navMenu') navMenu: ElementRef;
  @ViewChild('navBar') navbar: ElementRef;

  @ViewChild('sidebarBurger') sidebarBurger: ElementRef;
	@ViewChild('sidebarMenu') sidebarMenu: ElementRef;
  @ViewChild('sideBar') sideBar: ElementRef;
  
  menuItems: any[];
  Menu: any = [];
  usuario: any = [];
  rol: any = [];
  nickname: any = [];
  status: any = [];
  cliente: any = [];
  /* DataCliente: MenuModel[]; */
  dataCliente: any = [];
  DataCliente: MenuModel[];
  notif: any = [];
  notificaciones: NotificacionesModel[];
  cantidadNotificaciones: string;
  idCliente: any = [];

  constructor(private primengConfig: PrimeNGConfig, private router: Router, 
    public menuService: MenuService, private sidebarService: SidebarService, 
    public notificacionesService: NotificacionesService, private viewportScroller: ViewportScroller,) {
      
     }

     onClickScroll(elementId: string): void {
      if (elementId == "home") {
        this.router.navigate(['/landing']);
      } else {
        this.viewportScroller.scrollToAnchor(elementId);
      }
      //
      //const elmnt = document.getElementById(elementId);
  
    }

    toggleNavbar() {
      this.navBurger.nativeElement.classList.toggle('is-active');
      this.navMenu.nativeElement.classList.toggle('is-active');
    }

     getClasses() {
      const classes = {
        'pinned-sidebar': this.sidebarService.getSidebarStat().isSidebarPinned,
        'toggeled-sidebar': this.sidebarService.getSidebarStat().isSidebarToggeled
      }
      return classes;
    }


    toggleSidebar() {
      this.sidebarService.toggleSidebar();
      /* this.sidebarBurger.nativeElement.classList.toggle('is-active');
      this.sidebarMenu.nativeElement.classList.toggle('is-active'); */
    }

  ngOnInit(): void {
    this.cliente.id = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
    this.loadMenu(this.Menu.idRolUsuario);
    this.status = 'online';
    this.loadDataUser(this.idCliente);
    this.loadCantNotificacion(this.notif.idUsuarioRecibe);
    
  }
  
  loadDataUser(idCliente) {
    this.dataCliente.idCliente = JSON.parse(sessionStorage.getItem('currentUser')).userData.idCliente;
    this.menuService.getClientUsersData(this.dataCliente.idCliente).subscribe(data =>{
      this.DataCliente = data;
      const nick = this.nickname= data[0].nickname;
      this.rol= data[0].rol;
    });
    }

  loadMenu(idRol) {
    this.Menu.idRol = JSON.parse(sessionStorage.getItem('currentUser')).userData.idRolUsuario;
    return this.menuService.getMenuByIdRol(this.Menu.idRol).subscribe( data => this.Menu = data ),  
    console.log('este es el rol del usuario', this.Menu.idRol)  ;
  }


   // Esto es para obtener la data de las cant de notificaciones del usuario en el badge
  loadCantNotificacion(idUsuarioRecibe) {
    this.notif.idUsuarioRecibe = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
    this.notificacionesService.getCantNotificationsByUser(this.notif.idUsuarioRecibe).subscribe(data =>{
      this.notificaciones = data;
      console.log('Cantidad de  notificaciones:', data[0].cantidadNotificaciones);
      this.cantidadNotificaciones = data[0].cantidadNotificaciones;
    });
    }

 
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }

  logout() {
		this.router.navigate(['/logout'])
  }

}

