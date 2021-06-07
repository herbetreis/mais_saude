import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public showMenu: boolean = false;
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

  private urlSubject = new BehaviorSubject(null);
  private url: Observable<{ id: number; url: string; urlAfterRedirects: string } | null>;
  private loggedInObservable;

  constructor(private authService: AuthService, private router: Router) {
    this.url = this.urlSubject.asObservable();
  }

  async ngOnInit() {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.urlSubject.next({ ...event });
      }
    });

    this.url.subscribe(currentUrl => {
      if (currentUrl) {
        if (this.loggedInObservable) {
          this.loggedInObservable.unsubscribe()
        }

        this.loggedInObservable = this.authService.isLoggedIn().subscribe(isLoggedIn => {
          const url = this.router.routerState.snapshot.url;
          this.showMenu = !(url?.startsWith('/login') || url?.startsWith('/register'))
          if (isLoggedIn === true && url?.startsWith('/login')) {
            this.router.navigate(['home']);
          }
        });
      }
    });
  }

  private async logout() {
    await this.authService.logout();
    return this.router.navigateByUrl('/login');
  }
}
