package com.app.ecommerce.dao;

import com.app.ecommerce.entity.CartItem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface CartItemDao extends JpaRepository<CartItem,Long> {
    Set<CartItem> findByCart_CartId(Long cartId);

    @Transactional
    void deleteByCart_CartId(Long cartId);
}
