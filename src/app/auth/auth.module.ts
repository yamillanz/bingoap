import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './aut-routing.module' 
import { LoginComponent} from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';


import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {ToastModule} from 'primeng/toast';
import {BlockUIModule} from 'primeng/blockui';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';


@NgModule({
 declarations: [LoginComponent, RegisterComponent],
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
  ],
 
})
export class AuthModule { }
