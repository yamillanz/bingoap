import { 
  Validators,
  FormBuilder, 
  FormControl,
  FormGroup
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomValidators } from './customValidator';
import { DatePipe } from '@angular/common';
import { user } from '../models/user.model'; 
import { UserAdminService } from '../services/user-admin.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [DatePipe],
})


export class RegisterComponent implements OnInit {

  newUserForm = new FormGroup({
    //pass:  new FormControl(''),
    //email: new FormControl(''),
    //repeat_password: new FormControl('')
  });
  
  showPassword: boolean;
  newUser: user = {};
  myDate = new Date();
  sendEmail = {email: '', 
              mensaje: ''};
constructor(private fb: FormBuilder, private userAdmin: UserAdminService, private datePipe: DatePipe,  private router: Router) {


  this.newUserForm = this.fb.group({
    email: new FormControl( '', [
      Validators.required,
      Validators.email,
    ]),
    pass: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
    repeat_password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)])
  });
  /* this.newUserForm.get('repeat_password').setValidators(
    CustomValidators.equals(this.newUserForm.get('password'))
  );  */
  


}
 ngOnInit() {
 
}
onSubmit() {
  console.warn(this.newUserForm);
  //this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  
  //this.newUser.pass = this.newUserForm.get('pass').value as string;
  // Tú lógica de negocio...

  //crea que hay que cahear la data del usuario, esperar la confirmacion del email para slavar la data
  //this.email = this.newUser.email;
 this.sendMail();
  //no se si lo hace el behavior subject
  this.newUser.email = this.newUserForm.value.email;
  this.newUser.pass = this.newUserForm.value.pass;
  this.newUser.fechaCreacion = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');; // arrreglar ese espanglish
  this.newUser.activo = 0;
  this.newUser.emailValido = false;
  this.newUser.idCliente = 0;
  this.newUser.sesionActiva = 0;
  this.newUser.idRolUsuario = 0;
  this.newUser.tipo = 0;
  this.userAdmin.createUser(this.newUser).toPromise()
    .then(res =>{
      console.log(res, 'saving this user');
      this.newUser = {};
    }); 

  this.registerNextStep();
}

get email() { return this.newUserForm.get('email'); }

get pass() { return this.newUserForm.get('pass'); }

sendMail(){
  this.sendEmail = {email: this.newUserForm.value.email,
                    mensaje: '<p>Moderna, segura y divertida; bienvenido</p>'};
  console.log(this.sendEmail);
  this.userAdmin.mailer(this.sendEmail).toPromise()
    .then(res => {
      console.log('revisa el email, confirma y regresa, tenemos q validar usuario');
    });
}

goLogin() {
  this.router.navigate(['/login'])
}
registerNextStep(){
  this.router.navigate(['/cliente'])
}

}



