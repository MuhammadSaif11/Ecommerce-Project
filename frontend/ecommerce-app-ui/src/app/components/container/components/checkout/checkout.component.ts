import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { CartItem } from 'src/app/models/CartItem.model';
import { OrderDto } from 'src/app/models/OrderDto.model';
import { OrderItemDto } from 'src/app/models/OrderItemDto.model';
import { ImageProcessingService } from 'src/app/shared/services/image-processing.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { CartService } from '../cart/services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  cartService: CartService = inject(CartService);
  orderService:OrderService = inject(OrderService);
  activeRoute:ActivatedRoute = inject(ActivatedRoute)
  imageProcessingService: ImageProcessingService = inject(ImageProcessingService);
  checkoutForm:FormGroup;
  cartItems:CartItem[];
  orderDto:OrderDto;
  urls:SafeUrl[] = [];
  totalAmount:number = 0;
  // userService:UserService = inject(UserService);
  // userAuthService:UserAuthService = inject(UserAuthService);
  // router:Router = inject(Router);
  // error:CustomError;
  // cartService:CartService = inject(CartService);


  ngOnInit() {
    // const {cartItems,totalAmount,...rest} = history.state.data;
    // this.cartItems = cartItems;
    // this.totalAmount = totalAmount;
    // this.cartItems.forEach((cartItem) => {
    //   this.urls.push(this.imageProcessingService.getSingleUrlOfImageFile(cartItem.product.productImages[0]))
    // })
    this.cartItems = this.activeRoute.snapshot.data['cart'].cartItems;
    this.cartItems.forEach(item =>{
      this.urls.push(this.imageProcessingService.getSingleUrlOfImageFile(item.product.productImages[0]))
    })
    this.cartItems.forEach(item =>{
      this.totalAmount += (item.product.productDiscountedPrice * item.quantity);
    })
    this.checkoutForm = this.formBuilder.group({
      "fullName":['',[Validators.required]],
      "contactNumber":['',[Validators.required]],
      "fullAddress":['',[Validators.required]],
    })
  }

  placeOrder(){
    this.orderDto = new OrderDto();
    const formValue = this.checkoutForm.value
    const orderItemDto:OrderItemDto[] = [];
    this.cartItems.forEach(item =>{
      orderItemDto.push({productId:item.product.productId, quantity:item.quantity})
    })
    this.orderDto = {...formValue, orderItem:orderItemDto}
    console.log(this.orderDto)
    this.orderService.saveOrder(this.orderDto).subscribe({
      next:(response)=>{
        if(response !== null){
          this.cartService.cartLengthSubject.next(0)
        }
        console.log(response)
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
}
