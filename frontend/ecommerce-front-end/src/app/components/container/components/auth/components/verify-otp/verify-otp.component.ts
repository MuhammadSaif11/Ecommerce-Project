import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent {
  VerifyOtpForm:FormGroup;
  formBuilder:FormBuilder = inject(FormBuilder);

  ngOnInit():void {
    this.VerifyOtpForm = this.formBuilder.group({
      'otp':['',Validators.required]
    }) 
  }

  verifyOtp(){}
}
