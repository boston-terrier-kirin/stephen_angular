import { Component, Input, OnInit } from '@angular/core';

export interface Header {
  // keyは文字通りDataのkeyになっているので、keyof Dataにするのが正しい。
  // stringにしていると、data[header.key]でコンパイルエラーになってしまう。
  key: keyof Data;
  label: string;
}

export interface Data {
  name: string;
  age: string;
  job: string;
  employed: boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() header: Header[] = [];
  @Input() data: Data[] = [];

  constructor() {}

  ngOnInit(): void {}
}
