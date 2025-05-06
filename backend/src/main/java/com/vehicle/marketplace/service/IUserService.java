package com.vehicle.marketplace.service;

import com.vehicle.marketplace.Entity.UserEntity;
import com.vehicle.marketplace.model.request.UserCreationRequest;
import com.vehicle.marketplace.model.request.UserUpdateRequest;
import com.vehicle.marketplace.model.response.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IUserService {
    List<UserEntity> findAll();
    UserResponse createUser(UserCreationRequest user);
    Page<UserResponse> getUsers(Pageable pageable);
    UserResponse getUserById(Long id);
    UserResponse updateUser(Long id, UserUpdateRequest user);
    void deleteUserById(Long id);
    UserResponse getMyInfo();
    Page<UserResponse> searchUsersByKeyword(String keyword, Pageable pageable);
}
