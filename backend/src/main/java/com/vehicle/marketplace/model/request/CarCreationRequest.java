package com.vehicle.marketplace.model.request;


import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class CarCreationRequest {
    String carName;
    String brand;
    String model;
    Integer manufactureYear;
    String licensePlate;
    Integer price;
    String status;
    String color;
    String specifications;
    String imageUrl;
    Integer warrantyPeriod;
}
