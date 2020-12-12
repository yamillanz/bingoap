
import { AuthService } from './auth/services/auth.service';
import { AuthLoadGuard } from './guards/auth-load.guard';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

/* import { HttpClientModule } from '@angular/common/http'; */

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

/* import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';


const config: SocketIoConfig = { url: 'http://localhost:4001', options: {} }; */

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [AuthLoadGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
