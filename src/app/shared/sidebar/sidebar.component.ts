import { Component,  OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { MenuModel } from '../models/menu';
import { PrimeNGConfig } from 'primeng/api';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'] 
})

export class SidebarComponent implements OnInit {
  menuItems: any[];
  Menu: any = [];
  menu: MenuModel[];
  usuario: any = [];
  rol: any = [];
  status: any = [];
  
  constructor(private primengConfig: PrimeNGConfig, private router: Router, 
    public menuService: MenuService, private sidebarService: SidebarService) {
      
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
    // this.Menu.idRol = JSON.parse(sessionStorage.getItem('menu')).idRol; // Obtiene el perfil del usuario
    this.Menu.idRol = 1;
    console.log('el rol es:', this.Menu.idRol);
    this.loadMenu(this.Menu.idRol);
    this.usuario = 'potus';
    this.rol = 'Administrador';
    this.status = 'online';
  }
    

  loadMenu(idRol) {
    return this.menuService.getMenuByIdRol(idRol).subscribe( data => this.Menu = data ),  console.log('este es el menu', this.Menu)  ;
   
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

