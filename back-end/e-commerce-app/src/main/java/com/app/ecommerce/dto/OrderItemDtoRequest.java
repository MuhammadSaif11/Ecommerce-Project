package com.app.ecommerce.dto;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class OrderItemDtoRequest {
    private Long productId;
    private Integer quantity;
}
