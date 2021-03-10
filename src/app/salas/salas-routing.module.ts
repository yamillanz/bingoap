import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalaNuevaComponent } from './salas-bingo/sala-nueva/sala-nueva.component';
import { SalasBingoComponent } from './salas-bingo/salas-bingo.component';
import { SalasEditComponent } from './salas-bingo/salas-edit/salas-edit.component';
import { SalasDashboardComponent } from './salas-dashboard/salas-dashboard.component';

const routes: Routes = [
  {path: '', component: SalasBingoComponent},
  {path: 'editar-sala/:id', component: SalasEditComponent},
  {path: 'sala-nueva', component: SalaNuevaComponent},
  {path: 'sala-showroom', component: SalasDashboardComponent},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalasRoutingModule { }
