import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalasRoutingModule } from './salas-routing.module';
import { SalasBingoComponent } from './salas-bingo/salas-bingo.component';


@NgModule({
  declarations: [SalasBingoComponent],
  imports: [
    CommonModule,
    SalasRoutingModule
  ]
})
export class SalasModule { }
