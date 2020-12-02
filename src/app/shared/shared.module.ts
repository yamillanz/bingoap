import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

import { TooltipModule } from 'primeng/tooltip'
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

import {MenuModule} from 'primeng/menu';
import {PanelMenuModule} from 'primeng/panelmenu';
import {MenuItem} from 'primeng/api'


@NgModule({
	declarations: [MenuComponent, FooterComponent, NavbarComponent, SidebarComponent],
	imports: [
		CommonModule,
		HttpClientModule
	],
	exports: [
		MenuComponent,
		FooterComponent,
		SidebarComponent,
		NavbarComponent,
		MenuModule
	]

})

export class SharedModule { }
