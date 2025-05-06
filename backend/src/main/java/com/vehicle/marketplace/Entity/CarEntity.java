package com.vehicle.marketplace.Entity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "car")
@Data // Tạo getter, setter, toString, equals, hashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CarEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "carid")
    Integer carId;

    @Column(name = "carname")
    String carName;

    @Column(name = "brand")
    String brand;

    @Column(name = "model")
    String model;

    @Column(name = "manufactureyear")
    Integer manufactureYear;

    @Column(name = "licenseplate")
    String licensePlate;

    @Column(name = "price")
    Integer price;

    @Column(name="count")
    Integer count;

    @Column(name = "status")
    String status;

    @Column(name = "color")
    String color;

    @Column(name = "specifications", columnDefinition = "TEXT")
    String specifications;

    @Column(name = "imageurl")
    String imageUrl;

    @Column(name = "warrantyperiod")
    Integer warrantyPeriod;
}
