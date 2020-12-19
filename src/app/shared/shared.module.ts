import { TokenInterceptor } from './../auth/token.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import {TableModule} from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip'
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import {MenuModule} from 'primeng/menu';
import {DropdownModule} from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {RatingModule} from 'primeng/rating';
import { NotificacionesComponent } from './notificaciones/notificaciones.component'
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
	declarations: [MenuComponent, FooterComponent, NavbarComponent, SidebarComponent, NotificacionesComponent, PerfilComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule,
		ButtonModule,
		SidebarModule,
		TooltipModule,
		TableModule,
		ToastModule,
		DropdownModule,
		MessagesModule,
		MessageModule,
		ToolbarModule,
		FileUploadModule,
		RatingModule,
		DialogModule,
		RadioButtonModule,
		InputNumberModule,
		ConfirmDialogModule,
		FormsModule
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
		MenuModule,
		NotificacionesComponent,
		PerfilComponent
	]
	
})

export class SharedModule { }
