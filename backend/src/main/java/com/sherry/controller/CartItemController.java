package com.sherry.controller;

import com.sherry.exception.CartItemException;
import com.sherry.exception.UserException;
import com.sherry.model.CartItem;
import com.sherry.model.User;
import com.sherry.response.ApiResponse;
import com.sherry.service.CartItemService;
import com.sherry.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart_items")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private UserService userService;

    @PutMapping("/{cartItemId}")
    public ResponseEntity<CartItem> updateCartItem(@PathVariable Long cartItemId,  @RequestHeader("Authorization")String jwt)
            throws UserException, CartItemException
    {
        User user = userService.findUserProfileByJwt(jwt);
        CartItem cartItem = cartItemService.findCartItemById(cartItemId);
        CartItem updatedCartItem = cartItemService.updateCartItem(user.getId(), cartItemId, cartItem);

        return new ResponseEntity<>(updatedCartItem, HttpStatus.OK);
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<ApiResponse> deleteCartItem(@PathVariable Long cartItemId, @RequestHeader("Authorization")String jwt)
            throws UserException, CartItemException
    {
        User user = userService.findUserProfileByJwt(jwt);
        cartItemService.removeCartItem(user.getId(), cartItemId);

        ApiResponse res = new ApiResponse();
        res.setMessage("successfully deleted cart item");
        res.setStatus(true);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
