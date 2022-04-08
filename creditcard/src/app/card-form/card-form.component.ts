import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateFormControl } from '../date-form-control';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css'],
})
export class CardFormComponent implements OnInit {
  controls = this.createControls();
  form = new FormGroup(this.controls);

  constructor() {
    console.log(this.form.controls['name']);
  }

  ngOnInit(): void {}

  submit() {
    console.log(this.form.value);
  }

  createControls() {
    const name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);

    const cardNumber = new FormControl('', [
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(16),
    ]);

    const expiration = new DateFormControl('', [
      Validators.required,
      Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/),
    ]);

    const securityCode = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
    ]);

    return {
      name,
      cardNumber,
      expiration,
      securityCode,
    };
  }

  showState() {
    const target = this.form.controls['name'];

    // dirtyだけで判定すると、入力してすぐにlengthチェックでエラーになる。
    // それはあんまりなので、touchedも判定に加えて、blurのタイミングでエラーになるようにする。
    // 1回blurすると、touched済みなので、その時は即座にエラーになる。

    // コントロールをクリックして、blurしたらtrue
    console.log('touched: ', target.touched);

    // コントロールをクリックして、まだblurしていなかったらtrue
    console.log('untouched: ', target.untouched);

    // まったく触れていない状態
    console.log('pristine: ', target.pristine);

    // 値を変えた状態
    console.log('dirty: ', target.dirty);
  }
}
