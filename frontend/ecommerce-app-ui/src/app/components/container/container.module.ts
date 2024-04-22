import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerRoutingModule } from './container-routing.module';
import { ProductComponent } from './components/product/product.component';
import { AuthComponent } from './components/auth/auth.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderComponent } from './components/order/order.component';
import { OrderViewDetailComponent } from './components/order/components/order-view-detail/order-view-detail.component';



@NgModule({
  declarations: [
    ProductComponent,
    AuthComponent,
    CartComponent,
    CheckoutComponent,
    OrderComponent,
    OrderViewDetailComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    ContainerRoutingModule,
    SharedModule
  ],
})
export class ContainerModule { }
