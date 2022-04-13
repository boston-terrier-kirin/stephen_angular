import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class MathValidator {
  static addition(a: string, b: string, answer: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const controlA = group.get(a);
      const controlB = group.get(b);
      const controlAnswer = group.get(answer);

      if (!controlA || !controlB || !controlAnswer) {
        return {
          controlNotFound: false,
        };
      }

      if (
        parseInt(controlA.value) + parseInt(controlB.value) !==
        parseInt(controlAnswer.value)
      ) {
        return { addition: true };
      }

      return null;
    };
  }
}
