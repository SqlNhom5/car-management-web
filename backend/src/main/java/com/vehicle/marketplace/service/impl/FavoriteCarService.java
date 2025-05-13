package com.vehicle.marketplace.service.impl;

import com.vehicle.marketplace.Entity.CarEntity;
import com.vehicle.marketplace.Entity.CustomerEntity;
import com.vehicle.marketplace.Entity.FavoriteCarEntity;
import com.vehicle.marketplace.Entity.UserEntity;
import com.vehicle.marketplace.Enum.ErrorCode;
import com.vehicle.marketplace.exception.AppException;
import com.vehicle.marketplace.mapper.CarMapper;
import com.vehicle.marketplace.model.request.FavoriteCarRequest;
import com.vehicle.marketplace.model.response.CarResponse;
import com.vehicle.marketplace.repository.CarRepository;
import com.vehicle.marketplace.repository.CustomerRepository;
import com.vehicle.marketplace.repository.FavoriteCarRepository;
import com.vehicle.marketplace.repository.UserRepository;
import com.vehicle.marketplace.service.IFavoriteCarService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class FavoriteCarService implements IFavoriteCarService {

    FavoriteCarRepository favoriteCarRepository;
    UserRepository userRepository;
    CustomerRepository customerRepository;
    CarRepository carRepository;

    CarMapper carMapper;

    @Transactional
    public String addFavorite(String username, FavoriteCarRequest request) {
        CustomerEntity customer = getCustomerFromUsername(username);
        if (favoriteCarRepository.existsByCustomerIdAndCarCarId(customer.getId(), request.getCarId())) {
            throw new AppException(ErrorCode.CAR_EXISTED);
        }
        CarEntity car = carRepository.findById(request.getCarId())
                .orElseThrow(() -> new IllegalArgumentException("Car not found"));
        FavoriteCarEntity favorite = FavoriteCarEntity.builder()
                .customer(customer)
                .car(car)
                .build();
        favoriteCarRepository.save(favorite);
        return "added favorite car successfully";
    }

    @Transactional
    public void removeFavorite(String username, Long carId) {
        CustomerEntity customer = getCustomerFromUsername(username);
        if (!favoriteCarRepository.existsByCustomerIdAndCarCarId(customer.getId(), carId)) {
            throw new IllegalStateException("Favorite not found");
        }
        favoriteCarRepository.deleteByCustomerIdAndCarCarId(customer.getId(), carId);
    }

    public Page<CarResponse> getFavorites(String username, Pageable pageable) {
        CustomerEntity customer = getCustomerFromUsername(username);
        if (customer == null) {
            return new PageImpl<>(Collections.emptyList(), pageable, 0);
        }
        Page<FavoriteCarEntity> favoriteCarsPage = favoriteCarRepository.findByCustomerId(customer.getId(), pageable);
        List<CarResponse> carResponses = favoriteCarsPage.getContent()
                .stream()
                .map(FavoriteCarEntity::getCar)
                .filter(Objects::nonNull)
                .map(car -> {
                    try {
                        return carMapper.toCarResponse(car);
                    } catch (Exception e) {
                        System.err.println("Error mapping car: " + e.getMessage());
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        return new PageImpl<>(carResponses, pageable, favoriteCarsPage.getTotalElements());
    }

    private CustomerEntity getCustomerFromUsername(String username) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        boolean isCustomer = user.getRoles().stream()
                .anyMatch(role -> role.getName().equalsIgnoreCase("USER"));
        if (!isCustomer) {
            throw new IllegalStateException("Only customers can manage favorites");
        }
        return customerRepository.findByUserId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Customer profile not found for this user"));
    }
}