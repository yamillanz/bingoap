import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { NavbarComponent } from './navbar/navbar.component';

import { TooltipModule } from 'primeng/tooltip'
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule} from '@angular/common/http';

import { FooterComponent } from './footer/footer.component';



@NgModule({
	declarations: [MenuComponent, FooterComponent, NavbarComponent, SidebarComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		TooltipModule
	],
	exports: [
		MenuComponent,
		FooterComponent,
		SidebarComponent,
		NavbarComponent
	]

})

export class SharedModule { }
