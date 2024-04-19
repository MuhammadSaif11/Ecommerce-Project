import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { CartItem } from 'src/app/models/CartItem.model';
import { ImageProcessingService } from 'src/app/shared/services/image-processing.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  imageProcessingService: ImageProcessingService = inject(ImageProcessingService);
  checkoutForm:FormGroup;
  cartItems:CartItem[];
  urls:SafeUrl[] = [];
  totalAmount:number;
  // userService:UserService = inject(UserService);
  // userAuthService:UserAuthService = inject(UserAuthService);
  // router:Router = inject(Router);
  // error:CustomError;
  // cartService:CartService = inject(CartService);


  ngOnInit() {
    const {cartItems,totalAmount,...rest} = history.state.data;
    this.cartItems = cartItems;
    this.totalAmount = totalAmount;
    this.cartItems.forEach((cartItem) => {
      this.urls.push(this.imageProcessingService.getSingleUrlOfImageFile(cartItem.product.productImages[0]))
    })
    this.checkoutForm = this.formBuilder.group({
      "fullname":['',[Validators.required]],
      "contactNumber":['',[Validators.required]],
      "fullAddress":['',[Validators.required]],
    })
  }

  placeOrder(){

  }
}
