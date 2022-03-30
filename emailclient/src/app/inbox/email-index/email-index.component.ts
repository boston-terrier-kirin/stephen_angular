import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailService } from '../email.service';
import { EmailSummary } from '../models/email-summary';

@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.css'],
})
export class EmailIndexComponent implements OnInit {
  emails$ = new Observable<EmailSummary[]>();

  constructor(private emailService: EmailService) {}

  ngOnInit(): void {
    this.emails$ = this.emailService.getEmails();
  }
}
