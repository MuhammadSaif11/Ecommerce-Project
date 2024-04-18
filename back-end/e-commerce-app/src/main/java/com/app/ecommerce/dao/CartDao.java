package com.app.ecommerce.dao;


import com.app.ecommerce.entity.Cart;
import com.app.ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartDao extends JpaRepository<Cart,Long> {
    Cart findByUser(User user);
}
