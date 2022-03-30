import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EmailService } from '../email.service';
import { Email } from '../models/email';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css'],
})
export class EmailCreateComponent implements OnInit {
  showModal = false;
  email: Email = {
    id: '',
    to: '',
    subject: '',
    html: '',
    text: '',
    from: `${this.authService.username}@angular-email.com`,
  };

  constructor(
    private authService: AuthService,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {}

  onEmailSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe((res) => {
      this.showModal = false;
    });
  }
}
