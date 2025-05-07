package com.vehicle.marketplace.Entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    Long id;
    String username;
    String password;
    String firstName;
    String lastName;
    String email;
    String phone;

    @ManyToMany
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),         // khóa ngoại trỏ tới UserEntity
            inverseJoinColumns = @JoinColumn(name = "role_name")
    )
    Set<RoleEntity> roles;
}
