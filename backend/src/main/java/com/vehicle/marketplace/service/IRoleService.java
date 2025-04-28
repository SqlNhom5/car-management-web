package com.vehicle.marketplace.service;

import com.vehicle.marketplace.model.request.RoleRequest;
import com.vehicle.marketplace.model.response.RoleResponse;

import java.util.List;

public interface IRoleService {
    RoleResponse createRole(RoleRequest roleRequest);
    List<RoleResponse> getAllRoles();
    void deleteRole(String id);
}
