package com.sherry.controller;

import com.sherry.exception.ProductException;
import com.sherry.exception.UserException;
import com.sherry.model.Review;
import com.sherry.model.User;
import com.sherry.request.ReviewRequest;
import com.sherry.service.ReviewService;
import com.sherry.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Review> createReview(@RequestBody ReviewRequest req,
                                               @RequestHeader("Authorization")String jwt)
        throws UserException, ProductException {
        User user = userService.findUserProfileByJwt(jwt);
        Review review = reviewService.createReview(req, user);

        return new ResponseEntity<>(review, HttpStatus.CREATED);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getProductReviews(@PathVariable Long productId,
                                                          @RequestHeader("Authorization")String jwt)
            throws UserException, ProductException{
        User user = userService.findUserProfileByJwt(jwt);
        List<Review> reviews = reviewService.getProductReviews(productId);

        return new ResponseEntity<>(reviews, HttpStatus.ACCEPTED);
    }
}
