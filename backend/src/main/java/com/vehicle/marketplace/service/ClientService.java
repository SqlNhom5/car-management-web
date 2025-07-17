package com.vehicle.marketplace.service;

import com.vehicle.marketplace.model.request.UserCreationRequest;

public interface ClientService {
    Boolean create(UserCreationRequest request);
}
