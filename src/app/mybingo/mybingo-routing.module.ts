import { PartidasComponent } from './components/partidas/partidas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MybingoComponent } from './mybingo.component';

const routes: Routes = [
    //{ path: '', component: MybingoComponent },
    { path: '', component: PartidasComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MybingoRoutingModule { }
