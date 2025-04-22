package com.vehicle.marketplace.mapper;

import com.vehicle.marketplace.Entity.RoleEntity;
import com.vehicle.marketplace.Entity.UserEntity;
import com.vehicle.marketplace.model.request.UserCreationRequest;
import com.vehicle.marketplace.model.request.UserUpdateRequest;
import com.vehicle.marketplace.model.response.RoleResponse;
import com.vehicle.marketplace.model.response.UserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserEntity toUser(UserCreationRequest userCreationRequest);
    @Mapping(target = "roles", source = "roles")
    UserResponse toUserResponse(UserEntity userEntity);
    @Mapping(target = "roles", ignore = true)
    void updateUser(@MappingTarget UserEntity userEntity, UserUpdateRequest request);

}
