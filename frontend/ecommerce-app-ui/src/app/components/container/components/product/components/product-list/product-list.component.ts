import { Component, OnInit, inject } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product.model';
import { ImageProcessingService } from 'src/app/shared/services/image-processing.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  activeRoute:ActivatedRoute = inject(ActivatedRoute);
  imageProcessingService:ImageProcessingService = inject(ImageProcessingService);
  products:Product[] = [];
  url:SafeUrl[] = [];

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.products = this.activeRoute.snapshot.data['products'];
    console.log(this.products)
    this.products.forEach(product =>{
      const safeUrl:SafeUrl = this.imageProcessingService.getSingleUrlOfImageFile(product.productImages[0]);
      this.url.push(safeUrl);
    })
  }
}
