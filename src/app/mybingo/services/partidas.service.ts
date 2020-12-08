import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Partidas } from '../models/partidas';


@Injectable({
	providedIn: 'root'
})
export class PartidasService {

	constructor(private http: HttpClient) { }

	findAll() {
		return this.http.get<Partidas[]>(environment.apiUrlPartidas);
	}

	findToPlay(idSala: string) {
		return this.http.get<Partidas[]>(environment.apiUrlPartidas + `/parajugar/${idSala}`);
	}

}
