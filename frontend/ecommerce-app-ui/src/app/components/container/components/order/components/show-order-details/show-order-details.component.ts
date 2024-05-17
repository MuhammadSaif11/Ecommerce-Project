import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { OrderDetail } from 'src/app/models/OrderDetail.model';
import { Role } from 'src/app/models/Role.model';
import { OrderService, orderResolve } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-show-order-details',
  templateUrl: './show-order-details.component.html',
  styleUrls: ['./show-order-details.component.scss']
})
export class ShowOrderDetailsComponent implements OnInit  {
  cols:string[] = ['id','product name','fullname','address','contact number','status','actions'];
  orderService:OrderService = inject(OrderService);
  activeRoute:ActivatedRoute = inject(ActivatedRoute);
  router:Router = inject(Router);
  orders:OrderDetail[] = [];

  ngOnInit() {
    console.log("reload")
    this.getOrderDetails();
    // this.orderService.getAllOrderDetails().subscribe({
    //   next:(response:OrderDetail[])=>{
    //     console.log(response);
    //     this.orders = response
    //     console.log(this.orders)
    //   },
    //   error:(error)=>{
    //     console.log(error);
    //   }
    // })
  }

  getOrderDetails(){
    this.activeRoute.data.subscribe(data =>{
      if(data['ordersDetail']!==null){
        this.orders = data['ordersDetail'];
      }
    })
    // const orderDetails = this.activeRoute.snapshot.data['ordersDetail'];
    // if(orderDetails!==null){
    //   this.orders = orderDetails;
    // }
  }
  changeOrderStatus(orderId:bigint){
    this.orderService.setOrderStatusDelivered(orderId).subscribe({
      next:(res)=>{
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/orders/details']);
        });  
        console.log(res);
      }
    })
  }
}
