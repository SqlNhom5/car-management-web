package com.vehicle.marketplace.mapper;

import com.vehicle.marketplace.Entity.UserEntity;
import com.vehicle.marketplace.model.request.UserCreationRequest;
import com.vehicle.marketplace.model.request.UserUpdateRequest;
import com.vehicle.marketplace.model.response.UserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserEntity toUser(UserCreationRequest userCreationRequest);

    UserResponse toUserResponse(UserEntity userEntity);

    void updateUser(@MappingTarget UserEntity userEntity, UserUpdateRequest request);
}
