package com.vehicle.marketplace.controller;

import com.vehicle.marketplace.model.dto.PurchaseOrderRequestDTO;
import com.vehicle.marketplace.model.dto.PurchaseOrderResponseDTO;
import com.vehicle.marketplace.model.response.ApiResponse;
import com.vehicle.marketplace.service.PurchaseOrderService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchase-orders")
@RequiredArgsConstructor
public class PurchaseOrderController {

    private final PurchaseOrderService purchaseOrderService;

    @GetMapping
    public ApiResponse<List<PurchaseOrderResponseDTO>> getAllOrders() {
        return ApiResponse.<List<PurchaseOrderResponseDTO>>builder()
                .result(purchaseOrderService.getAllOrders())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<PurchaseOrderResponseDTO> getOrderById(@PathVariable Long id) {
        return ApiResponse.<PurchaseOrderResponseDTO>builder()
                .result(purchaseOrderService.getOrderById(id)
                        .orElseThrow(() -> new RuntimeException("Order not found")))
                .build();
    }

    @PostMapping
    public ApiResponse<PurchaseOrderResponseDTO> createOrder(@RequestBody PurchaseOrderRequestDTO dto) {
        return ApiResponse.<PurchaseOrderResponseDTO>builder()
                .result(purchaseOrderService.createOrder(dto))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<PurchaseOrderResponseDTO> updateOrder(@PathVariable Long id, @RequestBody PurchaseOrderRequestDTO dto) {
        return ApiResponse.<PurchaseOrderResponseDTO>builder()
                .result(purchaseOrderService.updateOrder(id, dto))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteOrder(@PathVariable Long id) {
        purchaseOrderService.deleteOrder(id);
        return ApiResponse.<String>builder()
                .result("Deleted successfully")
                .build();
    }
}
