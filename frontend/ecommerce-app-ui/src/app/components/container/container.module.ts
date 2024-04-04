import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerRoutingModule } from './container-routing.module';
import { ProductComponent } from './components/product/product.component';
import { AuthComponent } from './components/auth/auth.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ProductComponent,
    AuthComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    ContainerRoutingModule,
    SharedModule
  ],
})
export class ContainerModule { }
