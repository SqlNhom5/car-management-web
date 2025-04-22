package com.vehicle.marketplace.mapper;


import com.vehicle.marketplace.Entity.RoleEntity;
import com.vehicle.marketplace.model.request.RoleRequest;
import com.vehicle.marketplace.model.response.RoleResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoleMapper {

    RoleEntity toRole(RoleRequest roleRequest);

    RoleResponse toRoleResponse(RoleEntity role);
}
