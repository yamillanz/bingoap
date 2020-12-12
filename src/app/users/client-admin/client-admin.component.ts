import { 
  Validators,
  FormBuilder, 
  FormControl,
  FormGroup
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { client } from '../models/client'

@Component({
  selector: 'app-client-admin',
  templateUrl: './client-admin.component.html',
  styleUrls: ['./client-admin.component.scss']
})
export class ClientAdminComponent implements OnInit {
  clientAdminForm = new FormGroup({});
  generoForm = new FormGroup({});
  myBirthday = new Date;
  newClient: client = {};
  
  selectedCountry: string;
  countries: any[];
  
  constructor(private fb: FormBuilder) {
    this.countries = [
      {name: 'Australia', code: 'AU'},
      {name: 'Brazil', code: 'BR'},
      {name: 'China', code: 'CN'},
      {name: 'Egypt', code: 'EG'},
      {name: 'France', code: 'FR'},
      {name: 'Germany', code: 'DE'},
      {name: 'India', code: 'IN'},
      {name: 'Japan', code: 'JP'},
      {name: 'Spain', code: 'ES'},
      {name: 'United States', code: 'US'}
  ];
  
    this.clientAdminForm = this.fb.group({
      nombreCompleto: new FormControl( '', [Validators.required]),
      nickname: new FormControl(''),
      fechaNacimiento: new FormControl(''),
      idPais: new FormControl(''),
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit(){
    console.log(this.clientAdminForm);
  }
}
