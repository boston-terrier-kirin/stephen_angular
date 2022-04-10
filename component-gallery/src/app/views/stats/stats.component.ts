import { Component, Input, OnInit } from '@angular/core';

export interface Stat {
  label: string;
  value: number;
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
  @Input() stats: Stat[] = [];

  constructor() {}

  ngOnInit(): void {}
}
