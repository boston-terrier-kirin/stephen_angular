import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  signedin$ = new BehaviorSubject<boolean | null>(false);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.signedin$ = this.authService.signedin$;
    this.authService.checkAuth().subscribe();
  }
}
