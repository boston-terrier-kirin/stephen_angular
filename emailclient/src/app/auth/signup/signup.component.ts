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
  fields = this.createFormFields();
  form = new FormGroup(
    {
      ...this.fields,
    },
    {
      validators: [MatchValidator.match('password', 'passwordConfirmation')],
    }
  );

  constructor(private uniqueUsernameValidator: UniqueUsernameValidator) {}

  ngOnInit(): void {}

  createFormFields() {
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
}
