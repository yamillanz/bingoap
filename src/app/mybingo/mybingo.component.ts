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
	nroCartones = Array(3).fill(3).map((x,i)=>i); // [0,1,2,3,4]
	numerosYaSalieron: string[] = [];
	private sub: Subscription;

	constructor(private srvNumberGen: SocketClientService) { }


	ngOnInit(): void {
		//this.numero = "B 14";
		/* this.sub = this.srvNumberGen.getNumers().subscribe((data) => {
			console.log("Rec desde SERVER: ", data);
			this.numero = data.toString();
			//this.numerosYaSalieron.push(this.numero);
			this.numerosYaSalieron = [... this.numerosYaSalieron, this.numero.split(" ").join("")];
			//console.log("Ya salieron");
			
			//this.porcentaje = 100;
			this.porcentaje = (Math.round(Math.random() * 100)) + 100;
		}); */
		//this.numerosBingo$ = this.srvNumberGen.getNumers();
		/* setInterval(() => {
			//this.porcentaje =
			//this.porcentaje = 0;
			this.numero = (Math.round(Math.random() * 100)).toString();
			this.porcentaje = (Math.round(Math.random() * 100)) + 100;
		}, 5000) */
	}
	ngOnDestroy(): void {
		if (this.sub) {
			this.sub.unsubscribe();
		}
	}
}
