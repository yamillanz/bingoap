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
  });
  confirmationCode: number;
  showPassword: boolean;
  newUser: user = {};
  myDate = new Date();
  sendEmail = {email: '', 
              mensaje: ''};
  showForm: boolean = true;
  receivedCode: number;
  currentUser: user;
constructor(private fb: FormBuilder, private userAdmin: UserAdminService, private datePipe: DatePipe,  private router: Router) {

  this.newUserForm = this.fb.group({
    email: new FormControl( '', [
      Validators.required,
      Validators.email,
    ]),
    pass: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
    repeat_password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)])
  });
  this.newUserForm.get('repeat_password').setValidators(
    CustomValidators.equals(this.newUserForm.get('pass'))
  ); 
  


}
 ngOnInit() {
 
}
onSubmit() {
  console.warn(this.newUserForm);
  //need to verify if email exist

  //generate confirmation code for emial send
  this.confirmationCode = this.generateCode();
  //console.log('this code wil be sen for confirm', this. confirmationCode);
  //then hide form
  this.showForm = false;
  this.sendMail();

}

get email() { return this.newUserForm.get('email'); }

get pass() { return this.newUserForm.get('pass'); }

sendMail(){
  this.sendEmail = {email: this.newUserForm.value.email,
                    mensaje: `Bienvenido a nuestra plataforma; la seguridad es primero; copia el codigo acontinuación<br><span><strong>Confirmation Code: 
                    ${this.confirmationCode} </span><p>Moderna, segura y divertida; bienvenido</p>`};
 // console.log(this.sendEmail);
  this.userAdmin.mailer(this.sendEmail).toPromise()
    .then(res => {
      //console.log('revisa el email, confirma y regresa, tenemos q validar usuario');
    });
}

goLogin() {
  this.router.navigate(['/login'])
}
registerNextStep(){
  this.router.navigate(['/cliente'])
}

generateCode(){
  let min = 100000;
  let max = 500000;
  return Math.floor(Math.random()*(max-min+1)+min);
}

onConfirm(receivedCode){
  this.receivedCode = receivedCode;
  if(this.receivedCode == this.confirmationCode){
   return this.saveUser();
  }if(!this.receivedCode || (this.receivedCode != this.confirmationCode)){
    return alert('wrongCode checkyouremail')
  }
}

async saveUser(){

  this.newUser.email = this.newUserForm.value.email;
  this.newUser.pass = this.newUserForm.value.pass;
  this.newUser.fechaCreacion = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');// arrreglar ese espanglish
  this.newUser.activo = 0;
  this.newUser.emailValido = true;
  this.newUser.idCliente = 0;
  this.newUser.sesionActiva = 0;
  this.newUser.idRolUsuario = 0;
  this.newUser.tipo = 0;
  this.currentUser = await this.userAdmin.createUser(this.newUser).toPromise()
    if(this.currentUser.emailValido){
      const data = sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser))
      console.log('ladata que debeia estar en storage y retorna de guardar', data);
      this.registerNextStep();
    } 
  /* .then(res =>{
       //now save user tem data on local estorage
      this.newUser = res[0];
      sessionStorage.setItem('currentUser', JSON.stringify(this.newUser))
      //console.log( 'CREATED this user', this.newUser);
      //this.setDataonLS(this.newUser);
      this.newUser = {};
    });  */


  
}
//setDataonLS(newUser){
 // console.log('esto es loq entra a parsear con localstorage', newUser)
  //this.currentUser = sessionStorage.setItem('currentUser', JSON.stringify(newUser))
 //this.currentUser = localStorage.setItem('new User', newUser);
 //console.log('esto es lo del localestorage:', this.currentUser);
 //return this.currentUser;
//}

}



