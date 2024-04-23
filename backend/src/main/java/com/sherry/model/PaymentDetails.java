package com.sherry.model;

public class PaymentDetails {
    private String paymentStatus;
    private String paymentId;

    public PaymentDetails(){}

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }
}
