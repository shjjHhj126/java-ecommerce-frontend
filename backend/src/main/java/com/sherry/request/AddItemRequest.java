package com.sherry.request;

public class AddItemRequest {
    private Long productId;
    private int quantity;
    private String size;
    private Integer price;
    public AddItemRequest(){

    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Long getProductId() {
        return productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public String getSize() {
        return size;
    }

    public Integer getPrice() {
        return price;
    }
}
