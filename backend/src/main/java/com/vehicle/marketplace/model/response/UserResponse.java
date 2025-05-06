package com.vehicle.marketplace.model.response;


import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults( level = AccessLevel.PRIVATE)
public class UserResponse {
    Long id;
    String username;
    String firstName;
    String lastName;
    String email;
    String phone;
    Set<RoleResponse> roles;
}
