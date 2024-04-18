package com.app.ecommerce.dto;

import com.app.ecommerce.entity.Product;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderDto {
    private Long productId;
    private Integer quantity;
}
