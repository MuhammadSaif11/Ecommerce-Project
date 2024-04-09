package com.app.ecommerce.dto;

import com.app.ecommerce.entity.ImageModel;
import lombok.*;

import java.awt.*;
import java.util.Set;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductResponseDto {
    private Long productId;
    private String productName;
    private String productDescription;
    private String productActualPrice;
    private String productDiscountedPrice;
    private Set<ImageModel> productImages;
}
