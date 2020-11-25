import { SocketClientService } from './services/socket-client.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';

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
	nroCartones = [0, 1, 2]; // Array(3).fill(3).map((x, i) => i);
	numerosYaSalieron: string[] = [];
	//private sub : Subject<any> = new Subject(); //Subscription;
	private sub: Subscription; //;
	tituloDialogo: string = "";
	displayDialog: boolean = false;
	displayDialogTermino: boolean = false;
	mensajeDialogo : string = "";
	constructor(private srvSocket: SocketClientService) { }


	ngOnInit(): void {
		//this.numero = "B 14";
		/* this.sub = this.srvNumberGen.getNumers().subscribe((data) => {
			console.log("Rec desde SERVER: ", data);
			this.numero = data.toString();
			//this.numerosYaSalieron.push(this.numero);
			this.numerosYaSalieron = [... this.numerosYaSalieron, this.numero.split(" ").join("")];
			//console.log("Ya salieron");
			this.porcentaje = (Math.round(Math.random() * 100)) + 100;
		}); */
		//this.numerosBingo$ = this.srvNumberGen.getNumers();
		/* setInterval(() => {
			//this.porcentaje =
			//this.porcentaje = 0;
			this.numero = (Math.round(Math.random() * 100)).toString();
			this.porcentaje = (Math.round(Math.random() * 100)) + 100;
		}, 5000) */
		this.srvSocket.getMessegeToMe().subscribe((data) => {
			console.log("Recibe del ganar: ", data);
			
			if (data == "-GANASTES-") {
				this.tituloDialogo = "GANDADOR";
				this.mensajeDialogo = "FUISTE EL GANADOR";
				this.displayDialog = true;
			}

			if (data == "-OTROGANADOR-") {
				this.tituloDialogo = "NO GANASTES";
				this.mensajeDialogo = "HUBO OTRO GANADOR :( ...sigue intentando";
				this.displayDialog = true;
			}

		})
	}
	ngOnDestroy(): void {
		if (this.sub) {
			this.sub.unsubscribe();
		}
	}

	seCantoBingo(dataBingo) {
		console.log("Bingo: ", dataBingo);
		//this.tituloDialogo = "BINGO";
		//this.displayDialog = true;
		this.srvSocket.setBingo(dataBingo);
		//TODO: 
		//Mensaje Socket al servidor
		//Registrar en la BD 
	}
}
