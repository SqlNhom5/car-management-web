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
    @Column(name = "CarID")
    Integer carId;

    @Column(name = "CarName")
    String carName;

    @Column(name = "Brand")
    String brand;

    @Column(name = "Model")
    String model;

    @Column(name = "ManufactureYear")
    Integer manufactureYear;

    @Column(name = "LicensePlate")
    String licensePlate;

    @Column(name = "Price")
    Integer price;

    @Column(name = "Status")
    String status;

    @Column(name = "Color")
    String color;

    @Column(name = "Specifications", columnDefinition = "TEXT")
    String specifications;

    @Column(name = "ImageURL")
    String imageUrl;

    @Column(name = "WarrantyPeriod")
    Integer warrantyPeriod;
}
