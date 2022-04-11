import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

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
export class ItemListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() items: Item[] = [];

  constructor() {
    // @Inputはconstructorのタイミングでは空になっている。
    console.log('ItemListComponent.constructor', this.items);
  }

  ngOnInit(): void {
    console.log('ItemListComponent.ngOnInit', this.items);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ItemListComponent.ngOnChanges', this.items);
  }

  ngOnDestroy(): void {
    console.log('ItemListComponent.ngOnDestroy');
  }
}
