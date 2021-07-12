import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionesRoutingModule } from './notificaciones-routing.module';
import { NotificacionesComponent } from './components/notificaciones.component';
import { NotificacioneditComponent } from './components/notificacionedit/notificacionedit.component';

import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SalasDashboardComponent } from '../salas/salas-dashboard/salas-dashboard.component';
import { SalasModule } from '../salas/salas.module';
@NgModule({
  declarations: [NotificacionesComponent, NotificacioneditComponent],
  imports: [
    CommonModule,
    NotificacionesRoutingModule,
    DialogModule,
    FormsModule,
    CardModule,
    ToastModule, 
    TooltipModule,
    ButtonModule,
    ConfirmDialogModule,
    AutoCompleteModule,
    SalasModule

  ],
  exports: [
    NotificacionesComponent,
    NotificacioneditComponent
	]
})
export class NotificacionesModule { }
