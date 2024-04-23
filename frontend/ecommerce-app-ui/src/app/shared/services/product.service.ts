import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { ImageProcessingService } from './image-processing.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Page } from 'src/app/models/Page.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private api:string = 'http://localhost:8080/products';
  private http:HttpClient = inject(HttpClient);
  activatedRoute = inject(ActivatedRoute);
  private requestHeader:HttpHeaders = new HttpHeaders(
    {
      "No-Auth": "True"
    }
  );

  addProduct(product:FormData){
    return this.http.post<Product>(this.api + '/add',product)
  }

  getAllProducts(pageNumber:number = 0){
    return this.http.get(this.api+`?pageNumber=${pageNumber}` ,{headers:this.requestHeader})
  }

  getProductById(productId:bigint){
    return this.http.get(this.api + `/${productId}`,{headers:this.requestHeader})
  };
  
  deleteProduct(productId:bigint){
    return this.http.delete(this.api + `/${productId}`);
  }
}



export const singleProductResolve:ResolveFn<Product | HttpErrorResponse> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
):Observable<Product | HttpErrorResponse>=>{
  const productService = inject(ProductService);
  const imageProcessingService = inject(ImageProcessingService);
  const productId = route.paramMap.get("productId");
  return productService.getProductById(BigInt(productId)).pipe(map((product:any) =>{
    const files = imageProcessingService.byteToFile(product.productImages);
    return { ...product, productImages: files};
  })).pipe(catchError((error:HttpErrorResponse)=>{
    return of(error);
  }))
}

// export const productResolve:ResolveFn<Product[]> = ():Observable<Product[]>=>{
//   const productService = inject(ProductService);
//   const imageProcessingService = inject(ImageProcessingService);
//   return productService.getAllProducts().pipe(map((product:any) =>{
//     return product.map(product => {
//       const files = imageProcessingService.byteToFile(product.productImages);
//       return { ...product, productImages: files };
//     });
//   }))
// }

export const productResolve:ResolveFn<Page<Product> | HttpErrorResponse> = 
(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
):Observable<Page<Product>|HttpErrorResponse>=>{
  const productService = inject(ProductService);
  const imageProcessingService = inject(ImageProcessingService);
  let pageNumber = route.queryParams['pageNumber'];
  if(pageNumber!==undefined && pageNumber!==null) {
    pageNumber = parseInt(pageNumber)-1;
  }
  return productService.getAllProducts(pageNumber).pipe(map((page:Page<Product>) =>{
    page.content.map((product:Product) =>{
      const files = imageProcessingService.byteToFile(product.productImages);
      product.productImages = files
      return product
    })
    return page;
  }))
}

// export const resolve = ()=>{
//   return new Observable((data)=>{
//     setTimeout(()=>{
//       data.next("hello")
//     },5000)
//   })
// }