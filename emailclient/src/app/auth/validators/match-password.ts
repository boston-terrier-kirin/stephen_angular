import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class MatchValidator {
  static match(controlName: string, matchingControlName: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);

      if (!control || !matchingControl) {
        console.error('Form controls cat not found in the form group.');
        return {
          controlNotFound: false,
        };
      }

      const error =
        control.value === matchingControl.value
          ? null
          : { passwordDontMatch: true };

      // 相関チェックした結果をコントロールに紐づける。
      // コントロールとフォームの両方がエラーになる。
      matchingControl.setErrors(error);

      return error;
    };
  }
}
