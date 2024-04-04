import { Component, OnInit, inject } from '@angular/core';
import { NavToggleService } from 'src/app/shared/services/nav-toggle.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  isSidebarOpen: boolean;
  private navToggle:NavToggleService = inject(NavToggleService);

  ngOnInit(): void {
    this.navToggle.isSidebarOpen$.subscribe(isOpen => {
      this.isSidebarOpen = isOpen;
    });
  }
}
