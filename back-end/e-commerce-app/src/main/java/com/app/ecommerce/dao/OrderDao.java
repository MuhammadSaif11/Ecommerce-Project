package com.app.ecommerce.dao;

import com.app.ecommerce.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderDao extends JpaRepository<Order,Long> {

    List<Order> findByUser_Username(String username);

    List<Order> findByOrderStatus(String orderStatus);
}
