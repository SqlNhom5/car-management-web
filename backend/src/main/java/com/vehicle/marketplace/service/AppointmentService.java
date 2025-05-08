package com.vehicle.marketplace.service;

import com.vehicle.marketplace.Entity.AppointmentEntity;
import com.vehicle.marketplace.model.request.AppointmentRequest;
import com.vehicle.marketplace.model.response.AppointmentResponse;

import java.util.List;

public interface AppointmentService {
    List<AppointmentResponse> getAll();
    AppointmentResponse getById(Integer id);
    AppointmentResponse create(AppointmentRequest request);
    AppointmentResponse update(Integer id,String status);
    void delete(Integer id);
}

