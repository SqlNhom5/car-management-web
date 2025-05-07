package com.vehicle.marketplace.repository;

import com.vehicle.marketplace.Entity.CustomerEntity;
import com.vehicle.marketplace.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<CustomerEntity, Long> {
    List<CustomerEntity> findByStatus(String status);
    List<CustomerEntity> findByFullNameContainingIgnoreCase(String keyword);
    Optional<CustomerEntity> findByUserId(Long userId);

}

