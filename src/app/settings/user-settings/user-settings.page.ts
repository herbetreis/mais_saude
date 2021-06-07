import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../../typings/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss']
})
export class UserSettingsPage implements OnInit {

  public userInfo: User = { email: '', password: '' };
  private user;

  constructor(private authService: AuthService, private fAuth: AngularFireAuth, private router: Router) { }


  public async update(form) {
    if (this.user) {
      await this.authService.update(this.user, form.value);
      return this.router.navigate(['/home'], { replaceUrl: true });
    }

  }

  ngOnInit() {
    this.fAuth.user.subscribe(user => {
      this.user = user;
      if (user) {
        this.userInfo.email = user.email;
      }
    });
  }

}
