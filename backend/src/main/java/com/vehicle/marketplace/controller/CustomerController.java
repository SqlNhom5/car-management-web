package com.vehicle.marketplace.controller;

import com.vehicle.marketplace.model.dto.CustomerDTO;
import com.vehicle.marketplace.model.dto.CustomerRegistrationDTO;
import com.vehicle.marketplace.model.response.ApiResponse;
import com.vehicle.marketplace.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping
    public List<CustomerDTO> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerDTO> getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public CustomerDTO createCustomer(@RequestBody CustomerDTO dto) {
        return customerService.createCustomer(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerDTO> updateCustomer(@PathVariable Long id, @RequestBody CustomerDTO dto) {
        try {
            return ResponseEntity.ok(customerService.updateCustomer(id, dto));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    ApiResponse<Void> deleteUserById(@PathVariable("id") Long id) {
        customerService.deleteCustomer(id);
        return ApiResponse.<Void>builder().build();
    }

    @GetMapping("/search")
    public List<CustomerDTO> searchCustomers(@RequestParam String keyword) {
        return customerService.searchCustomers(keyword);
    }

    @GetMapping("/status/{status}")
    public List<CustomerDTO> getCustomersByStatus(@PathVariable String status) {
        return customerService.getCustomersByStatus(status);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerCustomer(@RequestBody CustomerRegistrationDTO registrationDTO) {
        customerService.registerCustomer(registrationDTO);
        return ResponseEntity.ok("Customer registered successfully");
    }
}

