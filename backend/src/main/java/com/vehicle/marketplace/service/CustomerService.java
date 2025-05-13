package com.vehicle.marketplace.service;

import com.vehicle.marketplace.model.dto.CustomerDTO;
import com.vehicle.marketplace.model.dto.CustomerRegistrationDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface CustomerService {
    List<CustomerDTO> getAllCustomers();
    Optional<CustomerDTO> getCustomerById(Long id);
    CustomerDTO createCustomer(CustomerDTO customerDTO);
    CustomerDTO updateCustomer(Long id, CustomerDTO customerDTO);
    void deleteCustomer(Long id);
    List<CustomerDTO> searchCustomers(String keyword);
    List<CustomerDTO> getCustomersByStatus(String status);
    void registerCustomer(CustomerRegistrationDTO registrationDTO);

    Page<CustomerDTO> findCustomers(Pageable pageable);
}

