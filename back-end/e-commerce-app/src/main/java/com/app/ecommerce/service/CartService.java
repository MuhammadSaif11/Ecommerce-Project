package com.app.ecommerce.service;

import com.app.ecommerce.dto.CartDto;
import com.app.ecommerce.dto.SimpleMessageResponseDto;
import com.app.ecommerce.entity.Cart;
import com.app.ecommerce.entity.CartItem;

public interface CartService {
    SimpleMessageResponseDto saveCart(CartDto cartDto);

    Cart getCartByUser();

    Integer getCartLength();

    SimpleMessageResponseDto deleteCardById(Long cartId);

    SimpleMessageResponseDto deleteCartItemById(Long cartItemId);

    CartItem saveCartItem(CartItem cartItem);
}
