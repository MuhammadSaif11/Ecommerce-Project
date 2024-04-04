package com.app.ecommerce.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;
    @Column(name = "product_name")
    private String productName;
    @Column(name = "product_description")
    private String productDescription;
    @Column(name = "product_actual_price")
    private String productActualPrice;
    @Column(name = "product_discounted_price")
    private String productDiscountedPrice;
}
