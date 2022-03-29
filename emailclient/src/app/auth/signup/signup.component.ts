import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchValidator } from '../validators/match-validator';
import { UniqueUsernameValidator } from '../validators/unique-username-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  controls = this.createControls();
  form = new FormGroup(
    {
      ...this.controls,
    },
    {
      validators: [MatchValidator.match('password', 'passwordConfirmation')],
    }
  );

  constructor(private uniqueUsernameValidator: UniqueUsernameValidator) {}

  ngOnInit(): void {}

  createControls() {
    const username = new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-z0-9]+$/),
      ],
      [this.uniqueUsernameValidator.validate]
    );

    const password = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]);

    const passwordConfirmation = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]);

    return {
      username,
      password,
      passwordConfirmation,
    };
  }

  showErrors(name: any) {
    const { dirty, touched, errors } = this.form.get(name) as FormControl;
    return dirty && touched && errors;
  }
}
