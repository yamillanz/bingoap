import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MybingoRoutingModule } from './mybingo-routing.module';
import { MybingoComponent } from './mybingo.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { CartonComponent } from './components/carton/carton.component';

import { ButtonModule } from 'primeng/button';

//const config: SocketIoConfig = { url: 'http://localhost:4001', options: {} };


@NgModule({
  declarations: [MybingoComponent, CartonComponent],
  imports: [
    CommonModule,
    ButtonModule,
    MybingoRoutingModule,
    SocketIoModule,
    NgCircleProgressModule.forRoot({})
  ]
})
export class MybingoModule { }
