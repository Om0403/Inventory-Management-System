package com.inventory.service;

import com.inventory.model.Product;
import com.inventory.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repo;

    // ✅ Get all products
    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    // ✅ Save product
    public Product saveProduct(Product product) {
        return repo.save(product);
    }

    // ✅ Update product (UPDATED)
    public Product updateProduct(Long id, Product product) {
        Product existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existing.setProductName(product.getProductName());
        existing.setSize(product.getSize());
        existing.setQuantity(product.getQuantity());

        return repo.save(existing);
    }

    // ✅ Delete product
    public void deleteProduct(Long id) {
        Product existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        repo.delete(existing);
    }
}