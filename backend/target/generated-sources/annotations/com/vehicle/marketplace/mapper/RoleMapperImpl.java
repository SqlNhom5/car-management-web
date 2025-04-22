package com.vehicle.marketplace.mapper;

import com.vehicle.marketplace.Entity.RoleEntity;
import com.vehicle.marketplace.model.request.RoleRequest;
import com.vehicle.marketplace.model.response.RoleResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.10 (Oracle Corporation)"
)
@Component
public class RoleMapperImpl implements RoleMapper {

    @Override
    public RoleEntity toRole(RoleRequest roleRequest) {
        if ( roleRequest == null ) {
            return null;
        }

        RoleEntity.RoleEntityBuilder roleEntity = RoleEntity.builder();

        roleEntity.name( roleRequest.getName() );
        roleEntity.description( roleRequest.getDescription() );

        return roleEntity.build();
    }

    @Override
    public RoleResponse toRoleResponse(RoleEntity role) {
        if ( role == null ) {
            return null;
        }

        RoleResponse.RoleResponseBuilder roleResponse = RoleResponse.builder();

        roleResponse.name( role.getName() );
        roleResponse.description( role.getDescription() );

        return roleResponse.build();
    }
}
