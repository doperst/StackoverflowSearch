import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    AuthRoutingModule
  ],
  declarations: [ 
    LoginComponent,
    SignupComponent,
    ForgotComponent
  ],
  providers: [AuthGuard, AuthService]
})
export class AuthModule {
}