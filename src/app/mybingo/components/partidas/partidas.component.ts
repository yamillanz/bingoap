import { PartidasService } from './../../services/partidas.service';
import { Partidas } from './../../models/partidas';
import { Component, OnInit/* , ElementRef, ViewChild  */ } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MessageService } from 'primeng/api';


@Component({
	selector: 'app-partidas',
	templateUrl: './partidas.component.html',
	styleUrls: ['./partidas.component.scss'],
	providers: [MessageService]
})
export class PartidasComponent implements OnInit {

	partidas: Partidas[] = [];
	idSala: string = "";
	cartonesComprar: number = 1;
	//nroCartones: ElementRef<any>;

	constructor(private srvPartidas: PartidasService,
		private router: Router,
		private route: ActivatedRoute,
		private messageService: MessageService) { }

	async ngOnInit() {
		//this.partidas = await this.srvPartidas.findAll().toPromise()
		this.route.params
			.pipe(first())
			.subscribe(params => {
				// Defaults to 0 if no query param provided.
				//console.log("params", params);
				this.idSala = params.idSala;

			});
		this.cartonesComprar = 1;
		this.partidas = [... await this.srvPartidas.findToPlay(this.idSala).toPromise()];

	}

	async entrarPartida(partidap: Partidas) {
		//console.log(partidap);

		let nrocartones: Element = document.getElementById('cant' + partidap.id) as HTMLElement;
		//console.log("valor element: ", nrocartones.getAttribute('aria-valuenow')); //return;


		if (nrocartones.getAttribute('aria-valuenow')) {
			//let idUsuarioLoged = JSON.parse(sesionStorage.getItem('currentUser')).userData.id;
			let idUsuarioLoged = JSON.parse(localStorage.getItem('currentUser')).userData.id;
			await this.srvPartidas.ingresarUsuarioAlaPartida({ idPartida: partidap.id, idUsuario: idUsuarioLoged }).toPromise();

			/* partidap.idEstatus = 2;
			await this.srvPartidas.cambiarEstadoPartida(partidap).toPromise(); //ESTO DEBE HACERCE EN EL BACK ***** */

			this.router.navigate(['mybingo'], {
				queryParams: {
					idSalaPartida: this.idSala,
					idPartida: partidap.id,
					nrocartones: nrocartones.getAttribute('aria-valuenow')
				},
				relativeTo: this.route, skipLocationChange: true
			});
		} else {
			this.messageService.add({ key: 'tc', severity: 'warn', summary: '', detail: 'Ingrese la cantidad de cartones' });
		}

	}

}
