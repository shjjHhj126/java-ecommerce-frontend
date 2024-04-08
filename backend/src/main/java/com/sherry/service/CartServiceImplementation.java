package com.sherry.service;

import com.sherry.exception.ProductException;
import com.sherry.model.Cart;
import com.sherry.model.User;
import com.sherry.request.AddItemRequest;

public class CartServiceImplementation implements CartService {

    @Override
    public Cart createCart(User user) {
        return null;
    }

    @Override
    public String addCartItem(Long userId, AddItemRequest res) throws ProductException {
        return null;
    }

    @Override
    public Cart findUserCart(Long userId) {
        return null;
    }
}
