package com.vehicle.marketplace.repository;

import com.vehicle.marketplace.Entity.SupplierEntity;
import com.vehicle.marketplace.repository.custom.SupplierRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SupplierRepository extends JpaRepository<SupplierEntity, Integer>, SupplierRepositoryCustom {
}