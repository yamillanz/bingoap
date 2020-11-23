import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './aut-routing.module' 
import { LoginComponent} from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';

import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';

@NgModule({
 declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ButtonModule,
    CardModule,
  ],
 
})
export class AuthModule { }
