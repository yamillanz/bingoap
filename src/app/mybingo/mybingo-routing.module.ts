import { PartidasComponent } from './components/partidas/partidas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { MybingoComponent } from './mybingo.component';
import { AdminPartidasComponent } from './components/admin-partidas/admin-partidas.component';
import { NuevaPartidaComponent } from './components/admin-partidas/nueva-partida/nueva-partida.component';

const routes: Routes = [
	{ path: 'admin-partidas', component: AdminPartidasComponent },
  { path: 'nueva-partida', component: NuevaPartidaComponent },
	{ path: 'mybingo', component: MybingoComponent },
	{ path: '', component: PartidasComponent },


];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
	],

	exports: [RouterModule]
})
export class MybingoRoutingModule { }
