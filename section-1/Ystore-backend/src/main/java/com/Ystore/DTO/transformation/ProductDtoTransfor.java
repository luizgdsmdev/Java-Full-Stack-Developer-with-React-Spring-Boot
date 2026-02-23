package com.Ystore.DTO.transformation;

import org.springframework.beans.BeanUtils;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

import com.Ystore.DTO.ProductDTO;
import com.Ystore.entity.Product;

@Component
public class ProductDtoTransfor {

    public ProductDTO transformProductToProductDto(@NonNull Product product) {
        ProductDTO productDto = new ProductDTO();
        BeanUtils.copyProperties(product, productDto);
        return productDto;
    }

}

