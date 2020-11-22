import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarModule } from 'primeng/sidebar';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [MenuComponent, NavbarComponent, SidebarComponent ],
  imports: [
    CommonModule,
    SidebarModule
  ], 
  exports: [
    MenuComponent,
    NavbarComponent,
    SidebarComponent,
  ]
})
export class SharedModule { }
