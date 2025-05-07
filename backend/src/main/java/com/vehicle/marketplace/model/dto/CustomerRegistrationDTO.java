package com.vehicle.marketplace.model.dto;

import lombok.Data;

@Data
public class CustomerRegistrationDTO {
    private String username;
    private String password;
    private String fullName;
    private String email;
    private String phone;
    private String address;
}