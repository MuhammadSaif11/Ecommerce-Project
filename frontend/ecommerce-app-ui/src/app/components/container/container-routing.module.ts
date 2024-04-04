import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  { path:"product",component:ProductComponent,loadChildren:()=> import("./components/product/product-routing.module").then(r=>r.ProductRoutingModule)},
  {path: 'auth', component:AuthComponent,loadChildren:()=> import("./components/auth/auth-routing.module").then(r=>r.AuthRoutingModule)},
  {path:"",redirectTo:"product",pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
