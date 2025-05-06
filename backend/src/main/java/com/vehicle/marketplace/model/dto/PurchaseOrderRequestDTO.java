package com.vehicle.marketplace.model.dto;

import lombok.Data;

@Data
public class PurchaseOrderRequestDTO {
    private Integer supplierId;
    private Long userId;
    private Long carId;
    private Integer quantity;
    private Double unitPrice;
}
