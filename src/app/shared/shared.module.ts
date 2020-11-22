import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarModule } from 'primeng/sidebar';
import {TooltipModule} from 'primeng/tooltip'
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [MenuComponent, NavbarComponent, SidebarComponent ],
  imports: [
    CommonModule,
    SidebarModule,
    TooltipModule
  ], 
  exports: [
    MenuComponent,
    NavbarComponent,
    SidebarComponent,
  ]
})
export class SharedModule { }
