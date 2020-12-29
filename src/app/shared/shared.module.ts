import { TokenInterceptor } from './../auth/token.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CartonComponent } from '../mybingo/components/carton/carton.component';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
	declarations: [MenuComponent, FooterComponent, NavbarComponent, CartonComponent, SidebarComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule,
		SidebarModule
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
		CartonComponent
	]

})

export class SharedModule { }
