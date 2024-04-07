package com.app.ecommerce.dto;
import com.app.ecommerce.entity.ImageModel;
import jakarta.mail.Multipart;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
    private Long productId;
    private String productName;
    private String productDescription;
    private String productActualPrice;
    private String productDiscountedPrice;
}
