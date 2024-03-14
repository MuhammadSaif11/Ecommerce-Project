import { Component, OnInit, inject } from '@angular/core';
import { NavToggleService } from 'src/app/shared/services/nav-toggle.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  isSidebarOpen: boolean;
  private navToggle:NavToggleService = inject(NavToggleService);

  ngOnInit(): void {
    this.navToggle.isSidebarOpen$.subscribe(isOpen => {
      this.isSidebarOpen = isOpen;
    });
  }
}
