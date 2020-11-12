import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MybingoRoutingModule } from './mybingo-routing.module';
import { MybingoComponent } from './mybingo.component';


@NgModule({
  declarations: [MybingoComponent],
  imports: [
    CommonModule,
    MybingoRoutingModule
  ]
})
export class MybingoModule { }
