package com.app.ecommerce.dto;

import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class OrderDtoRequest {
    private String fullName;
    private String fullAddress;
    private String contactNumber;
    private Set<OrderItemDtoRequest> orderItem = new LinkedHashSet<>();
}
