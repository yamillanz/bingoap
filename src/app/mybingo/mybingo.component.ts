import { ConfigsGeneService } from './../shared/services/configs-gene.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketClientService } from './services/socket-client.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-mybingo',
	templateUrl: './mybingo.component.html',
	styleUrls: ['./mybingo.component.scss']
})
export class MybingoComponent implements OnInit, OnDestroy {

	numero: string = "   ";
	porcentaje: number = 0;
	idPartidaUsuario: string = "0-0";
	duracionanimacion : number = 9100;
	//nroCartones = [0, 1, 2]; // Array(3).fill(3).map((x, i) => i);
	nroCartones: number[];
	numerosYaSalieron: string[] = [];
	//private sub : Subject<any> = new Subject(); //Subscription;
	private sub: Subscription; //;
	private sub2: Subscription; //;

	tituloDialogo: string = "";
	displayDialog: boolean = false;
	mensajeDialogo: string = "";
	displayDialogTermino: boolean = false;
	erroresServer: number = 0;
	esperando = 1;

	idPartida: string = ""; // Numero que se utiliza quivalente al "room" del Join

	idSalaPartida: string = "" //Sala que pertenece a la partida

	constructor(private srvSocket: SocketClientService,
		private router: Router,
		private route: ActivatedRoute,
		private srvConfigs :ConfigsGeneService) {
		this.srvSocket.errores.subscribe((error) => {
			if (error != "") {
				this.erroresServer = 1;
				this.tituloDialogo = "UPS!!! Problemas de conección";
				this.mensajeDialogo = "Existen problemas de conección con el servidor, revisa tu internet o intentalo mas tarde";
				this.displayDialog = true;
			}
		});
	}


	async ngOnInit() {
		//this.srvSocket.connect();
		//this.numero = "B 14";
		this.route.queryParams
			.pipe(first())
			.subscribe(params => {
				this.nroCartones = [...Array(parseInt(params.nrocartones)).keys()]; //Array(params.nrocartones).fill(params.nrocartones).map((x, i) => i); //params.nrocartones;
				//console.log("generados : ", params.nrocartones);
				this.idPartida = params.idPartida;
				this.idSalaPartida = params.idSalaPartida;
				//console.log(this.idPartida);

				this.srvSocket.enjoySala(this.idPartida);
			});


		this.sub = this.srvSocket.getNumers().subscribe((data) => {
			console.log("Rec desde SERVER: ", data);
			if (data.toString() === "-NOGANADOR-") {
				this.tituloDialogo = "SIN GANADOR";
				this.mensajeDialogo = "Ningun ganador esta vez...sigue intentando";
				this.displayDialog = true;
			}
			else/* ( data.toString() !== "-NOGANADOR-")  */ {
				this.esperando = 0;
				this.numero = data.toString();
				//this.numerosYaSalieron.push(this.numero);
				this.numerosYaSalieron = [... this.numerosYaSalieron, this.numero.split(" ").join("")];
				//console.log("Ya salieron");
				this.porcentaje = (Math.round(Math.random() * 100)) + 100;
			}

		});

		this.sub2 = this.srvSocket.getMessegeToMe().subscribe((data) => {
			//console.log("Recibe del ganar: ", data);

			if (data == "-GANASTES-") {
				this.tituloDialogo = "GANADOR";
				this.mensajeDialogo = "FUISTE EL GANADOR 👏🏻👏🏻👏🏻 FELICIDADES!";
				this.displayDialog = true;
			}

			if (data == "-OTROGANADOR-") {
				this.tituloDialogo = "NO GANASTES";
				this.mensajeDialogo = "HUBO OTRO GANADOR :( ...sigue intentando";
				this.displayDialog = true;
			}

		});

		this.duracionanimacion = ((await this.srvConfigs.findAll().toPromise())[0].emisionBolas) - 500;
	}

	volver() {
		this.router.navigate(['partidas', this.idSalaPartida]);
	}

	ngOnDestroy(): void {
		this.srvSocket.leaveSala(this.idPartida);
		this.srvSocket.disconnect();
		if (this.sub) {
			this.sub.unsubscribe();
			this.sub = null;
		}
		if (this.sub2) {
			this.sub2.unsubscribe();
			this.sub2 = null;
		}
	}

	seCantoBingo(dataBingo) {
		//console.log("Bingo: ", dataBingo);
		//this.tituloDialogo = "BINGO";
		//this.displayDialog = true;
		dataBingo.idSala = this.idPartida;
		this.srvSocket.setBingo(dataBingo);
	}

	aceptarMesaje() {
		this.displayDialog = false;
		this.volver();
	}
}
