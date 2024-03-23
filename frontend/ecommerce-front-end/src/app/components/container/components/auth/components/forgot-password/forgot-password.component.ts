import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm:FormGroup;
  formBuilder:FormBuilder = inject(FormBuilder);

  ngOnInit():void {
    this.forgotPasswordForm = this.formBuilder.group({
      'email':['',[Validators.required,Validators.email]]
    }) 
  }

  forgotPassword(){}
}
