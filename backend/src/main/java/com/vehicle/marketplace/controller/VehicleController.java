package com.vehicle.marketplace.controller;

import com.vehicle.marketplace.model.Vehicle;
import com.vehicle.marketplace.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "http://localhost:3000")
public class VehicleController {
    
    @Autowired
    private VehicleService vehicleService;
    
    @GetMapping
    public List<Vehicle> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable Long id) {
        return vehicleService.getVehicleById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public Vehicle createVehicle(@RequestBody Vehicle vehicle) {
        return vehicleService.createVehicle(vehicle);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> updateVehicle(@PathVariable Long id, @RequestBody Vehicle vehicleDetails) {
        try {
            Vehicle updatedVehicle = vehicleService.updateVehicle(id, vehicleDetails);
            return ResponseEntity.ok(updatedVehicle);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVehicle(@PathVariable Long id) {
        try {
            vehicleService.deleteVehicle(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/search")
    public List<Vehicle> searchVehicles(@RequestParam String keyword) {
        return vehicleService.searchVehicles(keyword);
    }
    
    @GetMapping("/type/{type}")
    public List<Vehicle> getVehiclesByType(@PathVariable String type) {
        return vehicleService.getVehiclesByType(type);
    }
    
    @GetMapping("/brand/{brand}")
    public List<Vehicle> getVehiclesByBrand(@PathVariable String brand) {
        return vehicleService.getVehiclesByBrand(brand);
    }
    
    @GetMapping("/price-range")
    public List<Vehicle> getVehiclesByPriceRange(
            @RequestParam Double minPrice,
            @RequestParam Double maxPrice) {
        return vehicleService.getVehiclesByPriceRange(minPrice, maxPrice);
    }
    
    @GetMapping("/latest")
    public List<Vehicle> getLatestVehicles() {
        return vehicleService.getLatestVehicles();
    }
    
    @GetMapping("/sort/price-asc")
    public List<Vehicle> getVehiclesByPriceAsc() {
        return vehicleService.getVehiclesByPriceAsc();
    }
    
    @GetMapping("/sort/price-desc")
    public List<Vehicle> getVehiclesByPriceDesc() {
        return vehicleService.getVehiclesByPriceDesc();
    }
} 