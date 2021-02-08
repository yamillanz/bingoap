import { UsersService } from './../services/users.service';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

export class MyValidations {

	static equalsValidator(otherControl: AbstractControl): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } => {
			const value: any = control.value;
			const otherValue: any = otherControl.value;
			return otherValue === value ? null : { 'notEquals': { value, otherValue } };
		};
	}

	static equalsCodigo(codigoValido : string){
		return (control: AbstractControl) => {
			const value: any = control.value;
			return codigoValido === value ? null : { 'notEqualsCode': true };
		};
	} 

	static checkEmailTacked(srvUsuario: UsersService) {
		return (control: AbstractControl) => {
			const email = control.value;
			return srvUsuario.checkEmail(email).pipe(
				map((response) => {
					const emailTaked = response.status === 200 ? false : true;
					return !emailTaked ? null : { notAvailable: true };
				})
			);
		}
	}

}
