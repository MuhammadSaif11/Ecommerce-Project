package com.app.ecommerce.dto;
import lombok.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderDto {
    private Long orderId;
    private Set<OrderItemDto> orderItem = new LinkedHashSet<>();
    private String fullName;
    private String fullAddress;
    private String contactNumber;
    private String orderStatus;
    private Double orderFullAmount;
}
