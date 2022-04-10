import { Component, Input, OnInit } from '@angular/core';

export interface Item {
  image: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {
  @Input() items: Item[] = [];

  constructor() {}

  ngOnInit(): void {}
}
