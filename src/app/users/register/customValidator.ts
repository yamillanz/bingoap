import { ValidatorFn, AbstractControl} from '@angular/forms';

function equalsValidator(otherControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const value: any = control.value;
    const otherValue: any = otherControl.value;
    console.log('im passing by a validator');
    return otherValue === value ? null : { 'notEquals': { value, otherValue } };
  };
}

export const CustomValidators = {
  equals: equalsValidator
};