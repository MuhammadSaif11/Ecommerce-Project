package com.app.ecommerce.dto;

import com.app.ecommerce.entity.Product;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderItemDto {
    private Long orderItemDto;
    private Product product;
    private Integer quantity;
}
