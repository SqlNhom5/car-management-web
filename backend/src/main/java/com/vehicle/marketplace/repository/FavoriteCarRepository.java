package com.vehicle.marketplace.repository;

import com.vehicle.marketplace.Entity.CarEntity;
import com.vehicle.marketplace.Entity.FavoriteCarEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteCarRepository extends JpaRepository<FavoriteCarEntity, Long> {
    List<FavoriteCarEntity> findByCustomerId(Long customerId);
    boolean existsByCustomerIdAndCarCarId(Long customer_id, Long car_carId);
    void deleteByCustomerIdAndCarCarId(Long customer_id, Long car_carId);
}