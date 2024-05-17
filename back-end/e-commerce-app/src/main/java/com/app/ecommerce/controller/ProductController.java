package com.app.ecommerce.controller;

import com.app.ecommerce.dto.PageDto;
import com.app.ecommerce.dto.ProductRequestDto;
import com.app.ecommerce.dto.ProductResponseDto;
import com.app.ecommerce.entity.Product;
import com.app.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping(value = {"/add"},consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ProductResponseDto saveProduct(@RequestPart("product") ProductRequestDto productRequestDto,
                                          @RequestPart("productImages") MultipartFile[] files){
        return productService.saveProduct(productRequestDto,files);
    }

    @GetMapping("")
    public PageDto<ProductResponseDto> getAllProducts(
            @RequestParam(defaultValue = "0",required = false) Integer pageNumber,
            @RequestParam(defaultValue = "6",required = false) Integer pageSize,
            @RequestParam(defaultValue = "",required = false) String search)
    {
        return productService.getAllProducts(pageNumber,pageSize,search);
    }


    @GetMapping("/{productId}")
    public ProductResponseDto getProductById(@PathVariable Long productId){
        return productService.getProductById(productId);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/{productId}")
    void deleteProduct(@PathVariable Long productId){
        productService.deleteProduct(productId);
    }
}
