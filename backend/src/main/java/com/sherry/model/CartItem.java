package com.sherry.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name="user_id",nullable = false)
    private User user;

    @OneToMany(mappedBy = "cart",cascade = CascadeType.ALL, orphanRemoval = true)
    @Column(name="cart_items")
    private Set<CartItem> cartItems=new HashSet<>();

    @Column(name="total_price")
    private double totalPrice;

    @Column(name="total_item")
    private double totalItem;

    private int totalDiscountPrice;

    private int discount;
public CartItem(){

}

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setCartItems(Set<CartItem> cartItems) {
        this.cartItems = cartItems;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public void setTotalItem(double totalItem) {
        this.totalItem = totalItem;
    }

    public void setTotalDiscountPrice(int totalDiscountPrice) {
        this.totalDiscountPrice = totalDiscountPrice;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Set<CartItem> getCartItems() {
        return cartItems;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public double getTotalItem() {
        return totalItem;
    }

    public int getTotalDiscountPrice() {
        return totalDiscountPrice;
    }

    public int getDiscount() {
        return discount;
    }
}
