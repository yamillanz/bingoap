import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../auth/components/login/login.component';

import { LandingComponent } from './landing.component';

const routes: Routes = [
	{
		path: '', component: LandingComponent,
		children: [
			{ path: '', component: HomeComponent },
			{ path: 'login', component: LoginComponent }

		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LandingRoutingModule { }
