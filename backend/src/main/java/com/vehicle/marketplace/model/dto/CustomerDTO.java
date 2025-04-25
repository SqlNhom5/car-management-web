package com.vehicle.marketplace.model.dto;

import lombok.Data;

@Data
public class CustomerDTO {
    private Long id;
    private String fullName;
    private String phoneNumber;
    private String address;
    private String status;
}

