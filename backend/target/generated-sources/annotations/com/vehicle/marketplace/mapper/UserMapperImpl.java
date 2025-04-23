package com.vehicle.marketplace.mapper;

import com.vehicle.marketplace.Entity.UserEntity;
import com.vehicle.marketplace.model.request.UserCreationRequest;
import com.vehicle.marketplace.model.request.UserUpdateRequest;
import com.vehicle.marketplace.model.response.UserResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.0.z20250331-1358, environment: Java 21.0.6 (Eclipse Adoptium)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserEntity toUser(UserCreationRequest userCreationRequest) {
        if ( userCreationRequest == null ) {
            return null;
        }

        UserEntity.UserEntityBuilder userEntity = UserEntity.builder();

        userEntity.email( userCreationRequest.getEmail() );
        userEntity.firstName( userCreationRequest.getFirstName() );
        userEntity.lastName( userCreationRequest.getLastName() );
        userEntity.password( userCreationRequest.getPassword() );
        userEntity.username( userCreationRequest.getUsername() );

        return userEntity.build();
    }

    @Override
    public UserResponse toUserResponse(UserEntity userEntity) {
        if ( userEntity == null ) {
            return null;
        }

        UserResponse userResponse = new UserResponse();

        userResponse.setEmail( userEntity.getEmail() );
        userResponse.setFirstName( userEntity.getFirstName() );
        userResponse.setLastName( userEntity.getLastName() );
        userResponse.setUsername( userEntity.getUsername() );

        return userResponse;
    }

    @Override
    public void updateUser(UserEntity userEntity, UserUpdateRequest request) {
        if ( request == null ) {
            return;
        }

        userEntity.setFirstName( request.getFirstName() );
        userEntity.setLastName( request.getLastName() );
        userEntity.setPassword( request.getPassword() );
    }
}
