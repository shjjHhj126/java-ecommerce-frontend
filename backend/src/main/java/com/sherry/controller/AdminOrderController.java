package com.sherry.controller;

import com.sherry.exception.OrderException;
import com.sherry.model.Order;
import com.sherry.response.ApiResponse;
import com.sherry.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/")
    public ResponseEntity<List<Order>> getAllOrdersHandler(){
        List<Order> orders = orderService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
    }

    @PutMapping("/confirm/{orderId}")
    public ResponseEntity<Order> ConfirmedOrderHandler(@PathVariable Long orderId,
                                                       @RequestHeader("Authorization") String jwt)throws OrderException {
        Order order = orderService.confirmedOrder(orderId);

        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @PutMapping("/ship/{orderId}")
    public ResponseEntity<Order> ShippedOrderHandler(@PathVariable Long orderId,
                                                       @RequestHeader("Authorization") String jwt)throws OrderException {
        Order order = orderService.shippedOrder(orderId);

        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @PutMapping("/deliver/{orderId}")
    public ResponseEntity<Order> DeliveredOrderHandler(@PathVariable Long orderId,
                                                     @RequestHeader("Authorization") String jwt)throws OrderException {
        Order order = orderService.deliveredOrder(orderId);

        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @PutMapping("/cancel/{orderId}")
    public ResponseEntity<Order> CanceledOrderHandler(@PathVariable Long orderId,
                                                     @RequestHeader("Authorization") String jwt)throws OrderException {
        Order order = orderService.canceledOrder(orderId);

        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{orderId}")
    public ResponseEntity<ApiResponse> DeletedOrderHandler(@PathVariable Long orderId,
                                                      @RequestHeader("Authorization") String jwt)throws OrderException {
        orderService.deleteOrder(orderId);

        ApiResponse res = new ApiResponse();
        res.setMessage("order deleted successfully");
        res.setStatus(true);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
