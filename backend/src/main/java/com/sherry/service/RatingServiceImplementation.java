package com.sherry.service;

import com.sherry.exception.ProductException;
import com.sherry.model.Product;
import com.sherry.model.Rating;
import com.sherry.model.User;
import com.sherry.repository.RatingRepository;
import com.sherry.request.RatingRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
@Service
public class RatingServiceImplementation implements RatingService{

    private RatingRepository ratingRepository;
    private ProductService productService;

    public RatingServiceImplementation(RatingRepository ratingRepository, ProductService productService) {
        this.ratingRepository = ratingRepository;
        this.productService = productService;
    }

    @Override
    public Rating createRating(RatingRequest req, User user) throws ProductException {
        Product product = productService.findProductById(req.getProductId());

        Rating rating = new Rating();
        rating.setProduct(product);
        rating.setUser(user);
        rating.setRating(req.getRating());
        rating.setCreatedAt(LocalDateTime.now());
        return ratingRepository.save(rating);

    }

    @Override
    public List<Rating> getProductRatings(Long productId) {
        return ratingRepository.getAllProductsRating(productId);
    }
}
