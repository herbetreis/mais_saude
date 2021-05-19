import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn === true && this.router.routerState.snapshot.url?.startsWith('/login')) {
        this.router.navigate(['home']);
      }
    });
  }
}
