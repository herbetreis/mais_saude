import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {

  public showError: boolean = false;
  public showErrorEmail: boolean = false;
  public showErrorPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  // public register(form) {
  //   this.authService.register(form.value).subscribe((res) => {
  //     this.router.navigateByUrl('login');
  //   });
  // }

  public register(form) {
    if (!form) {
      this.showError = true;
      return
    }
    this.showError = false;
    this.showErrorEmail = false;
    this.showErrorPassword = false;

    const { email, name, confirm, password } = form.value
    if (confirm === password) {
      this.showErrorPassword = false;
      this.authService.register({ email, name, password }).then((res) => {
        if (res) {
          this.showErrorEmail = false;
          form.reset()
          this.router.navigateByUrl('login');
        } else {
          this.showErrorEmail = true;
        }
      });
    } else {
      this.showErrorPassword = true;
    }
  }

}
