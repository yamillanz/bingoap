import { PartidasService } from './../../services/partidas.service';
import { Partidas } from './../../models/partidas';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
	selector: 'app-partidas',
	templateUrl: './partidas.component.html',
	styleUrls: ['./partidas.component.scss']
})
export class PartidasComponent implements OnInit {

	partidas: Partidas[] = [];

	constructor(private srvPartidas: PartidasService,
		private router: Router,
		private route: ActivatedRoute) { }

	async ngOnInit() {
		this.partidas = await this.srvPartidas.findAll().toPromise()
		//console.log("partdias: ", this.partidas);

	}

	entrarPartida(partidap: Partidas) {
		console.log(partidap);
		this.router.navigate(['mybingo'], { relativeTo: this.route, skipLocationChange: true });
	}

}
