import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { RegisterComponent } from '../users/register/register.component'
import { ClientAdminComponent } from '../users/client-admin/client-admin.component';

const routes: Routes = [
{ path: '', component: RegisterComponent},
{path: 'cliente', component: ClientAdminComponent}

];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class UsersRoutingModule { }