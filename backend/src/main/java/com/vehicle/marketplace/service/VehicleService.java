package com.vehicle.marketplace.service;

import com.vehicle.marketplace.model.Vehicle;
import com.vehicle.marketplace.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {
    
    @Autowired
    private VehicleRepository vehicleRepository;
    
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }
    
    public Optional<Vehicle> getVehicleById(Long id) {
        return vehicleRepository.findById(id);
    }
    
    public Vehicle createVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }
    
    public Vehicle updateVehicle(Long id, Vehicle vehicleDetails) {
        Vehicle vehicle = vehicleRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Vehicle not found"));
            
        vehicle.setTitle(vehicleDetails.getTitle());
        vehicle.setType(vehicleDetails.getType());
        vehicle.setBrand(vehicleDetails.getBrand());
        vehicle.setModel(vehicleDetails.getModel());
        vehicle.setYear(vehicleDetails.getYear());
        vehicle.setPrice(vehicleDetails.getPrice());
        vehicle.setDescription(vehicleDetails.getDescription());
        vehicle.setColor(vehicleDetails.getColor());
        vehicle.setMileage(vehicleDetails.getMileage());
        vehicle.setFuelType(vehicleDetails.getFuelType());
        vehicle.setTransmission(vehicleDetails.getTransmission());
        vehicle.setLocation(vehicleDetails.getLocation());
        vehicle.setContactPhone(vehicleDetails.getContactPhone());
        vehicle.setContactName(vehicleDetails.getContactName());
        
        return vehicleRepository.save(vehicle);
    }
    
    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }
    
    public List<Vehicle> searchVehicles(String keyword) {
        return vehicleRepository.searchVehicles(keyword);
    }
    
    public List<Vehicle> getVehiclesByType(String type) {
        return vehicleRepository.findByType(type);
    }
    
    public List<Vehicle> getVehiclesByBrand(String brand) {
        return vehicleRepository.findByBrand(brand);
    }
    
    public List<Vehicle> getVehiclesByPriceRange(Double minPrice, Double maxPrice) {
        return vehicleRepository.findByPriceBetween(minPrice, maxPrice);
    }
    
    public List<Vehicle> getLatestVehicles() {
        return vehicleRepository.findByOrderByCreatedAtDesc();
    }
    
    public List<Vehicle> getVehiclesByPriceAsc() {
        return vehicleRepository.findByOrderByPriceAsc();
    }
    
    public List<Vehicle> getVehiclesByPriceDesc() {
        return vehicleRepository.findByOrderByPriceDesc();
    }
} 