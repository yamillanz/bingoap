import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

import { SalasRoutingModule } from './salas-routing.module';
import { SalasBingoComponent } from './salas-bingo/salas-bingo.component';
import { SalasEditComponent } from './salas-bingo/salas-edit/salas-edit.component';
import { SalaNuevaComponent } from './salas-bingo/sala-nueva/sala-nueva.component';


@NgModule({
  declarations: [SalasBingoComponent, SalasEditComponent, SalaNuevaComponent],
  imports: [
    CommonModule,
    SalasRoutingModule,
    FormsModule,
    MessagesModule,
    MessageModule,
    DialogModule,
    CardModule,
    ToastModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    InputSwitchModule,
    ConfirmDialogModule
  ]
})
export class SalasModule { }
