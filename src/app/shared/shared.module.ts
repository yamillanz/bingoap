

import { TokenInterceptor } from './../auth/token.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarModule } from 'primeng/sidebar';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

import { CartonComponent } from './../mybingo/components/carton/carton.component';

import { NotificacionesComponent } from './notificaciones/notificaciones.component'
import { TableModule } from 'primeng/table';


@NgModule({
	declarations: [MenuComponent, FooterComponent, NavbarComponent, SidebarComponent, NotificacionesComponent, CartonComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule,
		ButtonModule,
		SidebarModule,
		TableModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
	],
	exports: [
		MenuComponent,
		FooterComponent,
		SidebarComponent,
		NavbarComponent,
		MenuModule,
		NotificacionesComponent,
		CartonComponent,
	]

})

export class SharedModule { }
