import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private api:string = 'http://localhost:8080/products';
  private http:HttpClient = inject(HttpClient);
  private requestHeader:HttpHeaders = new HttpHeaders(
    {
      "No-Auth": "True"
    }
  );

  addProduct(product:FormData){
    return this.http.post<Product>(this.api + '/add',product)
  }

  getAllProducts(){
    return this.http.get(this.api ,{headers:this.requestHeader})
  }

  deleteProduct(productId:bigint){
    return this.http.delete(this.api + `/${productId}` ,{headers:this.requestHeader});
  }
}

export const productResolve = ():Observable<Product[]>=>{
  const productService = inject(ProductService);
  const imageProcessingService = inject(ImageProcessingService);
  return productService.getAllProducts().pipe(map((product:any) =>{
    return product.map(product => {
      const files = imageProcessingService.byteToFile(product.productImages);
      return { ...product, productImages: files };
    });
  }))
}

// export const resolve = ()=>{
//   return new Observable((data)=>{
//     setTimeout(()=>{
//       data.next("hello")
//     },5000)
//   })
// }