import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { rando, randoSequence } from '@nastyox/rando.js';

@Component({
	selector: 'app-myfreegame',
	templateUrl: './myfreegame.component.html',
	styleUrls: ['./myfreegame.component.scss']
})
export class MyfreegameComponent implements OnInit, OnDestroy {

	nroCartones: number[];
	numero: string = "   ";
	porcentaje: number = 0;
	secuenciaJuego: number[] = randoSequence(1, 75);
	numerosYaSalieron: string[] = [];

	intervalo = null;

	tituloDialogo: string = "";
	displayDialog: boolean = false;
	mensajeDialogo: string = "";
	constructor(
		private router: Router,
		private route: ActivatedRoute,
	) { }

	ngOnDestroy(): void {
		this.intervalo && clearInterval(this.intervalo);
	}

	ngOnInit(): void {
		const nrocartonesParam: string = this.route.snapshot.queryParams.cartones;
		console.log("generado", nrocartonesParam);
		this.nroCartones = [...Array(parseInt(nrocartonesParam)).keys()];
		this.intervalo = setInterval(() => {
			if (this.secuenciaJuego.length > 0) {
				this.numero = "";
				let emitido = this.secuenciaJuego.splice(0, 1)[0];
				if (emitido >= 1 && emitido <= 15) { this.numero = "B " + emitido };
				if (emitido >= 16 && emitido <= 30) { this.numero = "I " + emitido };
				if (emitido >= 31 && emitido <= 45) { this.numero = "N " + emitido };
				if (emitido >= 46 && emitido <= 60) { this.numero = "G " + emitido };
				if (emitido >= 61 && emitido <= 75) { this.numero = "O " + emitido };

				this.porcentaje = (Math.round(Math.random() * 100)) + 100;
				console.log(this.numerosYaSalieron);
				this.numerosYaSalieron = [... this.numerosYaSalieron, this.numero.split(" ").join("")];
			} else {
				this.tituloDialogo = "SIN GANADOR";
				this.mensajeDialogo = "No hubo ganador en esta partida";
				this.displayDialog = true;
				clearInterval(this.intervalo);
				this.intervalo = null;
			}

		}, 12000);

	}
	seCantoBingo(e) {
		this.tituloDialogo = "FELICIDADES!!!!";
		this.mensajeDialogo = "Ganaste la partida...felictaciones";
		this.displayDialog = true;
		clearInterval(this.intervalo)
	}

	aceptarMesaje(){
		this.displayDialog = false;
	}

	volver() {
		this.router.navigate(['dashboard/freegame']);
	}

}
