package com.app.ecommerce.service;

import com.app.ecommerce.dao.ProductDao;
import com.app.ecommerce.dto.ProductDto;
import com.app.ecommerce.entity.ImageModel;
import com.app.ecommerce.entity.Product;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

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
    public ProductDto saveProduct(ProductDto productDto, MultipartFile[] files) {
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
        Product product = this.modelMapper.map(productDto,Product.class);
        product.setProductImages(imageModels);
        return this.modelMapper.map(productDao.save(product),ProductDto.class);
    }
}
