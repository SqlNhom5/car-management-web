package com.vehicle.marketplace.service;

import com.vehicle.marketplace.model.request.PurchaseOrderRequest;
import com.vehicle.marketplace.model.response.PurchaseOrderResponse;

import java.util.List;
import java.util.Optional;

public interface PurchaseOrderService {
    List<PurchaseOrderResponse> getAllOrders();
    Optional<PurchaseOrderResponse> getOrderById(Long id);
    PurchaseOrderResponse createOrder(PurchaseOrderRequest dto);
    PurchaseOrderResponse updateOrder(Long id, PurchaseOrderRequest dto);
    void deleteOrder(Long id);
}

