import { ConfigsGene } from './../models/configs-gene';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ConfigsGeneService {

	constructor(private http: HttpClient) { }

	findAll() {
		return this.http.get<ConfigsGene[]>(environment.apiConfig);
	}

}
