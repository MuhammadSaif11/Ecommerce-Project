import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-show-product-images',
  templateUrl: './show-product-images.component.html',
  styleUrls: ['./show-product-images.component.scss']
})
export class ShowProductImagesComponent {
  @Input() urls:SafeUrl[];
  @Output() closeComponent :EventEmitter<boolean> = new EventEmitter<boolean>();

  close(){
    this.closeComponent.emit(false);
  }
}
