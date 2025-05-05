package com.vehicle.marketplace.Entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "supplier")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SupplierEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supplierid")
    Integer supplierId;

    @Column(name = "suppliername")
    String supplierName;

    @Column(name = "address")
    String address;

    @Column(name = "phonenumber")
    String phoneNumber;

    @Column(name = "email")
    String email;
}
