package com.vehicle.marketplace.repository;

import com.vehicle.marketplace.Entity.AppointmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<AppointmentEntity, Integer> {
    boolean existsByCustomerIdAndCarCarId(Long customerId, Long carId);
}

