import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { Order } from 'src/app/models/Order.model';
import { OrderDto } from 'src/app/models/OrderDto.model';
import { ImageProcessingService } from './image-processing.service';
import { OrderDetail } from 'src/app/models/OrderDetail.model';

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

  getAllOrderDetails(){
    return this.http.get<OrderDetail[]>(this.api+"/details")
  }

  setOrderStatusDelivered(orderId:bigint){
    return this.http.get(this.api+`/details/${orderId}`)
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

export const orderDetailResolve = ():Observable<OrderDetail[] | HttpErrorResponse>=>{
  const orderService = inject(OrderService);
  return orderService.getAllOrderDetails().pipe(catchError((error:HttpErrorResponse) => {
    return of(error)
  }))
}