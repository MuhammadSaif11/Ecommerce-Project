import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  otp:Otp = new Otp();

  ngOnInit():void {
    this.VerifyOtpForm = this.formBuilder.group({
      'otp':['',Validators.required]
    }) 
  }



  verifyOtp(){
    this.otp.setCode = this.VerifyOtpForm.value.otp;
    this.otp.setEmail = this.userAuthService.getEmail();
    console.log(this.otp);
    this.userService.verifyOtp(this.otp).subscribe({
      next:(response)=>{
        console.log(response)
      },
      error: (error)=>{
        console.log(error)
      }
    })
  }
}
