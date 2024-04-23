package com.sherry.controller;

import com.google.gson.Gson;
import com.sherry.exception.OrderException;
import com.sherry.exception.UserException;
import com.sherry.model.Address;
import com.sherry.model.Order;
import com.sherry.model.OrderItem;
import com.sherry.model.User;
import com.sherry.response.ApiResponse;
import com.sherry.service.OrderService;
import com.sherry.service.UserService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.CustomerSearchResult;
import com.stripe.model.Price;
import com.stripe.model.Product;
import com.stripe.model.checkout.Session;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerSearchParams;
import com.stripe.param.PriceCreateParams;
import com.stripe.param.ProductCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PaymentController {

    private final Gson gson = new Gson();
    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;

    public PaymentController() {
        Stripe.apiKey = "sk_test_51P6qHpLlyIz5Ae8wdkyXhXb8MFBcyEeWoH54ZB1O0j5sRFNhrAt9mUgCnPdvkVtwO0OMacsXK2gtKtWf6UAlN0Cv00RE7zdcBr";
    }

    @PostMapping("/payment/{orderId}")
    public String createPayment(@PathVariable Long orderId, @RequestHeader("Authorization") String jwt) throws StripeException, OrderException, UserException {

        Order order = orderService.findOrderById(orderId);
        User user = userService.findUserProfileByJwt(jwt);
        Address address = order.getShippingAddr();


        Customer customer = findExistingCustomer(user.getEmail());
        if(customer==null){
            customer = createNewCustomer(user);
        }

        String FRONTEND_DOMAIN = "http://localhost:5173/checkout?step=4&order_id="+orderId.toString()+"&";
        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setCustomer(customer.getId())
                .addAllLineItem(createLineItems(order))
                .setSuccessUrl(FRONTEND_DOMAIN + "success=true")
                .setCancelUrl(FRONTEND_DOMAIN + "canceled=true")
                .setPaymentIntentData(
                            SessionCreateParams.PaymentIntentData.builder()
                            .setShipping(createShipping(address)).build())
                .build();

        Session session = Session.create(params);
        orderService.setOrdersPaymentId(orderId, session.getId());

        return session.getUrl();//return the stripe checkout page url
    }
    @PostMapping("/payment/setStatus/{orderId}")
    public ApiResponse setStatus(@PathVariable Long orderId) throws OrderException, StripeException {
        Order order = orderService.findOrderById(orderId);
        Session session = Session.retrieve(order.getPaymentDetails().getPaymentId());
        Customer customer = Customer.retrieve(session.getCustomer());
        ApiResponse res = new ApiResponse();


        if(session.getPaymentStatus().equals("paid") ){
            orderService.placedOrder(orderId);

            res.setStatus(true);
            res.setMessage(customer.getEmail()+","
                    +session.getAmountTotal());


        } else if (session.getPaymentStatus().equals("unpaid")) {
            res.setStatus(true);
            res.setMessage(customer.getEmail()+","
                    +"0");
        }else{
            res.setStatus(true);
            res.setMessage(customer.getEmail()+","
                    +"0");
        }
        return res;
    }




    private Customer findExistingCustomer(String email) {
        try {
            // Build search parameters
            CustomerSearchParams params = CustomerSearchParams.builder()
                    .setQuery("email:" + email)
                    .build();

            // Search for customer
            CustomerSearchResult customerSearchResult = Customer.search(params);

            // Check if any customers are found
            if (!customerSearchResult.getData().isEmpty()) {
                return customerSearchResult.getData().get(0);
            } else {
                // Customer not found
                return null;
            }
        } catch (StripeException e) {
            // Handle StripeException (e.g., log error)
            e.printStackTrace();
            return null;
        }
    }


    //https://docs.stripe.com/api/customers/create
    private Customer createNewCustomer(User user) throws StripeException {
        CustomerCreateParams customerParams = CustomerCreateParams.builder()
                .setName(user.getFirstName() + " " + user.getLastName())
                .setEmail(user.getEmail())
                .build();
        return Customer.create(customerParams);
    }

    private SessionCreateParams.PaymentIntentData.Shipping createShipping(Address address){
        return SessionCreateParams.PaymentIntentData.Shipping.builder()
                .setName(address.getFirstName()+" "+address.getLastName())
                .setAddress(SessionCreateParams.PaymentIntentData.Shipping.Address.builder()
                        .setLine1(address.getStreetAddress())
                        .setCity(address.getCity())
                        .setState(address.getState())
                        .setPostalCode(address.getZipCode())
                        .setCountry("US") // Assuming the country is always United States
                        .build())
                .build();
    }


    private List<SessionCreateParams.LineItem> createLineItems(Order order) throws StripeException {
        List<SessionCreateParams.LineItem> lineItems = new ArrayList<>();


        for (OrderItem orderItem : order.getOrderItems()) {
            //https://docs.stripe.com/payments/accept-a-payment#create-product-prices-upfront
            ProductCreateParams product_params = ProductCreateParams.builder()
                    .setName(orderItem.getProduct().getTitle())
                    .build();
            Product product = Product.create(product_params);

            PriceCreateParams price_params =
                    PriceCreateParams.builder()
                            .setProduct(product.getId())
                            .setUnitAmount((long)orderItem.getPrice())
                            .setCurrency("usd")
                            .build();

            Price price = Price.create(price_params);

            SessionCreateParams.LineItem.Builder lineItemBuilder = SessionCreateParams.LineItem.builder()
                    .setQuantity((long) orderItem.getQuantity()) // Quantity of the product
                    .setPrice(price.getId()); // Price of the product in cents

            // Add the line item to the list
            lineItems.add(lineItemBuilder.build());
        }

        return lineItems;
    }
}
