import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { Order } from 'src/app/models/Order.model';
import { OrderDto } from 'src/app/models/OrderDto.model';
import { ImageProcessingService } from './image-processing.service';
import { OrderItem } from 'src/app/models/OrderItem.model';

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

  getAllOrders(){
    return this.http.get<Order[]>(this.api)
  }
}

export const orderResolve = ():Observable<Order[] | HttpErrorResponse> =>{
  const imageProcessingService:ImageProcessingService = inject(ImageProcessingService);
  const orderService:OrderService = inject(OrderService);
  return orderService.getAllOrders().pipe(map((orders:any)=>{
    return orders.map((order:Order)=>{
      order.orderItems.map((orderItem:any)=>{
        const file:File = imageProcessingService.byteToFile2(orderItem.product.productImages[0])
        orderItem.product.productImages = [file]
        return orderItem;
      })
      return order
    })
    
  })).pipe(catchError((error:HttpErrorResponse) => {
    return of(error)
  }))
}