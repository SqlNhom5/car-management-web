package com.vehicle.marketplace.Entity;

import com.vehicle.marketplace.Enum.AppointmentStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Table(name = "appointment")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AppointmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointmentid")
    Integer appointmentId;

    @ManyToOne
    @JoinColumn(name = "customerid", nullable = false)
    private CustomerEntity customer;

    @ManyToOne
    @JoinColumn(name = "userid", nullable = false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "carid", nullable = false)
    private CarEntity car;

    @Column(name="appointmentdate", nullable = false)
    LocalDateTime appointmentDate;


    @Column(name="mail")
    String mail;

    @Enumerated(EnumType.STRING)
    AppointmentStatus status = AppointmentStatus.Pending;

    @Column(name = "notes")
    String notes;

    @Column(name = "phone")
    String phone;

    @Column(name = "createdat")
    LocalDateTime createdAt = LocalDateTime.now();
}