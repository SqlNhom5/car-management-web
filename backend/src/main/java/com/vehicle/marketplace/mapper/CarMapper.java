package com.vehicle.marketplace.mapper;

import com.vehicle.marketplace.model.request.CarCreationRequest;
import com.vehicle.marketplace.model.request.CarUpdateRequest;
import com.vehicle.marketplace.model.response.CarResponse;
import com.vehicle.marketplace.Entity.CarEntity;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CarMapper {
    CarEntity toCarEntity(CarCreationRequest carCreationRequest); 
    CarResponse toCarResponse(CarEntity carEntity);
    void updateCar(@MappingTarget CarEntity carEntity, CarUpdateRequest request);
}
 