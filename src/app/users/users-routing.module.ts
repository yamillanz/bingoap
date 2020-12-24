import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { RegisterComponent } from '../users/register/register.component'
import { ClientAdminComponent } from '../users/client-admin/client-admin.component';
import { PerfilComponent } from './perfil/perfil.component';
import { EditComponent } from './perfil/edit/edit.component';

const routes: Routes = [
{path: '', component: PerfilComponent},
{path: 'editar/:id', component: EditComponent },
/* { path: 'register', component: RegisterComponent},
{path: 'cliente', component: ClientAdminComponent}, */

 
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class UsersRoutingModule { }