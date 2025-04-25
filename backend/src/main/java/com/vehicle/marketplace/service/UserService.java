package com.vehicle.marketplace.service;


import com.vehicle.marketplace.Entity.RoleEntity;
import com.vehicle.marketplace.Entity.UserEntity;
import com.vehicle.marketplace.Enum.ErrorCode;
import com.vehicle.marketplace.Enum.Role;
import com.vehicle.marketplace.constant.PredefinedRole;
import com.vehicle.marketplace.exception.AppException;
import com.vehicle.marketplace.mapper.UserMapper;
import com.vehicle.marketplace.model.request.UserCreationRequest;
import com.vehicle.marketplace.model.request.UserSearchRequest;
import com.vehicle.marketplace.model.request.UserUpdateRequest;
import com.vehicle.marketplace.model.response.ApiResponse;
import com.vehicle.marketplace.model.response.UserResponse;
import com.vehicle.marketplace.repository.RoleRepository;
import com.vehicle.marketplace.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.context.annotation.Bean;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.crossstore.ChangeSetPersister;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequiredArgsConstructor
public class UserService {
    UserRepository userRepository;
    UserMapper userMapper;
    RoleRepository roleRepository;
    PasswordEncoder passwordEncoder;


    public UserResponse createUser(UserCreationRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        UserEntity user = userMapper.toUser(request);
        // mã hoá
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        HashSet<RoleEntity> roles = new HashSet<>();
        roleRepository.findById(PredefinedRole.USER_ROLE).ifPresent(roles::add);
        user.setRoles(roles);
        try {
            user = userRepository.save(user);
        } catch (DataIntegrityViolationException exception) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        return userMapper.toUserResponse(user);
    }


    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    public List<UserResponse> getUsers(){
        return userRepository.findAll().stream().map(userMapper::toUserResponse).toList();
    }
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    public UserResponse getUserById(Long id) {
        return userMapper.toUserResponse(userRepository.findById(id)
                .orElseThrow( () -> new RuntimeException("User not found")));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    public UserResponse updateUser(Long id, UserUpdateRequest request) {
        UserEntity user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        userMapper.updateUser(user, request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        var roles = roleRepository.findAllById(request.getRoles());
        user.setRoles(new HashSet<>(roles));
        return userMapper.toUserResponse(userRepository.save(user));
    }

    public UserResponse getMyInfo(){
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }
//
//    public List<UserResponse> searchUsers(UserSearchRequest request) {
//        List<UserEntity> userEntities = userRepository.searchUsers(
//                request.getUsername(),
//                request.getFirstName(),
//                request.getLastName(),
//                request.getEmail()
//        );
//    }
}
