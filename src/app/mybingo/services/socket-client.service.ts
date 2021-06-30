import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
//import { map } from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
})
export class SocketClientService extends Socket {

	private numbersGenerated$: Observable<string[]>;
	private msgToMe$: Observable<string>;
	errores: BehaviorSubject<string> = new BehaviorSubject("");

	constructor(/* private socket: Socket */) {

		/* super({ url: 'http://localhost:4001', options: { reconnection: true, reconnectionAttempts: 1 } }); */
		super({ url: 'http://192.168.1.105:4001', options: { reconnection: true, reconnectionAttempts: 1 } });
		//super({ url: ''});
		this.on('connect_error', () => {
			console.log("fundio");
			this.errores.next("no-conect-error");
		});
		this.on('error', (error) => {
			//console.log('WS: Error!');
			this.errores.next("error");
		});

		//this.disconnect();
		/* 		this.numbersGenerated$ = this.fromEvent<string[]>('msgToAllClients');
				this.msgToMe$ = this.fromEvent<string>('toOneClient'); */

		/* 
				this.numbersGenerated$ = this.socket.fromEvent<string[]>('msgToAllClients');
				this.msgToMe$ = this.socket.fromEvent<string>('toOneClient'); */

	}


	getNumers() {
		//this.numbersGenerated$ = this.fromEvent<string[]>('msgToAllClients');
		this.numbersGenerated$ = this.fromEvent<string[]>('msgToMySala');
		return this.numbersGenerated$;

	}

	getMessegeToMe() {
		this.msgToMe$ = this.fromEvent<string>('toOneClient');
		return this.msgToMe$;
	}

	enjoySala(idSala){
		this.emit("enjoySala", idSala);//
	}

	leaveSala(idSala){
		this.emit("leaveSala", idSala);
	}

	setBingo(data) {
		this.emit("msgToMySala", data)
	}
}
