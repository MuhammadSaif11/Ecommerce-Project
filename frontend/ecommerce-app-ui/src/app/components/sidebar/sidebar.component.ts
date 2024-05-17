import { Component, inject } from '@angular/core';
import { NavToggleService } from 'src/app/shared/services/nav-toggle.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isSidebarOpen: boolean;
  private navToggle:NavToggleService = inject(NavToggleService);
  userAuthService:UserAuthService = inject(UserAuthService);

  ngOnInit(): void {
    this.navToggle.isSidebarOpen$.subscribe(isOpen => {
      this.isSidebarOpen = isOpen;
    });
  }
}
