package com.app.ecommerce.dto;
import lombok.*;
import java.util.ArrayList;
import java.util.List;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderDto {
    private Long orderId;
    private List<OrderItemDto> orderItems = new ArrayList<>();
    private String orderStatus;
    private Double orderTotalAmount;
}
