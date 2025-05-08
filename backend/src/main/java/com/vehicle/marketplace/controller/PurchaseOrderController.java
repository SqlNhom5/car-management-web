package com.vehicle.marketplace.controller;

import com.vehicle.marketplace.model.request.PurchaseOrderRequest;
import com.vehicle.marketplace.model.response.PurchaseOrderResponse;
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
    public ApiResponse<List<PurchaseOrderResponse>> getAllOrders() {
        return ApiResponse.<List<PurchaseOrderResponse>>builder()
                .result(purchaseOrderService.getAllOrders())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<PurchaseOrderResponse> getOrderById(@PathVariable Long id) {
        return ApiResponse.<PurchaseOrderResponse>builder()
                .result(purchaseOrderService.getOrderById(id)
                        .orElseThrow(() -> new RuntimeException("Order not found")))
                .build();
    }

    @PostMapping
    public ApiResponse<PurchaseOrderResponse> createOrder(@RequestBody PurchaseOrderRequest dto) {
        return ApiResponse.<PurchaseOrderResponse>builder()
                .result(purchaseOrderService.createOrder(dto))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<PurchaseOrderResponse> updateOrder(@PathVariable Long id, @RequestBody PurchaseOrderRequest dto) {
        return ApiResponse.<PurchaseOrderResponse>builder()
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
