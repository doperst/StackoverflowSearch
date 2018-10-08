import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public loginName: string;
  public password: string;
  public passwordRepeat: string;

  public message: string;
  public error: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  private isNullOrWhiteSpace(str: string) : boolean {
    return str == null || str.match(/^ *$/) !== null;
  }

  public signup() {
    if (this.isNullOrWhiteSpace(this.loginName) || this.isNullOrWhiteSpace(this.password)) {
        this.message = "Логин и пароль не должны быть пустыми";
        this.error = true;
        return;
    }

    if (this.password != this.passwordRepeat) {
        this.message = "Введенные пароли не совпадают";
        this.error = true;
        return;
    }

    this.error = false;
    this.message = "Регистрация...";

    this.authService.signup(this.loginName, this.password).subscribe(() => {
        this.message = "ОК"
        this.router.navigate(['/login']);
    },
    (res) => {
        this.message = "Пользователь с таким логином уже существует.";
        this.error = true;
    });
  }
}