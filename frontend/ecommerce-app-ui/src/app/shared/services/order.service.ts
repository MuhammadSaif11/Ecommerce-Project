import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDto } from 'src/app/models/OrderDto.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private api:string = "http://localhost:8080/orders";
  private http:HttpClient = inject(HttpClient);
  activatedRoute = inject(ActivatedRoute);

  constructor() { }

  saveOrder(orderDto:OrderDto){
    return this.http.post(this.api , orderDto)
  }
}
