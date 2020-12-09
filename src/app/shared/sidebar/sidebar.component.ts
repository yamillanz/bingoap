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

  @ViewChild('navBurger') navBurger: ElementRef;
	@ViewChild('navMenu') navMenu: ElementRef;
  @ViewChild('navBar') navbar: ElementRef;
  
  menuItems: any[];
  Menu: any = [];
  menu: MenuModel[];
  usuario: any = [];
  rol: any = [];
  status: any = [];
  cliente: any = [];

  notif: any = [];
  notificaciones: NotificacionesModel[];
  cantidadNotificaciones: NotificacionesModel[];
  
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
    }

  ngOnInit(): void {
    // this.Menu.idRol = JSON.parse(localStorage.getItem('menu')).idRol; // Obtiene el perfil del usuario
    this.cliente.id = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
    /* this.cliente = sessionStorage.getItem('currentUser'); */
    
    console.log('esto es lo que me traje del session storage: =>', this.cliente.id);
    this.Menu.idRol = 1;
    console.log('el rol es:', this.Menu.idRol);
    this.loadMenu(this.Menu.idRol);
    this.usuario = 'potus';
    this.rol = 'Administrador';
    this.status = 'online';

    this.loadCantNotificacion(this.notif.idUsuarioRecibe);
  }
    

  loadMenu(idRol) {
    return this.menuService.getMenuByIdRol(idRol).subscribe( data => this.Menu = data ),  console.log('este es el menu', this.Menu)  ;
   
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

  close (){

  }
}

