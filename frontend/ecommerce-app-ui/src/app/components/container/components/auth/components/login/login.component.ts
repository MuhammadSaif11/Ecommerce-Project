import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomError } from 'src/app/models/CustomError.model';
import { JwtToken } from 'src/app/models/JwtToken.model';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { CartService } from '../../../cart/services/cart.service';

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
  cartService:CartService = inject(CartService);
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
        if(this.userAuthService.isUser()){
          this.cartService.getCartLength().subscribe({
            next:(length:number)=>{
              this.cartService.cartLengthSubject.next(length)
            }
          })
        }
        if(roles[0] == "ROLE_ADMIN"){
          this.router.navigate(["/products"])
        }
        else{
          this.router.navigate(["/products"])
        }
      },
      error:(error)=>{
        this.error = error.error;
        console.log(error);
      }
    })
  }
}
