import { MyfreegameComponent } from './components/myfreegame/myfreegame.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FreeGameComponent } from './free-game.component';

const routes: Routes = [
	{
		path: '',
		component: FreeGameComponent,
		/* children: [
			{ path: '', component: MyfreegameComponent },
			{ path: 'myfreegame', component: MyfreegameComponent }
		] */
	},
	{ path: 'myfreegame', component: MyfreegameComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FreeGameRoutingModule { }
