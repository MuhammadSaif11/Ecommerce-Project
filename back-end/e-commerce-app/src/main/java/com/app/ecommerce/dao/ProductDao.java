package com.app.ecommerce.dao;

import com.app.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductDao extends JpaRepository<Product, Long> {
}
