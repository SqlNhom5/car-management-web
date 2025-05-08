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
    Integer manufactureYearFrom;
    Integer manufactureYearTo;
    Integer priceFrom;
    Integer priceTo;
    Integer count;
    String status;
    String color;
    Integer warrantyPeriod;
    Integer numberOfSeats;
    String fuel;
    String gear;
    String note;
}
