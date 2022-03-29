import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class UniqueUsernameValidator implements AsyncValidator {
  constructor(private authService: AuthService) {}

  /**
   * SignupComponentで、[this.uniqueUsernameValidator.validate]で、参照をAngular側に渡しているため、
   * 呼び出し元のContextが変わってしまうため、this.httpClientがundefinedになってしまう。
   * validatorをアロー関数に変えることで解決する。
   */
  validate = (
    control: AbstractControl
  ): Observable<ValidationErrors | null> => {
    const { value } = control;

    return this.authService.usernameAvailable(value).pipe(
      map((res) => {
        // APIの仕様としてはユーザ名が使われている場合、422を返す。
        // angularのHttpClientは400/500の場合エラーをemitするので、エラーにならなかった時点でvalidationはOKになる。
        // return null;
        if (res.available) {
          return null;
        }

        // APIの仕様的に、ここに来ることはない。
        return { nonUniqueUsername: true };
      }),
      catchError((err) => {
        // レスポンスが、{"username":"Username in use"} の場合は、ユニークエラー
        if (err.error.username) {
          return of({ nonUniqueUsername: true });
        }

        // それ以外は、ネットワークエラー
        return of({ unexpected: true });
      })
    );
  };
}

/**
 * ・SyncValidatorを通過したら、AsyncValidatorが呼ばれる。
 * ・HttpClientはレスポンスが400/500の場合、エラーをemitする。
 * ・HttpClientは入力⇒リクエスト⇒レスポンス前に入力した場合、1回目をキャンセルして2回目を実行してくれる。switchMapのような挙動をする。
 */
