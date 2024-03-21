import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavToggleService {
  private isSidebarOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isSidebarOpen$: Observable<boolean> = this.isSidebarOpenSubject.asObservable();

  constructor() {}

  toggleSidebar() {
    this.isSidebarOpenSubject.next(!this.isSidebarOpenSubject.value);
  }

}
