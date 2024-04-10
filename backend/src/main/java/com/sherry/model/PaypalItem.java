package com.sherry.model;

public class PaypalItem {
    private String name;
    private String description;
    private int quantity;

    public PaypalItem(String name, String description, int quantity) {
        this.name = name;
        this.description = description;
        this.quantity = quantity;
    }
}
