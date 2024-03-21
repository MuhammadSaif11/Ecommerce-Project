import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Signup } from 'src/app/models/SignUp.model';
import { UserLogin } from 'src/app/models/UserLogin.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api:String = 'http://localhost:8080';
  private http:HttpClient = inject(HttpClient);
  private userAuthService:UserAuthService = inject(UserAuthService);
  private requestHeader:HttpHeaders = new HttpHeaders(
    {
      "No-Auth": "True"
    }
  );
  constructor() { }
  login(loginData:UserLogin){
    return this.http.post(this.api + '/login',loginData,{headers:this.requestHeader});
  }
  signUp(signUpData:Signup){
    return this.http.post(this.api + '/registerUser',signUpData,{headers:this.requestHeader});
  }
  forUser(){
    return this.http.get(this.api+'/user',{responseType:'text'})
  }

  forAdmin(){
    return this.http.get(this.api+'/admin',{responseType:'text'})
  }
  isMatch(roles:string[]):boolean{
    let userRoles = this.userAuthService.getRoles();
    if(userRoles != null && userRoles.length > 0){
      return roles.some(role => userRoles.includes(role));
    }
    else{
      return false
    }
  }
}
