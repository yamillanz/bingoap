import { PublicidadComponent } from './../publicidad/publicidad.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificacionesComponent } from '../shared/notificaciones/notificaciones.component';
import { PerfilComponent } from '../shared/perfil/perfil.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
	{
		path: '', component: DashboardComponent,
		children: [
			{ path: 'notificaciones', component: NotificacionesComponent },
			{ path: 'perfil', component: PerfilComponent },
			/* { path: 'publicidad', component: PublicidadComponent }, */
			{ path: 'publicidad', loadChildren: () => import('../publicidad/publicidad.module').then(m => m.PublicidadModule) }

		]

	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DashboardRoutingModule { }
