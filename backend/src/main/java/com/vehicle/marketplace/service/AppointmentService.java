package com.vehicle.marketplace.service;

import com.vehicle.marketplace.Entity.AppointmentEntity;
import com.vehicle.marketplace.model.request.AppointmentRequest;
import com.vehicle.marketplace.model.request.CustomerAppointmentRequest;
import com.vehicle.marketplace.model.response.AppointmentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AppointmentService {
    Page<AppointmentResponse> getAll(Pageable pageable);
    AppointmentResponse getById(Integer id);
    AppointmentResponse create(AppointmentRequest request);
    AppointmentResponse update(Integer id,String status);
    void delete(Integer id);
    String createAppointment(String username, CustomerAppointmentRequest request);
}

