package com.vehicle.marketplace.repository.custom.impl;

import com.vehicle.marketplace.Entity.CarEntity;
import com.vehicle.marketplace.model.request.CarSearchRequest;
import com.vehicle.marketplace.repository.custom.CarRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.lang.reflect.Field;
import java.util.List;
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class CarRepositoryImpl implements CarRepositoryCustom {
    @PersistenceContext
    EntityManager entityManager;

    public static void queryNomal(CarSearchRequest carSearchRequest, StringBuilder where){
        try{
            Field[] fields = CarSearchRequest.class.getDeclaredFields();
            for(Field item : fields){
                item.setAccessible(true);
                String fieldName = item.getName();
                if(!fieldName.equals("manufactureYear") && !fieldName.equals("price")){
                     Object value = item.get(carSearchRequest);
                     if(value != null && !value.equals("")){
                         if(item.getType().getName().equals("java.lang.Long") ||item.getType().getName().equals("java.lang.Integer")
                                 || item.getType().getName().equals("java.lang.Float")){
                             where.append(" and car."+fieldName+" = "+value);
                         } else if(item.getType().getName().equals("java.lang.String")){
                             where.append(" and car."+ fieldName+" like '%"+value+"%' ");
                         }
                     }
                }
            }

        } catch(Exception e){
            e.printStackTrace();
        }
    }

    public static void querySpecial(CarSearchRequest carSearchRequest, StringBuilder where){
        Long priceFrom=carSearchRequest.getPriceFrom();
        Long priceTo=carSearchRequest.getPriceTo();
        if(priceFrom != null){
            where.append(" and car.price  >= "+priceFrom);
        }
        if(priceTo != null){
            where.append(" and car.price  <= "+priceFrom);
        }

        Long manufactureYearFrom=carSearchRequest.getManufactureYearFrom();
        Long manufactureYearTo=carSearchRequest.getManufactureYearTo();
        if(manufactureYearFrom != null){
            where.append(" and car.manufacture_year  >= "+manufactureYearFrom);
        }
        if(manufactureYearTo != null){
            where.append(" and car.manufacture_year  <= "+manufactureYearTo);
        }
    }

    @Override
    public List<CarEntity> findAll(CarSearchRequest carSearchRequest) {
        StringBuilder sql= new StringBuilder(" select * from car ");
        StringBuilder where= new StringBuilder(" where 1=1 ");
        queryNomal(carSearchRequest, where);
        querySpecial(carSearchRequest, where);
        sql.append(" ; ");
        Query query=entityManager.createQuery(sql.toString(),CarEntity.class);
        List<CarEntity> ok= query.getResultList();
        return null;
    }
}
