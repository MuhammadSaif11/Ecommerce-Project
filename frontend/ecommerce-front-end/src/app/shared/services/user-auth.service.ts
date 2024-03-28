import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public userFullname:BehaviorSubject<string> = new BehaviorSubject<string>(this.getuserFullname() ? this.getuserFullname() : null);

  public setRoles(roles: string[]) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles():string[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : null;
  }

  public setToken(token: string) {
    localStorage.setItem('token', token);
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public setuserFullname(userFullname: string) {
    return localStorage.setItem('userFullname', userFullname);
  }

  public getuserFullname() {
     return localStorage.getItem('userFullname'); 
  }

  public setEmail(email: string) {
    return localStorage.setItem('email', email);
  }

  public getEmail() {
     return localStorage.getItem('email'); 
  }

  public clear() {
    localStorage.clear();
  }
  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }
}
