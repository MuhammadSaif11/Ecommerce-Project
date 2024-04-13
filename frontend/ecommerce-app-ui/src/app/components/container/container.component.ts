import { Component, OnInit, inject } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event } from '@angular/router';
import { NavToggleService } from 'src/app/shared/services/nav-toggle.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  navToggle:NavToggleService = inject(NavToggleService);
  userAuthService:UserAuthService = inject(UserAuthService);
  router:Router = inject(Router);
  isSidebarOpen: boolean;
  showLoader:boolean = false;


  ngOnInit(): void {
    this.navToggle.isSidebarOpen$.subscribe(isOpen => {
      this.isSidebarOpen = isOpen;
    });
    this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationStart){
        this.showLoader = true
      }
      if(
        event instanceof NavigationEnd || 
        event instanceof NavigationCancel ||
        event instanceof NavigationError){
          this.showLoader = false
        }
    })
  }

  isAdmin(){
    return this.userAuthService.isAdmin();
  }

  loggedIn(){
    return this.userAuthService.isLoggedIn()
  }
}
