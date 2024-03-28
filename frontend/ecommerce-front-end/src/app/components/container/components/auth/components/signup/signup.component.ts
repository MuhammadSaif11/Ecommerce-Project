import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomError } from 'src/app/models/CustomError.model';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  formBuilder: FormBuilder = inject(FormBuilder);
  signupForm:FormGroup;
  router:Router = inject(Router);
  userService:UserService = inject(UserService);
  error:CustomError;
  signup(){
    this.userService.signUp(this.signupForm.value).subscribe({
      next:(response:User)=>{
        console.log(response)
        this.router.navigate(['/login']);
      },
      error:(error)=>{
        this.error = error.error;
        console.log(this.error)
      }
    })
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      'firstname':["",[Validators.required]],
      'lastname':["",[Validators.required]],
      'username':["",[Validators.required]],
      'email':["",[Validators.required,Validators.email]],
      'password':["",[Validators.required]],
      'gender':["male",[Validators.required]],
    })
  }

}
