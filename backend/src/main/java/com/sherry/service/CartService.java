package com.sherry.service;

import com.sherry.exception.ProductException;
import com.sherry.model.Cart;
import com.sherry.model.User;
import com.sherry.request.AddItemRequest;

public interface CartService {

    public Cart createCart(User user);

    public String addCartItem(Long userId, AddItemRequest res)throws ProductException;

    public Cart findUserCart(Long userId);
}
