package com.vehicle.marketplace.repository;

import com.vehicle.marketplace.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByStatus(String status);
    List<Customer> findByFullNameContainingIgnoreCase(String keyword);
}

