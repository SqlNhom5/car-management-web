package com.vehicle.marketplace.controller;

import java.util.List;

import com.vehicle.marketplace.Entity.SupplierEntity;
import com.vehicle.marketplace.model.request.SupplierSearchRequest;
import com.vehicle.marketplace.model.response.ApiResponse;
import com.vehicle.marketplace.model.response.SupplierResponse;
import com.vehicle.marketplace.model.request.SupplierCreationRequest;
import com.vehicle.marketplace.model.request.SupplierUpdateRequest;
import com.vehicle.marketplace.service.SupplierService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.*;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/suppliers")
@RequiredArgsConstructor
@Slf4j
public class SupplierController {

    SupplierService supplierService;

    // Get all suppliers, optionally filtered by SupplierSearchRequest
    @GetMapping
    ApiResponse<List<SupplierEntity>> findSuppliers(@RequestBody SupplierSearchRequest supplierSearchRequest) {
        List<SupplierEntity> suppliers = supplierService.findSuppliers(supplierSearchRequest);
        return ApiResponse.<List<SupplierEntity>>builder().result(suppliers).build();
    }

    // Get a supplier by ID
    @GetMapping("/{id}")
    ApiResponse<SupplierResponse> getSupplierById(@PathVariable Integer id) {
        return ApiResponse.<SupplierResponse>builder()
                .result(supplierService.getSupplierById(id))
                .build();
    }

    // Create a new supplier
    @PostMapping
    ApiResponse<SupplierEntity> createSupplier(@RequestBody SupplierCreationRequest supplierCreationRequest) {
        return ApiResponse.<SupplierEntity>builder()
                .result(supplierService.createSupplier(supplierCreationRequest))
                .build();
    }

    // Update an existing supplier
    @PutMapping("/{id}")
    ApiResponse<SupplierResponse> updateSupplier(@PathVariable Integer id, @RequestBody SupplierUpdateRequest supplierUpdateRequest) {
        return ApiResponse.<SupplierResponse>builder()
                .result(supplierService.updateSupplier(id, supplierUpdateRequest))
                .build();
    }

    // Delete a supplier by ID
    @DeleteMapping("/{id}")
    String deleteSupplierById(@PathVariable("id") Integer id) {
        supplierService.deleteSupplierById(id);
        return "Supplier deleted";
    }
}