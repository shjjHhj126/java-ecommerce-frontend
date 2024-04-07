package com.sherry.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

//    @Column(name="title")
    private String title;

//    @Column(name="description")
    private String description;

//    @Column(name="price")
    private int price;

    @Column(name="discount_price")
    private int discountPrice;

    @Column(name="discountPercent")
    private int discount_percent;

    @Column(name="quantity")
    private int quantity;

    @Column(name="brand")
    private String brand;

    @Column(name="color")
    private String color;

    @Embedded
    @ElementCollection
    @Column(name="sizes")
    private Set<Size> sizes= new HashSet<>();

    @Column(name="image_url")
    private String imageUrl;

    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Rating> ratings = new ArrayList<>();

    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();

    @Column(name="num_ratings")
    private int numRatings;

    @ManyToOne()
    @JoinColumn(name="category_id")
    private Category category;

    private LocalDateTime createdAt;

    public Product(){

    }

    public Product(Long id, String title, String description, int price, int discountPrice, int discount_percent, int quantity, String brand, String color, Set<Size> sizes, String imageUrl, List<Rating> ratings, List<Review> reviews, int numRatings, Category category, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.discountPrice = discountPrice;
        this.discount_percent = discount_percent;
        this.quantity = quantity;
        this.brand = brand;
        this.color = color;
        this.sizes = sizes;
        this.imageUrl = imageUrl;
        this.ratings = ratings;
        this.reviews = reviews;
        this.numRatings = numRatings;
        this.category = category;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public int getPrice() {
        return price;
    }

    public int getDiscountPrice() {
        return discountPrice;
    }

    public int getDiscount_percent() {
        return discount_percent;
    }

    public int getQuantity() {
        return quantity;
    }

    public String getBrand() {
        return brand;
    }

    public String getColor() {
        return color;
    }

    public Set<Size> getSizes() {
        return sizes;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public List<Rating> getRatings() {
        return ratings;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public int getNumRatings() {
        return numRatings;
    }

    public Category getCategory() {
        return category;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public void setDiscountPrice(int discountPrice) {
        this.discountPrice = discountPrice;
    }

    public void setDiscount_percent(int discount_percent) {
        this.discount_percent = discount_percent;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setSizes(Set<Size> sizes) {
        this.sizes = sizes;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setRatings(List<Rating> ratings) {
        this.ratings = ratings;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public void setNumRatings(int numRatings) {
        this.numRatings = numRatings;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
