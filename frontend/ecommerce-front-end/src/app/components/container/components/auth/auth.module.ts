import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    ForgotPasswordComponent,
    VerifyOtpComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
