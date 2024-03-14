import {  AfterViewInit, Component, ElementRef, HostListener, Renderer2, ViewChild, inject  } from '@angular/core';
import { NavToggleService } from 'src/app/shared/services/nav-toggle.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {

  constructor(private renderer:Renderer2){}

  private navToggle:NavToggleService = inject(NavToggleService);

  @ViewChild("list") list: ElementRef;

  // @HostListener('click') onClick(){
  //   this.renderer.setStyle(this.openDropdown,"top","7rem");
  // }

  dropdown:boolean=false;
  toggle:boolean=false;

  ngAfterViewInit(): void {
    
  }

  openDropdown(){
    this.dropdown = !this.dropdown;
  }

  toggleSidebar() {
    this.toggle = !this.toggle;
    this.navToggle.toggleSidebar();
  }
}
