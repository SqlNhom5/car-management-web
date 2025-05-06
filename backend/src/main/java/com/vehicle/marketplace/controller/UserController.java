package com.vehicle.marketplace.controller;


import com.vehicle.marketplace.Entity.CarEntity;
import com.vehicle.marketplace.Entity.UserEntity;
import com.vehicle.marketplace.model.request.UserCreationRequest;
import com.vehicle.marketplace.model.request.UserUpdateRequest;
import com.vehicle.marketplace.model.response.ApiResponse;
import com.vehicle.marketplace.model.response.UserResponse;
import com.vehicle.marketplace.service.IUserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@Slf4j
public class UserController {
    IUserService userService;

//    @GetMapping
//    ApiResponse<Page<UserResponse>> getUsers(
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "2") int size
//    ) {
//        var authentication = SecurityContextHolder.getContext().getAuthentication();
//
//        log.info("Username : {}", authentication.getName());
//        authentication.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));
//
//        return ApiResponse.<Page<UserResponse>>
//                builder().result(userService.getUsers(PageRequest.of(page, size)))
//                .build();
//    }

    @GetMapping
    ApiResponse<List<UserEntity>> findAllUsers() {
        List<UserEntity> users = userService.findAll();
        return ApiResponse.<List<UserEntity>>builder().result(users).build();
    }

    @PostMapping
    ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreationRequest userCreationRequest) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.createUser(userCreationRequest))
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<UserResponse> getUserById(@PathVariable("id") Long id) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getUserById(id))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<Void> deleteUserById(@PathVariable("id") Long id) {
        userService.deleteUserById(id);
        return ApiResponse.<Void>builder().build();
    }

    @PutMapping("/{id}")
    ApiResponse<UserResponse> updateUser(@PathVariable Long id,@RequestBody UserUpdateRequest userUpdateRequest) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.updateUser(id, userUpdateRequest))
                .build();
    }

    @GetMapping("/my-info")
    ApiResponse<UserResponse> getMyInfo(){
        return ApiResponse.<UserResponse>builder()
                .result(userService.getMyInfo())
                .build();
    }

    @GetMapping("/search")
    public ApiResponse<Page<UserResponse>> searchUsers(
            @RequestParam("keyword") String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "2") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<UserResponse> users = userService.searchUsersByKeyword(keyword, pageable);
        return ApiResponse.<Page<UserResponse>>builder()
                .result(users)
                .build();
    }
}
