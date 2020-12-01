import { LoginComponent } from './auth/login/login.component';
import { AuthLoadGuard } from './guards/auth-load.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';


const routes: Routes = [
	{ path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canLoad: [AuthLoadGuard] },
	{
		path: 'landing', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule),
	},
	{ path: 'partidas', loadChildren: () => import('./mybingo/mybingo.module').then(m => m.MybingoModule) },
	{ path: 'mybingo', loadChildren: () => import('./mybingo/mybingo.module').then(m => m.MybingoModule) },
	//{ path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
	{ path: 'login', redirectTo: 'landing/login', },


	{
		path: '',
		redirectTo: 'landing',
		pathMatch: 'full'
	},

];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			//useHash: true,
			anchorScrolling: 'enabled'
		}),
		NgxsModule.forRoot([], {
			developmentMode: !environment.production
		})
	],
	exports: [RouterModule]
})


export class AppRoutingModule { }
