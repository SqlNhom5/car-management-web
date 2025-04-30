package com.vehicle.marketplace.repository;

import com.vehicle.marketplace.Entity.CarEntity;
import com.vehicle.marketplace.repository.custom.CarRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CarRepository extends JpaRepository<CarEntity, Long>, CarRepositoryCustom {
//    List<CarEntity> findByBrand(String brand);
//    List<CarEntity> findByPriceBetween(Float minPrice, Float maxPrice);
//
//    @Query("SELECT c FROM CarEntity c WHERE " +
//           "LOWER(c.carName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
//           "LOWER(c.specifications) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
//           "LOWER(c.brand) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
//           "LOWER(c.model) LIKE LOWER(CONCAT('%', :keyword, '%'))")
//    List<CarEntity> searchCars(@Param("keyword") String keyword);
//
//    List<CarEntity> findByOrderByCarIdDesc();
//    List<CarEntity> findByOrderByPriceAsc();
//    List<CarEntity> findByOrderByPriceDesc();
}