import { AbstractControl, ValidatorFn } from '@angular/forms'
import { SignupComponent } from '../signup/signup.component';


export const passwordValidator=(control:AbstractControl) =>
{
    const cpassword=control.value;
    const password=control.root.value['password'];
    const valid = cpassword.localeCompare(password)==0 ? true : false;
    return !valid ? { isPasswordMatch:{ valid:true } } : null
}