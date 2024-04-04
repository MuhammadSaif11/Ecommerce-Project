package com.app.ecommerce.service;

import com.app.ecommerce.dao.ProductDao;
import com.app.ecommerce.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService{

    private ProductDao productDao;

    @Autowired
    public ProductServiceImpl(ProductDao productDao) {
        this.productDao = productDao;
    }

    @Override
    public Product saveProduct(Product product) {
        return productDao.save(product);
    }
}
