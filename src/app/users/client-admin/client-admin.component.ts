import { 
  Validators,
  FormBuilder, 
  FormControl,
  FormGroup
} from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { client } from '../models/client';
import { ClientAdminService } from '../services/client-admin.service';
import { countryList } from '../models/country';
import { user } from '../models/user.model';

@Component({
  selector: 'app-client-admin',
  templateUrl: './client-admin.component.html',
  styleUrls: ['./client-admin.component.scss'],
  providers:[DatePipe],
})
export class ClientAdminComponent implements OnInit {
  clientAdminForm = new FormGroup({});
  generoForm = new FormGroup({});
  //myBirthday = new Date();
  newClient: client = {};
  newUser: user;
  myDate = new Date();
  selectedCountry: countryList;
  list: any
  countries: countryList[];
  currentUser: user;
  
  constructor(private fb: FormBuilder,
      private clientService: ClientAdminService,
      private datePipe: DatePipe
      ) {

    this.clientService.getCountryConde().toPromise()
      .then(res => {
        //console.log(res);
          this.list = res;
          this.countries = this.list;
          //this.countries = this.list.foreach(l=>{l.map(nombre = l.nombre, idPais = l.id)});
        //console.log(this.countries);
      })
    
  
    this.clientAdminForm = this.fb.group({
      nombreCompleto: new FormControl( '', [Validators.required]),
      nickname: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('',[Validators.required]),
      idPais: new FormControl('', [Validators.required]),
      genero: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    console.log(this.currentUser, 'ON INIT');
  }

  onSubmit(){
    console.log(this.clientAdminForm.value.fechaNacimiento);
    console.log('transformarFecha:', this.newClient.fechaNacimiento = this.datePipe.transform(this.clientAdminForm.value.fechaNacimiento, 'yyyy-MM-dd')); 
    this.newClient.idUsuario = this.currentUser.id;
    this.newClient = this.clientAdminForm.value;
    this.newClient.idPais = this.selectedCountry.id;
    this.newClient.fechaNacimiento = this.datePipe.transform(this.clientAdminForm.value.fechaNacimiento, 'yyyy-MM-dd');
    //this.newClient.genero =  this.generoForm.value;
 
    console.log('data cliente:', this.newClient);
    this.clientService.registerClient(this.newClient).toPromise()
    .then(res =>{
      console.log(res);
      alert('succes, go to dashboard');
    });  
    
  }
   updateUser(){

   }

  }


