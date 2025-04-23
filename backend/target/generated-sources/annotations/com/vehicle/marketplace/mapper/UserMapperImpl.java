package com.vehicle.marketplace.mapper;

import com.vehicle.marketplace.Entity.UserEntity;
import com.vehicle.marketplace.model.request.UserCreationRequest;
import com.vehicle.marketplace.model.request.UserUpdateRequest;
import com.vehicle.marketplace.model.response.UserResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.2 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserEntity toUser(UserCreationRequest userCreationRequest) {
        if ( userCreationRequest == null ) {
            return null;
        }

        UserEntity.UserEntityBuilder userEntity = UserEntity.builder();

        userEntity.username( userCreationRequest.getUsername() );
        userEntity.password( userCreationRequest.getPassword() );
        userEntity.firstName( userCreationRequest.getFirstName() );
        userEntity.lastName( userCreationRequest.getLastName() );
        userEntity.email( userCreationRequest.getEmail() );

        return userEntity.build();
    }

    @Override
    public UserResponse toUserResponse(UserEntity userEntity) {
        if ( userEntity == null ) {
            return null;
        }

        UserResponse userResponse = new UserResponse();

        userResponse.setUsername( userEntity.getUsername() );
        userResponse.setFirstName( userEntity.getFirstName() );
        userResponse.setLastName( userEntity.getLastName() );
        userResponse.setEmail( userEntity.getEmail() );

        return userResponse;
    }

    @Override
    public void updateUser(UserEntity userEntity, UserUpdateRequest request) {
        if ( request == null ) {
            return;
        }

        userEntity.setPassword( request.getPassword() );
        userEntity.setFirstName( request.getFirstName() );
        userEntity.setLastName( request.getLastName() );
    }
}
