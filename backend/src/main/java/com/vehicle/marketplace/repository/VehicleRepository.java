package com.vehicle.marketplace.repository;

import com.vehicle.marketplace.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByType(String type);
    List<Vehicle> findByBrand(String brand);
    List<Vehicle> findByPriceBetween(Double minPrice, Double maxPrice);
    
    @Query("SELECT v FROM Vehicle v WHERE " +
           "LOWER(v.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(v.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(v.brand) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(v.model) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Vehicle> searchVehicles(@Param("keyword") String keyword);
    
    List<Vehicle> findByOrderByCreatedAtDesc();
    List<Vehicle> findByOrderByPriceAsc();
    List<Vehicle> findByOrderByPriceDesc();
} 