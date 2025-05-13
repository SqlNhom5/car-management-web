package com.vehicle.marketplace.service;

import com.vehicle.marketplace.model.request.CarCreationRequest;
import com.vehicle.marketplace.model.request.CarSearchRequest;
import com.vehicle.marketplace.model.request.CarUpdateRequest;
import com.vehicle.marketplace.model.response.ApiResponse;
import com.vehicle.marketplace.model.response.CarResponse;
import com.vehicle.marketplace.Entity.CarEntity;
import com.vehicle.marketplace.mapper.CarMapper;
import com.vehicle.marketplace.repository.CarRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequiredArgsConstructor
public class CarService {
    
    CarRepository carRepository;
    CarMapper carMapper;
    String uploadDir = "uploads/";

    public List<CarEntity> findAllCars() {
        return carRepository.findAll();
    }

    public List<CarEntity> findCars(CarSearchRequest carSearchRequest) {
        return carRepository.findAll(carSearchRequest);
    }
    
    public CarResponse getCarById(Long id) {
        return carMapper.toCarResponse(carRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Car not found")));
    }
    public CarEntity findCarEntityById(Long id) {
        return carRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Car not found with id: " + id));
    }

    public List<CarResponse> compareCars(Long id1, Long id2){
        List<CarResponse> carResponses = new ArrayList<>();
        carResponses.add(carMapper.toCarResponse(carRepository.findById(id1)
                .orElseThrow(() -> new RuntimeException("Car not found"))));
        carResponses.add(carMapper.toCarResponse(carRepository.findById(id2)
                .orElseThrow(() -> new RuntimeException("Car not found"))));
        return carResponses;
    }
    
    public CarEntity createCar(CarCreationRequest carCreationRequest) {
        return carRepository.save(carMapper.toCarEntity(carCreationRequest));
    }

    public CarEntity updateCar(CarEntity carEntity) {
        return carRepository.save(carEntity);
    }
    
    public void deleteCarById(Long id) {
        carRepository.deleteById(id);
    }

    public Page<CarEntity> findAllCars(Pageable pageable) {
        return carRepository.findAll(pageable);
    }


//    public List<CarEntity> searchCars(String keyword) {
//        return carRepository.searchCars(keyword);
//    }
//
//    public List<CarEntity> getCarsByBrand(String brand) {
//        return carRepository.findByBrand(brand);
//    }
//
//    public List<CarEntity> getCarsByPriceRange(Float minPrice, Float maxPrice) {
//        return carRepository.findByPriceBetween(minPrice, maxPrice);
//    }
//
//    public List<CarEntity> getLatestCars() {
//        return carRepository.findByOrderByCarIdDesc();
//    }
//
//    public List<CarEntity> getCarsByPriceAsc() {
//        return carRepository.findByOrderByPriceAsc();
//    }
//
//    public List<CarEntity> getCarsByPriceDesc() {
//        return carRepository.findByOrderByPriceDesc();
//    }
}