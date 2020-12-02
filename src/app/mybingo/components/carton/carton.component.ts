import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { rando, randoSequence } from '@nastyox/rando.js';

@Component({
	selector: 'app-carton',
	templateUrl: './carton.component.html',
	styleUrls: ['./carton.component.scss']
})
export class CartonComponent implements OnInit/* , OnChanges */ {

	@Input() id: string;
	@Input() numerosSorteados: string[];
	@Output() datosBingoCantado: EventEmitter<{}> = new EventEmitter<{}>();

	bingoEsteCarton: any = false;
	columns: string[] = ["B", "I", "N", "G", "O"];
	rowsB: string[] = []; // randoSequence(1, 15);
	rowsI: string[] = [];
	rowsN: string[] = [];
	rowsG: string[] = [];
	rowsO: string[] = [];
	posSegmeno: number = rando(9);
	matrizCarton: any[] = [
		["-1", "-2", "-3", "-4", "-5"],
		["-10", "-20", "-30", "-40", "-50"],
		["-11", "-12", "-13", "-14", "-15"],
		["-31", "-21", "-41", "-51", "-61"],
		["-66", "-55", "-44", "-33", "-22"]
	];
	celda: HTMLElement;
	marcadosYasalieron: string[] = [];
	macheteadoID: string[] = [];
	macheteadoDI: string[] = [];
	comodin: string = "&";

	constructor() { }

	arrayContainsArray(superset, subset) {
		if (0 === subset.length || superset.length < subset.length) {
			return false;
		}
		return !subset.some(function (value) {
			return superset.indexOf(value) < 0;
		});
	}

	initNumbers() {
		return new Promise((resolve, reject) => {
			this.rowsB = randoSequence(1, 15).splice(this.posSegmeno, 5);
			this.rowsI = randoSequence(16, 30).splice(this.posSegmeno, 5);
			this.rowsN = randoSequence(31, 45).splice(this.posSegmeno, 5);
			this.rowsG = randoSequence(46, 60).splice(this.posSegmeno, 5);
			this.rowsO = randoSequence(61, 75).splice(this.posSegmeno, 5);
			for (const fila in this.matrizCarton) {
				this.matrizCarton[fila][0] = this.rowsB[fila];
				this.matrizCarton[fila][1] = this.rowsI[fila];
				this.matrizCarton[fila][2] = this.rowsN[fila];
				this.matrizCarton[fila][3] = this.rowsG[fila];
				this.matrizCarton[fila][4] = this.rowsO[fila];
			}
			this.matrizCarton[2][2] = this.comodin;
			resolve(this.matrizCarton);

		});
		/* 	console.log("rowsB", this.rowsB);
			console.log("rowsI", this.rowsI);
			console.log(this.matrizCarton); */
		//this.rowsB = this.rowsB.splice(this.posSegmeno, 5);
		//this.rowsI = this.rowsI.splice(this.posSegmeno, 5);
	}

	cargarMacheteados() {
		for (const fila in this.matrizCarton) {
			for (const col in this.matrizCarton[fila]) {
				if (fila == col) { this.macheteadoID = [... this.macheteadoID, this.matrizCarton[fila][col]] }
			}
		}

		let fila = this.matrizCarton[0].length - 1;
		let col = 0;
		while (col < this.matrizCarton[0].length) {
			this.macheteadoDI = [... this.macheteadoDI, this.matrizCarton[fila][col]];
			fila--; col++;
		}
	}

	findInMatrix(elemento: string): string {
		let esta = "";
		for (const fila of this.matrizCarton) {
			esta = fila.find(numero => numero == elemento);
			if (esta) { console.log("consigio: ", esta); return esta; }
		}
		return esta;
	}


	filaClickeada(filaP: number) {
		let fila: string[] = [];
		for (let i = 0; i < 5; i++) {
			fila = [...fila, this.matrizCarton[filaP][i]];
		}
		//console.log(fila);
		//console.log(filaP);
		return fila;

	}

	colClickeada(colP: number) {
		let col: string[] = [];
		for (let i = 0; i < 5; i++) {
			col.push(this.matrizCarton[i][colP])
		}
		return col;
	}

	marcadosVsPatrones(celdaclick: string, filaP: number, colP: number) {

		const filaClick: string[] = this.filaClickeada(filaP);
		let todosFila = this.arrayContainsArray(this.marcadosYasalieron, filaClick);
		//console.log(todosFila);
		if (todosFila) { return "BINGO-F" }

		const colClick: string[] = this.colClickeada(colP);
		let todosCol = this.arrayContainsArray(this.marcadosYasalieron, colClick);
		//console.log(todosCol);
		if (todosCol) { return "BINGO-C" }

		let diagonalID = this.arrayContainsArray([... this.marcadosYasalieron, this.comodin], this.macheteadoID);
		//console.log(diagonalID);
		if (diagonalID) { return "BINGOD-ID" }

		let diagonalDI = this.arrayContainsArray([... this.marcadosYasalieron, this.comodin], this.macheteadoDI);
		//console.log(diagonalDI);
		if (diagonalDI) { return "BINGOD-DI" }

		return false;
	}

	//set cantaronBingo(data){}

	async ngOnInit() {
		await this.initNumbers();
		this.cargarMacheteados();
		//console.log("macheteados: ", this.macheteadoID, this.macheteadoDI);
		//this.findInMatrix("3");
		/* 	const consiguio = this.findInMatrix("3");
			console.log("retorno: ", consiguio); */

	}
	marcarBola(celdaP: string, fila, col) {
		if (!(fila == "2" && col == "2")) {
			this.celda = document.getElementById(celdaP) as HTMLElement;
			//console.log("id celda: ", celdaP);
			//console.log("valor: ", celdaP.substring(celdaP.indexOf("-") + 1, celdaP.length));
			//console.log("valor: ", this.matrizCarton[fila][col]);
			const sisalio = this.numerosSorteados.find(elemento => elemento == celdaP.substring(celdaP.indexOf("-") + 1, celdaP.length));

			//console.log("salio: ", );
			if (this.celda.className != 'touched'  && sisalio ) {
				this.celda.className = 'touched';
				this.marcadosYasalieron = [... this.marcadosYasalieron, this.matrizCarton[fila][col]];
				this.bingoEsteCarton = this.marcadosVsPatrones(this.matrizCarton[fila][col], fila, col);
				//console.log("Canto: ", this.bingoEsteCarton);

				//this.marcadosVsPatrones(this.matrizCarton[fila][col], fila, col);
				//this.findInMatrix("3");
			}
		}


	}

	cantarBingo() {
		if (this.bingoEsteCarton) {
			//console.log("Canto: ", this.bingoEsteCarton);
			this.datosBingoCantado.emit({ nroCarton: this.id, modoBingo: this.bingoEsteCarton, numsBingo: this.marcadosYasalieron });
		}
	}

	/* ngOnChanges(changes: SimpleChanges) {
		//console.log("Salieron Carton: ", changes.numerosSorteados.currentValue);
		//console.log("Salieron Carton: ", this.numerosSorteados);

	} */

}
