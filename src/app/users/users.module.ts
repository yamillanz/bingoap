import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from '../users/register/register.component';
import { ClientAdminComponent } from '../users/client-admin/client-admin.component'
import { UsersRoutingModule } from '../users/users-routing.module'


@NgModule({
  declarations: [RegisterComponent, ClientAdminComponent],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    ToastModule,
    PasswordModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    UsersRoutingModule,
  ]
})
export class UsersModule { }
