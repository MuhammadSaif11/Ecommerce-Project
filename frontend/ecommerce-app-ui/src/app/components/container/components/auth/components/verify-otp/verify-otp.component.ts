import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Otp } from 'src/app/models/Otp.model';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {
  VerifyOtpForm:FormGroup;
  formBuilder:FormBuilder = inject(FormBuilder);
  userService:UserService = inject(UserService);
  userAuthService:UserAuthService = inject(UserAuthService);
  router:Router = inject(Router);
  otp:Otp = new Otp();
  otpVerification:any = true;

  ngOnInit():void {
    this.VerifyOtpForm = this.formBuilder.group({
      'otp':['',Validators.required]
    }) 
  }



  verifyOtp(){
    this.otp.setCode = this.VerifyOtpForm.value.otp;
    this.otp.setEmail = localStorage.getItem('email');
    this.userService.verifyOtp(this.otp).subscribe({
      next:(response)=>{
        console.log(response)
        if(response == true){
          this.router.navigate(['/auth/change-password']);
        }
        else{
          this.otpVerification = response;
        }
      },
      error: (error)=>{
        console.log(error)
      }
    })
  }
}
