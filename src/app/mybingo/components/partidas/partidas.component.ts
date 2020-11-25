import { PartidasService } from './../../services/partidas.service';
import { Partidas } from './../../models/partidas';
import { Component, OnInit } from '@angular/core';


@Component({
	selector: 'app-partidas',
	templateUrl: './partidas.component.html',
	styleUrls: ['./partidas.component.scss']
})
export class PartidasComponent implements OnInit {

	partidas: Partidas[] = [];

	constructor(private srvPartidas: PartidasService) { }

	async ngOnInit() {
		this.partidas = await this.srvPartidas.findAll().toPromise()
		console.log("partdias: ", this.partidas);
		
	}

}
