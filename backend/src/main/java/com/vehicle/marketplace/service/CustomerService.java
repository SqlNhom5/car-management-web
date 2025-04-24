package com.vehicle.marketplace.service;

import com.vehicle.marketplace.dto.CustomerDTO;
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
}

