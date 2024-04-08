package com.sherry.service;

import com.sherry.exception.OrderException;
import com.sherry.model.Address;
import com.sherry.model.Order;
import com.sherry.model.User;
import com.sherry.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImplementation implements OrderService {

    private OrderRepository orderRepository;

    private ProductService productService;

    public OrderServiceImplementation(OrderRepository orderRepository, ProductService productService) {
        this.orderRepository = orderRepository;
        this.productService = productService;
    }

    @Override
    public Order createOrder(User user, Address address){
        Order order = new Order();
        order.setUser(user);
        order.setShippingAddr(address);

        return orderRepository.save(order);
    }
    @Override
    public Order findOrderById(Long orderId)throws OrderException{
        Optional<Order> opt = orderRepository.findById(orderId);
        if(opt.isPresent()){
            return opt.get();
        }
        throw new OrderException("Order not found with id - "+orderId);
    };

    @Override
    public List<Order> usersOrderHistory(Long userId){
        return orderRepository.findUserOrderHistoryByUserId(userId);
    };

    @Override
    public Order placedOrder(Long orderId)throws OrderException{
        Order order = findOrderById(orderId);
        order.setOrderStatus("PLACED");
        return orderRepository.save(order);
    }

    @Override
    public Order confirmedOrder(Long orderId)throws OrderException{
        Order order = findOrderById(orderId);
        order.setOrderStatus("CONFIRMED");
        return orderRepository.save(order);
    }

    @Override
    public Order shippedOrder(Long orderId)throws OrderException{
        Order order = findOrderById(orderId);
        order.setOrderStatus("SHIPPED");
        return orderRepository.save(order);
    }

    @Override
    public Order deliveredOrder(Long orderId)throws OrderException{
        Order order = findOrderById(orderId);
        order.setOrderStatus("DELIVERED");
        return orderRepository.save(order);
    }

    @Override
    public Order canceledOrder(Long orderId)throws OrderException{
        Order order = findOrderById(orderId);
        order.setOrderStatus("CANCELED");
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrders(){
        return orderRepository.findAll();//by userId?
    }

    @Override
    public void deleteOrder(Long orderId)throws OrderException{
        Order order = findOrderById(orderId);
        orderRepository.delete(order);
    }
}
