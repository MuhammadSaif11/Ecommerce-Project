package com.app.ecommerce.service;

import com.app.ecommerce.dto.PageDto;
import com.app.ecommerce.dto.ProductRequestDto;
import com.app.ecommerce.dto.ProductResponseDto;
import com.app.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

public interface ProductService {
    ProductResponseDto saveProduct(ProductRequestDto productRequestDto, MultipartFile[] files);

    PageDto<ProductResponseDto> getAllProducts(Integer size, Integer number, String searchString);

    void deleteProduct(Long productId);

    ProductResponseDto getProductById(Long productId);

    Page<Product> getAllProductsPages();
}
