import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationsService } from 'src/app/notifications/notifications.service';
import { ForecastService } from '../forecast.service';
import { Forcast } from '../models/forcast';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {
  forcast$ = new Observable<Forcast[]>();

  constructor(private forecastService: ForecastService) {}

  ngOnInit(): void {
    this.forcast$ = this.forecastService.getForcast();
  }

  /**
   * またしても難しい。
   * Forcastが5回emitされるバージョンだと、*ngForにつなげることができない。
   */
  forcastData_v2$ = new Observable<Forcast>();
  test() {
    // Forcastが5回emitされてcompleteはされる。
    this.forecastService.getForcast_v2().subscribe({
      next: (forcastData) => console.log(forcastData),
      complete: () => console.log('complete'),
    });

    // 5回emitされた値を、画面に表示するにはどうすれば？
    this.forcastData_v2$ = this.forecastService.getForcast_v2();
  }
}
