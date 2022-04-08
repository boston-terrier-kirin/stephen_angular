import { FormControl } from '@angular/forms';

export class DateFormControl extends FormControl {
  override setValue(value: string | null, options: any) {
    // formをリセットするとvalueがnullになるのでチェックを入れる。
    if (!value) {
      super.setValue('', {
        ...options,
        emitModelToViewChange: true,
      });
      return;
    }

    // 0-9と/以外は、今の値をそのままセットして無視する。
    if (value.match(/[^0-9|\/]/gi)) {
      super.setValue(this.value, {
        ...options,
        emitModelToViewChange: true,
      });
      return;
    }

    // MM/YY の桁数を超えたら、今の値をそのままセットして無視する。
    if (value.length > 5) {
      super.setValue(this.value, {
        ...options,
        emitModelToViewChange: true,
      });
      return;
    }

    // 12/ で今の値が3桁で、入力値が2桁の場合は許可して、backsspaceが入力できるようにする。
    if (value.length === 2 && this.value.length === 3) {
      super.setValue(value, {
        ...options,
        emitModelToViewChange: true,
      });
      return;
    }

    if (value.length === 2) {
      super.setValue(value + '/', {
        ...options,
        emitModelToViewChange: true,
      });
      return;
    }

    super.setValue(value, {
      ...options,
      emitModelToViewChange: true,
    });
  }
}
