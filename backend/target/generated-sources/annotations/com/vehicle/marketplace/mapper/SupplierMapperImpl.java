package com.vehicle.marketplace.mapper;

import com.vehicle.marketplace.Entity.SupplierEntity;
import com.vehicle.marketplace.model.request.SupplierCreationRequest;
import com.vehicle.marketplace.model.request.SupplierUpdateRequest;
import com.vehicle.marketplace.model.response.SupplierResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.0.z20250331-1358, environment: Java 21.0.6 (Eclipse Adoptium)"
)
@Component
public class SupplierMapperImpl implements SupplierMapper {

    @Override
    public SupplierEntity toSupplierEntity(SupplierCreationRequest supplierCreationRequest) {
        if ( supplierCreationRequest == null ) {
            return null;
        }

        SupplierEntity.SupplierEntityBuilder supplierEntity = SupplierEntity.builder();

        supplierEntity.address( supplierCreationRequest.getAddress() );
        supplierEntity.email( supplierCreationRequest.getEmail() );
        supplierEntity.phoneNumber( supplierCreationRequest.getPhoneNumber() );
        supplierEntity.supplierName( supplierCreationRequest.getSupplierName() );

        return supplierEntity.build();
    }

    @Override
    public SupplierResponse toSupplierResponse(SupplierEntity supplierEntity) {
        if ( supplierEntity == null ) {
            return null;
        }

        SupplierResponse.SupplierResponseBuilder supplierResponse = SupplierResponse.builder();

        supplierResponse.address( supplierEntity.getAddress() );
        supplierResponse.email( supplierEntity.getEmail() );
        supplierResponse.phoneNumber( supplierEntity.getPhoneNumber() );
        supplierResponse.supplierId( supplierEntity.getSupplierId() );
        supplierResponse.supplierName( supplierEntity.getSupplierName() );

        return supplierResponse.build();
    }

    @Override
    public void updateSupplier(SupplierEntity supplierEntity, SupplierUpdateRequest request) {
        if ( request == null ) {
            return;
        }

        supplierEntity.setAddress( request.getAddress() );
        supplierEntity.setEmail( request.getEmail() );
        supplierEntity.setPhoneNumber( request.getPhoneNumber() );
        supplierEntity.setSupplierName( request.getSupplierName() );
    }
}
