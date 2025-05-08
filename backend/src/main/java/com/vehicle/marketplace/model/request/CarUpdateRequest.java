package com.vehicle.marketplace.model.request;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CarUpdateRequest {
    String carName;
    String brand;
    String model;
    Integer manufactureYear;
    String licensePlate;
    Long price;
    Integer count;
    String status;
    String color;
    String specifications;
    String imageUrl;
    Integer warrantyPeriod;
    Integer numberOfSeats;
    String fuel;
    String gear;
    String note;
}
