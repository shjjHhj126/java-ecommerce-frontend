package com.sherry.service;

import com.sherry.exception.ProductException;
import com.sherry.model.Review;
import com.sherry.model.User;
import com.sherry.request.ReviewRequest;

import java.util.List;

public interface ReviewService {
    public Review createReview(ReviewRequest req, User user)throws ProductException;
    public List<Review> getProductReviews(Long productId);
}
