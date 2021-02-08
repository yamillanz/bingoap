
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* import { BrowserModule } from '@angular/platform-browser'; */

import { MybingoRoutingModule } from './mybingo-routing.module';
import { MybingoComponent } from './mybingo.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { NgCircleProgressModule } from 'ng-circle-progress';
/* import { CartonComponent } from './components/carton/carton.component'; */

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PartidasComponent } from './components/partidas/partidas.component';
/* import { SocketClientService } from './services/socket-client.service'; */
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import {CalendarModule} from 'primeng/calendar';
import {InputTextareaModule} from 'primeng/inputtextarea';

import { AdminPartidasComponent } from './components/admin-partidas/admin-partidas.component';
import { NuevaPartidaComponent } from './components/admin-partidas/nueva-partida/nueva-partida.component'

/* const config: SocketIoConfig = { url: 'http://localhost:4001', options: {} }; */


@NgModule({
	declarations: [MybingoComponent, /* CartonComponent, */ PartidasComponent, AdminPartidasComponent, NuevaPartidaComponent],
	imports: [
		CommonModule,
		//HttpClientModule,
		ButtonModule,
		DialogModule,
		MybingoRoutingModule,
		SharedModule,
		SocketIoModule,
		NgCircleProgressModule.forRoot({}),
		CardModule,
		InputNumberModule,
		ToastModule,
		FormsModule,
		TableModule,
    InputSwitchModule,
    CalendarModule,
    DialogModule,
    InputTextareaModule

		/* BrowserModule */
		//SocketIoModule.forRoot(config)
	],
	/* exports: [CartonComponent], */
	providers: [/* SocketClientService */]
})
export class MybingoModule { }
