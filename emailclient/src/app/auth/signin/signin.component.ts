import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  controls = this.createControls();
  form = new FormGroup({
    ...this.controls,
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  signin() {
    this.authService.signin(this.form.value).subscribe({
      next: () => {},
      error: (err) => {
        if (err.error.password) {
          this.form.setErrors({
            invalidCredential: true,
          });
          return;
        }

        this.form.setErrors({
          unexpected: true,
        });
      },
    });
  }

  showInvalidCredentialError() {
    return this.form.errors?.['invalidCredential'];
  }

  showUnExpectedError() {
    return this.form.errors?.['unexpected'];
  }

  createControls() {
    const username = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/),
    ]);

    const password = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]);

    return {
      username,
      password,
    };
  }
}
