import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Email } from '../models/email';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css'],
})
export class EmailFormComponent implements OnInit {
  @Input() email!: Email;
  @Output() emailSubmit = new EventEmitter<Email>();

  controls: any;
  form!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.controls = this.createControls();
    this.form = new FormGroup({
      ...this.controls,
    });
  }

  createControls() {
    const from = new FormControl({ value: this.email.from, disabled: true });
    const to = new FormControl(this.email.to, [
      Validators.required,
      Validators.email,
    ]);
    const subject = new FormControl(this.email.subject, [Validators.required]);
    const text = new FormControl(this.email.text, [Validators.required]);

    return {
      from,
      to,
      subject,
      text,
    };
  }

  send() {
    // disabledになっている値も取得したい場合、this.form.getRawValue()
    // console.log(this.form.getRawValue());

    this.emailSubmit.emit(this.form.value);
  }
}
