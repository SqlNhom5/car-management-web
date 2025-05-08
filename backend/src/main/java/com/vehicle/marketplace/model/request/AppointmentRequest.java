package com.vehicle.marketplace.model.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AppointmentRequest {
    Long customerId;
    Long carId;
    Long userId;
    String phone;
    String mail;
    LocalDateTime appointmentDate;
    String notes;
}

