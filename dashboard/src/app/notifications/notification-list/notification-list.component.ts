import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/command';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
})
export class NotificationListComponent implements OnInit {
  messages$: Observable<Message[]>;

  constructor(private notificattionService: NotificationsService) {
    console.log('NotificationListComponent.constructor');
    this.messages$ = this.notificattionService.messagesOutput$;
  }

  ngOnInit(): void {
    console.log('NotificationListComponent.ngOnInit -> addSuccess');
  }

  clearMessage(id: string) {
    this.notificattionService.clearMessage(id);
  }
}
