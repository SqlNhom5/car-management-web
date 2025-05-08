package com.vehicle.marketplace.model.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PurchaseOrderResponse {
    private Long id;

    private Integer supplierId;
    private String supplierName;

    private Long userId;
    private String userName;

    private Integer carId;
    private String carName;

    private Integer quantity;
    private Double unitPrice;
    private Double totalAmount;
    private LocalDateTime orderDate;
}
