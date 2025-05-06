package com.vehicle.marketplace.service.impl;

import com.vehicle.marketplace.Entity.*;
import com.vehicle.marketplace.model.dto.*;
import com.vehicle.marketplace.repository.*;
import com.vehicle.marketplace.service.PurchaseOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PurchaseOrderServiceImpl implements PurchaseOrderService {

    private final PurchaseOrderRepository purchaseOrderRepository;
    private final SupplierRepository supplierRepository;
    private final UserRepository userRepository;
    private final CarRepository carRepository;

    @Override
    public List<PurchaseOrderResponseDTO> getAllOrders() {
        return purchaseOrderRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<PurchaseOrderResponseDTO> getOrderById(Long id) {
        return purchaseOrderRepository.findById(id).map(this::mapToDTO);
    }

    @Override
    public PurchaseOrderResponseDTO createOrder(PurchaseOrderRequestDTO dto) {
        PurchaseOrderEntity entity = new PurchaseOrderEntity();
        populateEntityFromDTO(entity, dto);
        entity.setTotalAmount(dto.getUnitPrice() * dto.getQuantity());
        return mapToDTO(purchaseOrderRepository.save(entity));
    }

    @Override
    public PurchaseOrderResponseDTO updateOrder(Long id, PurchaseOrderRequestDTO dto) {
        PurchaseOrderEntity entity = purchaseOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PurchaseOrder not found"));
        populateEntityFromDTO(entity, dto);
        entity.setTotalAmount(dto.getUnitPrice() * dto.getQuantity());
        return mapToDTO(purchaseOrderRepository.save(entity));
    }

    @Override
    public void deleteOrder(Long id) {
        purchaseOrderRepository.deleteById(id);
    }

    private void populateEntityFromDTO(PurchaseOrderEntity entity, PurchaseOrderRequestDTO dto) {
        SupplierEntity supplier = supplierRepository.findById(dto.getSupplierId())
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        UserEntity user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        CarEntity car = carRepository.findById(dto.getCarId())
                .orElseThrow(() -> new RuntimeException("Car not found"));

        entity.setSupplier(supplier);
        entity.setUser(user);
        entity.setCar(car);
        entity.setQuantity(dto.getQuantity());
        entity.setUnitPrice(dto.getUnitPrice());

    }

    private PurchaseOrderResponseDTO mapToDTO(PurchaseOrderEntity entity) {
        PurchaseOrderResponseDTO dto = new PurchaseOrderResponseDTO();
        dto.setId(entity.getId());
        dto.setSupplierId(entity.getSupplier().getSupplierId());
        dto.setSupplierName(entity.getSupplier().getSupplierName());
        dto.setUserId(entity.getUser().getId());
        dto.setUserName(entity.getUser().getUsername());
        dto.setCarId(entity.getCar().getCarId());
        dto.setCarName(entity.getCar().getCarName());
        dto.setQuantity(entity.getQuantity());
        dto.setUnitPrice(entity.getUnitPrice());
        dto.setTotalAmount(entity.getTotalAmount());
        dto.setOrderDate(entity.getOrderDate());
        return dto;
    }
}
