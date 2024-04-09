import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { canActivate } from 'src/app/auth/auth.guard';
import { ShowProductsDetailsComponent } from './components/show-products-details/show-products-details.component';

const routes: Routes = [
  {path:"add",component:AddProductComponent},
  {path:":productId/edit",component:AddProductComponent},
  {path:"", component:ShowProductsDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
