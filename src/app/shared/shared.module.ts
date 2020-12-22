
import { TokenInterceptor } from './../auth/token.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarModule } from 'primeng/sidebar';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';
import { NotificacionesComponent } from './notificaciones/notificaciones.component'
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';
import { EditComponent } from './perfil/edit/edit.component';
import { CardModule } from 'primeng/card';
import { NotificacioneditComponent } from './notificaciones/notificacionedit/notificacionedit.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CartonComponent } from '../mybingo/components/carton/carton.component';


@NgModule({
	declarations: [
		MenuComponent,
		FooterComponent,
		NavbarComponent,
		SidebarComponent,
		NotificacionesComponent,
		PerfilComponent,
		EditComponent,
		NotificacioneditComponent,
		CartonComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule,
		/* ButtonModule, */
		 SidebarModule,
		/*TooltipModule, */
	/* 	 TableModule, */
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
		FormsModule,
		CardModule,
		InputTextareaModule,
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
		PerfilComponent,
		CartonComponent,
		/* TableModule, */
	]

})

export class SharedModule { }
