import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
import { Email } from '../models/email';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css'],
})
export class EmailReplyComponent implements OnChanges {
  @Input() email!: Email;
  showModal = false;

  constructor(private emailService: EmailService) {}

  ngOnChanges(): void {
    // ngOnInitは1回しか呼ばれないので、ngOnChangeに変える必要がある。
    // @Inputの値が変わったので、ngOnChangeが呼ばれているよう。
    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `Re: ${this.email.subject}`,
      text: `\n\n----- ${this.email.to} wrote\n${this.email.text}`,
    };
  }

  onEmailSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe((res) => {
      this.showModal = false;
    });
  }
}
