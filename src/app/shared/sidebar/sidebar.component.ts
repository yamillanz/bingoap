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
import { user } from '../../auth/models/user';
import { PerfilService } from '../../users/services/perfil.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})



export class SidebarComponent implements OnInit {

	visibleSidebar1;

	@ViewChild('navBurger') navBurger: ElementRef;
	@ViewChild('navMenu') navMenu: ElementRef;
	@ViewChild('navBar') navbar: ElementRef;

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
	/* DataCliente: MenuModel[]; */
	DataCliente: MenuModel[];
	notif: any = [];
	notificaciones: NotificacionesModel[];
	selectedNotificaciones: NotificacionesModel;
	cantidadNotificaciones: string;
	idCliente: any = [];
	transacciones: TransaccionesModel[] = [];
	Transacciones: any = [];
	montoTransaccion: any = [];
	fechaTransaccion: any = [];
	quienTransfiere: any;
	primeraLetra: any = [];
	userRecibe: any = [];

	constructor(private primengConfig: PrimeNGConfig, private router: Router,
		public menuService: MenuService, private sidebarService: SidebarService,
		public notificacionesService: NotificacionesService, private perfilService: PerfilService,
		private viewportScroller: ViewportScroller, private actRouter: ActivatedRoute) {

	}

	onClickScroll(elementId: string): void {
		if (elementId == "home") {
			this.router.navigate(['/landing']);
		} else {
			this.viewportScroller.scrollToAnchor(elementId);
		}
		//
		//const elmnt = document.getElementById(elementId);

	}

	toggleNavbar() {
		this.navBurger.nativeElement.classList.toggle('is-active');
		this.navMenu.nativeElement.classList.toggle('is-active');
	}

	getClasses() {
		const classes = {
			'pinned-sidebar': this.sidebarService.getSidebarStat().isSidebarPinned,
			'toggeled-sidebar': this.sidebarService.getSidebarStat().isSidebarToggeled
		}
		return classes;
	}


	toggleSidebar() {
		this.sidebarService.toggleSidebar();
		/* this.sidebarBurger.nativeElement.classList.toggle('is-active');
		this.sidebarMenu.nativeElement.classList.toggle('is-active'); */
	}

	ngOnInit(): void {
		this.cliente.id = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
		/* this.cliente.id = JSON.parse(localStorage.getItem('currentUser')).userData.id; */
		this.loadMenu(this.Menu.idRolUsuario);
		this.loadDataUser(this.idCliente);
		this.loadCantNotificacion(this.notif.idUsuarioRecibe);
		this.loadBalance(this.userBalance);


	}

	loadDataUser(idCliente) {
		this.dataCliente.idCliente = JSON.parse(sessionStorage.getItem('currentUser')).userData.idCliente;
		//this.dataCliente.idCliente = JSON.parse(localStorage.getItem('currentUser')).userData.idCliente;
		this.perfilService.getClientUsersData(this.dataCliente.idCliente).subscribe(data => {
			this.DataCliente = data;
			const nick = this.nickname = data[0].nickname;
			this.nombre = data[0].nombreCompleto;
			this.rol = data[0].rol;
			const cadena = this.nombre;
			console.log('cadena', cadena);
			this.primeraLetra = cadena.charAt(0);
			console.log('primera letra:', this.primeraLetra);
		});
	}

	loadMenu(idRol) {
		this.Menu.idRol = JSON.parse(sessionStorage.getItem('currentUser')).userData.idRolUsuario;
		/* this.Menu.idRol = JSON.parse(localStorage.getItem('currentUser')).userData.idRolUsuario; */
		return this.menuService.getMenuByIdRol(this.Menu.idRol).subscribe(data => this.Menu = data),
			console.log('este es el rol del usuario', this.Menu.idRol);
	}

	loadBalance(idUsuarioRecibe) {
		this.userRecibe = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
		/* this.userRecibe = JSON.parse(localStorage.getItem('currentUser')).userData.id; */
		this.notificacionesService.getBalanceByUser(this.userRecibe).subscribe(data => {
			this.transacciones = data;
			console.log('este es el balance', data[0].acumulado);
			this.Transacciones = data[0].acumulado;
			this.montoTransaccion = data[0].monto;
			this.fechaTransaccion = data[0].fechaCreacion;

			this.quienTransfiere = data[0].nickname;
			console.log('transacciones:', this.quienTransfiere);
		});
	}


	// Esto es para obtener la data de las cant de notificaciones del usuario en el badge
	loadCantNotificacion(idUsuarioRecibe) {
		this.notif.idUsuarioRecibe = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
		//this.notif.idUsuarioRecibe = JSON.parse(localStorage.getItem('currentUser')).userData.id;

		this.notificacionesService.getCantNotificationsByUser(this.notif.idUsuarioRecibe).subscribe(data => {
			this.notificaciones = data;
			console.log('Cantidad de  notificaciones:', data[0].cantidadNotificaciones);
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
		this.router.navigate(['/logout'])
	}

	goToPerfil() {
		this.router.navigate(['dashboard/perfil'], {
			skipLocationChange: true
		});

	}


	goToNotificaciones() {
		this.router.navigate(['dashboard/notificaciones'], {
			skipLocationChange: true
		});

	}

}

