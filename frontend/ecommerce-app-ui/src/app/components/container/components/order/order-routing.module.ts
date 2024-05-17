import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate } from 'src/app/auth/auth.guard';
import { ShowOrderDetailsComponent } from './components/show-order-details/show-order-details.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { orderDetailResolve, orderResolve } from 'src/app/shared/services/order.service';

const routes: Routes = [
  {path:'details',component:ShowOrderDetailsComponent,resolve:{ordersDetail:orderDetailResolve},canActivate:[canActivate],data:{roles:["ROLE_ADMIN"]}},
  {path:'',component:OrderListComponent,resolve:{orders:orderResolve},canActivate:[canActivate],data:{roles:["ROLE_USER"]},pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
