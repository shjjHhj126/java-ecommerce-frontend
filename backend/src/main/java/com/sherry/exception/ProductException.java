package com.sherry.exception;

public class ProductException extends Exception {
    public ProductException(String message){
        super(message);//calls(and pass message to) the constructor of the superclass (Exception)
    }
}
