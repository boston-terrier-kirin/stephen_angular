import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { scan } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { Message } from './models/command';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private messagesInput: Subject<Message>;
  messagesOutput$: Observable<Message[]>;

  constructor() {
    console.log('NotificationsService.constructor');

    this.messagesInput = new Subject<Message>();
    this.messagesOutput$ = this.messagesInput.pipe(
      scan((messages: Message[], command: Message) => {
        if (command.type === 'clear') {
          return messages.filter((message) => message.id !== command.id);
        }
        return [...messages, command];
      }, [])
    );
  }

  addSuccess(message: string) {
    const id = this.randomId();

    this.messagesInput.next({
      id,
      type: 'success',
      text: message,
    });

    setTimeout(() => {
      this.messagesInput.next({
        id,
        type: 'clear',
      });
    }, 5000);
  }

  addError(message: string) {
    const id = this.randomId();

    this.messagesInput.next({
      id,
      type: 'error',
      text: message,
    });

    setTimeout(() => {
      this.messagesInput.next({
        id,
        type: 'clear',
      });
    }, 5000);
  }

  clearMessage(id: string) {
    this.messagesInput.next({
      id,
      type: 'clear',
    });
  }

  private randomId() {
    return uuid();
  }
}
