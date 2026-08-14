package com.gauranga.farm.controller;

import com.gauranga.farm.model.Order;
import com.gauranga.farm.model.OrderItem;
import com.gauranga.farm.dto.OrderRequest;
import com.gauranga.farm.repository.OrderRepository;
import com.gauranga.farm.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.math.BigDecimal;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequest orderRequest) {
        Order order = new Order();
        OrderRequest.FormData formData = orderRequest.getFormData();
        
        order.setName(formData.getName());
        order.setEmail(formData.getEmail());
        order.setAddress(formData.getAddress());
        order.setCity(formData.getCity());
        order.setState(formData.getState());
        order.setZip(formData.getZip());
        order.setPhone(formData.getPhone());
        order.setPaymentMethod(formData.getPaymentMethod());

        BigDecimal total = BigDecimal.ZERO;

        for (OrderRequest.CartItem cartItem : orderRequest.getCartItems()) {
            OrderItem item = new OrderItem();
            item.setProductId(cartItem.getId());
            item.setProductName(cartItem.getTitle());
            item.setQuantity(cartItem.getQuantity());
            item.setPrice(cartItem.getPrice());
            
            BigDecimal itemTotal = cartItem.getPrice().multiply(new BigDecimal(cartItem.getQuantity()));
            total = total.add(itemTotal);
            
            order.addItem(item);
        }
        
        order.setTotalAmount(total);

        orderRepository.save(order);
        
        // Send email receipt asynchronously
        emailService.sendOrderConfirmationEmail(order);
        
        return ResponseEntity.ok(Map.of("message", "Order placed successfully", "orderId", order.getId()));
    }
}
