package com.app.ecommerce.dto;

import lombok.*;
import org.springframework.boot.autoconfigure.batch.BatchDataSource;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class OrderDetailDto {
    private Long orderId;
    private List<String> productNames;
    private String orderStatus;
    private String fullName;
    private String contactNumber;
    private String fullAddress;
}
