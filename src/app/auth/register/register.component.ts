import { 
  Validators, 
  FormGroup,
  FormBuilder 
} from '@angular/forms';
import {client} from '../../users/models/client';
import { Component, OnInit, NgModule } from '@angular/core';
import { CustomValidators } from './customValidator';
import { DatePipe } from '@angular/common';
import { user } from '../models/user'; // hay que revisar y unicar esos modelos de user, eso creo.
import { UserAdminService } from '../services/user-admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [DatePipe],
})


export class RegisterComponent implements OnInit {
  formGroup: FormGroup | null = null;

  showPassword: boolean;
  newUser: user = {};
  myDate = new Date();
constructor(private fb: FormBuilder, private userAdmin: UserAdminService, private datePipe: DatePipe) {
  this.formGroup = this.fb.group({
    email:  ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
    repeat_password: '',
  });

  this.formGroup.get('repeat_password').setValidators(
    CustomValidators.equals(this.formGroup.get('password'))
  );

/*   this.formGroup.get('password').setValidators(
    CustomValidators.equals(this.formGroup.get('email'))
  ); */
}
ngOnInit(): void {
}
onSubmit(user: user): void {
 // this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  this.newUser = user;
  console.log(this.newUser.email);
   this.newUser.pass = this.formGroup.get('password').value as string;
  // Tú lógica de negocio...

  //crea que hay que cahear la data del usuario, esperar la confirmacion del email para slavar la data
  
  this.userAdmin.mailer(this.newUser.email).toPromise().
  then(res => {
    console.log('revisa el email, confirma y regresa, tenemos q validar usuario');
  })
  //no se si lo hace el behavior subject
  this.newUser.activo = false;
  this.newUser.emailValido = false;
  this.newUser.fechaCreacion = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');; // arrreglar ese espanglish
  this.newUser.idCliente = 0;
  this.newUser.sesionActiva = true;
  this.newUser.tipo = 0;
  this.userAdmin.createUser(this.newUser).toPromise()
    .then(res =>{
      console.log(res, 'saving this user');
    });
}

}



