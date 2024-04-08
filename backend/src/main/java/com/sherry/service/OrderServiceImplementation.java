package com.sherry.service;

import com.sherry.exception.OrderException;
import com.sherry.model.Address;
import com.sherry.model.Order;
import com.sherry.model.User;
import com.sherry.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImplementation implements OrderService {

    private CartRepository cartRepository;
    private CartService cartService;
    private ProductService productService;

    public OrderServiceImplementation(CartRepository cartRepository, CartService cartService, ProductService productService) {
        this.cartRepository = cartRepository;
        this.cartService = cartService;
        this.productService = productService;
    }

    @Override
    public Order createOrder(User user, Address address){

    }
    @Override
    public Order findOrderById(Long orderId)throws OrderException{};

    @Override
    public List<Order> usersOrderHistory(Long userId){};

    @Override
    public Order placedOrder(Long orderId)throws OrderException{}

    @Override
    public Order confirmedOrder(Long orderId)throws OrderException{}

    @Override
    public Order shippedOrder(Long orderId)throws OrderException{}

    @Override
    public Order deliveredOrder(Long orderId)throws OrderException{}

    @Override
    public Order canceledOrder(Long orderId)throws OrderException{}

    @Override
    public List<Order> getAllOrders(){}

    @Override
    public void deleteOrder(Long orderId)throws OrderException{}
}
