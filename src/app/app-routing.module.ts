import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
	{ path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
	{ path: 'landing', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },
	{ path: 'mybingo', loadChildren: () => import('./mybingo/mybingo.module').then(m => m.MybingoModule) },
	{
		path: '',
		redirectTo: 'landing',
		pathMatch: 'full'
	},

];

export const AdminLayoutRoutes: Routes = [
	{ path: "dashboard", component: DashboardComponent },
  ];

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
		NgxsModule.forRoot([], {
			developmentMode: !environment.production
		})
	],
	exports: [RouterModule]
})


export class AppRoutingModule { }
