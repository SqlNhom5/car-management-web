package com.vehicle.marketplace.repository.custom;

import com.vehicle.marketplace.Entity.SupplierEntity;
import com.vehicle.marketplace.model.request.SupplierSearchRequest;

import java.util.List;

public interface SupplierRepositoryCustom {
    List<SupplierEntity> findAll(SupplierSearchRequest supplierSearchRequest);
}
