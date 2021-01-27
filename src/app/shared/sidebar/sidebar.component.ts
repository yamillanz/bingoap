import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { MenuModel } from '../models/menu';
import { PrimeNGConfig } from 'primeng/api';
import { SidebarService } from '../services/sidebar.service';
import { NotificacionesModel } from '../../notificaciones/models/notificaciones';
import { NotificacionesService } from '../../notificaciones/services/notificaciones.service';
import { TransaccionesModel } from '../../users/models/transacciones';
import { PerfilService } from '../../users/services/perfil.service';
import { PerfilCliente } from 'src/app/users/models/perfil';
import { Saldo } from 'src/app/users/models/balance';
import { BalanceService } from 'src/app/users/services/balance.service';
import { BankingService } from 'src/app/banking/services/banking.service';
import { Totales } from 'src/app/banking/models/totales';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  visibleSidebar1;

  @ViewChild('navBurger') navBurger: ElementRef;
  @ViewChild('navMenu') navMenu: ElementRef;
  @ViewChild('navBar') navbar: ElementRef;
  saldos: Totales[] = [];
  balance: any;
  menuItems: any[];
  Menu: any = [];
  usuario: any = [];
  rol: any = [];
  nickname: any = [];
  nombre: any = [];
  status: any = [];
  cliente: any = [];
  userBalance: any = [];
  dataCliente: any = [];
  DataCliente: PerfilCliente[];
  notif: any = [];
  notificaciones: NotificacionesModel[];
  selectedNotificaciones: NotificacionesModel;
  cantidadNotificaciones: string;
  idCliente: any = [];
  transacciones: any;
  Transacciones: any = [] ;
  montoTransaccion: any = [];
  fechaTransaccion: any = [];
  quienTransfiere: any;
  primeraLetra: any = [];
  userRecibe: any = [];
  routerLink: any;
  saldoNeto: any;
  
  saldo: Saldo = {
    id: 0,
    idUsuario: 0,
    saldo: 0,
    idDealer: 0,
    idSala: 0,
    fechaCreacion: Date,
    fechaActualizacion: new Date(),
  };

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router,
    public menuService: MenuService,
    private sidebarService: SidebarService,
    public notificacionesService: NotificacionesService,
    private perfilService: PerfilService,
    private viewportScroller: ViewportScroller,
    private actRouter: ActivatedRoute,
    private balanceService: BalanceService,
    private bankingService: BankingService
  ) {}

  onClickScroll(elementId: string): void {
    if (elementId == 'home') {
      this.router.navigate(['/landing']);
    } else {
      this.viewportScroller.scrollToAnchor(elementId);
    }
  }

  toggleNavbar() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }

  getClasses() {
    const classes = {
      'pinned-sidebar': this.sidebarService.getSidebarStat().isSidebarPinned,
      'toggeled-sidebar': this.sidebarService.getSidebarStat()
        .isSidebarToggeled,
    };
    return classes;
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  ngOnInit(): void {
    this.cliente.id = JSON.parse(
      sessionStorage.getItem('currentUser')
    ).userData.id;
    
    this.loadMenu(this.Menu.idRolUsuario);
    this.loadDataUser(this.idCliente);
    this.loadCantNotificacion(this.notif.idUsuarioRecibe);
    this.loadRecargaSaldo(this.userBalance);
    this.loadBalance(); 
  }

  loadDataUser(idCliente) {
    this.dataCliente.id = JSON.parse(
      sessionStorage.getItem('currentUser')
    ).userData.id;
    this.perfilService.getClient(this.dataCliente.id).subscribe((data) => {
      this.DataCliente = data;
     

      this.nickname = data[0].nickname;
      if (this.nickname === null) {
        
        this.nickname = 'Sin nickname';
      }

      this.nombre = data[0].nombreCompleto;
      if (this.nombre === null) {
        this.nombre = 'Sin nombre';
      }

      const cadena = this.nombre;
      this.primeraLetra = cadena.charAt(0);
    });
    
  }

  loadMenu(idRol) {
    this.Menu.idRol = JSON.parse(
      sessionStorage.getItem('currentUser')
    ).userData.idRolUsuario;
    return this.menuService
      .getMenuByIdRol(this.Menu.idRol)
      .subscribe((data) => {
        this.Menu = data;
        this.routerLink = data[0].routerLink;
        
      });
  }

  loadRecargaSaldo(idUsuarioRecibe) {
    this.userRecibe = JSON.parse(
      sessionStorage.getItem('currentUser')
    ).userData.id;
    
    this.notificacionesService
      .getBalanceByUser(this.userRecibe)
      .subscribe((data) => {
        this.transacciones = data;
        
        ///////////////////////////////////
        
        if ( this.transacciones.length == 0 )
        {
          
        } else {
          if (this.transacciones.length != 0)
          {
            /* this.Transacciones = data[0].acumulado; */
            this.montoTransaccion = data[0].monto;
            this.fechaTransaccion = data[0].fechaCreacion;
            this.quienTransfiere = data[0].nickname;
          }
        }

          
        
      });
  }

  loadBalance() {
   this.userRecibe = JSON.parse(
      sessionStorage.getItem('currentUser')
    ).userData.id; 
    this.bankingService.getSaldoGlobalUsuario(this.userRecibe).subscribe((data) => {
      this.saldos = data;
      this.saldoNeto = data[0].saldoGlobal;
     
      
      /* this.saldo = data[0].saldo; */
      
      /* console.log('saldos', this.saldos);
      if (this.saldos === undefined) {
        console.log('No hay saldo esta indefinido');
      } else if (this.saldos !== undefined) {
        this.saldo = data[0].saldo;
      } */

     /*  if (this.saldos === undefined) {
        console.log('ESTA MAMANDO Y SIN AMIGOS');
        this.saldo.idUsuario = JSON.parse(
          sessionStorage.getItem('currentUser')
        ).userData.id;
        delete this.saldo.id;
        delete this.saldo.idDealer;
        delete this.saldo.idSala;
        this.saldo.fechaCreacion = new Date();
        this.saldo.fechaActualizacion = new Date();
        this.saldo.saldo = 0;
        this.balanceService.registerSaldoCero(this.saldo).subscribe(
          (res) => {
          },
          (err) => console.error(err)
        );
        
      } */
    });
  } 

  loadCantNotificacion(idUsuarioRecibe) {
    this.notif.idUsuarioRecibe = JSON.parse(
      sessionStorage.getItem('currentUser')
    ).userData.id;
    this.notificacionesService
      .getCantNotificationsByUser(this.notif.idUsuarioRecibe)
      .subscribe((data) => {
        this.notificaciones = data;
        this.cantidadNotificaciones = data[0].cantidadNotificaciones;
      });
  }

  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }

  logout() {
    this.router.navigate(['/logout']);
  }

  goToPerfil() {
    this.router.navigate(['dashboard/perfil'], {
      skipLocationChange: true,
    });
  }

  goToNotificaciones() {
    this.router.navigate(['dashboard/notificaciones'], {
      skipLocationChange: true,
    });
  }

  goToRouterLink(routerLink) {
    this.router.navigate(['dashboard/' + routerLink], {
      skipLocationChange: true,
    });
  }
}

