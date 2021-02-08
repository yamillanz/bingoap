import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'app-free-game',
	templateUrl: './free-game.component.html',
	styleUrls: ['./free-game.component.scss'],
	providers: [MessageService]
})
export class FreeGameComponent implements OnInit {

	cartonesComprar: number = 1;

	constructor(
		private messageService: MessageService,
		private router: Router,
		private route: ActivatedRoute,
	) { }

	ngOnInit(): void {
	}

	entrarPartida() {
		//let nrocartones: Element = document.getElementById('') as HTMLElement;
		
		//return true;

		if (this.cartonesComprar >= 1) {
			console.log("cartones", this.cartonesComprar);
			this.router.navigate(['myfreegame'], { queryParams:{cartones: this.cartonesComprar}, relativeTo: this.route, skipLocationChange: true });
		}
		else {
			this.messageService.add({ key: 'tc', severity: 'warn', summary: '', detail: 'Ingrese la cantidad de cartones' });
		}

	}

}
