
import { AuthLoadGuard } from './guards/auth-load.guard';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './users/perfil/perfil.component';
import { EditComponent } from './users/perfil/edit/edit.component';


const routes: Routes = [
	{ path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)/* , canLoad: [AuthLoadGuard] */ },
	{ path: 'landing', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },
	{ path: 'partidas', loadChildren: () => import('./mybingo/mybingo.module').then(m => m.MybingoModule) },
	{ path: 'mybingo', loadChildren: () => import('./mybingo/mybingo.module').then(m => m.MybingoModule) },
	{ path: 'partidas/:idSala', loadChildren: () => import('./mybingo/mybingo.module').then(m => m.MybingoModule) },
	{ path: 'login', redirectTo: 'landing/login', },
	{
		path: '',
		redirectTo: 'landing',
		pathMatch: 'full'
	},
	{ path: 'freegame', loadChildren: () => import('./free-game/free-game.module').then(m => m.FreeGameModule) },

];

export const AdminLayoutRoutes: Routes = [
	{ path: "dashboard", component: DashboardComponent },
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
