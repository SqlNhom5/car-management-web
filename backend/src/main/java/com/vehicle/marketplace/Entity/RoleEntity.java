package com.vehicle.marketplace.Entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "role")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class RoleEntity {
    @Id
    String name;
    String description;
}
