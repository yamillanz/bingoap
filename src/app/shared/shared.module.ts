import { HttpClientModule } from '@angular/common/http';
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
	exports: [
		MenuComponent,
		FooterComponent,
		NavbarComponent,
	]

})
export class SharedModule { }
