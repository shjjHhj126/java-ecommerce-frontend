package com.sherry.request;

public class ReviewRequest {
    private Long productId;
    private String review;


    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public Long getProductId() {
        return productId;
    }

    public String getReview() {
        return review;
    }
}
