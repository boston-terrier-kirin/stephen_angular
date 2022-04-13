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

  ngOnInit(): void {}

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }
}
