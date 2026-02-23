package com.Ystore.service.implementation;

import java.util.List;

import org.springframework.stereotype.Service;

import com.Ystore.entity.Product;
import com.Ystore.repository.ProductRepository;
import com.Ystore.service.IProductService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements IProductService {
    private final ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }           
}
