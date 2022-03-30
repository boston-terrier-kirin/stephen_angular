import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap, skipWhile } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  /**
   * signedin$の初期値はfalseではなく、nullにする。
   * ブラウザをリフレッシュすると、AppComponent -> AuthService.checkAuth の順番で呼ばれるが、
   * AuthService.checkAuthに時間がかかってしまうと、signedin$の初期値falseを拾って、未ログインと判定してしまう。
   * 　↓
   * signedin$の初期値はnullに変更して、nullの間はチェック中なのでスキップ(skipWhile)する。
   * AND signedin$はcompleteしないので、take(1)する。
   *
   * 【課題】
   * skipWhileでnullをスキップしているのに
   * Observable<boolean | any> のanyを外すとコンパイルエラーになってしまう。
   */
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | any> {
    return this.authService.signedin$.pipe(
      // AuthServiceでチェック中はnullなのでスキップする。
      skipWhile((value) => value === null),
      // signedin$はcompleteしないので、take(1)する。
      take(1),
      // ログインしていなければ、/ に遷移させる。
      tap((authenticated) => {
        if (!authenticated) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
