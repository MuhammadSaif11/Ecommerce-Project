package com.app.ecommerce.dao;

import com.app.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductDao extends JpaRepository<Product, Long> {

    @Query("SELECT p.productDiscountedPrice FROM Product p WHERE p.productId = :productId")
    Double findProductDiscountedPriceByProductId(@Param("productId") Long Id);
}
