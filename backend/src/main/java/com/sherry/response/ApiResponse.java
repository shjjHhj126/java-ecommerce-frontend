package com.sherry.response;

public class ApiResponse {
    private String message;
    private Boolean status;

    public ApiResponse(){

    }

    public String getMessage() {
        return message;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}
