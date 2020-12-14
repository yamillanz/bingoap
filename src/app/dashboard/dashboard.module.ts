import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    SidebarModule,
    ButtonModule
  ]
})
export class DashboardModule { }
