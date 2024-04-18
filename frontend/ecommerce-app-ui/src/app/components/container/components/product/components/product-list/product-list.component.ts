import { Component, OnInit, inject } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Product.model';
import { ImageProcessingService } from 'src/app/shared/services/image-processing.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  activeRoute:ActivatedRoute = inject(ActivatedRoute);
  userAuthService:UserAuthService = inject(UserAuthService);
  router:Router = inject(Router);
  imageProcessingService:ImageProcessingService = inject(ImageProcessingService);
  products:Product[] = [];
  url:SafeUrl[] = [];
  isUser:boolean;

  ngOnInit(): void {
    this.getAllProducts();
    this.isUser = this.userAuthService.isUser();
  }



  getAllProducts(){
    this.products = this.activeRoute.snapshot.data['products'];
    this.products.forEach(product =>{
      const safeUrl:SafeUrl = this.imageProcessingService.getSingleUrlOfImageFile(product.productImages[0]);
      this.url.push(safeUrl);
    })
  }

  navigate(productId:BigInt){
    this.router.navigate(['/products/' + productId]);
  }
}
