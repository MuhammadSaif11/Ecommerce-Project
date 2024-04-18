package com.app.ecommerce.dto;

import com.app.ecommerce.entity.Product;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CartDto {
    private Long productId;
    private Integer quantity;
}
