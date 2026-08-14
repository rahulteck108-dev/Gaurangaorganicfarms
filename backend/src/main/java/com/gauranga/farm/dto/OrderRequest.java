package com.gauranga.farm.dto;

import lombok.Data;
import java.util.List;
import java.math.BigDecimal;

@Data
public class OrderRequest {
    private FormData formData;
    private List<CartItem> cartItems;

    @Data
    public static class FormData {
        private String name;
        private String email;
        private String address;
        private String city;
        private String state;
        private String zip;
        private String phone;
        private String paymentMethod;
    }

    @Data
    public static class CartItem {
        private Long id;
        private String title;
        private Integer quantity;
        private BigDecimal price;
    }
}
