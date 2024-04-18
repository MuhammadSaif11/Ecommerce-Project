import { Component, OnInit, inject } from '@angular/core';
import { CartService } from './services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/models/Cart.model';
import { SafeUrl } from '@angular/platform-browser';
import { ImageProcessingService } from 'src/app/shared/services/image-processing.service';
import { CartItem } from 'src/app/models/CartItem.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  cartService:CartService = inject(CartService);
  activeRoute:ActivatedRoute = inject(ActivatedRoute)
  imageProcessingService:ImageProcessingService = inject(ImageProcessingService);
  urls:SafeUrl[] = [];
  cart:Cart;
  totalAmount:number = 0;

  
  ngOnInit() {
    this.cart = this.activeRoute.snapshot.data['cart'];
    this.cart.cartItems.forEach(item =>{
      this.urls.push(this.imageProcessingService.getSingleUrlOfImageFile(item.product.productImages[0]))
    })
    this.cart.cartItems.forEach(item =>{
      console.log(item.product.productDiscountedPrice)
      this.totalAmount = this.totalAmount + item.product.productDiscountedPrice;
      console.log(this.totalAmount)
    })
    console.log(this.cart)

  //   this.cartService.getCart().subscribe({
  //     next:(response)=>{
  //       console.log(response)
  //     },
  //     error:(error)=>{
  //       console.log(error);
  //     }

  //   })
  }

  removeCartItem(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.cartItemId).subscribe({
      next:(response)=>{
        this.urls.splice(this.cart.cartItems.indexOf(cartItem),1)
        this.cart.cartItems.splice(this.cart.cartItems.indexOf(cartItem),1)
        console.log(response)
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  decreaseQuantity(cartItem:CartItem){
    if (cartItem.quantity === 1){
      this.removeCartItem(cartItem);
    }
    else{
      cartItem.quantity = cartItem.quantity - 1;
      const cartItemDto:CartItem = new CartItem(cartItem.cartItemId, null,cartItem.quantity)
      this.cartService.updateCartItem(cartItemDto).subscribe({
        next:(cartItem)=>{
          console.log(cartItem)
        },
        error:(error)=>{
          console.log(error)
        }
      })
    }
  }

  increaseQuantity(cartItem:CartItem){
    cartItem.quantity = cartItem.quantity + 1;
    const cartItemDto:CartItem = new CartItem(cartItem.cartItemId, null,cartItem.quantity)
    this.cartService.updateCartItem(cartItemDto).subscribe({
      next:(cartItem)=>{
        console.log(cartItem)
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }
}
