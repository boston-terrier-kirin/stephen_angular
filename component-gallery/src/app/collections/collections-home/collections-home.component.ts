import { Component, OnInit } from '@angular/core';
import { Data, Header } from '../table/table.component';

@Component({
  selector: 'app-collections-home',
  templateUrl: './collections-home.component.html',
  styleUrls: ['./collections-home.component.css'],
})
export class CollectionsHomeComponent implements OnInit {
  header: Header[] = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'job', label: 'Job' },
    { key: 'employed', label: 'Has a Job' },
  ];

  data: Data[] = [
    {
      name: 'James',
      age: '24',
      job: 'Designer',
      employed: true,
    },
    {
      name: 'Jill',
      age: '26',
      job: 'Engineer',
      employed: true,
    },
    {
      name: 'Elyse',
      age: '25',
      job: 'Engineer',
      employed: true,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
