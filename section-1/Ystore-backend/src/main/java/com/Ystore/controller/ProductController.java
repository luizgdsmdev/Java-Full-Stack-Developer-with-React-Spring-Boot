package com.Ystore.controller;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Ystore.DTO.ProductDTO;
import com.Ystore.service.IProductService;
import com.Ystore.DTO.transformation.ProductDtoTransfor;

@RestController
@RequestMapping("api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final IProductService IproductService;
    private final ProductDtoTransfor productDtoTransfor;
    
    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {

        List<ProductDTO> products = IproductService.getAllProducts()
                .stream()
                .map(productDtoTransfor::transformProductToProductDto)
                .toList();

        if (products.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204
        }

        return ResponseEntity.ok(products); // 200
    }
}
