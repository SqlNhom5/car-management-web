package com.vehicle.marketplace.mapper;

import com.vehicle.marketplace.Entity.CarEntity;
import com.vehicle.marketplace.model.request.CarCreationRequest;
import com.vehicle.marketplace.model.request.CarUpdateRequest;
import com.vehicle.marketplace.model.response.CarResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.0.z20250331-1358, environment: Java 21.0.6 (Eclipse Adoptium)"
)
@Component
public class CarMapperImpl implements CarMapper {

    @Override
    public CarEntity toCarEntity(CarCreationRequest carCreationRequest) {
        if ( carCreationRequest == null ) {
            return null;
        }

        CarEntity.CarEntityBuilder carEntity = CarEntity.builder();

        carEntity.brand( carCreationRequest.getBrand() );
        carEntity.carName( carCreationRequest.getCarName() );
        carEntity.color( carCreationRequest.getColor() );
        carEntity.imageURL( carCreationRequest.getImageURL() );
        carEntity.licensePlate( carCreationRequest.getLicensePlate() );
        carEntity.manufactureYear( carCreationRequest.getManufactureYear() );
        carEntity.model( carCreationRequest.getModel() );
        carEntity.price( carCreationRequest.getPrice() );
        carEntity.specifications( carCreationRequest.getSpecifications() );
        carEntity.status( carCreationRequest.getStatus() );
        carEntity.warrantyPeriod( carCreationRequest.getWarrantyPeriod() );

        return carEntity.build();
    }

    @Override
    public CarResponse toUCarResponse(CarEntity carEntity) {
        if ( carEntity == null ) {
            return null;
        }

        CarResponse carResponse = new CarResponse();

        carResponse.setBrand( carEntity.getBrand() );
        carResponse.setCarId( carEntity.getCarId() );
        carResponse.setCarName( carEntity.getCarName() );
        carResponse.setColor( carEntity.getColor() );
        carResponse.setImageURL( carEntity.getImageURL() );
        carResponse.setLicensePlate( carEntity.getLicensePlate() );
        carResponse.setManufactureYear( carEntity.getManufactureYear() );
        carResponse.setModel( carEntity.getModel() );
        carResponse.setPrice( carEntity.getPrice() );
        carResponse.setSpecifications( carEntity.getSpecifications() );
        carResponse.setStatus( carEntity.getStatus() );
        carResponse.setWarrantyPeriod( carEntity.getWarrantyPeriod() );

        return carResponse;
    }

    @Override
    public void updateCar(CarEntity carEntity, CarUpdateRequest request) {
        if ( request == null ) {
            return;
        }

        carEntity.setBrand( request.getBrand() );
        carEntity.setCarName( request.getCarName() );
        carEntity.setColor( request.getColor() );
        carEntity.setImageURL( request.getImageURL() );
        carEntity.setLicensePlate( request.getLicensePlate() );
        carEntity.setManufactureYear( request.getManufactureYear() );
        carEntity.setModel( request.getModel() );
        carEntity.setPrice( request.getPrice() );
        carEntity.setSpecifications( request.getSpecifications() );
        carEntity.setStatus( request.getStatus() );
        carEntity.setWarrantyPeriod( request.getWarrantyPeriod() );
    }
}
