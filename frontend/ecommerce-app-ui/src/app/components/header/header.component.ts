import {  AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild, inject  } from '@angular/core';
import { Router } from '@angular/router';
import { NavToggleService } from 'src/app/shared/services/nav-toggle.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { CartService } from '../container/components/cart/services/cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private renderer:Renderer2){}

  private navToggle:NavToggleService = inject(NavToggleService);
  private userAuthService:UserAuthService = inject(UserAuthService);
  private cartService:CartService = inject(CartService);
  private router:Router = inject(Router);
  public userFullname:string;
  public cartLength:number;

  dropdown:boolean=false;
  toggle:boolean=false;

  ngOnInit(): void {
    this.userAuthService.userFullname.subscribe((userFullname) => {
      this.userFullname = userFullname;
    })
    this.cartService.cartLength$.subscribe(data => {
      this.cartLength = data
    })
  }

  logout(){
    this.userAuthService.clear();
    this.dropdown = false;
    this.router.navigate(['/auth/login']);
  }

  openDropdown(){
    this.dropdown = !this.dropdown;
  }

  loggedIn(){
    return this.userAuthService.isLoggedIn()
  }

  toggleSidebar() {
    this.toggle = !this.toggle;
    this.navToggle.toggleSidebar();
  }

  isAdmin(){
    return this.userAuthService.isAdmin();
  }

  isUser(){
    return this.userAuthService.isUser();
  }

  toCart(){
    this.router.navigate(['/cart']);
  }

  getSearchValue(value:string){
    if(value.toLocaleLowerCase() === "products"){
      this.router.navigate(['/products']);
    }
    else if (value.toLocaleLowerCase() === "orders") {
      this.router.navigate(['/orders']);
    }
    else if (value.toLocaleLowerCase() === "cart") {
      this.router.navigate(['/cart']);
    }
    else if (value.toLocaleLowerCase() === "checkout") {
      this.router.navigate(['/checkout']);
    }
  }
}
