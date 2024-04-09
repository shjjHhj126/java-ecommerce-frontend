package com.sherry.service;

import com.sherry.exception.OrderException;
import com.sherry.model.Address;
import com.sherry.model.Order;
import com.sherry.model.User;

import java.util.List;

public interface OrderService {
    public Order createOrder(User user, Address shippingAddr);

    public Order findOrderById(Long orderId)throws OrderException;

    public List<Order> usersOrderHistory(Long userId);

    public Order placedOrder(Long orderId)throws OrderException;
    public Order confirmedOrder(Long orderId)throws OrderException;
    public Order shippedOrder(Long orderId)throws OrderException;
    public Order deliveredOrder(Long orderId)throws OrderException;
    public Order canceledOrder(Long orderId)throws OrderException;

    public List<Order> getAllOrders();

    public void deleteOrder(Long orderId)throws OrderException;

}
