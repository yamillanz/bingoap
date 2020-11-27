import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { MenuModel } from '../models/menu';
import { PrimeNGConfig } from 'primeng/api';


declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}


export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
  { path: '/icons', title: 'Icons',  icon:'education_atom', class: '' },
  { path: '/maps', title: 'Maps',  icon:'location_map-big', class: '' },
  { path: '/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },

  { path: '/user-profile', title: 'User Profile',  icon:'users_single-02', class: '' },
  { path: '/table-list', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
  { path: '/typography', title: 'Typography',  icon:'text_caps-small', class: '' },
  { path: '/upgrade', title: 'Upgrade to PRO',  icon:'objects_spaceship', class: 'active active-pro' }

];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  styles: [`
      :host ::ng-deep button {
          margin-right: .25em;
      }
  `]
})

export class SidebarComponent implements OnInit {
  menuItems: any[];
  Menu: any = [];
  menu: MenuModel[];
  
  constructor(private primengConfig: PrimeNGConfig, private router: Router, public menuService: MenuService) { }

  ngOnInit(): void {
    // this.Menu.idRol = JSON.parse(sessionStorage.getItem('menu')).idRol; // Obtiene el perfil del usuario
    this.Menu.idRol = 1;
    console.log('el rol es:', this.Menu.idRol);
    this.loadMenu(this.Menu.idRol);
    this.primengConfig.ripple = true;
    
  }


  /* private loadMenu(idRol) {
    return this.menuService.getMenuByIdRol(idRol) : Observable<MenuModel[]>{
      (idRol).subscribe( data => this.Menu = data);

    
  } */

  loadMenu(idRol) {
    return this.menuService.getMenuByIdRol(idRol).subscribe( data => this.Menu = data ),  console.log('este es el menu', this.Menu)  ;
   
  }


  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }



  
}
