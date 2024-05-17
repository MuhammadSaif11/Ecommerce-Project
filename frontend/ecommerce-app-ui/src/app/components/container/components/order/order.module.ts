import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';
import { OrderViewDetailComponent } from './components/order-view-detail/order-view-detail.component';
import { ShowOrderDetailsComponent } from './components/show-order-details/show-order-details.component';
import { OrderListComponent } from './components/order-list/order-list.component';


@NgModule({
  declarations: [
    OrderViewDetailComponent,
    ShowOrderDetailsComponent,
    OrderListComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule
  ]
})
export class OrderModule { }
