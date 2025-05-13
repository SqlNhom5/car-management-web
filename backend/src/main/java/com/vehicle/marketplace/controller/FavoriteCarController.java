package com.vehicle.marketplace.controller;


import com.vehicle.marketplace.Entity.CarEntity;
import com.vehicle.marketplace.model.request.FavoriteCarRequest;
import com.vehicle.marketplace.model.response.ApiResponse;
import com.vehicle.marketplace.model.response.CarResponse;
import com.vehicle.marketplace.service.impl.FavoriteCarService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorite")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")

public class FavoriteCarController {
    FavoriteCarService favoriteCarService;

    @PostMapping
    public ApiResponse<String> addFavorite(
            @RequestBody FavoriteCarRequest request) {
        String username = getCurrentUsername();
        String favorite = favoriteCarService.addFavorite(username, request);
        return ApiResponse.<String>builder()
                .result(favorite)
                .build();
    }

    @DeleteMapping("/{carId}")
    public ApiResponse<Void> removeFavorite(
            @PathVariable Long carId) {
        String username = getCurrentUsername();
        favoriteCarService.removeFavorite(username, carId);
        return ApiResponse.<Void>builder().build();
    }

    @GetMapping
    public ApiResponse<Page<CarResponse>> getFavorites(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        String username = getCurrentUsername();
        Page<CarResponse> favorites = favoriteCarService.getFavorites(username, PageRequest.of(page, size));
        return ApiResponse.<Page<CarResponse>>builder()
                .result(favorites)
                .build();
    }

    private String getCurrentUsername() {
        var context = SecurityContextHolder.getContext();
        var authentication = context.getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalStateException("User not authenticated");
        }
        return authentication.getName();
    }
}