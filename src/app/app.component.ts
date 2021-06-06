import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {


  public pages = [
    {
      title: 'Dashboard',
      url: '/home',
      onClick: (activeIndex, i) => {
        activeIndex = i;
      },
      icon: 'albums'
    },
    {
      title: 'Profile',
      url: '/user-settings',
      onClick: (activeIndex, i) => {
        activeIndex = i;
      },
      icon: 'person'
    },
    {
      title: 'Cadastro de Alimentos',
      url: '/add-food',
      onClick: (activeIndex, i) => {
        activeIndex = i;
      },
      icon: 'fast-food'
    },
    {
      title: 'Logout',
      url: '',
      onClick: (activeIndex, i) => {
        activeIndex = i;
        // noinspection JSIgnoredPromiseFromCall
        this.logout();
      },
      icon: 'log-out'
    }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn === true && this.router.routerState.snapshot.url?.startsWith('/login')) {
        this.router.navigate(['home']);
      }
    });
  }

  private async logout() {
    await this.authService.logout();
    return this.router.navigateByUrl('/login');
  }
}
