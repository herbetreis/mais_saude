import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

//argumentos e classes especificas para a page de autenticação dos usuários
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  public showError: boolean = false;
  public errorMessage: string = 'Error! Houve um erro ao tentar fazer seu login';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public login(form) {
    this.authService.login(form.value).then((res) => {
      console.log('teste', res);
      if (res?.user) {
        this.showError = false;
        form.reset();
        return this.router.navigateByUrl('home');
      } else if (res?.error) {
        this.showError = true;
        this.errorMessage = res.error.message;
      } else {
        this.showError = true;
      }
    });
  }

}
