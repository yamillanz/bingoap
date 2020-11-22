import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SidebarModule,
    ButtonModule,
    SharedModule
  ]
})
export class DashboardModule { }
