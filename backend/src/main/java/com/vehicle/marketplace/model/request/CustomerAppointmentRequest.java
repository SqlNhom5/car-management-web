package com.vehicle.marketplace.model.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerAppointmentRequest {
    Long carId;
    String fullName;
    String phone;
    String mail;
    LocalDateTime appointmentDate;
    String notes;
}

