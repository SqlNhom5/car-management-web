package com.vehicle.marketplace.model.request;


import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class CarSearchRequest {
    String carName;
    String brand;
    String model;
    Long manufactureYearFrom;
    Long manufactureYearTo;
    String licensePlate;
    Long priceFrom;
    Long priceTo;
    String status;
    String color;
    String specifications;
    String imageURL;
    Long warrantyPeriod;
}
