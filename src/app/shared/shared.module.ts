import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { NavbarComponent } from './navbar/navbar.component';

import { TooltipModule } from 'primeng/tooltip'
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [MenuComponent, NavbarComponent, SidebarComponent ],
  imports: [
    CommonModule,
    TooltipModule,
    SidebarModule,
    ButtonModule
    
  ], 
  exports: [
    MenuComponent,
    NavbarComponent,
    SidebarComponent
  ]
})

export class SharedModule { }
