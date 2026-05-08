package com.inventory.model;

import javax.persistence.*;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;
    private String size;
    private int quantity;

    // Getters & Setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getProductName() { return productName; }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getSize() { return size; }

    public void setSize(String size) { this.size = size; }

    public int getQuantity() { return quantity; }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}