package com.app.ecommerce.controller;

import com.app.ecommerce.dto.CartDto;
import com.app.ecommerce.dto.SimpleMessageResponseDto;
import com.app.ecommerce.entity.Cart;
import com.app.ecommerce.entity.CartItem;
import com.app.ecommerce.entity.User;
import com.app.ecommerce.service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin
@RequestMapping("/carts")
public class CartController {

    private CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PreAuthorize("hasAuthority('ROLE_USER')")
    @PostMapping("")
    public SimpleMessageResponseDto saveCart(@RequestBody CartDto cartDto){
      return cartService.saveCart(cartDto);
    }

    @PreAuthorize("hasAuthority('ROLE_USER')")
    @GetMapping("")
    public Cart getCartByUser(){
        return this.cartService.getCartByUser();
    }

    @PreAuthorize("hasAuthority('ROLE_USER')")
    @GetMapping("/length")
    public Integer getCartLength(){
        return this.cartService.getCartLength();
    }

    @PreAuthorize("hasAuthority('ROLE_USER')")
    @DeleteMapping("{cartId}")
    public SimpleMessageResponseDto deleteCartById(@PathVariable Long cartId){
        return this.cartService.deleteCardById(cartId);
    }

    @PreAuthorize("hasAuthority('ROLE_USER')")
    @DeleteMapping("/cartItem/{cartItemId}")
    public SimpleMessageResponseDto deleteCartItemById(@PathVariable Long cartItemId){
        return this.cartService.deleteCartItemById(cartItemId);
    }

    @PreAuthorize("hasAuthority('ROLE_USER')")
    @PostMapping("/cartItem")
    public CartItem getCartLength(@RequestBody CartItem cartItem){
        return this.cartService.saveCartItem(cartItem);
    }


}
