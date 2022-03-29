import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UniqueUsernameValidator implements AsyncValidator {
  constructor(private httpClient: HttpClient) {}

  validate = (
    control: AbstractControl
  ): Observable<ValidationErrors | null> => {
    const { value } = control;

    console.log(this.httpClient);

    return new Observable<null>();
  };
}
