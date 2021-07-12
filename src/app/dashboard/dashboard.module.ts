import { NavbarService } from './../shared/navbar.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import {CarouselModule} from 'primeng/carousel';
import { SalasModule } from '../salas/salas.module';
import { NotificacionesModule } from '../notificaciones/notificaciones.module';

@NgModule({
	declarations: [DashboardComponent],
	imports: [
		CommonModule,
		DashboardRoutingModule,
		SharedModule,
		SidebarModule,
		ButtonModule,
		CardModule,
		FormsModule,
		TooltipModule,
		CarouselModule,
		SalasModule,
    NotificacionesModule

  ],
  providers: [NavbarService]
})
export class DashboardModule { }
