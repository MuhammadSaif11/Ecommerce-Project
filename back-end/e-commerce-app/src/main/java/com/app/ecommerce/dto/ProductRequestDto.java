package com.app.ecommerce.dto;
import lombok.*;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequestDto {
    private Long productId;
    private String productName;
    private String productDescription;
    private String productActualPrice;
    private String productDiscountedPrice;
}
