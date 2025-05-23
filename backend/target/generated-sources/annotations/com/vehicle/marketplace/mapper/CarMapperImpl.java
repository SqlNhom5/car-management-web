package com.vehicle.marketplace.mapper;

import com.vehicle.marketplace.Entity.CarEntity;
import com.vehicle.marketplace.model.request.CarCreationRequest;
import com.vehicle.marketplace.model.request.CarUpdateRequest;
import com.vehicle.marketplace.model.response.CarResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.13 (Amazon.com Inc.)"
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
        carEntity.manufactureYear( carCreationRequest.getManufactureYear() );
        carEntity.licensePlate( carCreationRequest.getLicensePlate() );
        carEntity.price( carCreationRequest.getPrice() );
        carEntity.count( carCreationRequest.getCount() );
        carEntity.status( carCreationRequest.getStatus() );
        carEntity.color( carCreationRequest.getColor() );
        carEntity.specifications( carCreationRequest.getSpecifications() );
        carEntity.imageUrl( carCreationRequest.getImageUrl() );
        carEntity.warrantyPeriod( carCreationRequest.getWarrantyPeriod() );
        carEntity.numberOfSeats( carCreationRequest.getNumberOfSeats() );
        carEntity.fuel( carCreationRequest.getFuel() );
        carEntity.gear( carCreationRequest.getGear() );
        carEntity.note( carCreationRequest.getNote() );

        return carEntity.build();
    }

    @Override
    public CarResponse toCarResponse(CarEntity carEntity) {
        if ( carEntity == null ) {
            return null;
        }

        CarResponse carResponse = new CarResponse();

        carResponse.setCarId( carEntity.getCarId() );
        carResponse.setCarName( carEntity.getCarName() );
        carResponse.setBrand( carEntity.getBrand() );
        carResponse.setModel( carEntity.getModel() );
        carResponse.setManufactureYear( carEntity.getManufactureYear() );
        carResponse.setLicensePlate( carEntity.getLicensePlate() );
        carResponse.setPrice( carEntity.getPrice() );
        carResponse.setCount( carEntity.getCount() );
        carResponse.setStatus( carEntity.getStatus() );
        carResponse.setColor( carEntity.getColor() );
        carResponse.setSpecifications( carEntity.getSpecifications() );
        carResponse.setImageUrl( carEntity.getImageUrl() );
        carResponse.setWarrantyPeriod( carEntity.getWarrantyPeriod() );
        carResponse.setNumberOfSeats( carEntity.getNumberOfSeats() );
        carResponse.setFuel( carEntity.getFuel() );
        carResponse.setGear( carEntity.getGear() );
        carResponse.setNote( carEntity.getNote() );

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
        carEntity.setManufactureYear( request.getManufactureYear() );
        carEntity.setLicensePlate( request.getLicensePlate() );
        carEntity.setPrice( request.getPrice() );
        carEntity.setCount( request.getCount() );
        carEntity.setStatus( request.getStatus() );
        carEntity.setColor( request.getColor() );
        carEntity.setSpecifications( request.getSpecifications() );
        carEntity.setImageUrl( request.getImageUrl() );
        carEntity.setWarrantyPeriod( request.getWarrantyPeriod() );
        carEntity.setNumberOfSeats( request.getNumberOfSeats() );
        carEntity.setFuel( request.getFuel() );
        carEntity.setGear( request.getGear() );
        carEntity.setNote( request.getNote() );
    }
}
