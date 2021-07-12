import { BankingService } from 'src/app/banking/services/banking.service';
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
	// cartonesComprar: number = 1;
	private saldoUsuario: number = 0.0;
	// private disEntrar : boolean = false;
	//nroCartones: ElementRef<any>;

	constructor(private srvPartidas: PartidasService,
		private svrTransacciones: BankingService,
		private router: Router,
		private route: ActivatedRoute,
		private messageService: MessageService) { }

	async ngOnInit() {
		this.route.params
			.pipe(first())
			.subscribe(params => {
				// Defaults to 0 if no query param provided
				this.idSala = params.idSala;
			});

		// this.cartonesComprar = 1;
		this.partidas = [... await this.srvPartidas.findToPlay(this.idSala).toPromise()];
		this.partidas.forEach((partida) => {
			//let valorCartonesSol: number = 1 * partida.monto;
			// valorCartonesSol <= this.saldoUsuario ? partida.disEntrar = false : partida.disEntrar = true;
			partida.cartones_sol = 1;
		});

	}

	validarSegunSaldo(valor, partidap: Partidas) {
		console.log(partidap);
		console.log({ valor });
		//TODO: hacer la validacion del saldo
	}

	async entrarPartida(partidap: Partidas) {
		let nrocartones: Element = document.getElementById('cant' + partidap.id) as HTMLElement;
		//console.log("valor element: ", nrocartones.getAttribute('aria-valuenow')); //return;
		console.log(partidap.idUserPartida);
		if (nrocartones.getAttribute('aria-valuenow')) {
			
			let idUsuarioLoged = JSON.parse(sessionStorage.getItem('currentUser')).userData.id;
			console.log({
				idUsuarioEnvia: idUsuarioLoged,
				idUsuarioRecibe: partidap.idUserPartida,
				monto:(partidap.valor * partidap.cartones_sol), 
				idTipoTransaccion: 2
			});
			
			try {
				await this.svrTransacciones.transIngresoPartida({
					idUsuarioEnvia: idUsuarioLoged,
					idUsuarioRecibe: partidap.idUserPartida,
					monto:(partidap.valor * partidap.cartones_sol), 
					idTipoTransaccion: 2,
					
				}).toPromise();

			} catch (error) {
				console.log(error);
				return error;
			}

			await this.srvPartidas.ingresarUsuarioAlaPartida({ idPartida: partidap.id, idUsuario: idUsuarioLoged }).toPromise();

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
