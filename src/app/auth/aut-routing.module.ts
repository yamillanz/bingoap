import { LogoutComponent } from './components/logout/logout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	/* 	{
			path: '',
			children: [{ path: 'logout', component: LogoutComponent }]
		}, */
	//{ path: 'login', component: LoginComponent },

	/* { path: 'logout', component: LogoutComponent } */
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule { }
