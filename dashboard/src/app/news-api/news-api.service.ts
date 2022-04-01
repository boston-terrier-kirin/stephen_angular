import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Article } from './models/article';
import { NewsApiResponse } from './models/news-api-response';

const url = 'https://newsapi.org/v2/top-headlines';
const pageSize = 20;
const country = 'jp';

@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  // NewsApiService -> NewsApiArticleListComponent の順に初期化されているので、
  // Subjectを使っていると、NewsApiService.constructorでemiされた値がGETできない。
  // Subjectはemit済みのデータは見えない仕様のため。
  // ReplaySubjectに変えて、emit済みが見えるようにする。
  private pagesInput: ReplaySubject<number>;

  pagesOutput$: Observable<Article[]>;
  numberOfPages: Subject<number>;

  constructor(private httpClient: HttpClient) {
    console.log('NewsApiService.constructor');

    this.pagesInput = new ReplaySubject();
    this.numberOfPages = new Subject();

    this.pagesOutput$ = this.pagesInput.pipe(
      map((page) => {
        return new HttpParams()
          .set('apiKey', environment.newsapiKey)
          .set('country', country)
          .set('pageSize', pageSize)
          .set('page', page);
      }),
      switchMap((params) => {
        return this.httpClient.get<NewsApiResponse>(url, { params });
      }),
      tap((res) => {
        // tapはresponseに影響をあたえないのでこれができる。
        const totalPages = Math.ceil(res.totalResults / pageSize);
        this.numberOfPages.next(totalPages);
      }),
      map((res) => {
        return res.articles;
      })
    );
  }

  getPage(page: number) {
    this.pagesInput.next(page);
  }
}
