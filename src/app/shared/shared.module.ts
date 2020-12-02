import { TokenInterceptor } from './../auth/token.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
	declarations: [MenuComponent, FooterComponent, NavbarComponent],
	imports: [
		CommonModule,
		HttpClientModule
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
		NavbarComponent,
	]
	
})
export class SharedModule { }
