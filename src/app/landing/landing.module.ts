import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './../auth/auth.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
	declarations: [LandingComponent, HomeComponent],
	imports: [
		CommonModule,
		SharedModule,
		LandingRoutingModule,
		FontAwesomeModule,
		//BrowserAnimationsModule,

	]
})
export class LandingModule { }
