import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  public showError: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  // public login(form) {
  //   this.authService.login(form.value).subscribe((res) => {
  //     if (res.status == 200) {
  //       this.showError = false;
  //       this.router.navigateByUrl(`home/${res.user_id}`);
  //     } else {
  //       this.showError = true;
  //     }
  //   });
  // }

  public login(form) {
    this.authService.login(form.value).then(res => {
        if (res) {
          this.showError = false;
          // this.router.navigateByUrl(`home/${res.id}`);
          form.reset();
          this.router.navigateByUrl('home');
        } else {
          this.showError = true;
        }
      }
    );
  }

}
