import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() placeholder:string;
  @Output() searchValue: EventEmitter<string> = new EventEmitter<string>();
  search(value:string){
    this.searchValue.emit(value);
  }
}
