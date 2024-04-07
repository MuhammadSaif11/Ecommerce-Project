import { Component, OnInit, inject } from '@angular/core';
import { NavToggleService } from 'src/app/shared/services/nav-toggle.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  isSidebarOpen: boolean;
  private navToggle:NavToggleService = inject(NavToggleService);
  private userAuthService:UserAuthService = inject(UserAuthService);

  ngOnInit(): void {
    this.navToggle.isSidebarOpen$.subscribe(isOpen => {
      this.isSidebarOpen = isOpen;
    });
  }

  isAdmin(){
    return this.userAuthService.isAdmin();
  }

  loggedIn(){
    return this.userAuthService.isLoggedIn()
  }
}
