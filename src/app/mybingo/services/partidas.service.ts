import { PartidasUsers } from './../models/partidas-users';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Partidas } from '../models/partidas';


@Injectable({
	providedIn: 'root'
})
export class PartidasService {

	constructor(private http: HttpClient) { }

	findAll() {
		return this.http.get<Partidas[]>(environment.apiUrlPartidas);
	}

  /* findAllByDealer(idDealerPartida: string) {
    return this.http.get<Partidas[]>(`environment.apiUrlPartidas + /by-dealer/${idDealerPartida}`);
  } */

  findAllByDealer(idDealerPartida: number) : Observable<Partidas[]>{
    const url = (`${environment.apiUrlPartidas}/by-dealer/${idDealerPartida}`);
    console.log(url)
    return this.http.get<Partidas[]>(url)
  }

  findAllEstatusPartidas() {
		return this.http.get<Partidas[]>(environment.apiUrlPartidas + `/estatus`);
	}

	findToPlay(idSala: string) {
		return this.http.get<Partidas[]>(environment.apiUrlPartidas + `/parajugar/${idSala}`);
	}

	ingresarUsuarioAlaPartida(partidaUser : PartidasUsers){
		return this.http.post(environment.apiUrlPartidasUsers, partidaUser);
	}

	cambiarEstadoPartida(partidaUser : Partidas){
		return this.http.put(`${environment.apiUrlPartidas}/${partidaUser.id}`, partidaUser);
	}

  savePartida(newPartida): Observable<Partidas> {
    console.log(newPartida);
    return this.http.post(`${environment.apiUrlPartidas}`, newPartida);
  }

}
