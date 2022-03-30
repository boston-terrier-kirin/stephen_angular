import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EmailService } from '../email.service';
import { Email } from '../models/email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css'],
})
export class EmailShowComponent implements OnInit, OnChanges {
  email$ = new Observable<Email>();

  constructor(
    private route: ActivatedRoute,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    // AngularはURLが変わってもインスタンスを使いまわすため、この方法だと初回しか呼ばれない。
    // const id = this.route.snapshot.paramMap.get('id');
    // console.log(id);

    this.email$ = this.route.params.pipe(
      // メール一覧を次々にクリックすると、メールの取得が終わらないうちに次のメールの取得が始まってしまう。
      // switchMapを使って、新しいリクエストが走ったら、進行中のリクエストをキャンセルする。
      switchMap((param) => {
        const { id } = param;
        return this.emailService.getEmail(id);
      })
    );
  }

  ngOnChanges(): void {
    // OnChangesでも呼ばれない
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ngOnChanges', id);
  }
}
