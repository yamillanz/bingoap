import { Router } from '@angular/router';
import { user } from '../models/user.model';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MyValidations } from '../register/customValidator';
import { UsersService } from '../services/users.service';

@Component({
	selector: 'app-forgotpass',
	templateUrl: './forgotpass.component.html',
	styleUrls: ['./forgotpass.component.scss'],
	providers: [MessageService]
})
export class ForgotpassComponent implements OnInit, OnDestroy {

	forgotForm = new FormGroup({})
	formResetPass = new FormGroup({});
	sendEmail = {
		email: '',
		mensaje: ''
	};

	showCodigo: boolean = false;
	showReset: boolean = false;
	confirmationCode: number = -1;

	subCambioLetras$: Subscription;

	constructor(private fb: FormBuilder,
		private srvUser: UsersService,
		private messageService: MessageService,
		private router: Router
	) {
		this.forgotForm = this.fb.group({
			email: new FormControl('', [Validators.required, Validators.email,]),
			codigoRecived: new FormControl(''),
		});


	}


	get email() { return this.forgotForm.get(`email`) }
	get codigoRecived() { return this.forgotForm.get(`codigoRecived`) }

	get pass() { return this.formResetPass.get('pass'); }
	get repeat_password() { return this.formResetPass.get('repeat_password'); }


	generateCode() {
		let min = 10000;
		let max = 50000;
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		if (this.subCambioLetras$) {
			this.subCambioLetras$.unsubscribe();
			this.subCambioLetras$ = null;			
		}
	}

	crearFormReset() {
		this.showReset = true;
		this.formResetPass = this.fb.group({
			pass: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15),]),
			repeat_password: new FormControl(''),
		});

		this.formResetPass.get('repeat_password').setValidators(
			[
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(15),
				MyValidations.equalsValidator(this.formResetPass.get('pass')),
			]
		);
		this.formResetPass.get('repeat_password').updateValueAndValidity();
	}

	solicitarCodigo() {
		this.showCodigo = true;
		this.confirmationCode = this.generateCode();
		this.codigoRecived.setValidators([Validators.required, MyValidations.equalsCodigo(this.confirmationCode.toString())]);
		this.codigoRecived.updateValueAndValidity();
		this.subCambioLetras$ = this.codigoRecived.valueChanges.subscribe((letras: string) => {
			if (letras.length >= 5 && this.codigoRecived.valid) {
				this.crearFormReset();
			}

		});
	}

	async resetarContrasenna() {
		const usuario: user = await this.srvUser.getUsuario(this.email.value).toPromise();
		usuario.newpass = this.pass.value;
		console.log("data cambio", usuario);
		this.messageService.clear();
		this.messageService.add({ key: "t1", severity: 'success', summary: 'Cambio de Contraseña', detail: 'Cambio de contraseña exitoso. Inicia sesión' });
		await this.srvUser.changePass(usuario).toPromise();
	}

	redirect() {
		this.router.navigate(['/login']);
	}

	cancelarProceso() {
		this.confirmationCode = -1;
		this.subCambioLetras$.unsubscribe();
		this.subCambioLetras$ = null;
		this.showCodigo = false;
		this.showReset = false;
		this.forgotForm.reset();
		this.formResetPass.reset();

	}

}
