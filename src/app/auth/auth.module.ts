import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './aut-routing.module'
import { LoginComponent } from "./components/login/login.component";
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './components/logout/logout.component';


@NgModule({
  declarations: [LoginComponent, LogoutComponent],
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
  /*  providers: [AuthService] */
})
export class AuthModule { }
