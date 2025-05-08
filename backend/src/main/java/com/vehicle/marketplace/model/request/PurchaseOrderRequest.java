package com.vehicle.marketplace.model.request;

import lombok.Data;

@Data
public class PurchaseOrderRequest {
    private Integer supplierId;
    private Long userId;
    private Long carId;
    private Integer quantity;
    private Double unitPrice;
}
