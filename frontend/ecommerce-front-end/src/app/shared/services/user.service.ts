import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { UserLogin } from 'src/app/models/UserLogin.model';
import { Subject } from 'rxjs';
import { Otp } from 'src/app/models/Otp.model';
import { User } from 'src/app/models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api:string = 'http://localhost:8080';
  private http:HttpClient = inject(HttpClient);
  private userAuthService:UserAuthService = inject(UserAuthService);
  private requestHeader:HttpHeaders = new HttpHeaders(
    {
      "No-Auth": "True"
    }
  );
  public userEmail:Subject<string> = new Subject<string>();

  constructor() { }
  login(loginData:UserLogin){
    return this.http.post(this.api + '/login',loginData,{headers:this.requestHeader});
  }
  signUp(user:User){
    return this.http.post(this.api + '/registerUser',user,{headers:this.requestHeader});
  }
  forUser(){
    return this.http.get(this.api+'/user',{responseType:'text'})
  }

  forAdmin(){
    return this.http.get(this.api+'/admin');
  }
  forgotPassword(emailOrUsername:string){
    return this.http.post(this.api + '/forgot-password',emailOrUsername,{headers:this.requestHeader});
  }
  verifyOtp(otp:Otp){
    console.log(otp);
    return this.http.post(this.api + '/verify-otp',otp,{headers:this.requestHeader});
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
