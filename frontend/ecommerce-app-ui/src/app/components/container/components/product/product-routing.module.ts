import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { canActivate } from 'src/app/auth/auth.guard';
import { ShowProductsDetailsComponent } from './components/show-products-details/show-products-details.component';
import { productResolve, singleProductResolve } from 'src/app/shared/services/product.service';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductViewDetailsComponent } from './components/product-view-details/product-view-details.component';

const routes: Routes = [
  {path:"add",component:AddProductComponent,canActivate:[canActivate],data:{roles:["ROLE_ADMIN"]}},
  {path:":productId/edit",component:AddProductComponent,canActivate:[canActivate],data:{roles:["ROLE_ADMIN"]}},
  {path:"details", component:ShowProductsDetailsComponent,resolve:{products:productResolve},canActivate:[canActivate],data:{roles:["ROLE_ADMIN"]}},
  {path:":productId",component:ProductViewDetailsComponent,resolve:{product:singleProductResolve},data:{roles:["ROLE_USER"]}},
  {path:"",component:ProductListComponent,resolve:{products:productResolve},runGuardsAndResolvers: 'paramsOrQueryParamsChange'}
];
const routerOptions: ExtraOptions = {
  paramsInheritanceStrategy: 'always'
};
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
