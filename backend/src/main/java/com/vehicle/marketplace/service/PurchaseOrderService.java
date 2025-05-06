package com.vehicle.marketplace.service;

import com.vehicle.marketplace.model.dto.PurchaseOrderRequestDTO;
import com.vehicle.marketplace.model.dto.PurchaseOrderResponseDTO;

import java.util.List;
import java.util.Optional;

public interface PurchaseOrderService {
    List<PurchaseOrderResponseDTO> getAllOrders();
    Optional<PurchaseOrderResponseDTO> getOrderById(Long id);
    PurchaseOrderResponseDTO createOrder(PurchaseOrderRequestDTO dto);
    PurchaseOrderResponseDTO updateOrder(Long id, PurchaseOrderRequestDTO dto);
    void deleteOrder(Long id);
}

