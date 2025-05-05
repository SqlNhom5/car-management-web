package com.vehicle.marketplace.configuration;


import com.vehicle.marketplace.Entity.RoleEntity;
import com.vehicle.marketplace.Entity.UserEntity;
import com.vehicle.marketplace.Enum.Role;
import com.vehicle.marketplace.constant.PredefinedRole;
import com.vehicle.marketplace.repository.RoleRepository;
import com.vehicle.marketplace.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitConfig {
    PasswordEncoder passwordEncoder;

    RoleRepository roleRepository;

    @NonFinal
    static final String ADMIN_USER_NAME = "admin";

    @NonFinal
    static final String ADMIN_PASSWORD = "admin";



    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository) {
        return args -> {
            if(userRepository.findByUsername(ADMIN_USER_NAME).isEmpty()) {
                RoleEntity adminRole = roleRepository.save(RoleEntity.builder()
                        .name(PredefinedRole.ADMIN_ROLE)
                        .description("Admin role")
                        .build());

                var roles = new HashSet<RoleEntity>();
                roles.add(adminRole);
                UserEntity user = UserEntity.builder()
                        .username(ADMIN_USER_NAME)
                        .password(passwordEncoder.encode(ADMIN_PASSWORD))
                        .roles(roles)
                        .build();
                userRepository.save(user);
                log.warn("admin user has been created with default password: admin, please change it");
            }
        };
    }
}
