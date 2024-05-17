import { Component, OnInit, inject } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent{
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
