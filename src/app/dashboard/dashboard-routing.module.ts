import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
	{
		path: '', component: DashboardComponent,
		children: [
			{ path: 'salas', loadChildren: () => import('../salas/salas.module').then(m => m.SalasModule)},
			{ path: 'salas/editar-sala', loadChildren: () => import('../salas/salas.module').then(m => m.SalasModule)},
			{ path: 'perfil', loadChildren: () => import('../users/users.module').then(m => m.UsersModule)},
			{ path: 'admin-users', loadChildren: () => import('../users/users.module').then(m => m.UsersModule)},
			{ path: 'usuarios', loadChildren: () => import('../users/users.module').then(m => m.UsersModule)},
			{ path: 'notificaciones', loadChildren: () => import('../notificaciones/notificaciones.module').then(m => m.NotificacionesModule)},
			{ path: 'notificaciones/editar', loadChildren: () => import('../notificaciones/notificaciones.module').then(m => m.NotificacionesModule)},
			{ path: 'mybingo', loadChildren: () => import('../mybingo/mybingo.module').then(m => m.MybingoModule) },
			{ path: 'partidas/:idSala', loadChildren: () => import('../mybingo/mybingo.module').then(m => m.MybingoModule) },
			{ path: 'publicidad', loadChildren: () => import('../publicidad/publicidad.module').then(m => m.PublicidadModule)},
	],
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DashboardRoutingModule { }
