import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { MenuModel } from '../models/menu';
import { PrimeNGConfig } from 'primeng/api';


declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}

/* export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    rtlTitle: "لوحة القيادة",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/icons",
    title: "Icons",
    rtlTitle: "الرموز",
    icon: "icon-atom",
    class: ""
  },
  {
    path: "/maps",
    title: "Maps",
    rtlTitle: "خرائط",
    icon: "icon-pin",
    class: "" },
  {
    path: "/notifications",
    title: "Notifications",
    rtlTitle: "إخطارات",
    icon: "icon-bell-55",
    class: ""
  },

  {
    path: "/user",
    title: "User Profile",
    rtlTitle: "ملف تعريفي للمستخدم",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/tables",
    title: "Table List",
    rtlTitle: "قائمة الجدول",
    icon: "icon-puzzle-10",
    class: ""
  },
  {
    path: "/typography",
    title: "Typography",
    rtlTitle: "طباعة",
    icon: "icon-align-center",
    class: ""
  },
  {
    path: "/rtl",
    title: "RTL Support",
    rtlTitle: "ار تي ال",
    icon: "icon-world",
    class: ""
  }
]; */


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
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

  visibleSidebar1;

  visibleSidebar2;

  visibleSidebar3;

  visibleSidebar4;

  visibleSidebar5;

  
  constructor(private primengConfig: PrimeNGConfig, private router: Router, public menuService: MenuService) { }

  ngOnInit(): void {
    // this.Menu.idRol = JSON.parse(sessionStorage.getItem('menu')).idRol; // Obtiene el perfil del usuario
    this.Menu.idRol = 2;
    console.log('el rol es:', this.Menu.idRol);
    this.loadMenu(this.Menu.idRol);
    this.primengConfig.ripple = true;
  }


  /* private loadMenu(idRol) {
    return this.menuService.getMenuByIdRol(idRol) : Observable<MenuModel[]>{
      (idRol).subscribe( data => this.Menu = data);

    
  } */

  loadMenu(idRol) {
    return this.menuService.getMenuByIdRol(idRol).subscribe( data => this.Menu[0] = data ),  console.log('este es el menu', this.Menu)  ;
   
  }


  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }



  
}
