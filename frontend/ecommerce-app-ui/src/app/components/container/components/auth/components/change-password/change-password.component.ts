import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControlOptions } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomError } from 'src/app/models/CustomError.model';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { CustomValidators } from 'src/app/validators/custom-validators';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm:FormGroup;
  userService:UserService = inject(UserService);
  userAuthService:UserAuthService = inject(UserAuthService);
  router:Router = inject(Router);
  formBuilder:FormBuilder = inject(FormBuilder);
  ngOnInit(): void {
    const formOptions: AbstractControlOptions = {
      validators: CustomValidators.passwordMatcher
    };
    this.changePasswordForm = this.formBuilder.group({
      'new-password':['',[Validators.required]],
      'confirm-password':['',[Validators.required]],
    },formOptions)
  }
  changePassword(){
    const body = {
      newPassword:this.changePasswordForm.value['confirm-password'],
      email:localStorage.getItem('email')
    }
    this.userService.changePassword(body).subscribe({
      next:(response)=>{
        const data = response;
        this.router.navigate(['/auth/login'],{state: data});
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  
}
