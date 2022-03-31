import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ForecastService } from '../forecast.service';
import { Forcast } from '../models/forcast';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {
  forcastData: Forcast[] = [];

  constructor(private forecastService: ForecastService) {}

  ngOnInit(): void {
    this.forecastService.getForcast().subscribe((forcastData) => {
      this.forcastData = forcastData;
    });
  }

  /**
   * またしても難しい。
   * Forcastが5回emitされるバージョンだと、*ngForにつなげることができない。
   */
  forcastData$ = new Observable<Forcast>();
  test() {
    // Forcastが5回emitされてcompleteはされる。
    this.forecastService.getForcast_v2().subscribe({
      next: (forcastData) => console.log(forcastData),
      complete: () => console.log('complete'),
    });

    // 5回emitされた値を、画面に表示するにはどうすれば？
    this.forcastData$ = this.forecastService.getForcast_v2();
  }
}
