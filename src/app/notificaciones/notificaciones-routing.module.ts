import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificacionesComponent } from '../notificaciones/components//notificaciones.component';
import { NotificacioneditComponent } from '../notificaciones/components/notificacionedit/notificacionedit.component';

const routes: Routes = [
  {path: '', component: NotificacionesComponent},
  {path: ':id', component: NotificacioneditComponent },
  /* { path: 'register', component: RegisterComponent},
  {path: 'cliente', component: ClientAdminComponent}, */
  
   
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificacionesRoutingModule { }
