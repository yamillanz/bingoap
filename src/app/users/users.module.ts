import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from '../users/register/register.component';
import { ClientAdminComponent } from '../users/client-admin/client-admin.component'
import { UsersRoutingModule } from '../users/users-routing.module';
import { BlockUIModule } from 'primeng/blockui';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { PerfilComponent } from './perfil/perfil.component';
import { EditComponent } from './perfil/edit/edit.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';

import { AdminUsersComponent } from './admin-users/admin-users.component';
import { TableModule } from 'primeng/table';
import { EditarUsuarioComponent } from './admin-users/editar-usuario/editar-usuario.component';


@NgModule({
  declarations: [RegisterComponent, ClientAdminComponent,
    PerfilComponent, EditComponent, AdminUsersComponent, EditarUsuarioComponent, ForgotpassComponent],
  imports: [
    RadioButtonModule,
    CommonModule,
    DialogModule,
    ButtonModule,
    CardModule,
    ToastModule,
    PasswordModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    UsersRoutingModule,
    DropdownModule,
    CalendarModule,
    BlockUIModule,
    MessageModule,
    MessagesModule,
    CheckboxModule,
    TableModule
  ],
  exports: [
  ]
})
export class UsersModule { }
