package com.vehicle.marketplace.mapper;

import com.vehicle.marketplace.Entity.CarEntity;
import com.vehicle.marketplace.model.request.CarCreationRequest;
import com.vehicle.marketplace.model.request.CarUpdateRequest;
import com.vehicle.marketplace.model.response.CarResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.2 (Oracle Corporation)"
)
@Component
public class CarMapperImpl implements CarMapper {

    @Override
    public CarEntity toCarEntity(CarCreationRequest carCreationRequest) {
        if ( carCreationRequest == null ) {
            return null;
        }

        CarEntity.CarEntityBuilder carEntity = CarEntity.builder();

        carEntity.carName( carCreationRequest.getCarName() );
        carEntity.brand( carCreationRequest.getBrand() );
        carEntity.model( carCreationRequest.getModel() );
        if ( carCreationRequest.getManufactureYear() != null ) {
            carEntity.manufactureYear( carCreationRequest.getManufactureYear().intValue() );
        }
        carEntity.licensePlate( carCreationRequest.getLicensePlate() );
        if ( carCreationRequest.getPrice() != null ) {
            carEntity.price( carCreationRequest.getPrice().intValue() );
        }
        carEntity.status( carCreationRequest.getStatus() );
        carEntity.color( carCreationRequest.getColor() );
        carEntity.specifications( carCreationRequest.getSpecifications() );
        if ( carCreationRequest.getWarrantyPeriod() != null ) {
            carEntity.warrantyPeriod( carCreationRequest.getWarrantyPeriod().intValue() );
        }

        return carEntity.build();
    }

    @Override
    public CarResponse toUCarResponse(CarEntity carEntity) {
        if ( carEntity == null ) {
            return null;
        }

        CarResponse carResponse = new CarResponse();

        if ( carEntity.getCarId() != null ) {
            carResponse.setCarId( carEntity.getCarId().longValue() );
        }
        carResponse.setCarName( carEntity.getCarName() );
        carResponse.setBrand( carEntity.getBrand() );
        carResponse.setModel( carEntity.getModel() );
        if ( carEntity.getManufactureYear() != null ) {
            carResponse.setManufactureYear( carEntity.getManufactureYear().longValue() );
        }
        carResponse.setLicensePlate( carEntity.getLicensePlate() );
        if ( carEntity.getPrice() != null ) {
            carResponse.setPrice( carEntity.getPrice().longValue() );
        }
        carResponse.setStatus( carEntity.getStatus() );
        carResponse.setColor( carEntity.getColor() );
        carResponse.setSpecifications( carEntity.getSpecifications() );
        if ( carEntity.getWarrantyPeriod() != null ) {
            carResponse.setWarrantyPeriod( carEntity.getWarrantyPeriod().longValue() );
        }

        return carResponse;
    }

    @Override
    public void updateCar(CarEntity carEntity, CarUpdateRequest request) {
        if ( request == null ) {
            return;
        }

        carEntity.setCarName( request.getCarName() );
        carEntity.setBrand( request.getBrand() );
        carEntity.setModel( request.getModel() );
        if ( request.getManufactureYear() != null ) {
            carEntity.setManufactureYear( request.getManufactureYear().intValue() );
        }
        else {
            carEntity.setManufactureYear( null );
        }
        carEntity.setLicensePlate( request.getLicensePlate() );
        if ( request.getPrice() != null ) {
            carEntity.setPrice( request.getPrice().intValue() );
        }
        else {
            carEntity.setPrice( null );
        }
        carEntity.setStatus( request.getStatus() );
        carEntity.setColor( request.getColor() );
        carEntity.setSpecifications( request.getSpecifications() );
        if ( request.getWarrantyPeriod() != null ) {
            carEntity.setWarrantyPeriod( request.getWarrantyPeriod().intValue() );
        }
        else {
            carEntity.setWarrantyPeriod( null );
        }
    }
}
