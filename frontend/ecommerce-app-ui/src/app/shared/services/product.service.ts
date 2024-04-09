import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from 'src/app/models/Product.model';

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
