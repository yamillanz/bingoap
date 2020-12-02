import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './aut-routing.module' 
import { LoginComponent} from '../auth/components/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';

import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {ToastModule} from 'primeng/toast';
import {BlockUIModule} from 'primeng/blockui';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './components/logout/logout.component';


@NgModule({
 declarations: [LoginComponent, RegisterComponent, LogoutComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ButtonModule,
    CardModule,
    ToastModule,
    BlockUIModule,
    ProgressSpinnerModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
		ReactiveFormsModule,
  ],
 
})
export class AuthModule { }
