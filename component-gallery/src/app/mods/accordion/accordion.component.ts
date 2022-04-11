import { Component, Input, OnInit } from '@angular/core';

export interface Item {
  title: string;
  content: string;
}

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
})
export class AccordionComponent implements OnInit {
  @Input() items: Item[] = [];
  openedItemIndex = 0;

  constructor() {}

  ngOnInit(): void {}

  open(index: number) {
    if (index === this.openedItemIndex) {
      this.openedItemIndex = -1;
      return;
    }
    this.openedItemIndex = index;
  }
}
