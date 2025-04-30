package com.vehicle.marketplace.service;

import com.vehicle.marketplace.Entity.SupplierEntity;
import com.vehicle.marketplace.mapper.SupplierMapper;
import com.vehicle.marketplace.model.request.SupplierCreationRequest;
import com.vehicle.marketplace.model.request.SupplierSearchRequest;
import com.vehicle.marketplace.model.request.SupplierUpdateRequest;
import com.vehicle.marketplace.model.response.SupplierResponse;
import com.vehicle.marketplace.repository.SupplierRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequiredArgsConstructor
public class SupplierService {

    SupplierRepository supplierRepository;
    SupplierMapper supplierMapper;

    public List<SupplierEntity> findSuppliers(SupplierSearchRequest supplierSearchRequest) {
        return supplierRepository.findAll(supplierSearchRequest);
    }
    public SupplierResponse getSupplierById(Integer id) {
        return supplierMapper.toSupplierResponse(supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found")));
    }

    public SupplierEntity createSupplier(SupplierCreationRequest supplierCreationRequest) {
        return supplierRepository.save(supplierMapper.toSupplierEntity(supplierCreationRequest));
    }

    public SupplierResponse updateSupplier(Integer id, SupplierUpdateRequest supplierUpdateRequest) {
        SupplierEntity supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        supplierMapper.updateSupplier(supplier, supplierUpdateRequest);
        return supplierMapper.toSupplierResponse(supplierRepository.save(supplier));
    }

    public void deleteSupplierById(Integer id) {
        supplierRepository.deleteById(id);
    }
}