import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { canActivate } from 'src/app/auth/auth.guard';

const routes: Routes = [
  {path:"add",component:AddProductComponent},
  {path:"",redirectTo:"add",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
