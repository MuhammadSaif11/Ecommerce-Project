import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit  {
  router:Router = inject(Router);
  activeRoute:ActivatedRoute = inject(ActivatedRoute);
  selectedOne:number;
  @Input() totalPages:number;
  @Output() value:EventEmitter<number> = new EventEmitter<number>();
  ngOnInit() {
    this.selectedOne = this.activeRoute.snapshot.queryParams['pageNumber']?
    parseInt(this.activeRoute.snapshot.queryParams['pageNumber']):1;
  }
  counter(num:number){
    return new Array(num);
  }
  changePage(value:number){
    this.selectedOne = value;
    this.value.emit(value)
  }
  previous(){
    if(this.selectedOne > 1){
      this.selectedOne -= 1;
      this.value.emit(this.selectedOne)
    }
  }

  next(){
    if(this.selectedOne < this.totalPages){
      this.selectedOne += 1;
      this.value.emit(this.selectedOne)
    }
  }
}
