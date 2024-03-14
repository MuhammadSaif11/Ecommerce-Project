import { Component, inject } from '@angular/core';
import { NavToggleService } from 'src/app/shared/services/nav-toggle.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isSidebarOpen: boolean;
  private navToggle:NavToggleService = inject(NavToggleService);

  ngOnInit(): void {
    this.navToggle.isSidebarOpen$.subscribe(isOpen => {
      this.isSidebarOpen = isOpen;
    });
  }
}
