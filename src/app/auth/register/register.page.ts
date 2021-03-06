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
  public errorMessage: string = 'Error!';
  public showErrorEmail: boolean = false;
  public showErrorPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public register(form) {
    if (!form) {
      this.showError = true;
      return;
    }
    this.showError = false;
    this.showErrorEmail = false;
    this.showErrorPassword = false;

    const { email, name, confirm, password } = form.value;
    if (confirm === password) {
      this.showErrorPassword = false;
      this.authService.register({ email, name, password }).then((res) => {
        if (res && res.user) {
          this.showErrorEmail = false;
          form.reset();
          return this.router.navigateByUrl('login');
        } else if (res && res.error) {
          this.showError = true;
          this.errorMessage = res.error.message;
        } else {
          this.showErrorEmail = true;
        }
      });
    } else {
      this.showErrorPassword = true;
    }
  }

}
