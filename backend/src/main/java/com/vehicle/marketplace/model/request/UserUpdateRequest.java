package com.vehicle.marketplace.model.request;


import com.vehicle.marketplace.Enum.Role;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class UserUpdateRequest {
    String password;
    String firstName;
    String lastName;

    List<String> roles;
}
