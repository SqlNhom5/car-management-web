package com.vehicle.marketplace.Entity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "Car")
@Data // Tạo getter, setter, toString, equals, hashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CarEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
