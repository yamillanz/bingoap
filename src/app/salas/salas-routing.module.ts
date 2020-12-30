import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalasBingoComponent } from './salas-bingo/salas-bingo.component';

const routes: Routes = [
  {path: '', component: SalasBingoComponent},
  
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalasRoutingModule { }
