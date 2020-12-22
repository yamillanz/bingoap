import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificacionesComponent } from '../shared/notificaciones/notificaciones.component';
import { PerfilComponent } from '../users/perfil/perfil.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
	{
		path: '', component: DashboardComponent,
		children: [
			/* { path: 'notificaciones', component: NotificacionesComponent }, */
			{ path: 'notificaciones', loadChildren: () => import('../users/users.module').then(m => m.UsersModule)},
			/* { path: 'perfil', component: PerfilComponent }, */
			{ path: 'perfil', loadChildren: () => import('../users/users.module').then(m => m.UsersModule)},
		
	],
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DashboardRoutingModule { }
