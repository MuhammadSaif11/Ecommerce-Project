import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { AuthComponent } from './components/auth/auth.component';
import { CartComponent } from './components/cart/cart.component';
import { cartResolve } from './components/cart/services/cart.service';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderComponent } from './components/order/order.component';
import { orderResolve } from 'src/app/shared/services/order.service';

const routes: Routes = [
  {path:"products",component:ProductComponent,loadChildren:()=> import("./components/product/product-routing.module").then(r=>r.ProductRoutingModule)},
  {path: 'auth', component:AuthComponent,loadChildren:()=> import("./components/auth/auth-routing.module").then(r=>r.AuthRoutingModule)},
  {path:"cart",component:CartComponent,resolve:{cart:cartResolve},data:{roles:["ROLE_USER"]}},
  {path:"checkout",component:CheckoutComponent,resolve:{cart:cartResolve},data:{roles:["ROLE_USER"]}},
  {path:"orders",component:OrderComponent,resolve:{orders:orderResolve},data:{roles:["ROLE_USER"]}},
  {path:"",redirectTo:"products",pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
