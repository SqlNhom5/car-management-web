package com.vehicle.marketplace.service;


import com.vehicle.marketplace.Entity.CarEntity;
import com.vehicle.marketplace.model.dto.CustomerRegistrationDTO;
import com.vehicle.marketplace.model.request.FavoriteCarRequest;
import com.vehicle.marketplace.model.response.CarResponse;

import java.util.List;

public interface IFavoriteCarService {
    String addFavorite(String username, FavoriteCarRequest favoriteCarRequest);
    List<CarResponse> getFavorites(String username);
    void removeFavorite(String username, Long carId);

}