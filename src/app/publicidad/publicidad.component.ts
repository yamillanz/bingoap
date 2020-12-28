import { PublicidadService } from './servicies/publicidad.service';
import { Publicidad } from './models/publicidad';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';

@Component({
	selector: 'app-publicidad',
	templateUrl: './publicidad.component.html',
	styleUrls: ['./publicidad.component.scss']
})
export class PublicidadComponent implements OnInit {

	listPublicidad: Publicidad[] = [];
	apiPublicidad = environment.apiPublicidad;
	subirImg: string = environment.apiSubirImgPublicidad;
	publiVentana: boolean = false;

	imagenEnMemoria = null;

	publicidad: Publicidad = null;

	constructor(private srvPublicidad: PublicidadService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService) { }

	async ngOnInit() {
		//this.listPublicidad = await this.srvPublicidad.getAll().toPromise();
		await this.cargarListado();
	}

	async cargarListado() {
		this.listPublicidad = [...await this.srvPublicidad.getAll().toPromise()];
	}

	editProduct(publicidad: Publicidad) {
		this.publicidad = { ...publicidad };
		this.publicidad.activo = this.publicidad.activo == 1 ? true : false;
		this.publiVentana = true;
	}

	

	openNew() {
		this.publicidad = {};
		this.publiVentana = true;
	}

	hideDialog() {
		this.publiVentana = false;
		this.publicidad = null;
	}

	async saveProduct() {
		if (this.publicidad.id) {
			this.publicidad.activo = this.publicidad.activo ? 1 : 0;
			if (this.imagenEnMemoria) {
				this.imagenEnMemoria.url = this.subirImg + '/' + this.publicidad.id;
				await this.imagenEnMemoria.upload();
			}
			await this.srvPublicidad.updatePublicidad(this.publicidad.id, this.publicidad).toPromise();
			await this.cargarListado();
			this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Publicidad Actualizada', life: 2000 });
		} else {
			this.publicidad.activo = this.publicidad.activo ? 1 : 0;
			let newPubli: Publicidad = await this.srvPublicidad.savePublicidad(this.publicidad).toPromise();	
			if (this.imagenEnMemoria) {
				this.imagenEnMemoria.url = this.subirImg + '/' + newPubli.id;
				await this.imagenEnMemoria.upload();
				await this.cargarListado();
			}
			await this.cargarListado();
			this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Publicidad Creada', life: 2000 });
		}

		this.publiVentana = false;
		this.imagenEnMemoria = null;
		
	}

	async deleteProduct(publicidad: Publicidad) {
		let result = await this.srvPublicidad.removePublicidad(publicidad.id).toPromise();
		console.log(result);
		
		this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Publicidad Borrada', life: 2000 });
		this.cargarListado();
	 }


	alSeleccionar(e, file: FileUpload) {
		this.imagenEnMemoria = file;
	}

	despuesCarga(e) {
		/* if (e.currentFiles[0].name) {
			//this.publicidad.imagen = e.currentFiles[0].name;
			this.imagenEnMemoria = e.files[0];
		}*/
		console.log("files", e.files);
	}

}
