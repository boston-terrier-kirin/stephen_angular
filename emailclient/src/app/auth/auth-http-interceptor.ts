import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      withCredentials: true,
    });

    return next.handle(modifiedReq).pipe(
      tap((value) => {
        if (value.type === HttpEventType.Sent) {
          console.log('💨', 'Request was sent to server');
        }
        if (value.type === HttpEventType.Response) {
          console.log('💨', 'Got a response from the API', value);
        }
      })
    );
  }
}
