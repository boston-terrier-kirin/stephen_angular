import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MathValidator } from '../validators/MathValidator';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
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
    this.form.statusChanges.subscribe((value) => {
      console.log(value);
      if (value === 'VALID') {
        // this.form.controls['a'].setValue(this.randomNumber());
        // this.form.controls['b'].setValue(this.randomNumber());
        // this.form.controls['answer'].setValue('');

        // setValue は全部の値を変える。
        // this.form.setValue({
        //   a: this.randomNumber(),
        //   b: this.randomNumber(),
        //   answer: '',
        // });

        // patchValue は一部の値でもOK
        this.form.patchValue({
          a: this.randomNumber(),
          b: this.randomNumber(),
          answer: '',
        });
      }
    });
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }
}
