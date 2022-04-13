import { Component, Input, OnInit } from '@angular/core';
import { WikipediaSearchResult } from '../services/wikipedia.service';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent implements OnInit {
  @Input() pages: WikipediaSearchResult[] = [];

  constructor() {}

  ngOnInit(): void {}
}
