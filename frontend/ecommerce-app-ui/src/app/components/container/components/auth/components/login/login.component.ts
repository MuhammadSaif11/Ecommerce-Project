import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomError } from 'src/app/models/CustomError.model';
import { JwtToken } from 'src/app/models/JwtToken.model';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  formBuilder: FormBuilder = inject(FormBuilder);
  LoginForm:FormGroup;
  userService:UserService = inject(UserService);
  userAuthService:UserAuthService = inject(UserAuthService);
  router:Router = inject(Router);
  error:CustomError;
  data;
 

  ngOnInit(): void {
    this.data = history.state;
    this.LoginForm = this.formBuilder.group({
      'username': ['',Validators.required],
      'password': ['',Validators.required]
    })
  }

  login(){
    this.userService.login(this.LoginForm.value).subscribe({
      next:(response:JwtToken)=>{
        const token:string = response.token;
        const fullname:string = response.firstname.concat(" ",response.lastname);
        const roles:string[] = [];
        response.roles.forEach(role => roles.push(role.roleName));
        this.userAuthService.setRoles(roles);
        this.userAuthService.setToken(token);
        this.userAuthService.setuserFullname(fullname);
        this.userAuthService.userFullname.next(fullname);
        if(roles[0] == "ROLE_ADMIN"){
          this.router.navigate(["/product"])
        }
        else{
          this.router.navigate(["/product"])
        }
      },
      error:(error)=>{
        this.error = error.error;
        console.log(error);
      }
    })
  }
}
