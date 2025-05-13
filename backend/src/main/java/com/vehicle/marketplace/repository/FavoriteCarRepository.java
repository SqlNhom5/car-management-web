package com.vehicle.marketplace.repository;

import com.vehicle.marketplace.Entity.CarEntity;
import com.vehicle.marketplace.Entity.FavoriteCarEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteCarRepository extends JpaRepository<FavoriteCarEntity, Long> {
    Page<FavoriteCarEntity> findByCustomerId(Long customerId, Pageable pageable);
    boolean existsByCustomerIdAndCarCarId(Long customer_id, Long car_carId);
    void deleteByCustomerIdAndCarCarId(Long customer_id, Long car_carId);
}