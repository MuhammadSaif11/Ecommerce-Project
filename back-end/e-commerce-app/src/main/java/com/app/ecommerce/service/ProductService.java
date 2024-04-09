package com.app.ecommerce.service;

import com.app.ecommerce.dto.ProductRequestDto;
import com.app.ecommerce.dto.ProductResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {
    ProductResponseDto saveProduct(ProductRequestDto productRequestDto, MultipartFile[] files);

    List<ProductResponseDto> getAllProducts();

    void deleteProduct(Long productId);
}
