import { Component, ElementRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'src/validators/custom-validators';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/models/Product.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageProcessingService } from 'src/app/shared/services/image-processing.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {

  formBuilder: FormBuilder = inject(FormBuilder);
  router:Router = inject(Router);
  activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  imageProcessingService:ImageProcessingService = inject(ImageProcessingService);
  productService:ProductService = inject(ProductService);
  elementRef: ElementRef = inject(ElementRef);
  sanitizer:DomSanitizer = inject(DomSanitizer);
  productForm:FormGroup;
  imageUrls:any = [];
  isEdit = false;
  editProduct:any;

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
          const {navigationId,...rest} = history.state
          this.editProduct = {...rest}
        }
      }
    })
    if(this.isEdit){
      const {productId,...product} = this.editProduct
      this.productForm.setValue({...product})
      this.imageUrls = this.imageProcessingService.getUrlOfImageFile(this.editProduct.productImages)
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

  prepareFormData(product):FormData{
    const {productImages,...rest} = product
    const productDto = {
      'productId':this.editProduct?this.editProduct.productId:null,
      ...rest
    }
    const formData = new FormData();
    formData.append('product',new Blob([JSON.stringify(productDto)],{type:'application/json'}));
    productImages.forEach((img:File) => formData.append('productImages',img))
    return formData;
  }
  onFileSelected(event:any){
    const files = event.target.files;
    if (files && files.length !== 0) { 
      const productImagesControl = this.productForm.get('productImages');
      const currentValue = productImagesControl.value;
      currentValue.push(...files);
      productImagesControl.setValue(currentValue);
      Array.from(files).forEach((file:File) =>{
        this.imageUrls.push(this.imageProcessingService.getSingleUrlOfImageFile(file));
      });
      console.log(this.imageUrls)
    }
  }

  remove(index:number){
    this.imageUrls.splice(index,1);
    const productImagesControl = this.productForm.get('productImages');
    const currentValue = productImagesControl.value
    currentValue.splice(index,1);
    productImagesControl.setValue(currentValue);
  }
}
