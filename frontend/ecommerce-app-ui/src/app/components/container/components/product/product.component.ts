import { Component, inject } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  router:Router = inject(Router);
  showLoader:boolean = false;


  ngOnInit() {
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
}
