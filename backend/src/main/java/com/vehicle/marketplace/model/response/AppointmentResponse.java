package com.vehicle.marketplace.model.response;

import com.vehicle.marketplace.Enum.AppointmentStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AppointmentResponse {
    Integer appointmentId;
    Long customerId;
    String customerName;
    Long carId;
    String carName;
    Long userId;
    String username;
    LocalDateTime appointmentDate;
    AppointmentStatus status;
    String notes;
    LocalDateTime createdAt;
}


