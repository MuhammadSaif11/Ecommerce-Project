import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomError } from 'src/app/models/CustomError.model';
import { Product } from 'src/app/models/Product.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  productForm:FormGroup;
  router:Router = inject(Router);
  productService:ProductService = inject(ProductService);
  error:CustomError;

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      'productName':["",[Validators.required]],
      'productDescription':["",[Validators.required]],
      'productActualPrice':[0,[Validators.required]],
      'productDiscountedPrice':[0,[Validators.required]],
    })
  }
  addProduct(){
    console.log(this.productForm.value)
    this.productService.addProduct(this.productForm.value).subscribe({
      next:(response:Product)=>{
        console.log(response)
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }


}
