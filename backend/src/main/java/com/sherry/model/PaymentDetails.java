package com.sherry.model;

public class PaymentDetails {
    private String paymentMethod;
    private String paymentStatus;
    private String paymentId;

    private String paypalId;
    private String paypalLinkId;
    private String paypalRefId;
    private String paypalLinkStatus;

    public PaymentDetails(){}

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public void setPaypalId(String paypalId) {
        this.paypalId = paypalId;
    }

    public void setPaypalLinkId(String paypalLinkId) {
        this.paypalLinkId = paypalLinkId;
    }

    public void setPaypalRefId(String paypalRefId) {
        this.paypalRefId = paypalRefId;
    }

    public void setPaypalLinkStatus(String paypalLinkStatus) {
        this.paypalLinkStatus = paypalLinkStatus;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public String getPaypalId() {
        return paypalId;
    }

    public String getPaypalLinkId() {
        return paypalLinkId;
    }

    public String getPaypalRefId() {
        return paypalRefId;
    }

    public String getPaypalLinkStatus() {
        return paypalLinkStatus;
    }
}
