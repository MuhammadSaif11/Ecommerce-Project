import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { AddProductComponent } from './components/add-product/add-product.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShowProductsDetailsComponent } from './components/show-products-details/show-products-details.component';
import { ShowProductImagesComponent } from './components/show-product-images/show-product-images.component';
import { ProductListComponent } from './components/product-list/product-list.component';


@NgModule({
  declarations: [
    AddProductComponent,
    ShowProductsDetailsComponent,
    ShowProductImagesComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ]
})
export class ProductModule { }
