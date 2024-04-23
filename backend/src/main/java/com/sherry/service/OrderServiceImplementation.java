package com.sherry.service;

import com.sherry.exception.OrderException;
import com.sherry.model.*;
import com.sherry.repository.AddressRepository;
import com.sherry.repository.OrderItemRepository;
import com.sherry.repository.OrderRepository;
import com.sherry.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImplementation implements OrderService {

    private OrderRepository orderRepository;
    private CartService cartService;
    private AddressRepository addressRepository;
    private UserRepository userRepository;
    private OrderItemRepository orderItemRepository;
    private OrderItemService orderItemService;

    public OrderServiceImplementation(OrderRepository orderRepository, CartService cartService, AddressRepository addressRepository, UserRepository userRepository, OrderItemRepository orderItemRepository, OrderItemService orderItemService) {
        this.orderRepository = orderRepository;
        this.cartService = cartService;
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
        this.orderItemRepository = orderItemRepository;
        this.orderItemService = orderItemService;
    }

    @Override
    public Order createOrder(User user, Address shippedAddr){

        shippedAddr.setUser(user);
        Address address = addressRepository.save(shippedAddr);
        user.getAddress().add(address);
        userRepository.save(user);

        Cart cart = cartService.findUserCart(user.getId());
        List<OrderItem> orderItems = new ArrayList<>();

        for(CartItem item: cart.getCartItems()){
            OrderItem orderItem = new OrderItem();

            orderItem.setPrice(item.getPrice());
            orderItem.setProduct(item.getProduct());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setSize(item.getSize());
            orderItem.setUserId(item.getUserId());
            orderItem.setDiscountPrice(item.getDiscountPrice());

            OrderItem savedOrderItem = orderItemRepository.save(orderItem);
            orderItems.add(savedOrderItem);
        }

        Order newOrder = new Order();
        newOrder.setUser(user);
        newOrder.setOrderItems(orderItems);
        newOrder.setTotalPrice(cart.getTotalPrice());
        newOrder.setTotalDiscountPrice(cart.getTotalDiscountPrice());
        newOrder.setDiscount(cart.getDiscount());
        newOrder.setTotalItem(cart.getTotalItem());

        newOrder.setShippingAddr(address);
        newOrder.setOrderDate(LocalDateTime.now());
        newOrder.setOrderStatus("PENDING");
        newOrder.getPaymentDetails().setPaymentStatus("PENDING");
        newOrder.setCreatedAt(LocalDateTime.now());

        Order savedOrder = orderRepository.save(newOrder);

        for(OrderItem item:orderItems){
            item.setOrder(savedOrder);
            orderItemRepository.save(item);
        }

        return savedOrder;
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
        return orderRepository.getUsersOrders(userId);
    };

    @Override
    public Order setOrdersPaymentId(Long orderId, String paymentId)throws OrderException{
        Order order = findOrderById(orderId);
        order.getPaymentDetails().setPaymentId(paymentId);
        return orderRepository.save(order);
    }
    @Override
    public Order placedOrder(Long orderId)throws OrderException{
        Order order = findOrderById(orderId);
        order.setOrderStatus("PAID");
        order.getPaymentDetails().setPaymentStatus("COMPLETED");
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
//        Order order = findOrderById(orderId);
        orderRepository.deleteById(orderId);
    }
}
