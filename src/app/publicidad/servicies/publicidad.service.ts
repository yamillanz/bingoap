import { Publicidad } from './../models/publicidad';
import { environment } from '../../../../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class PublicidadService {

	constructor(private http: HttpClient) { }

	getAll() {
		return this.http.get<Publicidad[]>(`${environment.apiPublicidad}`);
		//return this.http.get<Publicidad[]>(`http://localhost:3011/publicidad`); 
	}

	savePublicidad(publi :Publicidad){
		return this.http.post<Publicidad>(`${environment.apiPublicidad}`, publi);
	}

	updatePublicidad(id: number, publi :Publicidad){
		return this.http.put(`${environment.apiPublicidad}/${id}`, publi);
	}

	subirImagenPublicidad(id: number, imagen){
		return this.http.post(`${environment.apiSubirImgPublicidad}/${id}`, imagen);
	}

	removePublicidad(id: number){
		return this.http.delete(`${environment.apiPublicidad}/${id}`);
	}

}
