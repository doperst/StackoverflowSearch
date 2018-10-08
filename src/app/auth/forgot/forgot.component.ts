import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {
    public loginName: string;
  
    public message: string;
    public error: boolean = false;
  
    constructor(private authService: AuthService, private router: Router) {}
  
    private isNullOrWhiteSpace(str: string) : boolean {
        return str == null || str.match(/^ *$/) !== null;
    }
  
    public getPassword() {
      if (this.isNullOrWhiteSpace(this.loginName)) {
          this.message = "Логин не должен быть пустым";
          this.error = true;
          return;
      }
  
      this.error = false;
      this.message = "Восстановление...";
  
      this.authService.getPassword(this.loginName).subscribe((password) => {
          this.message = `Новый пароль: ${password}`;
      },
      (res) => {
          this.message = "Пользователя с таким логином не существует";
          this.error = true;
      });
    }
}