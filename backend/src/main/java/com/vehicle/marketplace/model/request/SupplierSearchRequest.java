package com.vehicle.marketplace.model.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class SupplierSearchRequest {
    String supplierName;
    String address;
    String phoneNumber;
    String email;
}