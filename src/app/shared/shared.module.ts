import { TokenInterceptor } from './../auth/token.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
/* import {MenuModule} from 'primeng/menu'; */
/* import {ToolbarModule} from 'primeng/toolbar'; */
/* import {FileUploadModule} from 'primeng/fileupload'; */
/* import {RatingModule} from 'primeng/rating'; */ 
/* import { RadioButtonModule } from 'primeng/radiobutton'; */
/* import { TableModule } from 'primeng/table'; */
import {DropdownModule} from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
/* import { InputNumberModule } from 'primeng/inputnumber'; */
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import {CardModule} from 'primeng/card';
/* import {InputTextareaModule} from 'primeng/inputtextarea'; */
import { TooltipModule } from 'primeng/tooltip';
/* import { SidebarModule } from 'primeng/sidebar'; */


import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CartonComponent } from '../mybingo/components/carton/carton.component';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
	declarations: [MenuComponent, FooterComponent, NavbarComponent, CartonComponent, SidebarComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule,
		SidebarModule,
		/* ButtonModule,
		TooltipModule,
		ToastModule, */
		/* DropdownModule, */
		/* MessagesModule,
		MessageModule, */
		/* DialogModule, */
		/* ConfirmDialogModule,
		DialogModule,
		FormsModule,
		CardModule, */
		/* InputTextareaModule, */
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
	],
	exports: [
		MenuComponent,
		FooterComponent,
		SidebarComponent,
		NavbarComponent,
		CartonComponent
	]

})

export class SharedModule { }
