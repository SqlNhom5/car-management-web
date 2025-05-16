package com.vehicle.marketplace.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vehicle.marketplace.Entity.CarEntity;
import com.vehicle.marketplace.model.response.ApiResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import com.vehicle.marketplace.model.response.CarResponse;
import com.vehicle.marketplace.model.request.CarCreationRequest;
import com.vehicle.marketplace.model.request.CarUpdateRequest;
import com.vehicle.marketplace.service.CarService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/cars")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@Slf4j
public class CarController {
    
    CarService carService;

    ObjectMapper objectMapper;

    // get all car truyen vao carSearchRequest voi cac thuoc tinh null
//    @GetMapping
//    ApiResponse<List<CarEntity>> findCars(@RequestBody CarSearchRequest carSearchRequest) {
//        List<CarEntity> cars = carService.findCars(carSearchRequest);
//        return ApiResponse.<List<CarEntity>>builder().result(cars).build();
//    }

//    @GetMapping
//    ApiResponse<List<CarEntity>> findAllCars() {
//        List<CarEntity> cars = carService.findAllCars();
//        return ApiResponse.<List<CarEntity>>builder().result(cars).build();
//    }

    @GetMapping
    ApiResponse<Page<CarEntity>> findAllCars(@RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "6") int size) {
        return ApiResponse.<Page<CarEntity>>
                builder()
                .result(carService.findAllCars(PageRequest.of(page, size)))
                .build();
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

//    @PostMapping
//    ApiResponse<CarEntity> createCar(@RequestBody CarCreationRequest carCreationRequest) {
//        return ApiResponse.<CarEntity>builder()
//                .result(carService.createCar(carCreationRequest))
//                .build();
//    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<CarEntity> createCar(
            @RequestPart(name = "car") String carJson, // Nhận chuỗi JSON
            @RequestPart(name = "image") MultipartFile image) throws IOException {
        try {
            // Log dữ liệu nhận được
            System.out.println("Received carJson: " + carJson);
            System.out.println("Received image: " + image.getOriginalFilename() + ", Size: " + image.getSize());

            // Parse chuỗi JSON thành CarCreationRequest
            CarCreationRequest carCreationRequest = objectMapper.readValue(carJson, CarCreationRequest.class);

            // Lưu ảnh và lấy URL
            String imageUrl = saveImage(image);
            carCreationRequest.setImageUrl(imageUrl);

            // Gọi service để tạo car
            CarEntity carEntity = carService.createCar(carCreationRequest);

            return ApiResponse.<CarEntity>builder()
                    .code(1000)
                    .result(carEntity)
                    .build();
        } catch (Exception e) {
            System.err.println("Error processing request: " + e.getMessage());
            return ApiResponse.<CarEntity>builder()
                    .code(400)
                    .message("Invalid request: " + e.getMessage())
                    .build();
        }
    }



    private String saveImage(MultipartFile image) throws IOException {
        String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
        Path path = Paths.get("uploads/" + fileName);
        Files.createDirectories(path.getParent());
        Files.write(path, image.getBytes());
        return "/uploads/" + fileName;
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<CarEntity> updateCar(
            @PathVariable Long id,
            @RequestPart(name = "car") String carJson,
            @RequestPart(name = "image", required = false) MultipartFile image) {
        try {
            // Validate id
            if (id == null || id <= 0) {
                return ApiResponse.<CarEntity>builder()
                        .code(400)
                        .message("Invalid car ID: " + id)
                        .build();
            }

            System.out.println("Received carJson for update (ID: " + id + "): " + carJson);
            System.out.println("Received image: " + (image != null ? image.getOriginalFilename() + ", Size: " + image.getSize() : "null"));

            // Parse chuỗi JSON thành CarUpdateRequest
            CarUpdateRequest carUpdateRequest = objectMapper.readValue(carJson, CarUpdateRequest.class);

            // Lấy xe hiện tại từ database
            CarEntity existingCar = carService.findCarEntityById(id);

            // Cập nhật thông tin từ CarUpdateRequest
            existingCar.setCarName(carUpdateRequest.getCarName());
            existingCar.setBrand(carUpdateRequest.getBrand());
            existingCar.setModel(carUpdateRequest.getModel());
            existingCar.setPrice(carUpdateRequest.getPrice());
            existingCar.setNumberOfSeats(carUpdateRequest.getNumberOfSeats());
            existingCar.setCount(carUpdateRequest.getCount());
            existingCar.setFuel(carUpdateRequest.getFuel());
            existingCar.setGear(carUpdateRequest.getGear());
            existingCar.setNote(carUpdateRequest.getNote());
            // ... (cập nhật các trường khác tương ứng)

            // Xử lý ảnh mới (nếu có)
            if (image != null && !image.isEmpty()) {
                String newImageUrl = saveImage(image);
                // Xóa ảnh cũ nếu tồn tại
                if (existingCar.getImageUrl() != null && !existingCar.getImageUrl().isEmpty()) {
                    deleteOldImage(existingCar.getImageUrl());
                }
                existingCar.setImageUrl(newImageUrl);
            }

            // Lưu xe đã cập nhật
            CarEntity updatedCar = carService.updateCar(existingCar);
            return ApiResponse.<CarEntity>builder()
                    .code(1000)
                    .result(updatedCar)
                    .build();
        } catch (IllegalArgumentException e) {
            System.err.println("Car not found: " + e.getMessage());
            return ApiResponse.<CarEntity>builder()
                    .code(404)
                    .message(e.getMessage())
                    .build();
        } catch (Exception e) {
            System.err.println("Error processing update request: " + e.getMessage());
            return ApiResponse.<CarEntity>builder()
                    .code(400)
                    .message("Invalid update request: " + e.getMessage())
                    .build();
        }
    }

    private void deleteOldImage(String imageUrl) {
        if (imageUrl != null && !imageUrl.isEmpty()) {
            Path oldImagePath = Paths.get("uploads/" + imageUrl.replace("/uploads/", ""));
            File oldImageFile = oldImagePath.toFile();
            if (oldImageFile.exists()) {
                oldImageFile.delete();
                System.out.println("Deleted old image: " + oldImagePath);
            }
        }
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