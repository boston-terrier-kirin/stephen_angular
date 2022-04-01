import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mergeMap,
  shareReplay,
  switchMap,
  tap,
  toArray,
} from 'rxjs/operators';
import { Forcast } from './models/forcast';
import { NotificationsService } from '../notifications/notifications.service';

const url = 'https://api.openweathermap.org/data/2.5/forecast';

interface OpenWeatherResponse {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    };
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  constructor(
    private httpClient: HttpClient,
    private notificationsService: NotificationsService
  ) {}

  getForcast(): Observable<Forcast[]> {
    return this.getCurrentLocation().pipe(
      map((coords) => {
        return new HttpParams()
          .set('lat', coords.latitude)
          .set('lon', coords.longitude)
          .set('units', 'metric')
          .set('appid', environment.apiKey);
      }),
      switchMap((params) => {
        // 24時間/3時間*5日分=40レコード返ってくる。
        return this.httpClient.get<OpenWeatherResponse>(url, {
          params,
        });
      }),
      // shareReplayを入れておけば、マルチキャストができるようになる。HTTPリクエストは1回で、emitは複数個所に。
      shareReplay(),
      map((res) => {
        return res.list;
      }),
      mergeMap((value) => {
        // ofを使って配列をストリームに変換し、40回emitされるようにする。
        return of(...value);
      }),
      filter((value, index) => {
        // 40回のうち、1日1回分だけ欲しいので、8で割る。
        return index % 8 === 0;
      }),
      map((value) => {
        return {
          dateString: value.dt_txt,
          temp: value.main.temp,
        };
      }),
      // toArrayをやると配列になる。
      // toArrayをやらないと5回emitされて戻り値がObservable<Forcast>になってしまうため、*ngForにつなげない。
      toArray()
    );
  }

  getCurrentLocation() {
    return new Observable<GeolocationCoordinates>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => {
          observer.error(err);
        }
      );
    }).pipe(
      tap(() => {
        this.notificationsService.addSuccess('Got your location.');
      }),
      catchError((err) => {
        this.notificationsService.addError('Failed to get your location.');
        return throwError(() => err);
      })
    );
  }

  /**
   * 最後にtoArrayをやっていないバージョン。
   * 戻り値は、Forcastのストリームになる。
   */
  getForcast_v2(): Observable<Forcast> {
    return this.getCurrentLocation().pipe(
      map((coords) => {
        return new HttpParams()
          .set('lat', coords.latitude)
          .set('lon', coords.longitude)
          .set('units', 'metric')
          .set('appid', '32aeeabf53449eea4ab1ee21ea90201b');
      }),
      switchMap((params) => {
        // 24時間/3時間*5日分=40レコード返ってくる。
        return this.httpClient.get<OpenWeatherResponse>(url, {
          params,
        });
      }),
      map((res) => {
        return res.list;
      }),
      mergeMap((value) => {
        // ofを使って配列をストリームに変換し、40回emitされるようにする。
        return of(...value);
      }),
      filter((value, index) => {
        // 40回のうち、1日1回分だけ欲しいので、8で割る。
        return index % 8 === 0;
      }),
      map((value) => {
        return {
          dateString: value.dt_txt,
          temp: value.main.temp,
        };
      })
    );
  }
}
