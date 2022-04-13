import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { delay, filter, scan } from 'rxjs/operators';
import { MathValidator } from '../validators/MathValidator';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  secondsPerSolution = 0;
  form = new FormGroup(
    {
      a: new FormControl(this.randomNumber()),
      b: new FormControl(this.randomNumber()),
      answer: new FormControl(''),
    },
    [MathValidator.addition('a', 'b', 'answer')]
  );

  constructor() {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      console.log('valueChanges', value);
    });

    this.form.statusChanges
      .pipe(
        // FormStatusがVALIDの場合のみに絞る
        filter((value) => value === 'VALID'),
        // 0.1秒遅らせる
        delay(100),
        // scanはreduce
        scan(
          (acc, value) => {
            return {
              numberSolved: acc.numberSolved + 1,
              startTime: acc.startTime,
            };
          },
          { numberSolved: 0, startTime: new Date() }
        )
      )
      .subscribe((value) => {
        const { numberSolved, startTime } = value;
        this.secondsPerSolution =
          (new Date().getTime() - startTime.getTime()) / numberSolved / 1000;

        // patchValue は一部の値でもOK
        this.form.patchValue({
          a: this.randomNumber(),
          b: this.randomNumber(),
          answer: '',
        });

        // setValue は全部の値を変える。
        // this.form.setValue({
        //   a: this.randomNumber(),
        //   b: this.randomNumber(),
        //   answer: '',
        // });

        // これは面倒。
        // this.form.controls['a'].setValue(this.randomNumber());
        // this.form.controls['b'].setValue(this.randomNumber());
        // this.form.controls['answer'].setValue('');
      });
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }
}
