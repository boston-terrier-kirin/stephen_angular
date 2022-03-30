import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const rootUrl = 'https://api.angular-email.com';

interface UsernameAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

interface SigninCredentials {
  username: string;
  password: string;
}

interface SigninResponse extends SignupResponse {}

interface SignedinResponse {
  authenticated: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // null : チェック中
  // true : ログイン済み
  // false: ログインしていない
  signedin$ = new BehaviorSubject<boolean | null>(null);

  constructor(private httpClient: HttpClient) {}

  usernameAvailable(username: string): Observable<UsernameAvailableResponse> {
    return this.httpClient.post<UsernameAvailableResponse>(
      `${rootUrl}/auth/username`,
      {
        username,
      }
    );
  }

  signup(credentials: SignupCredentials): Observable<SignupResponse> {
    return this.httpClient
      .post<SignupResponse>(`${rootUrl}/auth/signup`, credentials)
      .pipe(
        tap(() => {
          // エラーになったらtapはスキップされるので、無条件でtrueにしてOK。
          this.signedin$.next(true);
        })
      );
  }

  signin(credentials: SignupCredentials): Observable<SigninResponse> {
    return this.httpClient
      .post<SigninCredentials>(`${rootUrl}/auth/signin`, credentials)
      .pipe(
        tap(() => {
          // エラーになったらtapはスキップされるので、無条件でtrueにしてOK。
          this.signedin$.next(true);
        })
      );
  }

  signout() {
    return this.httpClient.post(`${rootUrl}/auth/signout`, {}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }

  checkAuth() {
    return (
      this.httpClient
        // HttpInterceptorでCookieも送っているので、GETするだけで認証されているかをチェックできる。
        .get<SignedinResponse>(`${rootUrl}/auth/signedin`)
        .pipe(
          tap((res) => {
            const { authenticated } = res;
            if (authenticated) {
              this.signedin$.next(true);
            } else {
              // 初期値nullのままでは、AuthGuardがログイン/未ログインを判定できないので、falseをセットする。
              this.signedin$.next(false);
            }
          })
        )
    );
  }
}
