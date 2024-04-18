import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './components/verify-otp/verify-otp.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { activateForNotLoggedIn } from 'src/app/auth/auth.guard';

const routes: Routes = [
  {path:"login", component:LoginComponent,canActivate:[activateForNotLoggedIn]},
  {path:"signup", component:SignupComponent,canActivate:[activateForNotLoggedIn]},
  {path:"forgot-password", component:ForgotPasswordComponent,canActivate:[activateForNotLoggedIn]},
  {path:"verify-otp", component:VerifyOtpComponent,canActivate:[activateForNotLoggedIn]},
  {path:"change-password", component:ChangePasswordComponent,canActivate:[activateForNotLoggedIn]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
