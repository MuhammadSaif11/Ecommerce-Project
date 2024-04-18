import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product.model';
import { ImageProcessingService } from 'src/app/shared/services/image-processing.service';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.scss']
})
export class ProductViewDetailsComponent implements OnInit{
  activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  imageProcessingService:ImageProcessingService = inject(ImageProcessingService);
  cartService:CartService = inject(CartService);
  product:Product;
  selectedImage:SafeUrl;
  urls:SafeUrl[] = [];

  ngOnInit(): void {
    const data = this.activatedRoute.snapshot.data['product'];
    if(data instanceof HttpErrorResponse){
      console.log(data)
    }
    else{
      this.product = data;
    }
    this.urls = this.imageProcessingService.getUrlOfImageFile(this.product.productImages);
    this.selectedImage = this.urls[0];
  }

  change(i){
    this.selectedImage = this.urls[i];
  }

  addToCart(productId:bigint){
    const cartDto : {productId:bigint,quantity:Number} = {
      productId:productId,
      quantity:1
    }
    this.cartService.addToCart(cartDto).subscribe({
      next: (res) =>{
        console.log(res);
      },
      error: (err) =>{
        console.log(err);
      }
    });
  }
}
