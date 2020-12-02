
import { AuthService } from './auth/services/auth.service';
import { AuthLoadGuard } from './guards/auth-load.guard';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

/* import { HttpClientModule } from '@angular/common/http'; */


/* import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:4001', options: {} }; */

@NgModule({
<<<<<<< HEAD
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		SharedModule,
		// SocketIoModule.forRoot(config)
	],
	providers: [],
	bootstrap: [AppComponent]
=======
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
>>>>>>> 46c7d17b12537f2bfd34051f45287162c542ee4e
})
export class AppModule { }
