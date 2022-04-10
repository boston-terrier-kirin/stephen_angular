import { Component, OnInit } from '@angular/core';
import { Item } from '../item-list/item-list.component';
import { Stat } from '../stats/stats.component';

@Component({
  selector: 'app-views-home',
  templateUrl: './views-home.component.html',
  styleUrls: ['./views-home.component.css'],
})
export class ViewsHomeComponent implements OnInit {
  stats: Stat[] = [
    {
      value: 22,
      label: '# of Users',
    },
    {
      value: 900,
      label: 'Revenue',
    },
    {
      value: 50,
      label: 'Reviews',
    },
  ];

  items: Item[] = [
    {
      image: '/assets/images/couch.jpeg',
      title: 'Couch',
      desc: 'This is a fantastic couch to sit on.',
    },
    {
      image: '/assets/images/dresser.jpeg',
      title: 'Dresser',
      desc: 'This is a great dresser to put staff in.',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
