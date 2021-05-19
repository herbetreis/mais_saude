import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

import { STORAGE_USER } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storage: Storage) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.storage.get(STORAGE_USER).then(currentUser => {
      const isLoggedIn = !!currentUser;
      if (!isLoggedIn) {
        this.router.navigateByUrl('/login');
      }
      return isLoggedIn;
    });
  }

}
