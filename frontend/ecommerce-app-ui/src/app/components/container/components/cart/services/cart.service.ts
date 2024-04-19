import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Cart } from 'src/app/models/Cart.model';
import { CartItem } from 'src/app/models/CartItem.model';
import { ImageProcessingService } from 'src/app/shared/services/image-processing.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartLength:number;
  cartLengthSubject:BehaviorSubject<number> = new BehaviorSubject<number>(null);
  cartLength$ = this.cartLengthSubject.asObservable();
  userAuthService:UserAuthService = inject(UserAuthService);
  private api:string = 'http://localhost:8080/carts';
  private http:HttpClient = inject(HttpClient);

  constructor() {
    if(this.userAuthService.isUser()){
      this.getCartLength().subscribe({
        next:(length:number)=>{
          this.cartLengthSubject.next(length)
        }
      })
    }
  }

  addToCart(cartDto){
    // const currentProducts = this.cartProductSubject.getValue();
    // this.cartProductSubject.next([...currentProducts,product]);
    const currentCartLength  = this.cartLengthSubject.getValue();
    this.cartLengthSubject.next(currentCartLength + 1)
    return this.http.post(this.api , cartDto)
  }

  getCart(){
    return this.http.get<Cart>(this.api);
  }

  getCartLength(){
    return this.http.get<number>(this.api+"/length")
  }

  removeFromCart(cartItemId:bigint){
    const currentLength = this.cartLengthSubject.getValue();
    this.cartLengthSubject.next(currentLength - 1);
    return this.http.delete(this.api+`/cartItem/${cartItemId}`)
  }

  updateCartItem(cartItem:CartItem){
    return this.http.post(this.api+"/cartItem",cartItem)
  }
}

export const cartResolve = ():Observable<Cart>=>{
  const cartService = inject(CartService)
  const imageProcessingService = inject(ImageProcessingService);
  return cartService.getCart().pipe(map((cart:Cart)=>{
   cart.cartItems.map(cartItem =>{
      const files:File[] = imageProcessingService.byteToFile([cartItem.product.productImages[0]]);
      cartItem.product.productImages = files;
      return cartItem;
    });
    return cart
  }))
}
