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
import { PubliToastComponent } from './../publicidad/publi-toast/publi-toast.component';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';


@NgModule({
	declarations: [MenuComponent, FooterComponent, NavbarComponent, CartonComponent, SidebarComponent, PubliToastComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule,
		SidebarModule,
		ToastModule,
		ButtonModule,
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
		CartonComponent,
		PubliToastComponent
	]

})

export class SharedModule { }
