import { AbstractControl, ValidatorFn } from "@angular/forms";

export class CustomValidators {
    public static sameValue(referenceControl: AbstractControl): ValidatorFn {
        return (control: AbstractControl) => {
            return (control.value === referenceControl.value) ? null : {'sameValue': ''};
        };
    }
}
