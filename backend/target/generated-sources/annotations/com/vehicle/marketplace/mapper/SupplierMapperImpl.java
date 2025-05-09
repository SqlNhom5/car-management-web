package com.vehicle.marketplace.mapper;

import com.vehicle.marketplace.Entity.SupplierEntity;
import com.vehicle.marketplace.model.request.SupplierCreationRequest;
import com.vehicle.marketplace.model.request.SupplierUpdateRequest;
import com.vehicle.marketplace.model.response.SupplierResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.10 (Oracle Corporation)"
)
@Component
public class SupplierMapperImpl implements SupplierMapper {

    @Override
    public SupplierEntity toSupplierEntity(SupplierCreationRequest supplierCreationRequest) {
        if ( supplierCreationRequest == null ) {
            return null;
        }

        SupplierEntity.SupplierEntityBuilder supplierEntity = SupplierEntity.builder();

        supplierEntity.supplierName( supplierCreationRequest.getSupplierName() );
        supplierEntity.address( supplierCreationRequest.getAddress() );
        supplierEntity.phoneNumber( supplierCreationRequest.getPhoneNumber() );
        supplierEntity.email( supplierCreationRequest.getEmail() );

        return supplierEntity.build();
    }

    @Override
    public SupplierResponse toSupplierResponse(SupplierEntity supplierEntity) {
        if ( supplierEntity == null ) {
            return null;
        }

        SupplierResponse.SupplierResponseBuilder supplierResponse = SupplierResponse.builder();

        supplierResponse.supplierId( supplierEntity.getSupplierId() );
        supplierResponse.supplierName( supplierEntity.getSupplierName() );
        supplierResponse.address( supplierEntity.getAddress() );
        supplierResponse.phoneNumber( supplierEntity.getPhoneNumber() );
        supplierResponse.email( supplierEntity.getEmail() );

        return supplierResponse.build();
    }

    @Override
    public void updateSupplier(SupplierEntity supplierEntity, SupplierUpdateRequest request) {
        if ( request == null ) {
            return;
        }

        supplierEntity.setSupplierName( request.getSupplierName() );
        supplierEntity.setAddress( request.getAddress() );
        supplierEntity.setPhoneNumber( request.getPhoneNumber() );
        supplierEntity.setEmail( request.getEmail() );
    }
}
