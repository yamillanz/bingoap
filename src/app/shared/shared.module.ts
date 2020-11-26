import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { NavbarComponent } from './navbar/navbar.component';

import { TooltipModule } from 'primeng/tooltip'
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [MenuComponent, NavbarComponent, SidebarComponent ],
  imports: [
    CommonModule,
    TooltipModule,
    SidebarModule,
    ButtonModule,
    HttpClientModule
    
  ], 
  exports: [
    MenuComponent,
    NavbarComponent,
    SidebarComponent,
    HttpClientModule
  ]
})

export class SharedModule { }
