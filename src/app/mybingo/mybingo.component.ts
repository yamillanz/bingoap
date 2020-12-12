import { Router, ActivatedRoute } from '@angular/router';
import { SocketClientService } from './services/socket-client.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-mybingo',
	templateUrl: './mybingo.component.html',
	styleUrls: ['./mybingo.component.scss']
})
export class MybingoComponent implements OnInit, OnDestroy {

	//numerosBingo$ : Observable<number[]>;
	numero: string = "   ";
	porcentaje: number = 0;
	idPartidaUsuario: string = "0-0";
	//nroCartones = [0, 1, 2]; // Array(3).fill(3).map((x, i) => i);
	nroCartones: number[];
	numerosYaSalieron: string[] = [];
	//private sub : Subject<any> = new Subject(); //Subscription;
	private sub: Subscription; //;
	private sub2: Subscription; //;

	tituloDialogo: string = "";
	displayDialog: boolean = false;
	displayDialogTermino: boolean = false;
	mensajeDialogo: string = "";
	erroresServer: number = 0;
	esperando = 1;

	idSala: string = "";

	constructor(private srvSocket: SocketClientService,
		private router: Router,
		private route: ActivatedRoute) {
		this.srvSocket.errores.subscribe((error) => {
			if (error != "") {
				console.log("se murio");
				this.erroresServer = 1;
				this.tituloDialogo = "UPS!!! Problemas de conección";
				this.mensajeDialogo = "Existen problemas de conección con el servidor, revisa tu internet o intentalo mas tarde";
				this.displayDialog = true;
			}
		});
	}


	ngOnInit(): void {
		//this.srvSocket.connect();
		//this.numero = "B 14";
		this.route.queryParams
			.pipe(first())
			.subscribe(params => {
				// Defaults to 0 if no query param provided.

				this.nroCartones = [...Array(parseInt(params.nrocartones)).keys()]; //Array(params.nrocartones).fill(params.nrocartones).map((x, i) => i); //params.nrocartones;
				console.log("generados : ", params.nrocartones);
				this.idSala = params.idSala;
				this.srvSocket.enjoySala(this.idSala);
			});

		
		this.sub = this.srvSocket.getNumers().subscribe((data) => {
			console.log("Rec desde SERVER: ", data);
			this.esperando = 0;
			this.numero = data.toString();
			//this.numerosYaSalieron.push(this.numero);
			this.numerosYaSalieron = [... this.numerosYaSalieron, this.numero.split(" ").join("")];
			//console.log("Ya salieron");
			this.porcentaje = (Math.round(Math.random() * 100)) + 100;
		});
		//this.numerosBingo$ = this.srvNumberGen.getNumers();
		/* setInterval(() => {
			//this.porcentaje =
			//this.porcentaje = 0;
			this.numero = (Math.round(Math.random() * 100)).toString();
			this.porcentaje = (Math.round(Math.random() * 100)) + 100;
		}, 5000) */
		this.sub2 = this.srvSocket.getMessegeToMe().subscribe((data) => {
			//console.log("Recibe del ganar: ", data);

			if (data == "-GANASTES-") {
				this.tituloDialogo = "GANDADOR";
				this.mensajeDialogo = "FUISTE EL GANADOR FELICIDADES!";
				this.displayDialog = true;
			}

			if (data == "-OTROGANADOR-") {
				this.tituloDialogo = "NO GANASTES";
				this.mensajeDialogo = "HUBO OTRO GANADOR :( ...sigue intentando";
				this.displayDialog = true;
			}

			if (data == "-NOGANADOR-") {
				this.tituloDialogo = "SIN GANADOR";
				this.mensajeDialogo = "Ningun ganador esta vez...sigue intentando";
				this.displayDialog = true;
			}

		})
	}

	volver() {
		this.router.navigate(['partidas', this.idSala]);
	}

	ngOnDestroy(): void {
		this.srvSocket.leaveSala(this.idSala);
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
		dataBingo.idSala = this.idSala;
		this.srvSocket.setBingo(dataBingo);
		//this.srvSocket.connect();
		//TODO: 
		//Mensaje Socket al servidor
		//Registrar en la BD 
	}
}
