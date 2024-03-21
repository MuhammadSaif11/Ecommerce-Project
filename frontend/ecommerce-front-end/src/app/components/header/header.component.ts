import {  AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild, inject  } from '@angular/core';
import { Router } from '@angular/router';
import { NavToggleService } from 'src/app/shared/services/nav-toggle.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private renderer:Renderer2){}

  private navToggle:NavToggleService = inject(NavToggleService);
  private userAuthService:UserAuthService = inject(UserAuthService);
  public userFullname:string;

  @ViewChild("list") list: ElementRef;

  // @HostListener('click') onClick(){
  //   this.renderer.setStyle(this.openDropdown,"top","7rem");
  // }

  dropdown:boolean=false;
  toggle:boolean=false;

  ngOnInit(): void {
    this.userAuthService.userFullname.subscribe((userFullname) => {
      this.userFullname = userFullname;
    })
  }

  logout(){
    this.userAuthService.clear();
    this.dropdown = false;
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
}
