package com.vehicle.marketplace.model.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CarResponse {
    Long carId;
    String carName;
    String brand;
    String model;
    Long manufactureYear;
    String licensePlate;
    Long price;
    String status;
    String color;
    String specifications;
    String imageURL;
    Long warrantyPeriod;
}
