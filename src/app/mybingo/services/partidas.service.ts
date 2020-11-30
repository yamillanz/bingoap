import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Partidas } from '../models/partidas';

@Injectable({
	providedIn: 'root'
})
export class PartidasService {

	constructor(private http: HttpClient) { }

	findAll() {
		return this.http.get<Partidas[]>('http://localhost:3000/partidas');
	}

}
