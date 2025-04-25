package com.vehicle.marketplace.repository;

import com.vehicle.marketplace.Entity.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CustomerRepository extends JpaRepository<CustomerEntity, Long> {
    List<CustomerEntity> findByStatus(String status);
    List<CustomerEntity> findByFullNameContainingIgnoreCase(String keyword);
}

