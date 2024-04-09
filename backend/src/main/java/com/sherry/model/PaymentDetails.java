package com.sherry.model;

public class PaymentDetails {
    private String paymentMethod;
    private String paymentStatus;
    private String paymentId;

    private String razorpayId;
    private String razorpayPaymentLinkId;
    private String razorpayPaymentRefId;
    private String razorpayPaymentLinkStatus;

public PaymentDetails(){}

    public PaymentDetails(String paymentMethod, String paymentStatus, String paymentId, String razorpayId, String razorpayPaymentLinkId, String razorpayPaymentRefId, String razorpayPaymentLinkStatus) {
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
        this.paymentId = paymentId;
        this.razorpayId = razorpayId;
        this.razorpayPaymentLinkId = razorpayPaymentLinkId;
        this.razorpayPaymentRefId = razorpayPaymentRefId;
        this.razorpayPaymentLinkStatus = razorpayPaymentLinkStatus;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public void setRazorpayId(String razorpayId) {
        this.razorpayId = razorpayId;
    }

    public void setRazorpayPaymentLinkId(String razorpayPaymentLinkId) {
        this.razorpayPaymentLinkId = razorpayPaymentLinkId;
    }

    public void setRazorpayPaymentRefId(String razorpayPaymentRefId) {
        this.razorpayPaymentRefId = razorpayPaymentRefId;
    }

    public void setRazorpayPaymentLinkStatus(String razorpayPaymentLinkStatus) {
        this.razorpayPaymentLinkStatus = razorpayPaymentLinkStatus;
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

    public String getRazorpayId() {
        return razorpayId;
    }

    public String getRazorpayPaymentLinkId() {
        return razorpayPaymentLinkId;
    }

    public String getRazorpayPaymentRefId() {
        return razorpayPaymentRefId;
    }

    public String getRazorpayPaymentLinkStatus() {
        return razorpayPaymentLinkStatus;
    }
}
