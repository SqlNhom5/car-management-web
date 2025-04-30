package com.vehicle.marketplace.repository.custom.impl;

import com.vehicle.marketplace.Entity.SupplierEntity;
import com.vehicle.marketplace.model.request.SupplierSearchRequest;
import com.vehicle.marketplace.repository.custom.SupplierRepositoryCustom;
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
public class SupplierRepositoryImpl implements SupplierRepositoryCustom {

    @PersistenceContext
    EntityManager entityManager;

    public static void queryNormal(SupplierSearchRequest supplierSearchRequest, StringBuilder where) {
        try {
            Field[] fields = SupplierSearchRequest.class.getDeclaredFields();
            for (Field item : fields) {
                item.setAccessible(true);
                String fieldName = item.getName();
                Object value = item.get(supplierSearchRequest);
                if (value != null && !value.equals("")) {
                    if (item.getType().getName().equals("java.lang.String")) {
                        where.append(" and supplier." + fieldName + " like '%" + value + "%' ");
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<SupplierEntity> findAll(SupplierSearchRequest supplierSearchRequest) {
        StringBuilder sql = new StringBuilder("select * from supplier");
        StringBuilder where = new StringBuilder(" where 1=1 ");
        queryNormal(supplierSearchRequest, where);
        sql.append(where);
        sql.append(" ; ");
        Query query = entityManager.createNativeQuery(sql.toString(), SupplierEntity.class);
        return query.getResultList();
    }
}