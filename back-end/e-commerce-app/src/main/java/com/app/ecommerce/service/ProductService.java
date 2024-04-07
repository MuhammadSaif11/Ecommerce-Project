package com.app.ecommerce.service;

import com.app.ecommerce.dto.ProductDto;
import org.springframework.web.multipart.MultipartFile;

public interface ProductService {
    ProductDto saveProduct(ProductDto productDto, MultipartFile[] files);
}
