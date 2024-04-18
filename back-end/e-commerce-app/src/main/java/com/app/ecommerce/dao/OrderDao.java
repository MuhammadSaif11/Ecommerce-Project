package com.app.ecommerce.dao;

import com.app.ecommerce.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDao extends JpaRepository<Order,Long> {

}
