import { Component, OnInit, inject } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/Order.model';
import { ImageProcessingService } from 'src/app/shared/services/image-processing.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orderService: OrderService = inject(OrderService);
  imageService: ImageProcessingService = inject(ImageProcessingService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  orders: Order[] = [];
  urls: any[] = [];

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.data['orders'])
    if(this.activatedRoute.snapshot.data['orders']){
      this.orders = this.activatedRoute.snapshot.data['orders'];
      this.orders.forEach((order) => {
        const url: SafeUrl[] = [];
        order.orderItems.forEach((orderItem) => {
          url.push(this.imageService.getSingleUrlOfImageFile(orderItem.product.productImages[0]));
        });
        this.urls.push(url);
      });
    }

    // this.orderService.getAllOrders().subscribe({
    //   next:(response:Order[])=>{
    //     this.orders = response;
    //     this.orders.forEach(order =>{
    //       const url:SafeUrl[] = []
    //       order.orderItems.forEach(orderItem =>{
    //         const file:File = this.imageService.byteToFile2(orderItem.product.productImages[0])
    //         url.push(this.imageService.getSingleUrlOfImageFile(file))
    //       })
    //       this.urls.push(url)
    //       console.log(this.urls)
    //     })
    //   },
    //   error:(error)=>{
    //     console.log(error);
    //   }
    // })
  }

}
