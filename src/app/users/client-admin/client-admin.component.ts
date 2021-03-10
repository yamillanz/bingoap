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
import { Router } from '@angular/router';
import {listItems} from '../models/listItems';

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
  gender: listItems[];
  selectedGender: listItems;
  
  constructor(private fb: FormBuilder,
      private clientService: ClientAdminService,
      private datePipe: DatePipe,
      private router: Router
      ) {

        this.gender = [
          {label: 'Femenino', value: 'F'},
          {label: 'Masculino', value: 'M'},
          {label: 'Otro', value: 'O'}
        ];

    this.clientService.getCountryConde().toPromise()
      .then(res => {
          this.list = res;
          this.countries = this.list;
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
  }

  onSubmit(){
    console.log(this.clientAdminForm.value);
    //console.log('transformarFecha:', this.newClient.fechaNacimiento = this.datePipe.transform(this.clientAdminForm.value.fechaNacimiento, 'yyyy-MM-dd')); 
    this.newClient.idUsuario = this.currentUser.id;
    this.newClient = this.clientAdminForm.value;
    this.newClient.idPais = this.selectedCountry.id;
    this.newClient.fechaNacimiento = this.datePipe.transform(this.clientAdminForm.value.fechaNacimiento, 'yyyy-MM-dd');
    this.newClient.genero = this.selectedGender.value;
    //this.newClient.genero =  this.generoForm.value;
    this.saveChanges(this.newClient)
    
  }
   saveChanges(newClient: client){
     
    console.log('data cliente:', newClient);
    this.clientService.registerClient(newClient).toPromise()
    .then(res =>{
      console.log('updated client', res);
     let response: any = res
      this.updateUser(response.insertId)      
    });  
    
   }
   updateUser(id){
    this.clientService.updateUser(id).toPromise()
    .then( res => {
      console.log('updateduser', res);
      alert('succes, go to dashboard');
    });
    this.goToDashboard();
   }

   goToDashboard(){
    this.router.navigate(['/dashboard'])
   }
   setGender(){
     this.newClient.genero = this.selectedGender.value;
  }

}
