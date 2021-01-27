import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BankingRoutingModule } from './banking-routing.module';
import { BankingComponent } from './banking.component';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [BankingComponent],
  imports: [
    CommonModule,
    BankingRoutingModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    AutoCompleteModule,
    FormsModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BankingModule {}
