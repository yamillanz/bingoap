import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';

import { PublicidadRoutingModule } from './publicidad-routing.module';
import { PublicidadComponent } from './publicidad.component';
import { ButtonModule } from 'primeng/button';
import { PubliToastComponent } from './publi-toast/publi-toast.component';

@NgModule({
	declarations: [PublicidadComponent, PubliToastComponent],
	imports: [
		CommonModule,
		PublicidadRoutingModule,
		TableModule,
		ButtonModule,
		CardModule,
		ToastModule,
		ToolbarModule,
		InputTextModule,
		InputTextareaModule,
		DialogModule,
		FormsModule,
		InputSwitchModule,
		FileUploadModule,
		//SharedModule,
	],
	providers: [ConfirmationService, MessageService]
})
export class PublicidadModule { }
