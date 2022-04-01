import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { NewsApiService } from '../news-api.service';

@Component({
  selector: 'app-news-api-article-list',
  templateUrl: './news-api-article-list.component.html',
  styleUrls: ['./news-api-article-list.component.css'],
})
export class NewsApiArticleListComponent implements OnInit {
  articles$ = new Observable<Article[]>();

  constructor(private newsApiService: NewsApiService) {
    console.log('NewsApiArticleListComponent.constructor');
    this.articles$ = this.newsApiService.pagesOutput$;
    this.newsApiService.getPage(1);
  }

  ngOnInit(): void {}

  // NewsApiServiceがSubjectを使っている場合
  // NewsApiService -> NewsApiArticleListComponent の順に初期化されているので、
  // Subjectを使っていると、NewsApiService.constructorでemiされた値がGETできない。
  // 画面ロード後にsearchをクリックすると、再度イベントが走るのでOK。
  search() {
    console.log('search');
    this.newsApiService.getPage(1);
  }
}
