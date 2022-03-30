import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from './models/email';
import { EmailSummary } from './models/email-summary';

const rootUrl = 'https://api.angular-email.com';

interface SendEmailResponse {
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private httpClient: HttpClient) {}

  getEmails(): Observable<EmailSummary[]> {
    return this.httpClient.get<EmailSummary[]>(`${rootUrl}/emails`);
  }

  getEmail(id: string): Observable<Email> {
    return this.httpClient.get<Email>(`${rootUrl}/emails/${id}`);
  }

  sendEmail(email: Email) {
    return this.httpClient.post<SendEmailResponse>(`${rootUrl}/emails`, email);
  }
}
