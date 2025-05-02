package com.vehicle.marketplace.controller;

import java.util.List;

import com.vehicle.marketplace.Entity.CarEntity;
import com.vehicle.marketplace.model.request.CarSearchRequest;
import com.vehicle.marketplace.model.response.ApiResponse;
import org.springframework.web.bind.annotation.*;

import com.vehicle.marketplace.model.response.CarResponse;
import com.vehicle.marketplace.model.request.CarCreationRequest;
import com.vehicle.marketplace.model.request.CarUpdateRequest;
import com.vehicle.marketplace.service.CarService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/cars")
@RequiredArgsConstructor
@Slf4j
public class CarController {
    
    CarService carService;

    // get all car truyen vao carSearchRequest voi cac thuoc tinh null
    @GetMapping
    ApiResponse<List<CarEntity>> findCars(@RequestBody CarSearchRequest carSearchRequest) {
        List<CarEntity> cars = carService.findCars(carSearchRequest);
        return ApiResponse.<List<CarEntity>>builder().result(cars).build();
    }

    @GetMapping("/compare/{id1}/{id2}")
    ApiResponse<List<CarResponse>> compareCars(@PathVariable Long id1, @PathVariable Long id2) {
        List<CarResponse> comparedCars = carService.compareCars(id1, id2);
        return ApiResponse.<List<CarResponse>>builder()
                .result(comparedCars)
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<CarResponse> getCarById(@PathVariable Long id) {
        return ApiResponse.<CarResponse>builder()
                .result(carService.getCarById(id))
                .build();
    }
    
    @PostMapping
    ApiResponse<CarEntity> createCar(@RequestBody CarCreationRequest carCreationRequest) {
         return ApiResponse.<CarEntity>builder()
                .result(carService.createCar(carCreationRequest))
                .build();
    }
    
    @PutMapping("/{id}")
    ApiResponse<CarResponse> updateCar(@PathVariable Long id, @RequestBody CarUpdateRequest carUpdateRequest) {
        return ApiResponse.<CarResponse>builder()
                .result(carService.updateCar(id, carUpdateRequest))
                .build();
    }
    
    @DeleteMapping("/{id}")
    String deleteUserById(@PathVariable("id") Long id) {
        carService.deleteCarById(id);
        return "Car deleted";
    }
    
    // @GetMapping("/search")
    // public List<CarEntity> searchCars(@RequestParam String keyword) {
    //     return carService.searchCars(keyword);
    // }
    
    // @GetMapping("/brand/{brand}")
    // public List<CarEntity> getCarsByBrand(@PathVariable String brand) {
    //     return carService.getCarsByBrand(brand);
    // }
    
    // @GetMapping("/price-range")
    // public List<CarEntity> getCarsByPriceRange(
    //         @RequestParam Float minPrice,
    //         @RequestParam Float maxPrice) {
    //     return carService.getCarsByPriceRange(minPrice, maxPrice);
    // }
    
    // @GetMapping("/latest")
    // public List<CarEntity> getLatestCars() {
    //     return carService.getLatestCars();
    // }
    
    // @GetMapping("/sort/price-asc")
    // public List<CarEntity> getCarsByPriceAsc() {
    //     return carService.getCarsByPriceAsc();
    // }
    
    // @GetMapping("/sort/price-desc")
    // public List<CarEntity> getCarsByPriceDesc() {
    //     return carService.getCarsByPriceDesc();
    // }
}