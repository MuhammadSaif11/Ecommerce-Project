import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { CartItem } from 'src/app/models/CartItem.model';
import { OrderDto } from 'src/app/models/OrderDto.model';
import { OrderItemDto } from 'src/app/models/OrderItemDto.model';
import { ImageProcessingService } from 'src/app/shared/services/image-processing.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  orderService:OrderService = inject(OrderService);
  imageProcessingService: ImageProcessingService = inject(ImageProcessingService);
  checkoutForm:FormGroup;
  cartItems:CartItem[];
  orderDto:OrderDto;
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
        console.log(response)
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
}
