package com.sherry.request;

public class RatingRequest {
    private Long productId;
    private double rating;

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public Long getProductId() {
        return productId;
    }

    public double getRating() {
        return rating;
    }
}
