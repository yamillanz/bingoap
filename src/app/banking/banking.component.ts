import { Component, OnInit } from '@angular/core';
import { BankingService } from '../banking/services/banking.service';
import { user } from '../users/models/user.model';
import { Totales } from './models/totales';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Transacciones } from './models/transacciones';
import { Warnings } from './models/warnings';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.scss'],
  providers: [BankingService, MessageService, ConfirmationService],
})
export class BankingComponent implements OnInit {
  /* userDealer: any; */
  /* saldoNetoRecibe: any; */
  /* salida: any; */
  id: number;
  /*  idUser: any; */
  /* users: user; */
  usuarios: user[];
  /* selectedUser: string; */
  filteredUsers: any[];
  /* filteredTotales: any[]; */
  /* selectedUserAdvanced: any[]; */
  total: Totales[];
  saldoNeto: any;
  /* email: any; */
  /* selected: any; */
  /* almacenaTransaccion: Transacciones; */
  /* displayModal: boolean; */
  /* idDealer: any; */
  /* SaldoUsuarioRecibe: any; */
  usuario: any = {};
  /* idDealerUsuario: any = {}; */
  /* totalDealer: Totales[]; */
  /* idSaldo: any; */
  /* totalSaldo: any; */
  /* saldoId: any; */
  /* totalDealerSalida: Totales[] */
  /* idSaldoSalida: any; */
  /* saldoNetoSalida: any; */

  /* res: Warnings; */
  /* message:any; */
  dataWarnings: any;
  errores: boolean = false;

  transaccion: Transacciones = {
    id: 0,
    idUsuarioRecibe: 0,
    monto: 0,
    acumulado: 0,
    fechaCreacion: new Date(),
    tipo_moneda: 0,
    idUsuarioEnvia: 0,
    fechaActualizacionEstatus: new Date(),
    idTipoTransaccion: 0,
  };

  /* opcionSeleccionado: string = '0';
  verSeleccion: string = ''; */

  constructor(
    private bankingService: BankingService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.id = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
    this.getSaldoOneUser();
    this.bankingService.getAllUsers().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }

  filterUser(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.usuarios.length; i++) {
      let user = this.usuarios[i];
      if (user.email.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(user);
      }
    } 

    this.filteredUsers = filtered;
  }

  async getSaldoOneUser() {
    await this.bankingService.getSaldoUsuario(this.id).subscribe((res) => {
      this.total = res;
      this.saldoNeto = res[0].saldo;
    });
  }

  async ejecutarTransaccion() {
    this.errores = false;
    try {
      delete this.transaccion.id;
      delete this.transaccion.tipo_moneda;
      delete this.transaccion.fechaActualizacionEstatus;
      delete this.transaccion.fechaCreacion;
      delete this.transaccion.acumulado;
      this.transaccion.idTipoTransaccion = 3;
      this.usuario = this.transaccion.idUsuarioRecibe;
      this.transaccion.idUsuarioEnvia = this.id;
      this.transaccion.idUsuarioRecibe = this.usuario.id;

      if (this.transaccion.idUsuarioRecibe == undefined) {
        this.addMensajeEmail();
      } else {
        if (this.transaccion.idUsuarioRecibe != undefined) {
          const dataWarnings: Warnings = await this.bankingService
            .saveTransaction(
              this.transaccion.idUsuarioRecibe,
              this.transaccion.idUsuarioEnvia,
              this.transaccion
            )
            .toPromise();

          if (dataWarnings.status == 417) {
            this.messageService.add({
              severity: 'error',
              summary: 'Ups...😭',
              detail: 'No puedes transferir un monto cero o negativo',
            });
          }

          if (dataWarnings.status == 409) {
            this.messageService.add({
              severity: 'error',
              summary: 'Ups...🙄',
              detail: 'Saldo insuficiente para realizar la operación',
            });
          }

          if (dataWarnings.status == 200) {
            this.confirm();
          }
        }
      }
    } catch (error) {
      this.errores = true;
    }
  }

  addMensajeEmail() {
    this.messageService.add({
      severity: 'error',
      summary: 'Ups...😉',
      detail: 'Debe incluir el correo de quien recibe',
    });
  }

  refreshView() {
    this.router.navigate(['dashboard/banking'], {
      skipLocationChange: true,
    });
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Estas seguro de transferir ese monto?',
      accept: () => {
        this.messageService.add({
          key: 't1',
          severity: 'success',
          summary: '💃', 
          detail: 'Good! 💰 las monedas se enviaron...',
        });
        this.ngOnInit();
      },
      reject: () => {
        this.refreshView();
      },
    });

  }

  redirect() {
    this.ngOnInit();
  }
}
