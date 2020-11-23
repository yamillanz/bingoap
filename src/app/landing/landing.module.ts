import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';


@NgModule({
  declarations: [LandingComponent],
  imports: [
  // BrowserAnimationsModule,
  SharedModule,
  LandingRoutingModule,
    
  ]
})
export class LandingModule { }
