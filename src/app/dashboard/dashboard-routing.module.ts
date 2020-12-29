import { PublicidadComponent } from './../publicidad/publicidad.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificacionesComponent } from '../notificaciones/components/notificaciones.component';
import { PerfilComponent } from '../users/perfil/perfil.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
	{
		path: '', component: DashboardComponent,
		children: [
			{ path: 'perfil', loadChildren: () => import('../users/users.module').then(m => m.UsersModule)},
			{ path: 'notificaciones', loadChildren: () => import('../notificaciones/notificaciones.module').then(m => m.NotificacionesModule)},
			{ path: 'notificaciones/editar', loadChildren: () => import('../notificaciones/notificaciones.module').then(m => m.NotificacionesModule)},
			{ path: 'publicidad', loadChildren: () => import('../publicidad/publicidad.module').then(m => m.PublicidadModule)},
	],
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DashboardRoutingModule { }
