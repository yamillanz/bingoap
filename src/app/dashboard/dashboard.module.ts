import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { NotificacionesComponent } from '../shared/notificaciones/notificaciones.component';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';

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
		NotificacionesComponent,
		SidebarComponent
		

	]
})
export class DashboardModule { }
