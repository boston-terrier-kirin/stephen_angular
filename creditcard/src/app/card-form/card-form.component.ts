import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css'],
})
export class CardFormComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor() {
    console.log(this.form.controls['name']);
  }

  ngOnInit(): void {}

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
