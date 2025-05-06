package com.vehicle.marketplace.Entity;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "purchaseorder") 
@Data
public class PurchaseOrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "supplierid", nullable = false)
    private SupplierEntity supplier;

    @ManyToOne
    @JoinColumn(name = "userid", nullable = false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "carid", nullable = false)
    private CarEntity car;

    private Integer quantity;

    @Column(name = "unitprice", nullable = false)
    private Double unitPrice;

    @Column(name = "totalamount", nullable = false)
    private Double totalAmount;

    @Column(name = "orderdate")
    private LocalDateTime orderDate = LocalDateTime.now();
}
