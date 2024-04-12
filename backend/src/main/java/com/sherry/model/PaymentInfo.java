package com.sherry.model;

import jakarta.persistence.Column;

import java.time.LocalDate;

public class PaymentInfo {
    @Column(name="cardOwner_name")
    private String cardOwnerName;

    @Column(name="card_number")
    private String cardNumber;

    @Column(name="expiration_date")
    private LocalDate expirationDate;

    @Column(name="cvv")
    private String cvv;
}
