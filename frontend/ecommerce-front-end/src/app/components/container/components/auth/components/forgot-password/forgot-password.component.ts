import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomError } from 'src/app/models/CustomError.model';
import { Role } from 'src/app/models/Role.model';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm:FormGroup;
  userService:UserService = inject(UserService);
  userAuthService:UserAuthService = inject(UserAuthService);
  router:Router = inject(Router);
  formBuilder:FormBuilder = inject(FormBuilder);
  error:CustomError;

  ngOnInit():void {
    this.forgotPasswordForm = this.formBuilder.group({
      'email':['',[Validators.required]]
    }) 
  }

  forgotPassword(){
    console.log(this.forgotPasswordForm.value);
    this.userService.forgotPassword(this.forgotPasswordForm.value.email).subscribe({
      next:(response:string)=>{
        console.log(response);
        this.userAuthService.setEmail(this.forgotPasswordForm.value.email);
        this.router.navigate(['/auth/verify-otp']);
      },
      error:(err)=>{
        this.error = err.error;
        console.log(this.error);
      }
    })
  }
}
