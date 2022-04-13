import { Component } from '@angular/core';
import {
  WikipediaSearchResult,
  WikipediaService,
} from './services/wikipedia.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  pages: WikipediaSearchResult[] = [];

  constructor(private wikipediaService: WikipediaService) {}

  search(term: string) {
    this.wikipediaService.search(term).subscribe((res) => {
      this.pages = res;
    });
  }
}
