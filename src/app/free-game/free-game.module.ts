import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { FreeGameRoutingModule } from './free-game-routing.module';
import { FreeGameComponent } from './free-game.component';
import { MyfreegameComponent } from './components/myfreegame/myfreegame.component';

@NgModule({
	declarations: [FreeGameComponent, MyfreegameComponent],
	imports: [
		CommonModule,
		FreeGameRoutingModule,
		SharedModule,
		ButtonModule,
		CardModule,
		InputNumberModule,
		ToastModule,
		FormsModule,
		NgCircleProgressModule.forRoot({}),
	]
})
export class FreeGameModule { }
