import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { Publicidad } from './../models/publicidad';
import { PublicidadService } from './../servicies/publicidad.service';
import { MessageService } from 'primeng/api';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
	selector: 'app-publi-toast',
	templateUrl: './publi-toast.component.html',
	styleUrls: ['./publi-toast.component.scss'],
	providers: [MessageService]
})
export class PubliToastComponent implements OnInit, OnDestroy {

	@Input() show: boolean;
	@Input() idPublicidad: number;

	intervalo = null;
	dataPublicidad: Publicidad = null;
	apiPublicidad = environment.apiPublicidad;
	tiempoVista: number = 10000;

	constructor(private messageService: MessageService,
		private svrPublicidad: PublicidadService,
		private route: Router) { }

	async ngOnInit() {
		this.dataPublicidad = await this.svrPublicidad.findOpnePublicidad(this.idPublicidad).toPromise();
		if (this.dataPublicidad && this.show) {
			this.messageService.add({ key: 'c', severity: 'info', summary: `${this.dataPublicidad.titulo}`, detail: `${this.dataPublicidad.imagen}`, life: this.tiempoVista });
			//this.intervalo = setInterval(() => { this.show = false }, 10000) 
		}
	}

	vamos() {
		window.open("//" + this.dataPublicidad.url, '_blank');
	}

	onReject() {
		this.show = false;
	}

	ngOnDestroy() {
		/* 	if (this.intervalo) {
				this.intervalo = null;
			} */
	}
}
