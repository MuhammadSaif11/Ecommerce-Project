package com.app.ecommerce.service;
import com.app.ecommerce.dao.CartDao;
import com.app.ecommerce.dao.CartItemDao;
import com.app.ecommerce.dao.ProductDao;
import com.app.ecommerce.dao.UserDao;
import com.app.ecommerce.dto.CartDto;
import com.app.ecommerce.dto.SimpleMessageResponseDto;
import com.app.ecommerce.entity.Cart;
import com.app.ecommerce.entity.CartItem;
import com.app.ecommerce.entity.Product;
import com.app.ecommerce.entity.User;
import com.app.ecommerce.security.JwtAuthFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class CartServiceImpl implements CartService {

    private CartDao cartDao;
    private UserDao userDao;
    private ProductDao productDao;
    private CartItemDao cartItemDao;


    @Autowired
    public CartServiceImpl(CartDao cartDao, UserDao userDao, ProductDao productDao, CartItemDao cartItemDao) {
        this.cartDao = cartDao;
        this.userDao = userDao;
        this.productDao = productDao;
        this.cartItemDao = cartItemDao;
    }




    @Override
    public SimpleMessageResponseDto saveCart(CartDto cartDto) {
        String username = JwtAuthFilter.CURRENT_USER;
        User user = userDao.findByUsername(username);
        Cart previousCart = this.cartDao.findByUser(user);
        Cart cart = Cart
                .builder()
                .user(user)
                .build();
        System.out.println(user);
        Product product = productDao.findById(cartDto.getProductId()).get();
        CartItem cartItem = CartItem
                .builder()
                .product(product)
                .quantity(cartDto.getQuantity())
                .build();
        cartItem.setCart(((previousCart != null)?previousCart:cartDao.save(cart)));
        this.cartItemDao.save(cartItem);
        return SimpleMessageResponseDto
                .builder()
                .message("Cart Added Successfully")
                .build();
    }

    @Override
    public Cart getCartByUser() {
        String username = JwtAuthFilter.CURRENT_USER;
        User user = userDao.findByUsername(username);
        Cart cart = cartDao.findByUser(user);
        if (cart == null){
            Set<CartItem> cartItems = new HashSet<>();
            Cart cart1 = Cart.builder().user(user).cartItems(cartItems).build();
            return this.cartDao.save(cart1);
        }
        Set<CartItem> cartItems = cartItemDao.findByCart_CartId(cart.getCartId());
        cart.setCartItems(cartItems);
        return cart;
    }

    @Override
    public Integer getCartLength() {
        return getCartByUser().getCartItems().size();
    }

    @Override
    public SimpleMessageResponseDto deleteCardById(Long cartId) {
        this.cartDao.deleteById(cartId);
        return SimpleMessageResponseDto.builder().message("cart deleted successfully").build();
    }

    @Override
    public SimpleMessageResponseDto deleteCartItemById(Long cartItemId) {
        this.cartItemDao.deleteById(cartItemId);
        return SimpleMessageResponseDto.builder().message("cart item deleted successfully").build();
    }

    @Override
    public CartItem saveCartItem(CartItem cartItem) {
        CartItem cartItem1 = this.cartItemDao.findById(cartItem.getCartItemId()).get();
        cartItem1.setQuantity(cartItem.getQuantity());
        return this.cartItemDao.save(cartItem1);
    }
}
