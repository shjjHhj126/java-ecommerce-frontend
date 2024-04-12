package com.sherry.service;

import com.sherry.exception.CartItemException;
import com.sherry.exception.UserException;
import com.sherry.model.Cart;
import com.sherry.model.CartItem;
import com.sherry.model.Product;
import com.sherry.model.User;
import com.sherry.repository.CartItemRepository;
import com.sherry.request.UpdateItemRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartItemServiceImplementation implements CartItemService{
    private CartItemRepository cartItemRepository;
    private UserService userService;

    public CartItemServiceImplementation(UserService userService, CartItemRepository cartItemRepository1) {
        this.userService = userService;
        this.cartItemRepository = cartItemRepository1;
    }

    @Override
    public CartItem createCartItem(CartItem cartItem) {
        cartItem.setQuantity(1);
        cartItem.setPrice(cartItem.getProduct().getPrice()*cartItem.getQuantity());
        cartItem.setDiscountPrice(cartItem.getProduct().getDiscountPrice()*cartItem.getQuantity());

        CartItem savedCartItem = cartItemRepository.save(cartItem);
        return savedCartItem;
    }

    @Override
    public CartItem updateCartItem(Long userId, Long id, UpdateItemRequest req) throws CartItemException, UserException {
        CartItem item = findCartItemById(id);
        User user = userService.findUserById(userId);

        if(user.getId().equals(userId)){
            item.setQuantity(req.getQuantity());
            item.setPrice(req.getQuantity()*item.getProduct().getPrice());
            item.setDiscountPrice(req.getQuantity()*item.getProduct().getDiscountPrice());
        }

        return cartItemRepository.save(item);
    }

    @Override
    public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId) {
        CartItem cartItem = cartItemRepository.isCartItemExist(cart, product, size, userId);
        return cartItem;
    }

    @Override
    public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException {
        CartItem cartItem = findCartItemById(cartItemId);

        User user = userService.findUserById(cartItem.getUserId());

        User reqUser = userService.findUserById(userId);

        if(user.getId().equals(reqUser.getId())){
            cartItemRepository.deleteById(cartItemId);
        }else{
            throw new UserException("You cannot remove other users item");
        }
    }

    @Override
    public CartItem findCartItemById(Long cartItemId) throws CartItemException {
        Optional<CartItem>opt = cartItemRepository.findById(cartItemId);
        if(opt.isPresent()){
            return opt.get();
        }
        throw new CartItemException("Cart Item not found with id -"+cartItemId);
    }
}
