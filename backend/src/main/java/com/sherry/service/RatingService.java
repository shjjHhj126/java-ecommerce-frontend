package com.sherry.service;

import com.sherry.exception.ProductException;
import com.sherry.model.Rating;
import com.sherry.model.User;
import com.sherry.request.RatingRequest;

import java.util.List;

public interface RatingService {
    public Rating createRating(RatingRequest req, User user) throws ProductException;
    public List<Rating> getProductRatings(Long productId);
}
