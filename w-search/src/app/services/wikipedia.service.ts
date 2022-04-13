import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

export interface WikipediaResponse {
  query: {
    search: WikipediaSearchResult[];
  };
}

export interface WikipediaSearchResult {
  title: string;
  snippet: string;
  wordcount: number;
  pageid: number;
}

@Injectable({
  providedIn: 'root',
})
export class WikipediaService {
  constructor(private httpClient: HttpClient) {}

  search(term: string) {
    return this.httpClient
      .get<WikipediaResponse>('https://ja.wikipedia.org/w/api.php', {
        params: new HttpParams()
          .set('action', 'query')
          .set('format', 'json')
          .set('list', 'search')
          .set('utf8', '1')
          .set('srsearch', term)
          .set('origin', '*'),
      })
      .pipe(map((res) => res.query.search));
  }
}
