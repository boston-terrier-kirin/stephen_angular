import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
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

  constructor(
    private router: Router,
    private uniqueUsernameValidator: UniqueUsernameValidator,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  signup() {
    this.authService.signup(this.form.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/inbox');
      },
      error: (err) => {
        this.form.setErrors({
          unexpected: true,
        });
      },
    });
  }

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

  showPasswordUnMatchError() {
    return (
      this.controls.password.dirty &&
      this.controls.password.touched &&
      this.controls.passwordConfirmation.dirty &&
      this.controls.passwordConfirmation.touched &&
      this.form.errors?.['passwordUnMatch']
    );
  }

  showUnExpectedError() {
    return this.form.errors?.['unexpected'];
  }
}
