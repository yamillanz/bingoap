
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { MybingoRoutingModule } from './mybingo-routing.module';
import { MybingoComponent } from './mybingo.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { CartonComponent } from './components/carton/carton.component';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PartidasComponent } from './components/partidas/partidas.component';

//const config: SocketIoConfig = { url: 'http://localhost:4001', options: {} };


@NgModule({
	declarations: [MybingoComponent, CartonComponent, PartidasComponent],
	imports: [
		CommonModule,
		//HttpClientModule,
		ButtonModule,
		DialogModule,
		MybingoRoutingModule,
		SharedModule,
		SocketIoModule,
		NgCircleProgressModule.forRoot({})
	],
	providers: []
})
export class MybingoModule { }
