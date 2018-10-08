import { Component, OnInit }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginName: string;
  public password: string;

  public message: string;
  public error: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit() {
    this.logout();
  }

  public get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  private isNullOrWhiteSpace(str: string) : boolean {
    return str == null || str.match(/^ *$/) !== null;
  }

  public login() {
    if (this.isNullOrWhiteSpace(this.loginName) || this.isNullOrWhiteSpace(this.password)) {
        this.message = "Логин и пароль не должны быть пустыми";
        this.error = true;
        return;
    }

    this.error = false;
    this.message = 'Вход...';

    this.authService.login(this.loginName, this.password).subscribe(() => {
      this.message = "OK";
      if (this.authService.isLoggedIn) {
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/search';
        this.router.navigate([redirect]);
      }
    },
    (error) => {
      this.message = "Неудачная попытка входа. Повторите попытку.";
      this.error = true;
    });
  }

  private logout() {
    this.authService.logout();
  }
}