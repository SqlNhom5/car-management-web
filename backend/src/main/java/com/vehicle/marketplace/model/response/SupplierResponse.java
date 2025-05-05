package com.vehicle.marketplace.model.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class SupplierResponse {
    Integer supplierId;
    String supplierName;
    String address;
    String phoneNumber;
    String email;
}