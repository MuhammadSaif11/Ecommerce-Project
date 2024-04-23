import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Event ,ActivatedRoute, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { map } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { ImageProcessingService } from 'src/app/shared/services/image-processing.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-show-products-details',
  templateUrl: './show-products-details.component.html',
  styleUrls: ['./show-products-details.component.scss']
})
export class ShowProductsDetailsComponent implements OnInit {
  productService:ProductService = inject(ProductService);
  imageProcessingService:ImageProcessingService = inject(ImageProcessingService);
  router:Router = inject(Router);
  activeRoute:ActivatedRoute = inject(ActivatedRoute);
  openImagesComponent:boolean = false;
  products:Product[] = [];
  cols:string[] = ['id','name','description','actual price','discounted price','images','edit','delete'];
  url:SafeUrl[];

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.products = this.activeRoute.snapshot.data['products'].content;
    // response.subscribe({
    //   next:(res)=>{
    //     console.log(res);
    //   }
    // })
    // this.productService.getAllProducts().subscribe({
    //   next:(products:any)=>{
    //     products.forEach((prod)=>{
    //       const files:File[] = this.imageProcessingService.byteToFile(prod.productImages);
    //       const product = new Product(
    //         prod.productId,
    //         prod.productName,
    //         prod.productDescription,
    //         prod.productActualPrice,
    //         prod.productDiscountedPrice,
    //         files);
    //         this.products.push(product)
    //     })
    //   },
    //   error:(error:HttpErrorResponse)=>{
    //     console.log(error);
    //   }
    // })
  }
  openImages(productImages:File[]){
    this.url = this.imageProcessingService.getUrlOfImageFile(productImages)
    this.openImagesComponent = true;
  }
  closeImagesComponent(value: boolean) {
    this.openImagesComponent = value;
  }

  deleteProduct(product:Product){
    this.productService.deleteProduct(product.productId).subscribe({
      next:()=>{
        this.products.splice(this.products.indexOf(product), 1);
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error);
      }
    })
  }
  editProduct(product:Product){
    this.router.navigate(['/products/' + product.productId+'/edit'],{state:product});
  }
}
