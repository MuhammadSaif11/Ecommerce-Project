import { ChangeDetectorRef, Component, ElementRef, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomError } from 'src/app/models/CustomError.model';
import { CustomValidators } from 'src/validators/custom-validators';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/models/Product.model';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  formBuilder: FormBuilder = inject(FormBuilder);
  productForm:FormGroup;
  router:Router = inject(Router);
  activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  productService:ProductService = inject(ProductService);
  elementRef: ElementRef = inject(ElementRef);
  error:CustomError;
  sanitizer:DomSanitizer = inject(DomSanitizer);
  urls:any = [];
  isEdit = false;
  productId:bigint;
  product:any;

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      'productName':["",[Validators.required]],
      'productDescription':["",[Validators.required]],
      'productActualPrice':[null,[Validators.required]],
      'productDiscountedPrice':[null,[Validators.required]],
      'productImages':[[],[CustomValidators.requiredFile]]
    })
    this.activatedRoute.params.subscribe({
      next:(param)=>{
        if(param['productId']){
          this.isEdit = true;
          this.productId = param['productId'];
          this.product = history.state
        }
      }
    })
    if(this.isEdit){
      this.productForm.setValue({
        'productName':this.product.productName,
        'productDescription':this.product.productDescription,
        'productActualPrice':this.product.productActualPrice,
        'productDiscountedPrice':this.product.productDiscountedPrice,
        'productImages':this.product.productImages
      });
      Array.from(this.product.productImages).forEach((file:File) => this.urls.push(this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))))
    }
  }
  addProduct(){
    const formdata:FormData = this.prepareFormData(this.productForm.value);
    this.productService.addProduct(formdata).subscribe({
      next:(response:Product)=>{
        console.log(response)
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

  prepareFormData(product: Product):FormData{
    const productDto = {
      'productId':this.product?this.product.productId:null,
      'productName':this.productForm.get('productName').value,
      'productDescription':this.productForm.get('productDescription').value,
      'productActualPrice':this.productForm.get('productActualPrice').value,
      'productDiscountedPrice':this.productForm.get('productDiscountedPrice').value,
    }
    const formData = new FormData();
    formData.append('product',new Blob([JSON.stringify(productDto)],{type:'application/json'}));
    const productImages = this.productForm.get('productImages').value;
    productImages.forEach((img:File) => formData.append('productImages',img))
    return formData;
  }
  onFileSelected(event:any){
    const files = event.target.files;
    if (files && files.length !== 0) { 
      const productImagesControl = this.productForm.get('productImages');
      const currentValue = productImagesControl.value || [];
      currentValue.push(...files);
      productImagesControl.setValue(currentValue);
      Array.from(files).forEach((file:File) => this.urls.push(this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))))
    }
  }

  remove(index:number){
    this.urls.splice(index,1);
    const productImagesControl = this.productForm.get('productImages');
    const currentValue = productImagesControl.value
    currentValue.splice(index,1);
    productImagesControl.setValue(currentValue);
    console.log(this.productForm.value)
  }
}
