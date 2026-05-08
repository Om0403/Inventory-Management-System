package com.inventory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;
import com.inventory.repository.ProductRepository;
import com.inventory.model.Product;

@SpringBootApplication
public class InventoryApplication {

    public static void main(String[] args) {
        SpringApplication.run(InventoryApplication.class, args);
    }

    @Bean
    CommandLineRunner run(ProductRepository repo) {
        return args -> {
            System.out.println(" App started - testing DB");

            Product p = new Product();
            p.setProductName("AAC Block");
            p.setSize("6\"");
            p.setQuantity(100);

            repo.save(p);
        };
    }
}