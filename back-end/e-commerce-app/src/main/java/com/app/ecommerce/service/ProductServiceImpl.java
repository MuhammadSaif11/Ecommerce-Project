package com.app.ecommerce.service;

import com.app.ecommerce.dao.ProductDao;
import com.app.ecommerce.dto.ProductRequestDto;
import com.app.ecommerce.dto.ProductResponseDto;
import com.app.ecommerce.entity.ImageModel;
import com.app.ecommerce.entity.Product;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
    public List<ProductResponseDto> getAllProducts() {
        List<Product> products = productDao.findAll();
        return products.stream().map(product -> this.modelMapper.map(product,ProductResponseDto.class)).collect(Collectors.toList());
    }

    @Override
    public void deleteProduct(Long productId) {
        productDao.deleteById(productId);
    }
}
