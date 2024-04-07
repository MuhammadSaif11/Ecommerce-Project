package com.app.ecommerce.controller;

import com.app.ecommerce.dto.ProductDto;
import com.app.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
@RequestMapping("/product")
public class ProductController {

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping(value = {"/add"},consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ProductDto saveProduct(@RequestPart("product") ProductDto productDto,
                                  @RequestPart("images") MultipartFile[] files){
        return productService.saveProduct(productDto,files);
    }
}
