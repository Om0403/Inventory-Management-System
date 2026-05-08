package com.inventory.service;

import com.inventory.model.Product;
import com.inventory.model.Production;
import com.inventory.repository.ProductRepository;
import com.inventory.repository.ProductionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductionService {

    @Autowired
    private ProductionRepository productionRepo;

    @Autowired
    private ProductRepository productRepo;

    public Production saveProduction(Production production) {

        String name = production.getProductName().trim();

        String rawSize = production.getSize().trim();
        String size = rawSize.endsWith("\"") ? rawSize : rawSize + "\"";

        final String finalName = name;
        final String finalSize = size;

        Product product = productRepo
                .findByProductNameIgnoreCaseAndSize(finalName, finalSize)
                .orElseThrow(() -> new RuntimeException(
                        "Product not found for Product: " + finalName + " and Size: " + finalSize
                ));

        product.setQuantity(product.getQuantity() + production.getQuantity());
        productRepo.save(product);

        production.setProductName(finalName);
        production.setSize(finalSize);

        return productionRepo.save(production);
    }
}