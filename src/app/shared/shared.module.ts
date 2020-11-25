import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [MenuComponent],
  imports: [
	CommonModule,
	HttpClientModule
  ], 
  exports: [
	MenuComponent,
	HttpClientModule,
  ]
})
export class SharedModule { }
