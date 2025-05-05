package com.vehicle.marketplace.mapper;

import com.vehicle.marketplace.Entity.SupplierEntity;
import com.vehicle.marketplace.model.request.SupplierCreationRequest;
import com.vehicle.marketplace.model.request.SupplierUpdateRequest;
import com.vehicle.marketplace.model.response.SupplierResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface SupplierMapper {
    SupplierEntity toSupplierEntity(SupplierCreationRequest supplierCreationRequest);

    SupplierResponse toSupplierResponse(SupplierEntity supplierEntity);

    void updateSupplier(@MappingTarget SupplierEntity supplierEntity, SupplierUpdateRequest request);
}