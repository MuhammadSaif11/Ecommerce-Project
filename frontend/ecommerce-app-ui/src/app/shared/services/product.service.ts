import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from 'src/app/models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private api:string = 'http://localhost:8080/product';
  private http:HttpClient = inject(HttpClient);

  addProduct(product:Product){
    console.log(product);
    return this.http.post<Product>(this.api + '/add',product)
  }
}
