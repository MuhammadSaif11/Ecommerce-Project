package com.app.ecommerce.service;

import com.app.ecommerce.dao.ProductDao;
import com.app.ecommerce.dto.PageDto;
import com.app.ecommerce.dto.ProductRequestDto;
import com.app.ecommerce.dto.ProductResponseDto;
import com.app.ecommerce.entity.ImageModel;
import com.app.ecommerce.entity.Product;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class ProductServiceImpl implements ProductService{

    private ProductDao productDao;
    private ModelMapper modelMapper;

    @Autowired
    public ProductServiceImpl(ProductDao productDao,ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
        this.productDao = productDao;
    }

    @Override
    public ProductResponseDto saveProduct(ProductRequestDto productRequestDto, MultipartFile[] files) {
        Set<ImageModel> imageModels = new HashSet<>();
        Arrays
                .stream(files)
                .forEach(img -> {
                    try {
                        imageModels.add(
                                ImageModel
                                        .builder()
                                        .type(img.getContentType())
                                        .name(img.getOriginalFilename())
                                        .picByte(img.getBytes())
                                        .build()
                        );
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                });
        Product product = this.modelMapper.map(productRequestDto,Product.class);
        product.setProductImages(imageModels);
        return this.modelMapper.map(productDao.save(product), ProductResponseDto.class);
    }

    @Override
    public PageDto<ProductResponseDto> getAllProducts(Integer pageNumber, Integer pageSize, String search) {
        List<ProductResponseDto> productResponseDtos = new ArrayList<>();
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        Page<Product> productsPage = null;
        if (search.equals("")){
            productsPage = this.productDao.findAll(pageable);
        }
        else{
            productsPage = this.productDao.findByProductNameContainingIgnoreCase(search,pageable);
        }
        productsPage.getContent().stream().forEach(product -> {
            productResponseDtos.add(this.modelMapper.map(product,ProductResponseDto.class));
        });
        PageDto<ProductResponseDto> productResponseDtoPageDto = PageDto
                .<ProductResponseDto>builder()
                .content(productResponseDtos)
                .number(productsPage.getNumber())
                .size(productsPage.getSize())
                .totalElements(productsPage.getTotalElements())
                .totalPages(productsPage.getTotalPages())
                .build();
        return productResponseDtoPageDto;
    }

    @Override
    public void deleteProduct(Long productId) {
        productDao.deleteById(productId);
    }

    @Override
    public ProductResponseDto getProductById(Long productId) {
        Optional<Product> productResponseDto =  productDao.findById(productId);
        return this.modelMapper.map(productResponseDto.get(),ProductResponseDto.class);
    }

    @Override
    public Page<Product> getAllProductsPages() {
        Pageable pageable = PageRequest.of(1,3);
        Page<Product> pages = this.productDao.findAll(pageable);
        return pages;
    }
}
