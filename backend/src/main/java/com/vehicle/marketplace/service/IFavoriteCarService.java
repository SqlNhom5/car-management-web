package com.vehicle.marketplace.service;


import com.vehicle.marketplace.Entity.CarEntity;
import com.vehicle.marketplace.model.dto.CustomerRegistrationDTO;
import com.vehicle.marketplace.model.request.FavoriteCarRequest;
import com.vehicle.marketplace.model.response.CarResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IFavoriteCarService {
    String addFavorite(String username, FavoriteCarRequest favoriteCarRequest);
    Page<CarResponse> getFavorites(String username, Pageable pageable);
    void removeFavorite(String username, Long carId);

}