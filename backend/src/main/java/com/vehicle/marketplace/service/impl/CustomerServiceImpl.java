package com.vehicle.marketplace.service.impl;

import com.vehicle.marketplace.model.dto.CustomerDTO;
import com.vehicle.marketplace.Entity.CustomerEntity;
import com.vehicle.marketplace.repository.CustomerRepository;
import com.vehicle.marketplace.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    private CustomerDTO convertToDTO(CustomerEntity customerEntity) {
        CustomerDTO dto = new CustomerDTO();
        dto.setId(customerEntity.getId());
        dto.setFullName(customerEntity.getFullName());
        dto.setPhoneNumber(customerEntity.getPhoneNumber());
        dto.setAddress(customerEntity.getAddress());
        dto.setStatus(customerEntity.getStatus());
        return dto;
    }

    private CustomerEntity convertToEntity(CustomerDTO dto) {
        CustomerEntity customerEntity = new CustomerEntity();
        customerEntity.setId(dto.getId());
        customerEntity.setFullName(dto.getFullName());
        customerEntity.setPhoneNumber(dto.getPhoneNumber());
        customerEntity.setAddress(dto.getAddress());
        customerEntity.setStatus(dto.getStatus());
        return customerEntity;
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return customerRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public Optional<CustomerDTO> getCustomerById(Long id) {
        return customerRepository.findById(id).map(this::convertToDTO);
    }

    @Override
    public CustomerDTO createCustomer(CustomerDTO dto) {
        CustomerEntity saved = customerRepository.save(convertToEntity(dto));
        return convertToDTO(saved);
    }

    @Override
    public CustomerDTO updateCustomer(Long id, CustomerDTO dto) {
        CustomerEntity customerEntity = customerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("CustomerEntity not found"));

        customerEntity.setFullName(dto.getFullName());
        customerEntity.setPhoneNumber(dto.getPhoneNumber());
        customerEntity.setAddress(dto.getAddress());
        customerEntity.setStatus(dto.getStatus());

        return convertToDTO(customerRepository.save(customerEntity));
    }

    @Override
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }

    @Override
    public List<CustomerDTO> searchCustomers(String keyword) {
        return customerRepository.findByFullNameContainingIgnoreCase(keyword)
            .stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public List<CustomerDTO> getCustomersByStatus(String status) {
        return customerRepository.findByStatus(status)
            .stream().map(this::convertToDTO).collect(Collectors.toList());
    }
}

