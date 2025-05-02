package com.vehicle.marketplace.repository.custom;

import com.vehicle.marketplace.Entity.CarEntity;
import com.vehicle.marketplace.model.request.CarSearchRequest;

import java.util.List;

public interface CarRepositoryCustom {
    List<CarEntity> findAll(CarSearchRequest carSearchRequest);
}
