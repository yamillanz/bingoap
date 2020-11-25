import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SocketClientService extends Socket {

  private numbersGenerated$: Observable<string[]>;
  private msgToMe$: Observable<string>;

  constructor(/* private socket: Socket */) {
    super({ url: 'http://localhost:4001', options: {} });
    //this.disconnect();
    this.numbersGenerated$ = this.fromEvent<string[]>('msgToAllClients');
    this.msgToMe$ = this.fromEvent<string>('toOneClient');
    
  }

  getNumers() {
    /*   return this.numbersGenerated$.pipe(
        map((data)=>{console.log("Recibiendo: ", data)}) 
      ); */
    //this.connect();
    //this.numbersGenerated$ = this.fromEvent<string[]>('msgToAllClients');
    return this.numbersGenerated$;
    //this.emit()
  }

  getMessegeToMe(){
    return this.msgToMe$;
  }

  setBingo(data){
    this.emit("msgToServerBingo", data)
  }
}
